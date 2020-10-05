import LemoTx from 'lemo-tx'
import {TX_NAME} from '../const'
import errors from '../errors'

const apis = {
    /**
     * Get transaction's information by hash
     * @param {string|number} txHash Hash of transaction
     * @return {Promise<object>}
     */
    async getTx(txHash) {
        const result = await this.requester.send(`${TX_NAME}_getTxByHash`, [txHash])
        if (!result) {
            return null
        }
        return this.parser.parseTxRes(result)
    },
    /**
     * Get transactions' information in account
     * @param {string} address Account address
     * @param {number} index Index of transactions
     * @param {number} limit The count of transactions required
     * @return {Promise<object>}
     */
    async getTxListByAddress(address, index, limit) {
        const result = await this.requester.send(`${TX_NAME}_getTxListByAddress`, [address, index, limit])
        if (!result) {
            return null
        }
        return this.parser.parseTxListRes(result)
    },
    /**
     * Get transactions' information in account
     * @param {string} address Account address
     * @param {number} index Index of transactions
     * @param {number} txType Type of transactions
     * @param {number} limit The count of transactions required
     * @return {Promise<object>}
     */
    async getTxListByType(address, txType, index, limit) {
        const result = await this.requester.send(`${TX_NAME}_getTxListByType`, [address, txType, index, limit])
        if (!result) {
            return null
        }
        return this.parser.parseTxListRes(result)
    },
    /**
     * Get asset transactions' with assetId information in account
     * @param {string} address Account address
     * @param {string} assetCodeOrId Asset code or id in special transaction
     * @param {number} index Index of transactions
     * @param {number} limit The count of transactions required
     * @return {Promise<object>}
     */
    async getAssetTxList(address, assetCodeOrId, index, limit) {
        const result = await this.requester.send(`${TX_NAME}_getAssetTxList`, [address, assetCodeOrId, index, limit])
        if (!result) {
            return null
        }
        return this.parser.parseTxListRes(result)
    },
    /**
     * Send a signed transaction
     * @param {object|string|LemoTx} txConfig Transaction config returned by lemo.tx.sign
     * @param {string?} privateKey The private key from sender account
     * @return {Promise<object>}
     */
    send(txConfig, privateKey) {
        // create LemoTx instance
        if (typeof txConfig === 'string') {
            txConfig = JSON.parse(txConfig)
        }
        checkChainID(txConfig, this.chainID)
        const tx = new LemoTx(txConfig)
        const nowTime = Math.floor(Date.now() / 1000)
        if (tx.expirationTime < nowTime) {
            throw new Error(errors.InvalidTxTimeOut())
        }

        if (privateKey) {
            tx.signWith(privateKey)
        }
        if (!tx.sigs || !tx.sigs.length) {
            throw new Error(errors.InvalidTxSigs())
        }

        return this.requester.send(`${TX_NAME}_sendTx`, [tx.toJson()])
    },
    /**
     * wait for the transaction to be confirmed
     * @param {boolean} txHash Transaction hash
     * @param {number|string?} expirationTime Transaction expiration time，This only works if serverMode exists
     * @return {Promise<object>} transaction information
     */
    waitConfirm(txHash, expirationTime) {
        if (typeof expirationTime === 'string') {
            expirationTime = parseInt(expirationTime, 10)
        }
        return this.txWatcher.waitTx(txHash, expirationTime)
    },
    /**
     * watch and filter transaction of block
     * @param {object} filterTxConfig transaction
     * @param {Function} callback
     * @return {number} subscribeId
     */
    watchTx(filterTxConfig, callback) {
        return this.txWatcher.watchTx(filterTxConfig, callback)
    },
    /**
     * stop watching and filtering transaction of block
     * @param {number} subscribeId
     */
    stopWatchTx(subscribeId) {
        this.txWatcher.stopWatchTx(subscribeId)
    },
}

function checkChainID(tx, chainID) {
    if (!tx.chainID || tx.chainID === '0') {
        tx.chainID = chainID
    }
    if (parseInt(tx.chainID, 10) !== chainID) {
        throw new Error(errors.TXInvalidChainID(chainID, tx.chainID))
    }
}

export default {
    moduleName: TX_NAME,
    apis,
}

import {TX_POLL_MAX_TIME_OUT, TX_NAME} from '../const'
import errors from '../errors'

class TxWatcher {
    constructor(requester, blockWatcher, {serverMode, txPollTimeout}) {
        this.requester = requester // requester
        this.blockWatcher = blockWatcher // blockWatcher
        this.serverMode = serverMode // 服务端轮询模式
        this.txPollTimeout = txPollTimeout || TX_POLL_MAX_TIME_OUT // 轮询超时时间
    }

    /**
     * @callback TxWatchCallback
     * @param {object[]} transactions
     */
    /**
     * watch and filter transaction of block
     * @param {object} filterTxConfig  transaction
     * @param {TxWatchCallback} callback
     * @return {number}
     */
    watchTx(filterTxConfig, callback) {
        if (typeof filterTxConfig !== 'object') {
            throw new Error(errors.InvalidWatchTxConfig(filterTxConfig))
        }
        filterTxConfig = {
            type: filterTxConfig.type === undefined ? undefined : parseInt(filterTxConfig.type, 10),
            version: filterTxConfig.version === undefined ? undefined : parseInt(filterTxConfig.version, 10),
            from: filterTxConfig.from,
            to: filterTxConfig.to,
            toName: filterTxConfig.toName,
            message: filterTxConfig.message,
        }
        Object.keys(filterTxConfig)
            .forEach(item => {
                if (filterTxConfig[item] === undefined) {
                    delete filterTxConfig[item]
                }
            })
        const subscribeId = this.blockWatcher.subscribe(true, (block, error) => {
            if (error) {
                console.error('watch tx error:', error.message)
                return
            }
            const resFilterTxArr = block.transactions.filter(txItem => {
                return Object.keys(filterTxConfig)
                    .every(filterTxKeyItem => txItem[filterTxKeyItem] === filterTxConfig[filterTxKeyItem])
            })
            if (resFilterTxArr.length) {
                callback(resFilterTxArr)
            }
        })
        return subscribeId
    }

    /**
     * stop watching and filtering transaction of block
     * @param {number} watchTxId
     */
    stopWatchTx(watchTxId) {
        this.blockWatcher.unsubscribe(watchTxId)
    }

    /**
     * Poll transaction's hash
     * @param {string|number} txHash Hash of transaction
     * @param {number?} expirationTime Transaction expiration time，This only works if serverMode exists
     * @return {Promise<Object>}
     */
    async waitTx(txHash, expirationTime) {
        if (this.serverMode) {
            return this.waitTxByWatchBlock(txHash, expirationTime)
        } else {
            return this.waitTxByGetTxByHash(txHash)
        }
    }

    waitTxByWatchBlock(txHash, expirationTime) {
        let isFirstPoll = true
        return new Promise((resolve, reject) => {
            const subscribeId = this.blockWatcher.subscribe(true, async (block, error) => {
                if (error) {
                    console.error('watch tx by hash error:', error.message)
                    return
                }
                // 1.If the first query finds this block, return the final result
                if (block.transactions.length) {
                    const transaction = block.transactions.find(item => item.hash === txHash)
                    if (transaction) {
                        this.blockWatcher.unsubscribe(subscribeId)
                        clearTimeout(timeoutId)
                        resolve(transaction)
                        return
                    }
                }
                // The transaction hash is used to check whether there is a transaction
                // 2.If don't find this block in the first time, query by transaction hash, only query one time
                if (isFirstPoll) {
                    isFirstPoll = false
                    let result
                    try {
                        result = await this.requester.send(`${TX_NAME}_getTxByHash`, [txHash])
                    } catch (e) {
                        console.log('get tx by hash error:', e.message)
                    }
                    if (result) {
                        this.blockWatcher.unsubscribe(subscribeId)
                        clearTimeout(timeoutId)
                        resolve(result)
                        return
                    }
                }
                if (expirationTime && expirationTime < block.header.timestamp) {
                    this.blockWatcher.unsubscribe(subscribeId)
                    clearTimeout(timeoutId)
                    reject(new Error(errors.InvalidTxTimeOut()))
                }
            })
            const timeoutId = setTimeout(() => {
                this.blockWatcher.unsubscribe(subscribeId)
                reject(new Error(errors.InvalidPollTxTimeOut()))
            }, this.txPollTimeout)
        })
    }

    waitTxByGetTxByHash(txHash) {
        return new Promise((resolve, reject) => {
            const watchId = this.requester.watch(`${TX_NAME}_getTxByHash`, [txHash], (result, error) => {
                if (error) {
                    reject(error)
                    return
                }
                if (!result) {
                    return
                }
                this.requester.stopWatch(watchId)
                clearTimeout(timeoutId)
                resolve(result)
            })
            const timeoutId = setTimeout(() => {
                this.requester.stopWatch(watchId)
                reject(new Error(errors.InvalidPollTxTimeOut()))
            }, this.txPollTimeout)
        })
    }
}

export default TxWatcher

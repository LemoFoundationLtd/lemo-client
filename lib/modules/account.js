import {isLemoAddress} from 'lemo-utils'
import {ACCOUNT_NAME} from '../const'
import error from '../errors'

const apis = {
    /**
     * Get account information
     * @param {string} address
     * @return {Promise<object>}
     */
    async getAccount(address) {
        if (!isLemoAddress(address)) {
            throw new Error(error.InvalidAddress(address))
        }
        const result = await this.requester.send(`${ACCOUNT_NAME}_getAccount`, [address])
        return this.parser.parseAccount(result)
    },
    /**
     * Get candidate information
     * @param {string} address
     * @return {Promise<object>}
     */
    async getCandidateInfo(address) {
        if (!isLemoAddress(address)) {
            throw new Error(error.InvalidAddress(address))
        }
        const result = await this.requester.send(`${ACCOUNT_NAME}_getAccount`, [address])
        return this.parser.parseAccount(result).candidate
    },
    /**
     * Get balance from account
     * @param {string} address
     * @return {Promise<string>}
     */
    async getBalance(address) {
        if (!isLemoAddress(address)) {
            throw new Error(error.InvalidAddress(address))
        }
        return this.requester.send(`${ACCOUNT_NAME}_getBalance`, [address])
    },
    /**
     * 获取指定账户持有的指定资产权益
     * @param {string} address Account address
     * @param {string} assetId Asset id
     * @return {Promise<object>}
     */
    async getEquity(address, assetId) {
        if (!isLemoAddress(address)) {
            throw new Error(error.InvalidAddress(address))
        }
        return this.requester.send(`${ACCOUNT_NAME}_getEquity`, [address, assetId])
    },
    /**
     * 获取指定账户持有的所有资产权益
     * @param {string} address Account address
     * @param {number} index Index of equities
     * @param {number} limit The count of equities required
     * @return {Promise<object>}
     */
    async getEquityList(address, index, limit) {
        if (!isLemoAddress(address)) {
            throw new Error(error.InvalidAddress(address))
        }
        const result = await this.requester.send(`${ACCOUNT_NAME}_getEquityList`, [address, index, limit])
        if (!result) {
            return []
        }
        return this.parser.parseEquityListRes(result)
    },
    /**
     * 根据资产Code获取指定账户持有的相关资产权益
     * @param {string} address Account address
     * @param {string} assetCode Asset code
     * @param {number} index Index of equities
     * @param {number} limit The count of equities required
     * @return {Promise<object>}
     */
    async getEquityListByAssetCode(address, assetCode, index, limit) {
        if (!isLemoAddress(address)) {
            throw new Error(error.InvalidAddress(address))
        }
        const result = await this.requester.send(`${ACCOUNT_NAME}_getEquityListByAssetCode`, [address, assetCode, index, limit])
        if (!result) {
            return []
        }
        return this.parser.parseEquityListRes(result)
    },
    /**
     * 获取指定资产类型的发行信息
     * @param {string} assetCode Account address
     * @return {Promise<object>}
     */
    async getAssetInfo(assetCode) {
        const result = await this.requester.send(`${ACCOUNT_NAME}_getAsset`, [assetCode])
        return this.parser.parseAssetInfo(result)
    },
    /**
     * 获取指定资产中保存的自定义数据
     * @param {string} assetId Asset Id
     * @return {Promise<object>}
     */
    async getAssetToken(assetId) {
        const result = await this.requester.send(`${ACCOUNT_NAME}_getAssetToken`, [assetId])
        return this.parser.parseAssetToken(result)
    },
}

export default {
    moduleName: ACCOUNT_NAME,
    apis,
}

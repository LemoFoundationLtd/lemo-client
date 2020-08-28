import {CHAIN_NAME} from '../const'
import error from '../errors'

const apis = {
    /**
     * Get current block information
     * @param {boolean?} withBody Get the body detail if true
     * @return {Promise<object>}
     */
    async getNewestBlock(withBody) {
        const block = await this.requester.send(`${CHAIN_NAME}_currentBlock`, [!!withBody])
        return this.parser.parseBlock(block, withBody)
    },
    /**
     * Get the specific block information
     * @param {string|number} hashOrHeight Hash or height which used to find the block
     * @param {boolean?} withBody Get the body detail if true
     * @return {Promise<object>}
     */
    async getBlock(hashOrHeight, withBody) {
        const apiName = isHash(hashOrHeight) ? 'getBlockByHash' : 'getBlockByHeight'
        const block = await this.requester.send(`${CHAIN_NAME}_${apiName}`, [hashOrHeight, !!withBody])
        return this.parser.parseBlock(block, withBody)
    },
    /**
     * Get the current height of chain head block
     * @return {Promise<number>}
     */
    getNewestHeight() {
        return this.requester.send(`${CHAIN_NAME}_currentHeight`)
    },
    /**
     * Get the information of genesis block, whose height is 0
     * @return {Promise<object>}
     */
    async getGenesis() {
        const result = await this.requester.send(`${CHAIN_NAME}_genesis`, [])
        return this.parser.parseBlock(result, true)
    },
    /**
     * Get the chainID of current connected blockchain
     * @return {Promise<number>}
     */
    getChainID() {
        return this.requester.send(`${CHAIN_NAME}_chainID`, [])
    },
    /**
     * Get the gas price advice. It is used to make sure the transaction will be packaged in a few seconds
     * @return {Promise<string>}
     */
    getGasPriceAdvice() {
        return this.requester.send(`${CHAIN_NAME}_gasPriceAdvice`, [])
    },
    /**
     * Get the version of lemochain distribution
     * @return {Promise<number>}
     */
    getDistributionVersion() {
        return this.requester.send(`${CHAIN_NAME}_nodeVersion`, [])
    },
    /**
     * Get new blocks from now on
     * @param {boolean} withBody Get the body detail if true
     * @param {Function} callback It is used to deliver the block object
     * @return {number} subscribe id which used to stop watch
     */
    watchBlock(withBody, callback) {
        return this.blockWatcher.subscribe(withBody, callback)
    },
    stopWatchBlock(subscribeId) {
        this.blockWatcher.unsubscribe(subscribeId)
    },
    /**
     * Get paged candidates information
     * @param {number} index Index of candidates
     * @param {number} limit Max count of required candidates
     * @return {Promise<object>}
     */
    async getCandidateList(index, limit) {
        const result = await this.requester.send(`${CHAIN_NAME}_getCandidateList`, [index, limit])
        return {
            candidateList: (result.candidateList || []).map(this.parser.parseCandidate),
            total: parseInt(result.total, 10) || 0,
        }
    },
    /**
     * Get top 30 candidates information
     * @return {Promise<object>}
     */
    async getCandidateTop30() {
        const result = await this.requester.send(`${CHAIN_NAME}_getCandidateTop30`, [])
        return (result || []).map(this.parser.parseCandidate)
    },
    /**
     * Get the address list of current deputy nodes
     * {boolean?} onlyBlockSigner
     * @return {Promise<object>}
     */
    async getDeputyNodeList(onlyBlockSigner) {
        const result = await this.requester.send(`${CHAIN_NAME}_getDeputyNodeList`, [!!onlyBlockSigner])
        return this.parser.parseDeputyNode(result)
    },
    /**
     * 获取换届奖励数
     * @param {number} height block height
     * @return {Promise<object>}
     */
    async getTermReward(height) {
        if (typeof height !== 'number') {
            throw new Error(error.InvalidHeight())
        }
        const result = await this.requester.send(`${CHAIN_NAME}_getTermReward`, [height])
        return this.parser.parseTermReward(result)
    },
    /**
     * get all reward information
     * @returns {Promise<Object>}
     */
    getAllRewardValue() {
        return this.requester.send(`${CHAIN_NAME}_getAllRewardValue`, [])
    },
}

function isHash(hashOrHeight) {
    return typeof hashOrHeight === 'string' && hashOrHeight.toLowerCase().startsWith('0x')
}

export default {
    moduleName: CHAIN_NAME,
    apis,
}

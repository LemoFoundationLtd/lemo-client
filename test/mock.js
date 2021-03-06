import nock from 'nock'
import Tx from 'lemo-tx'
import {
    testAddr,
    miner,
    emptyAccount,
    currentBlock,
    block1,
    block0,
    currentHeight,
    oneChangeLogBlock,
    chainID,
    HxGasPriceAdvice,
    nodeVersion,
    isMining,
    peersCount,
    infos,
    txRes1,
    txRes2,
    txRes3,
    specialTxRes1,
    specialTxRes2,
    specialTxRes3,
    txInfos,
    candidateList,
    deputyNodes,
    equitiesResList,
    creatAsset,
    assetToken1,
    assetToken2,
    creatAsset1,
    termRewardInfo,
    RewardValue,
} from './datas'

const mockInfos = [
    {
        method: 'account_getAccount',
        paramsCount: 1,
        reply([address]) {
            const result = address === miner.address ? miner : emptyAccount
            return {...result, address}
        },
    },
    {
        method: 'account_getBalance',
        paramsCount: 1,
        reply([address]) {
            return address === miner.address ? miner.balance : emptyAccount.balance
        },
    },
    {
        method: 'account_getEquity',
        paramsCount: 2,
        reply([address, assetId]) {
            return equitiesResList[0]
        },
    },
    {
        method: 'account_getEquityList',
        paramsCount: 3,
        reply([address, index, limit]) {
            let list = []
            if (address === 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D') {
                list = equitiesResList.slice(index, index + limit)
            }
            return {equities: list, total: String(list.length)}
        },
    },
    {
        method: 'account_getEquityListByAssetCode',
        paramsCount: 4,
        reply([address, assetCode, index, limit]) {
            let list = []
            if (address === 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D') {
                list = equitiesResList.filter(item => item.assetCode === assetCode)
                    .slice(index, index + limit)
            }
            return {equities: list, total: String(list.length)}
        },
    },
    {
        method: 'account_getAsset',
        paramsCount: 1,
        reply([assetCode]) {
            const result = assetCode === creatAsset.assetCode ? creatAsset : creatAsset1
            return {...result}
        },
    },
    {
        method: 'account_getAssetToken',
        paramsCount: 1,
        reply([assetId]) {
            const result = [assetToken1, assetToken2].find(item => item.assetId === assetId)
            return {...result}
        },
    },
    {
        method: 'chain_currentBlock',
        paramsCount: 1,
        reply([withBody]) {
            return withBody ? currentBlock : {...currentBlock, transactions: null}
        },
    },
    {
        method: 'chain_getBlockByHeight',
        paramsCount: 2,
        reply([height, withBody]) {
            const blocks = [block0, block1, currentBlock]
            let result = blocks[height] || null
            if (result && !withBody) {
                result = {...result, transactions: null}
            }
            return result
        },
    },
    {
        method: 'chain_getTermReward',
        paramsCount: 1,
        reply() {
            return termRewardInfo
        },
    },
    {
        method: 'chain_getAllRewardValue',
        paramsCount: 0,
        reply() {
            return {
                RewardValue,
            }
        },
    },
    {
        method: 'chain_getBlockByHash',
        paramsCount: 2,
        reply([hash, withBody]) {
            const blocks = [block0, block1, currentBlock]
            let result = blocks.find(item => item.header.hash === hash) || null
            if (result && !withBody) {
                result = {...result, transactions: null}
            }
            return result
        },
    },
    {
        method: 'chain_currentHeight',
        paramsCount: 0,
        reply() {
            return currentHeight
        },
    },
    {
        method: 'chain_genesis',
        paramsCount: 0,
        reply() {
            return oneChangeLogBlock
        },
    },
    {
        method: 'chain_chainID',
        paramsCount: 0,
        reply() {
            return chainID
        },
    },
    {
        method: 'chain_gasPriceAdvice',
        paramsCount: 0,
        reply() {
            return HxGasPriceAdvice
        },
    },
    {
        method: 'chain_nodeVersion',
        paramsCount: 0,
        reply() {
            return nodeVersion
        },
    },
    {
        method: 'chain_getCandidateList',
        paramsCount: 2,
        reply([index, limit]) {
            return {
                candidateList: candidateList.slice(index, index + limit),
                total: candidateList.length,
            }
        },
    },
    {
        method: 'chain_getCandidateTop30',
        paramsCount: 0,
        reply() {
            return candidateList
        },
    },
    {
        method: 'chain_getDeputyNodeList',
        paramsCount: 1,
        reply([onlyBlockSigner]) {
            if (onlyBlockSigner) {
                return deputyNodes
            } else {
                return deputyNodes
            }
        },
    },
    {
        method: 'mine_isMining',
        paramsCount: 0,
        reply() {
            return isMining
        },
    },
    {
        method: 'mine_miner',
        paramsCount: 0,
        reply() {
            return miner.address
        },
    },
    {
        method: 'net_peersCount',
        paramsCount: 0,
        reply() {
            return peersCount
        },
    },
    {
        method: 'net_info',
        paramsCount: 0,
        reply() {
            return infos
        },
    },
    {
        method: 'tx_getTxByHash',
        paramsCount: 1,
        reply([hash]) {
            const txIndex = txInfos.findIndex(item => {
                return item.hashAfterSign === hash
            })
            const arr = [txRes1, txRes2, txRes3]
            return txIndex !== -1 ? arr[txIndex] : null
        },
    },
    {
        method: 'tx_getTxListByAddress',
        paramsCount: 3,
        reply([address, index, limit]) {
            let list = []
            if (address === testAddr) {
                list = [txRes1, txRes2, txRes3].slice(index, index + limit)
            }
            if (address === 'Lemo83DZ5J99JSK5ZH89TCW7T6ZZCWJ8H7FDGA7W') {
                list = [specialTxRes1, specialTxRes2, specialTxRes3].slice(index, index + limit)
            }
            return {txList: list, total: String(list.length)}
        },
    },
    {
        method: 'tx_getTxListByType',
        paramsCount: 4,
        reply([address, txType, index, limit]) {
            let list = []
            if (address === testAddr) {
                list = [specialTxRes1, specialTxRes2, specialTxRes3].filter(item => parseInt(item.tx.type, 10) === txType).slice(index, index + limit)
            }
            return {txList: list, total: String(list.length)}
        },
    },
    {
        method: 'tx_getAssetTxList',
        paramsCount: 4,
        reply([address, assetId, index, limit]) {
            let list = []
            if (address === testAddr) {
                list = [txRes1, txRes2, txRes3].filter(item => item.assetId === assetId).slice(index, index + limit)
            }
            return {txList: list, total: String(list.length)}
        },
    },
    {
        method: 'tx_sendTx',
        paramsCount: 1,
        reply([txConfig]) {
            return new Tx(txConfig).hash()
        },
    },
]

function startMock() {
    nock('http://127.0.0.1:8001')
        .post('/', body => {
            const mockInfo = mockInfos.find(info => info.method === body.method)
            return (
                body.jsonrpc === '2.0'
                && typeof body.id === 'number'
                && Array.isArray(body.params)
                && mockInfo
                && body.params.length === mockInfo.paramsCount
            )
        })
        .times(10000000000)
        .reply((uri, body) => {
            const mockInfo = mockInfos.find(info => info.method === body.method)
            const result = mockInfo.reply(body.params)
            return [
                200,
                {
                    jsonrpc: '2.0',
                    id: 123,
                    result,
                },
            ]
        })
}

startMock()

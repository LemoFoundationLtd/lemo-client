import {assert} from 'chai'
import LemoTx from 'lemo-tx'
import LemoClient from '../../lib/index'
import {
    chainID,
    testPrivate,
    txRes1,
    txRes3,
    formattedTxRes1,
    formattedTxRes2,
    formattedTxRes3,
    formattedSpecialTxRes1,
    formattedSpecialTxRes2,
    formattedSpecialTxRes3,
    block1,
    tx4,
    txInfo,
    testAddr,
    emptyTxInfo, equitiesResList,
} from '../datas'
import '../mock'
import {DEFAULT_POLL_DURATION} from '../../lib/const'
import {resetRPC} from '../../lib/network/jsonrpc'
import errors from '../../lib/errors'

describe('module_tx_getTx', () => {
    it('getTx', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTx(emptyTxInfo.hashAfterSign)
        assert.deepEqual(result, formattedTxRes1)
    })
    it('getTx not exist', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTx('0x28ee2b4622946e35c3e761e826d18d95c319452efe23ce6844f14de3ece95b5e')
        assert.equal(result, null)
    })
})

describe('module_tx_getTxListByAddress', () => {
    it('got 3 txs', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 10)
        assert.deepEqual(result.txList, [formattedTxRes1, formattedTxRes2, formattedTxRes3])
        assert.equal(result.total, 3)
    })
    it('got 1 tx', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 1)
        assert.deepEqual(result.txList, [formattedTxRes1])
        assert.equal(result.total, 1)
    })
    it('got 0 tx', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 0)
        assert.equal(result.txList.length, 0)
        assert.equal(result.total, 0)
    })
    it('get from empty account', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByAddress('Lemobw', 0, 10)
        assert.equal(result.txList.length, 0)
        assert.equal(result.total, 0)
    })
    it('get special tx', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByAddress('Lemo83DZ5J99JSK5ZH89TCW7T6ZZCWJ8H7FDGA7W', 0, 10)
        assert.deepEqual(result.txList, [formattedSpecialTxRes1, formattedSpecialTxRes2, formattedSpecialTxRes3])
        assert.equal(result.total, 3)
    })
})

describe('module_tx_getTxListByType', () => {
    it('get 1 tx by txType', async () => {
        const lemo = new LemoClient({chainID})
        let result = await lemo.tx.getTxListByType(testAddr, LemoTx.TxType.CREATE_CONTRACT, 0, 10)
        assert.deepEqual(result.txList[0], formattedSpecialTxRes1)
        assert.equal(result.total, 1)
        result = await lemo.tx.getTxListByType(testAddr, LemoTx.TxType.VOTE, 0, 10)
        assert.deepEqual(result.txList[0], formattedSpecialTxRes2)
        assert.equal(result.total, 1)
        result = await lemo.tx.getTxListByType(testAddr, LemoTx.TxType.BOX_TX, 0, 10)
        assert.deepEqual(result.txList[0], formattedSpecialTxRes3)
        assert.equal(result.total, 1)
    })
    it('got 0 tx', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByType(testAddr, LemoTx.TxType.ISSUE_ASSET, 0, 10)
        assert.equal(result.txList.length, 0)
        assert.equal(result.total, 0)
    })
    it('account not exist', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByType('Lemo123', LemoTx.TxType.CREATE_CONTRACT, 0, 10)
        assert.equal(result.txList.length, 0)
        assert.equal(result.total, 0)
    })
})

describe('module_tx_getAssetTxList', () => {
    it('get 2 txs by assetId', async () => {
        const lemo = new LemoClient({chainID})
        const assetId = txRes1.assetId // it's same with txRes2
        const result = await lemo.tx.getAssetTxList(testAddr, assetId, 0, 10)
        assert.deepEqual(result.txList, [formattedTxRes1, formattedTxRes2])
        assert.equal(result.total, 2)
    })
    it('get 1 tx by assetId', async () => {
        const lemo = new LemoClient({chainID})
        const assetId = txRes3.assetId
        const result = await lemo.tx.getAssetTxList(testAddr, assetId, 0, 10)
        assert.deepEqual(result.txList, [formattedTxRes3])
        assert.equal(result.total, 1)
    })
    it('got 0 tx', async () => {
        const lemo = new LemoClient({chainID})
        const assetId = '0x6c0b14755a4caba0f42cef903db72bbeae7dd8ef2d8c6c71c79136d8c6d8046f'
        const result = await lemo.tx.getAssetTxList(testAddr, assetId, 0, 0)
        assert.equal(result.txList.length, 0)
        assert.equal(result.total, 0)
    })
    it('account not exist', async () => {
        const lemo = new LemoClient({chainID})
        const assetId = txRes1.assetId
        const result = await lemo.tx.getAssetTxList('Lemo123', assetId, 0, 10)
        assert.equal(result.txList.length, 0)
        assert.equal(result.total, 0)
    })
})

describe('module_tx_send', () => {
    it('sign and send', async () => {
        const lemo = new LemoClient({chainID})
        const txConfig = {
            from: testAddr,
            chainID,
        }
        const tx = new LemoTx(txConfig)
        tx.signWith(testPrivate)
        const nowHash = tx.hash()
        const result = LemoTx.sign(testPrivate, tx)
        const sendHash = await lemo.tx.send(JSON.parse(result), testPrivate)
        assert.equal(sendHash, nowHash)
    })
    it('send a string txConfig', async () => {
        const lemo = new LemoClient({chainID})
        const txConfig = {
            from: testAddr,
            chainID,
        }
        const tx = new LemoTx(txConfig)
        tx.signWith(testPrivate)
        const nowHash = tx.hash()
        const result = LemoTx.sign(testPrivate, tx)
        const sendHash = await lemo.tx.send(result, testPrivate)
        assert.equal(sendHash, nowHash)
    })
    it('send a signed tx', async () => {
        const lemo = new LemoClient({chainID})
        const txConfig = {
            from: testAddr,
            chainID,
        }
        const tx = new LemoTx(txConfig)
        tx.signWith(testPrivate)
        const sendHash = await lemo.tx.send(tx)
        const result = LemoTx.sign(testPrivate, tx)
        const resultHash = await lemo.tx.send(result, testPrivate)
        assert.equal(resultHash, sendHash)
    })
    it('send a unsigned tx', async () => {
        const lemo = new LemoClient({chainID})
        const time = Math.floor(Date.now() / 1000) + 30 * 60
        const txConfig = {
            ...txInfo.txConfig,
            expirationTime: time,
        }
        const tx = new LemoTx(txConfig)
        try {
            await lemo.tx.send(tx)
        } catch (e) {
            assert.equal(e.message, errors.InvalidTxSigs())
            return
        }
        assert.fail(undefined, errors.InvalidTxSigs())
    })
    it('send a timeOut tx', async () => {
        const lemo = new LemoClient({chainID})
        const tx = new LemoTx(txInfo.txConfig)
        try {
            await lemo.tx.send(tx)
        } catch (e) {
            assert.equal(e.message, errors.InvalidTxTimeOut())
            return
        }
        assert.fail(undefined, errors.InvalidTxTimeOut())
    })
})

describe('module_tx_waitConfirm', () => {
    beforeEach(() => {
        resetRPC()
    })
    it('waitConfirm_narmal', async () => {
        const time = Math.floor(Date.now() / 1000) + (30 * 60)
        const txConfig = {
            ...txInfo.txConfig,
            expirationTime: time,
        }
        const lemo = new LemoClient({
            chainID,
        })
        const lemo1 = new LemoClient({
            chainID,
            send: () => {
                return {jsonrpc: '2.0', id: 1, result: txInfo.txConfig}
            },
        })
        const txHash = await lemo.tx.send(txConfig, testPrivate)
        const result = await lemo1.tx.waitConfirm(txHash)
        assert.equal(result.data, txInfo.txConfig.data)
    })
    it('waitConfirm_has_serverMode_one_time', async () => {
        const time = Math.floor(Date.now() / 1000) + (30 * 60)
        const nowTime = Math.floor(Date.now() / 1000)
        // Restructure, change the transaction expirationTime
        const txConfig = {
            ...block1.transactions[0],
            chainID,
            expirationTime: time,
        }
        // new a LemoClient
        const lemo = new LemoClient({
            chainID,
        })
        // Send real-time trading
        const txHash = await lemo.tx.send(txConfig, testPrivate)
        // Change block timestamp
        const blockData = {
            ...block1,
            transactions: [{
                ...block1.transactions[0],
                hash: txHash,
            }],
            header: {
                timestamp: nowTime,
            },
        }
        // New lemoCore with serverMode to verify waitTxByWatchBlock
        const lemo1 = new LemoClient({
            chainID,
            serverMode: true,
            send: (value) => {
                if (value.id === 3) {
                    return {jsonrpc: '2.0', id: 3, result: txConfig}
                } else {
                    return {jsonrpc: '2.0', id: 2, result: blockData}
                }
            },
        })
        const result = await lemo1.tx.waitConfirm(txHash, txConfig.expirationTime)
        assert.equal(result.hash, txHash)
    })
    it('waitConfirm_has_serverMode_two_time', async () => {
        const time = Math.floor(Date.now() / 1000) + (30 * 60)
        const nowTime = Math.floor(Date.now() / 1000)
        // Restructure, change the transaction expirationTime
        const txConfig = {
            ...block1.transactions[0],
            chainID,
            expirationTime: time,
        }
        // new a LemoClient
        const lemo = new LemoClient({chainID})
        // Send real-time trading
        const txHash = await lemo.tx.send(txConfig, testPrivate)
        // Change block timestamp
        const blockData = {
            ...block1,
            header: {
                timestamp: nowTime,
            },
            transactions: [{
                ...block1.transactions[0],
            }],
        }
        // New lemoCore with serverMode to verify waitTxByWatchBlock
        const lemo1 = new LemoClient({
            chainID,
            serverMode: true,
            send: (value) => {
                if (value.id === 2) {
                    return {jsonrpc: '2.0', id: 2, result: blockData}
                } else {
                    return {jsonrpc: '2.0', id: 3, result: txConfig}
                }
            },
        })
        const result = await lemo1.tx.waitConfirm(txHash, txConfig.expirationTime)
        assert.equal(result.hash, txConfig.hash)
    })
    it('waitConfirm_has_serverMode_timeOut', async () => {
        const time = Math.floor(Date.now() / 1000)
        const nowTime = Math.floor(Date.now() / 1000) + (30 * 60)
        // Restructure, change the transaction expirationTime
        const txConfig = {
            ...block1.transactions[0],
            chainID,
            expirationTime: time,
        }
        // new a LemoClient
        const lemo = new LemoClient({
            chainID,
        })
        // Send real-time trading
        const txHash = await lemo.tx.send(txConfig, testPrivate)
        // Change block timestamp
        const blockData = {
            ...block1,
            header: {
                timestamp: nowTime,
            },
            transactions: [{
                ...block1.transactions[0],
            }],
        }
        // New lemoCore with serverMode to verify waitTxByWatchBlock
        const lemo1 = new LemoClient({
            chainID,
            serverMode: true,
            send: (value) => {
                if (value.id === 2) {
                    return {jsonrpc: '2.0', id: 2, result: blockData}
                } else {
                    return {jsonrpc: '2.0', id: 3, result: null}
                }
            },
        })
        const expectedErr = errors.InvalidTxTimeOut()
        return lemo1.tx.waitConfirm(txHash, txConfig.expirationTime).then(() => {
            throw new Error(`expected error: ${expectedErr}`)
        }, e => {
            if (e.message !== expectedErr) {
                throw new Error(`expected error: ${expectedErr}`)
            }
        })
    })
    it('waitConfirm_timeOut', async () => {
        const lemo = new LemoClient({chainID, httpTimeOut: 1000})
        tx4.expirationTime = Math.floor(new Date() / 1000) + (30 * 60)
        const txHash = await lemo.tx.send(tx4, testPrivate)
        const expectedErr = errors.InvalidPollTxTimeOut()
        return lemo.tx.waitConfirm(txHash).then(() => {
            assert.fail('success', `throw error: ${expectedErr}`)
        }, e => {
            return assert.equal(e.message, expectedErr)
        })
    })
    it('waitConfirm_has_expirationTime', async () => {
        const time = Math.floor(new Date() / 1000) + (30 * 60)
        const txConfig = {
            ...txInfo.txConfig,
            expirationTime: time,
        }
        const lemo = new LemoClient({
            chainID,
        })
        const lemo1 = new LemoClient({
            chainID,
            send: () => {
                return {jsonrpc: '2.0', id: 1, result: txInfo.txConfig}
            },
        })
        const txHash = await lemo.tx.send(txConfig, testPrivate)
        const result = await lemo1.tx.waitConfirm(txHash)
        assert.equal(result.data, txInfo.txConfig.data)
    })
})

describe('module_tx_watchTx', () => {
    it('watchTx', function itFunc(done) {
        this.timeout(DEFAULT_POLL_DURATION + 1000)
        const lemo = new LemoClient({chainID})
        const testConfig = {
            type: 0,
            version: 1,
            to: 'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY',
            toName: 'aa',
            message: 'aaa',
        }
        const watchTxId = lemo.tx.watchTx(testConfig, () => {
            lemo.tx.stopWatchTx(watchTxId)
            done()
        })
    })
})

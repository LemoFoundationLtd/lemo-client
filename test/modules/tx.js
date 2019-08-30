import {assert} from 'chai'
import LemoTx from 'lemo-tx'
import LemoClient from '../../lib/index'
import {
    txInfos,
    chainID,
    testPrivate,
    formattedTxRes1,
    formattedTxListRes,
    tx4,
    txInfo,
    testAddr,
    emptyTxInfo,
    txList,
    formattedAssetTxListRes,
} from '../datas'
import '../mock'
import {DEFAULT_POLL_DURATION} from '../../lib/const'
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
        assert.deepEqual(result, formattedTxListRes)
    })
    it('got 1 tx', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 1)
        assert.equal(result.txList.length, 1)
    })
    it('got 0 tx', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 0)
        assert.equal(result.txList.length, 0)
    })
    it('get from empty account', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.tx.getTxListByAddress('Lemobw', 0, 10)
        assert.equal(result.txList.length, 0)
    })
})

describe('module_tx_getAssetTxList', () => {
    it('get_two_asset_tx_list', async () => {
        const lemo = new LemoClient({chainID})
        const assetId = txList[0].assetId
        const result = await lemo.tx.getAssetTxList(testAddr, assetId, 0, 10)
        assert.equal(result.txList[0].assetId, formattedAssetTxListRes.txList[0].assetId)
        assert.equal(result.txList.length, 2)
    })
    it('get from empty assetId', async () => {
        const lemo = new LemoClient({chainID})
        const assetId = '0x6c0b14755a4caba0f42cef903db72bbeae7dd8ef2d8c6c71c79136d8c6d8046f'
        const result = await lemo.tx.getAssetTxList(testAddr, assetId, 0, 10)
        assert.equal(result.txList.length, 0)
    })
    it('got 0 tx', async () => {
        const lemo = new LemoClient({chainID})
        const assetId = txList[0].assetId
        const result = await lemo.tx.getAssetTxList(testAddr, assetId, 0, 0)
        assert.equal(result.txList.length, 0)
    })
    it('account is empty', async () => {
        const lemo = new LemoClient({chainID})
        const assetId = txList[0].assetId
        const result = await lemo.tx.getAssetTxList('Lemo123', assetId, 0, 10)
        assert.equal(result.txList.length, 0)
    })
})

describe('module_tx_send', () => {
    it('sign and send', () => {
        return Promise.all(
            txInfos.map(async (test, i) => {
                const lemo = new LemoClient({chainID})
                const result = await lemo.tx.send(test.txConfig, testPrivate)
                assert.equal(result, test.hashAfterSign, `index=${i}`)
            }),
        )
    })
    it('send a string txConfig', () => {
        return Promise.all(
            txInfos.map(async (test, i) => {
                const lemo = new LemoClient({chainID})
                const result = await lemo.tx.send(JSON.stringify(test.txConfig), testPrivate)
                assert.equal(result, test.hashAfterSign, `index=${i}`)
            }),
        )
    })
    it('send a signed tx', async () => {
        return Promise.all(
            txInfos.map(async (test, i) => {
                const lemo = new LemoClient({chainID})
                const tx = new LemoTx(test.txConfig)
                tx.signWith(testPrivate)
                const result = await lemo.tx.send(tx)
                assert.equal(result, test.hashAfterSign, `index=${i}`)
            }),
        )
    })
    it('send a unsigned tx', () => {
        const lemo = new LemoClient({chainID})
        const tx = new LemoTx(txInfo.txConfig)
        assert.throws(() => {
            lemo.tx.send(tx)
        }, errors.InvalidTxSigs())
    })
})

describe('module_tx_waitConfirm', () => {
    it('waitConfirm_narmal', async () => {
        const lemo = new LemoClient({chainID})
        const txHash = await lemo.tx.send(txInfo.txConfig, testPrivate)
        const result = await lemo.tx.waitConfirm(txHash)
        assert.equal(result.data, txInfo.data)
    })
    it('waitConfirm_timeOut', async () => {
        const lemo = new LemoClient({chainID, httpTimeOut: 1000})
        const txHash = await lemo.tx.send(tx4, testPrivate)
        const expectedErr = errors.InvalidPollTxTimeOut()
        return lemo.tx.waitConfirm(txHash).then(() => {
            assert.fail('success', `throw error: ${expectedErr}`)
        }, e => {
            return assert.equal(e.message, expectedErr)
        })
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

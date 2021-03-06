import BigNumber from 'bignumber.js'
import LemoTx from 'lemo-tx'
import {ChangeLogType} from '../lib/const'

const bigNum = '0x111111111111111111111111111111111111111111111111111111111111'
const bigString = '888888888888888888888888888888888888888888888888888888888888'
const bigData = '0x4949494949494949'
const balanceLog = ChangeLogType.BalanceLog

export const testPrivate = '0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb'
export const testAddr = 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D'
export const from = testAddr
export const currentHeight = 2
export const chainID = 200
export const HxGasPriceAdvice = '0x5f5e100'
export const nodeVersion = '1.0.0'
export const isMining = false
export const peersCount = '0'
export const infos = {
    nodeName: 'Lemo',
    nodeVersion: '1.0.0',
    os: 'windows-amd64',
    port: '7001',
    runtime: 'go1.9.2',
}

export const emptyAccount = {
    balance: '0',
    codeHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    records: {},
    root: '0x0000000000000000000000000000000000000000000000000000000000000000',
}

export const miner = {
    address: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
    balance: '1599999999999999999999999900',
    codeHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    records: {
        [balanceLog]: {
            height: 1,
            version: 3,
        },
    },
    root: '0x0000000000000000000000000000000000000000000000000000000000000000',
    txCount: '0',
    candidate: {
        profile: {
            host: '127.0.0.1',
            isCandidate: 'true',
            minerAddress: 'Lemobw',
            nodeID:
                '0x5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0',
            port: '7001',
        },
        votes: '1599999000',
    },
    voteFor: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
}
export const formatedMiner = {
    ...miner,
    balance: '1599999999999999999999999900',
    records: {
        [balanceLog]: {
            height: 1,
            version: 3,
        },
    },
    candidate: {
        profile: {
            ...miner.candidate.profile,
            isCandidate: true,
        },
        votes: '1599999000',
    },
}
export const formattedSpecialLemoBase = {
    ...emptyAccount,
    address: '0x015780F8456F9c1532645087a19DcF9a7e0c7F97',
    balance: new BigNumber('0'),
    txCount: 0,
}
export const formattedNotExistLemoBase = {
    ...emptyAccount,
    address: '0x1234567890123456789012345678901234567890',
    balance: new BigNumber('0'),
    txCount: 0,
}

// empty tx
export const emptyTxInfo = {
    txConfig: {
        expirationTime: 1544584596,
        from: testAddr,
    },
    rlp: '0xef800181c8940107134b9cdd7d89f83efa6175f9b3552f29094c80808084b2d05e00831e84808080845c107d9480c0c0',
    hash: '0x8dd85a833c482b4cb24f261e2d5378c14507eb01a92d89eb4a8278302f70cff5',
    rlpAfterSign:
        '0xf873800181c8940107134b9cdd7d89f83efa6175f9b3552f29094c80808084b2d05e00831e84808080845c107d9480f843b8419c9f62a8fe923c093b408141a4af6b2116969e13e09920dc789cad5b4601a9526ef9c0242520a22579385ede9a91c1480c936c35f55aed6bb0deca570a7e932101c0',
    hashAfterSign: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
}

// normal tx
export const txInfo = {
    txConfig: {
        chainID,
        version: 1,
        type: LemoTx.TxType.ORDINARY,
        to: 'Lemo846Q4NQCKJ2YWY6GHTSQHC7K24JDC7CPCWYH',
        toName: 'aa',
        gasPrice: 2,
        gasLimit: 100,
        amount: 1,
        data: '0x0c',
        expirationTime: 1544584596,
        message: 'aaa',
        from: testAddr,
    },
    rlp: '0xf841800181c8940107134b9cdd7d89f83efa6175f9b3552f29094c809401eb5f2b936e3eb97a44c52d5abb913f8895444e8261610264010c845c107d9483616161c0c0',
    hash: '0x9b75edb11e574e926c942d833a89ba9aa98e54a9b3ff804e89fc34a77229e1be',
    rlpAfterSign:
        '0xf885800181c8940107134b9cdd7d89f83efa6175f9b3552f29094c809401eb5f2b936e3eb97a44c52d5abb913f8895444e8261610264010c845c107d9483616161f843b841a72ae161234fc1dcced99098d3b988a31bb116669d271eb0d4c90e414ef8f1b455a34d58b1d97ca9ee67d521510238db909e9873a62b47f55c772a6ec657cd7901c0',
    hashAfterSign: '0xe71cd6d98b1e48ddccf36ed655700478971a8514abf7c4d2173512201222c6c0',
    gasAfterSign: ['0x09e3b3bd71f3ebe0bc0e845fece6d6d98c43b206346290f02375564647710f9b030c360a9b00d0d1734124e2b0f694b06251e532342b2329638580ffe5d9f79400'],
}

// big tx
export const bigTxInfo = {
    txConfig: {
        chainID,
        version: 1,
        type: LemoTx.TxType.ORDINARY,
        to: 'Lemo837J796DDHYTQTRTQDT7B4QJJ9B6H559BCCT',
        toName: bigString,
        gasPrice: bigNum,
        gasLimit: 100,
        amount: bigNum,
        data: bigData,
        expirationTime: 1544584596,
        message: bigString,
        from: testAddr,
    },
    rlp:
        '0xf8fa800181c8940107134b9cdd7d89f83efa6175f9b3552f29094c809401118d0d17e3640b7123443594ce7619ea36ec57b83c3838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838389e111111111111111111111111111111111111111111111111111111111111649e111111111111111111111111111111111111111111111111111111111111884949494949494949845c107d94b83c383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838c0c0',
    hash: '0x03231e79473b1d744e8697f6f5e223fc60244da6073dae5b2f34bf4a90faa833',
    rlpAfterSign:
        '0xf9013e800181c8940107134b9cdd7d89f83efa6175f9b3552f29094c809401118d0d17e3640b7123443594ce7619ea36ec57b83c3838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838389e111111111111111111111111111111111111111111111111111111111111649e111111111111111111111111111111111111111111111111111111111111884949494949494949845c107d94b83c383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838f843b8411070ea970dcf3e261964c467d88566dfdea9694ec621aa1a35962092802dae0643f8eedd8f491a18650e7b4a19a9caa3595a5c3fcd7a5279b49174e7282823ca00c0',
    hashAfterSign: '0xf488944bfc9ca03cb8bcadc9f0bb33c4738b3d0ea0f834f6732010a44ff70cd9',
}

export const bigTxInfoWithLemoAddr = {
    txConfig: {
        ...bigTxInfo.txConfig,
        to: testAddr,
    },
    rlp:
        '0xf8e4941000000000000000000000000000000000000000b83c3838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838389e111111111111111111111111111111111111111111111111111111111111649e111111111111111111111111111111111111111111111111111111111111884949494949494949845c107d94b83c383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838830200c88080',
    hash: '0x3ca241c27e83d4a3f963870c9f85f28aea38ccaf54038d7807e49bd3326da4ab',
    rlpAfterSign:
        '0xf90124941000000000000000000000000000000000000000b83c3838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838389e111111111111111111111111111111111111111111111111111111111111649e111111111111111111111111111111111111111111111111111111111111884949494949494949845c107d94b83c383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838383838830300c8a0acba6ce994874d7b856d663a7f1d04bc7bf65278d33afb0a7fd8da69f626292aa001e6badf976c360673b71c54ff363bbcb521ae545fec47cb0bf83eb4c83332b6',
    hashAfterSign: '0x1f51f734af4441c7f854437bc621919cef204fd2f86e0a31cddfefe390062b33',
}

//  currentBlock
export const currentBlock = {
    changeLogs: null,
    confirms: null,
    deputyNodes: null,
    events: null,
    header: {
        changeLogRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        deputyRoot: '0x',
        eventBloom:
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        eventRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        extraData: '0x',
        gasLimit: '104795055',
        gasUsed: '0',
        hash: '0xba07c7cbdcfc86b18600f019b2da2b69873292e7ed84e3cf9e23065114d5d1df',
        height: '2',
        miner: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
        parentHash: '0x47a9fa99e6132d330449b563fcd50fe6680082ddba6f7cc7c7586b393e52a8d8',
        signData:
            '0x96b5d799eb886dbb945e62249e0452df40c2b8b22c88642c38e6f8849dbb46f078dcc074a75c1b82cf1227aa57a71e5374b1e6ddff1ce60fb0994c88fe2ce0bc01',
        timestamp: 1541642355,
        transactionRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        versionRoot: '0x8117e9b6e78c6182a504aee2141e44dccd93fa0e8a0defbf77237b3c7fc79536',
    },
    transactions: [
        {
            chainID: '1',
            version: '1',
            type: `${LemoTx.TxType.ORDINARY}`,
            from: 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D',
            to: 'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY',
            toName: 'aa',
            gasPrice: '3000000000',
            gasLimit: '2000000',
            gasUsed: 0,
            amount: '101',
            data: '0x0c',
            expirationTime: '1541649536',
            message: 'aaa',
            sigs:
                ['0xd9a9f9f41ea020185a6480fe6938d776f0a675d89057c071fc890e09742a4dd96edb9d48c9978c2f12fbde0d0445f2ff5f08a448b91469511c663567d0b015f601'],
            hash: '0x314f1b9c8585e53446983e68fdbf6642e00e5b58cfde9165fdec051cfb21d157',
        },
    ],
}
export const formattedCurrentBlock = {
    ...currentBlock,
    changeLogs: [],
    header: {
        ...currentBlock.header,
        height: 2,
        gasLimit: 104795055,
        gasUsed: 0,
        timestamp: 1541642355,
    },
    transactions: [
        {
            ...currentBlock.transactions[0],
            gasPrice: '3000000000',
            gasLimit: 2000000,
            amount: '101',
            expirationTime: 1541649536,
            type: LemoTx.TxType.ORDINARY,
            parsedData: undefined,
            version: 1,
        },
    ],
}

export const block1 = {
    header: {
        parentHash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
        miner: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
        versionRoot: '0x8117e9b6e78c6182a504aee2141e44dccd93fa0e8a0defbf77237b3c7fc79536',
        transactionRoot: '0x94ad0a9869cb6418f6a67df76d1293b557adb567ca3d29bfc8d8ff0d5f4ac2de',
        changeLogRoot: '0x28f0c4c240375ff1c4cd4e8d6a47a351df4f2aca7447d7c836b15e7808383fe2',
        eventRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        eventBloom:
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        height: '1',
        gasLimit: '104897462',
        gasUsed: '21000',
        timestamp: '1541642352',
        signData:
            '0x3086eaf0bb4823423d99bda2f7ded2eeeb3287f6521931ff154b30840ed91ca35371b661e37fe20067c39dfa9ce6042c82b90c46b1418961922bc7e79affa3d800',
        deputyRoot: '0x',
        extraData: '0x',
        hash: '0x47a9fa99e6132d330449b563fcd50fe6680082ddba6f7cc7c7586b393e52a8d8',
    },
    transactions: [
        {
            chainID: '1',
            version: '1',
            type: `${LemoTx.TxType.ORDINARY}`,
            from: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
            to: 'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY',
            toName: '',
            gasPrice: '3000000000',
            gasLimit: '2000000',
            gasUsed: 0,
            amount: '100',
            data: '0x',
            expirationTime: '1541649535',
            message: '',
            sigs:
                ['0x800be6a0cf31ab9e86d547fb8cf964339276233a2b260ad8a4b4c93b39a48d6b1761e125f601bc6953e30eaad3e698c12add332a5740f1618915c12432dc610601'],
            hash: '0x94ad0a9869cb6418f6a67df76d1293b557adb567ca3d29bfc8d8ff0d5f4ac2de',
        },
    ],
    changeLogs: [
        {
            type: `${LemoTx.TxType.ORDINARY}`,
            address: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
            version: '2',
            newValue: '0x8c052b7d2dcc8093e1eb610f9c',
            extra: '',
        },
        {
            type: `${LemoTx.TxType.ORDINARY}`,
            address: 'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY',
            version: '1',
            newValue: '0x64',
            extra: '',
        },
        {
            type: `${LemoTx.TxType.ORDINARY}`,
            address: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
            version: '3',
            newValue: '0x8c052b7d2dcc80cd2e3fffff9c',
            extra: '',
        },
    ],
    events: [],
    confirms: [],
    deputyNodes: [],
}

export const formattedBlock1 = {
    ...block1,
    header: {
        ...block1.header,
        height: 1,
        gasLimit: 104897462,
        gasUsed: 21000,
        timestamp: 1541642352,
    },
    transactions: [
        {
            ...block1.transactions[0],
            gasPrice: '3000000000',
            gasLimit: 2000000,
            gasUsed: 0,
            amount: '100',
            expirationTime: 1541649535,
            type: LemoTx.TxType.ORDINARY,
            parsedData: undefined,
            version: 1,
        },
    ],
    changeLogs: [
        {
            ...block1.changeLogs[0],
            type: LemoTx.TxType.ORDINARY,
            version: 2,
        },
        {
            ...block1.changeLogs[1],
            type: LemoTx.TxType.ORDINARY,
            version: 1,
        },
        {
            ...block1.changeLogs[2],
            type: LemoTx.TxType.ORDINARY,
            version: 3,
        },
    ],
}
export const block0 = {
    header: {
        parentHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        miner: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
        versionRoot: '0x1e78c4779248d3d8d3cd9b77bf7b67b4c759ec87d45d52a3e79c928290773f4c',
        transactionRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        changeLogRoot: '0x93273cebb4f0728991811d5d7c57ae8f88a83524eedb0af48b3061ed2e8017b8',
        eventRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        eventBloom:
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        height: '0',
        gasLimit: '105000000',
        gasUsed: '0',
        timestamp: '1535630400',
        signData: '0x',
        deputyRoot: '0xd448943c5cf120118a5b2337b661ff1bc578d6bd89400287fbb82de62ae13933',
        extraData: '0x',
        hash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
    },
    transactions: null,
    changeLogs: null,
    events: null,
    confirms: null,
    deputyNodes: null,
}

export const formattedBlock0 = {
    ...block0,
    header: {
        ...block0.header,
        height: 0,
        gasLimit: 105000000,
        gasUsed: 0,
        timestamp: 1535630400,
    },
}
export const oneChangeLogBlock = {
    header: {
        parentHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        miner: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
        versionRoot: '0x1e78c4779248d3d8d3cd9b77bf7b67b4c759ec87d45d52a3e79c928290773f4c',
        transactionRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        changeLogRoot: '0x93273cebb4f0728991811d5d7c57ae8f88a83524eedb0af48b3061ed2e8017b8',
        eventRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        eventBloom:
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        height: '0',
        gasLimit: '105000000',
        gasUsed: '0',
        timestamp: '1535630400',
        signData: '0x',
        deputyRoot: '0xd448943c5cf120118a5b2337b661ff1bc578d6bd89400287fbb82de62ae13933',
        extraData: '0x',
        hash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
    },
    transactions: [],
    changeLogs: [
        {
            type: `${LemoTx.TxType.VOTE}`,
            address: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
            version: '2',
            newValue: '0x8c052b7d2dcc8093e1eb610f9c',
            extra: '',
        },
    ],
    events: [],
    confirms: [],
    deputyNodes: [
        {
            miner: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
            nodeID:
                '0x5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0',
            ip: '127.0.0.1',
            port: '7001',
            rank: '0',
            votes: '50000',
        },
    ],
}
export const formattedOneChangeLogBlock = {
    ...oneChangeLogBlock,
    header: {
        ...oneChangeLogBlock.header,
        height: 0,
        gasLimit: 105000000,
        gasUsed: 0,
        timestamp: 1535630400,
    },
    changeLogs: [
        {
            ...oneChangeLogBlock.changeLogs[0],
            type: LemoTx.TxType.VOTE,
            version: 2,
        },
    ],
}

export const txInfos = [emptyTxInfo, txInfo, bigTxInfo]

const tx1 = {
    ...emptyTxInfo.txConfig,
    version: '1',
    type: `${LemoTx.TxType.ORDINARY}`,
    toName: '',
    gasPrice: '3000000000',
    gasLimit: '2000000',
    gasUsed: 0,
    amount: '0',
    data: '0x',
    expirationTime: '1544584596',
    message: '',
    sigs: ['0xf642fbc4588fbab945a6db57381fb756221607c96f5519c5f5092ca212b454e7529b1c78da1927bc99d07f0b0f3e18442b6d911ce71a45a6f0da101e84b88e3c01'],
}

const formattedTx1 = {
    ...tx1,
    from: testAddr,
    gasPrice: '3000000000',
    gasLimit: 2000000,
    expirationTime: 1544584596,
    amount: '0',
    type: LemoTx.TxType.ORDINARY,
    parsedData: undefined,
    version: 1,
}

const tx2 = {
    ...txInfo.txConfig,
    version: '1',
    type: `${LemoTx.TxType.ORDINARY}`,
    gasPrice: '2',
    gasPriceText: '2',
    gasLimit: '100',
    gasUsed: 0,
    amountText: '1',
    amount: '1',
    expirationTime: '1544584596',
    sigs: ['0x8c0499083cb3d27bead4f21994aeebf8e75fa11df6bfe01c71cad583fc9a3c70778a437607d072540719a866adb630001fabbfb6b032d1a8dfbffac7daed8f0201'],
}

const formattedTx2 = {
    ...tx2,
    from: testAddr,
    gasPrice: '2',
    gasLimit: 100,
    expirationTime: 1544584596,
    amount: '1',
    type: LemoTx.TxType.ORDINARY,
    parsedData: undefined,
    version: 1,
}

const tx3 = {
    ...bigTxInfo.txConfig,
    version: '1',
    type: `${LemoTx.TxType.ORDINARY}`,
    gasPrice: bigNum,
    gasLimit: '100',
    gasUsed: 10,
    amount: bigNum,
    expirationTime: '1544584596',
    sigs: ['0xacba6ce994874d7b856d663a7f1d04bc7bf65278d33afb0a7fd8da69f626292a01e6badf976c360673b71c54ff363bbcb521ae545fec47cb0bf83eb4c83332b601'],
}

const formattedTx3 = {
    ...tx3,
    from: testAddr,
    gasPrice: '0x111111111111111111111111111111111111111111111111111111111111',
    gasLimit: 100,
    expirationTime: 1544584596,
    amount: '0x111111111111111111111111111111111111111111111111111111111111',
    type: LemoTx.TxType.ORDINARY,
    parsedData: undefined,
    version: 1,
}

export const tx4 = {
    chainID,
    expirationTime: 1544584597,
    from: testAddr,
}

// tx1的回包
export const txRes1 = {
    tx: tx1,
    blockHash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
    height: '100',
    time: '1541649535',
    pHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    assetCode: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
    assetId: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
}
// 经过SDK格式化后的tx1回包
export const formattedTxRes1 = {
    ...formattedTx1,
    blockHeight: 100,
    minedTime: 1541649535,
    pHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockHash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
    assetCode: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
    assetId: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
}

// tx2的回包
export const txRes2 = {
    tx: tx2,
    blockHash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
    height: '100',
    time: '1541649535',
    pHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    assetCode: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
    assetId: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
}
// 经过SDK格式化后的tx2回包
export const formattedTxRes2 = {
    ...formattedTx2,
    blockHeight: 100,
    minedTime: 1541649535,
    pHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockHash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
    assetCode: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
    assetId: '0x1b9ef0086053ca7e41b7b5e5f0db422e4c987a5504f373fed5176635838ca446',
}

// tx3的回包
export const txRes3 = {
    tx: tx3,
    blockHash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
    height: '100',
    time: '1541649535',
    pHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    assetId: '0x8dd85a833c482b4cb24f261e2d5378c14507eb01a92d89eb4a8278302f70cff5',
    assetCode: '0x8dd85a833c482b4cb24f261e2d5378c14507eb01a92d89eb4a8278302f70cff5',
}
// 经过SDK格式化后的tx3回包
export const formattedTxRes3 = {
    ...formattedTx3,
    blockHeight: 100,
    minedTime: 1541649535,
    pHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockHash: '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab',
    assetId: '0x8dd85a833c482b4cb24f261e2d5378c14507eb01a92d89eb4a8278302f70cff5',
    assetCode: '0x8dd85a833c482b4cb24f261e2d5378c14507eb01a92d89eb4a8278302f70cff5',
}

const candidate1 = {
    address: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
    profile: {
        host: '127.0.0.1',
        isCandidate: 'true',
        minerAddress: 'Lemobw',
        nodeID: '0x5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0',
        port: '7001',
    },
    votes: '1599999000000000000000000001',
}

const formattedCandidate1 = {
    ...candidate1,
    profile: {
        ...candidate1.profile,
        isCandidate: true,
        port: '7001',
    },
    votes: '1599999000000000000000000001',
}

const candidate2 = {
    address: 'Lemobw',
    profile: {
        host: 'www.lemochain.com',
        isCandidate: 'true',
        minerAddress: 'Lemobw',
        nodeID: '0x6e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0',
        port: '8080',
    },
    votes: '0',
}

const formattedCandidate2 = {
    ...candidate2,
    profile: {
        ...candidate2.profile,
        isCandidate: true,
        port: '8080',
    },
}

export const candidateList = [candidate1, candidate2]
export const formattedCandidateListRes = {
    candidateList: [formattedCandidate1, formattedCandidate2],
    total: 2,
}

export const deputyNodes = [
    {
        minerAddress: 'Lemo83DZ5J99JSK5ZH89TCW7T6ZZCWJ8H7FDGA7W',
        incomeAddress: 'Lemo83DZ5J99JSK5ZH89TCW7T6ZZCWJ8H7FDGA7W',
        nodeID: '0x0e7dcd418dbe7717eb0e83162f8810a3c7725e0d386b324dc5f3ef5a27a2a83e393a193f6ab53d3a51b490adeee362357676f50eed3d188824ef1fb3af02b2d0',
        rank: '0',
        votes: '50000',
        host: '127.0.0.1',
        port: '8080',
        depositAmount: '5000000000000000000000000',
        introduction: 'ddf',
        p2pUri: '0e7dcd418dbe7717eb0e83162f8810a3c7725e0d386b324dc5f3ef5a27a2a83e393a193f6ab53d3a51b490adeee362357676f50eed3d188824ef1fb3af02b2d0@127.0.0.1:8080',
    },
]
export const formattedDeputyNodes = [
    {
        ...deputyNodes[0],
        rank: 0,
        port: 8080,
    },
]

export const equitiesResList = [{
    assetCode: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    assetId: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    equity: '1',
}, {
    assetCode: '0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76528a',
    assetId: '0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76528a',
    equity: '100000000000020000000000019',
}]

export const formattedEquities = equitiesResList

export const creatAsset = {
    assetCode: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    category: 1,
    isDivisible: true,
    decimal: 18,
    totalSupply: '15000000000000000000',
    isReplenishable: true,
    issuer: 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D',
    profile: {
        name: 'Demo Asset',
        symbol: 'DT',
        description: 'demo asset',
        suggestedGasLimit: '60000',
    },
}

export const creatAsset1 = {
    ...creatAsset,
    assetCode: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced6684',
    category: 2,
    totalSupply: '1000000000000000000011000',
    issuer: 'Lemo83GWNWJQ3DQFN6F24WFZF5TGQ39A696GJ7Z3',
    profile: {
        name: 'Creat Asset',
        symbol: 'CA',
        description: 'creat asset',
        suggestedGasLimit: '60000',
    },
}

export const assetToken1 = {
    assetId: '0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76528a',
    assetCode: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    owner: 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D',
    metaData: 'This is user-defined data',
}
export const assetToken2 = {
    assetId: '0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76652v',
    assetCode: '0x78d01bf80c705796328167963b0fdc857a4991aa1829fa68a7495d2980771228',
    owner: 'Lemo8498CBCJSY9G7JF4CGZDP64PRRNGP4HQ2QPF',
}

export const termRewardInfo = {
    term: '0',
    value: '1000000000',
    rewardHeight: '10001',
}
export const formattedTermRewardInfo = {
    term: 0,
    value: '1000000000',
    rewardHeight: 10001,
}

// 在txRes1的基础上修改为特殊交易
export const specialTxRes1 = {
    ...txRes1,
    tx: {
        ...txRes1.tx,
        type: `${LemoTx.TxType.CREATE_CONTRACT}`,
        data: '0x000000100000100',
    },
}
// 在txRes3的基础上修改为特殊交易
export const specialTxRes2 = {
    ...txRes2,
    tx: {
        ...txRes2.tx,
        type: `${LemoTx.TxType.VOTE}`,
    },
}
// 在txRes3的基础上修改为特殊交易
export const specialTxRes3 = {
    ...txRes3,
    tx: {
        ...txRes3.tx,
        type: `${LemoTx.TxType.BOX_TX}`,
        data: '0x7b2273756254784c697374223a5b7b2274797065223a2230222c2276657273696f6e223a2231222c22636861696e4944223a22313030222c2266726f6d223a224c656d6f3833474e3732475948324e5a3842413732395a39544354374b5135464333435236444a47222c226761735061796572223a6e756c6c2c22746f223a224c656d6f38334a57375442504137503250364152395a43325743514a59524e485a344e4a44344359222c22746f4e616d65223a22222c226761735072696365223a2233303030303030303030222c226761734c696d6974223a2232303030303030222c2267617355736564223a223231303030222c22616d6f756e74223a2235303030303030303030303030303030303030222c2264617461223a223078222c2265787069726174696f6e54696d65223a2231353733353239353139222c226d657373616765223a22222c2273696773223a5b22307836306330386431373735623536393465656134633130326462333330666636303638303861323136646366323862343433346661616432303865346537653761343930386130323164303766306332396630616365313932306133643666316366363961646264346364653030616261366465636537323562323835333339313031225d2c2268617368223a22307863633232343535663833663130666664333864393862636265393161313066626366616130333437653737383935346264653966613833616236343635396635222c22676173506179657253696773223a5b5d7d5d7d',
    },
}

// 在formattedTxRes1的基础上修改为特殊交易
export const formattedSpecialTxRes1 = {
    ...formattedTxRes1,
    type: LemoTx.TxType.CREATE_CONTRACT,
    data: '0x000000100000100',
}
// 在formattedTxRes3的基础上修改为特殊交易
export const formattedSpecialTxRes2 = {
    ...formattedTxRes2,
    type: LemoTx.TxType.VOTE,
}
// 在formattedTxRes3的基础上修改为特殊交易
export const formattedSpecialTxRes3 = {
    ...formattedTxRes3,
    type: LemoTx.TxType.BOX_TX,
    data: '0x7b2273756254784c697374223a5b7b2274797065223a2230222c2276657273696f6e223a2231222c22636861696e4944223a22313030222c2266726f6d223a224c656d6f3833474e3732475948324e5a3842413732395a39544354374b5135464333435236444a47222c226761735061796572223a6e756c6c2c22746f223a224c656d6f38334a57375442504137503250364152395a43325743514a59524e485a344e4a44344359222c22746f4e616d65223a22222c226761735072696365223a2233303030303030303030222c226761734c696d6974223a2232303030303030222c2267617355736564223a223231303030222c22616d6f756e74223a2235303030303030303030303030303030303030222c2264617461223a223078222c2265787069726174696f6e54696d65223a2231353733353239353139222c226d657373616765223a22222c2273696773223a5b22307836306330386431373735623536393465656134633130326462333330666636303638303861323136646366323862343433346661616432303865346537653761343930386130323164303766306332396630616365313932306133643666316366363961646264346364653030616261366465636537323562323835333339313031225d2c2268617368223a22307863633232343535663833663130666664333864393862636265393161313066626366616130333437653737383935346264653966613833616236343635396635222c22676173506179657253696773223a5b5d7d5d7d',
    parsedData: [
        {
            amount: '5000000000000000000',
            chainID: '100',
            data: '0x',
            expirationTime: 1573529519,
            from: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
            gasLimit: 2000000,
            gasPayer: null,
            gasPayerSigs: [],
            gasPrice: '3000000000',
            gasUsed: 21000,
            hash: '0xcc22455f83f10ffd38d98bcbe91a10fbcfaa0347e778954bde9fa83ab64659f5',
            message: '',
            parsedData: undefined,
            sigs: [
                '0x60c08d1775b5694eea4c102db330ff606808a216dcf28b4434faad208e4e7e7a4908a021d07f0c29f0ace1920a3d6f1cf69adbd4cde00aba6dece725b285339101',
            ],
            to: 'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY',
            toName: '',
            type: 0,
            version: 1,
        },
    ],
}

export const RewardValue = {
    term: '1',
    value: '1000000001',
    times: '0',
}


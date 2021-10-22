const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.getLatestTransaction = async (ctx) => {
    let response;
    let latestBlock;

    await web3.eth.getBlock('latest', true, () => { })
        .then(value => {
            latestBlock = JSON.parse(JSON.stringify(value));
        });

    const transactionsCount = latestBlock.transactions.length - 1; // last TX
    const blockNumber = latestBlock.number;

    await web3.eth.getTransactionFromBlock(blockNumber, transactionsCount).then(value => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
};

exports.getPendingTransactions = async (ctx) => {
    let response = {};

    await web3.eth.getPendingTransactions().then((value) => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
};

exports.getAddressTxCount = async (ctx) => {
    let response = {};

    const address = ctx.params.address;

    if (address === null || !address.startsWith('0x')) {
        return "Invalid address.";
    }

    await web3.eth.getTransactionCount(address).then((value) => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
};

exports.getTransactionByHash = async (ctx) => {
    let response = {};

    const hash = ctx.params.hash;

    if (hash === null || !hash.startsWith('0x')) {
        return "Invalid hash.";
    }

    await web3.eth.getTransaction(hash).then((value) => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
}
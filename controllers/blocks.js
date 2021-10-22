const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.getLatestBlock = async (ctx) => {
    let response;

    await web3.eth.getBlock('latest', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
};

exports.getPendingBlocks = async (ctx) => {
    let response;

    await web3.eth.getBlock('pending', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
};

exports.getBlockByIdentifier = async (ctx) => {
    const searchArgument = ctx.params.arg;
    let response;

    // block hash starts with 0x; block number is digits only
    if (searchArgument === null ||
        (!searchArgument.startsWith('0x') && isNaN(parseInt(searchArgument)))) {
        return "Invalid path.";
    }

    await web3.eth.getBlock(searchArgument, true, (error, result) => {
    }).then(value => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
};

exports.getMultipleBlocksAfterThreshold = async (ctx) => {
    let response = [];
    let latestBlock;

    const blockNumberFrom = ctx.params.from;
    const count = ctx.params.count;

    if (count <= 0) {
        return "Count cannot be negative.";
    } else if (isNaN(parseInt(blockNumberFrom))) {
        return "Invalid block number.";
    }

    await web3.eth.getBlock('latest', false, (error, result) => { }).then(value => {
        latestBlock = JSON.parse(JSON.stringify(value));
    });

    const startBlockNumber = latestBlock.number - blockNumberFrom; // get latest block number for calculations
    const blockCount = count;

    let fetchedBlocks = [];

    for (let i = startBlockNumber; i >= startBlockNumber - blockCount; i--) {
        await web3.eth.getBlock(i, false, (error, result) => { }).then((value) => {
            fetchedBlocks.push(value);

            if (i == startBlockNumber - blockCount) {
                response = JSON.parse(JSON.stringify(fetchedBlocks));
            }
        });
    }

    return response;
};
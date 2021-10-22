const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.getAccountBalance = async (ctx) => {
    let response;

    const address = ctx.params.address;

    if (address === null || !address.startsWith('0x')){
        return "Invalid address.";
    }

    await web3.eth.getBalance(address).then(value => {
        response = JSON.parse(JSON.stringify(web3.utils.fromWei(value)));
    });

    return response;
}
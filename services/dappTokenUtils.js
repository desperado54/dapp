const config = require('../config');
const Tx = require('ethereumjs-tx');
const {owner, tokenAddress, contract, web3, privateKey} = config;

async function balanceOf(adress) {
    let result = await contract.methods.balanceOf(adress).call();

    return result;
}

async function transfer(from, to, amount) {
    if(from == owner) {
        const nonce = await web3.eth.getTransactionCount(owner, "latest");
        const wei = web3.utils.toWei(amount, 'ether');
        const data = contract.methods.transfer(to, wei).encodeABI()
        const rawTx = {
            gas: web3.utils.toHex(100000),
            to: tokenAddress,
            //'value': "0x00",
            data: data,
            from: owner,
        }

        const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey);
       
        //var transaction = new Tx(rawTx)
        //transaction.sign(privateKey)

        //web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
        //    .on('receipt', console.log);
        web3.eth.sendSignedTransaction(signedTx.rawTransaction) 
             .on('receipt', console.log);
    } else {

    }
}

module.exports = {
    balanceOf,
    transfer
};
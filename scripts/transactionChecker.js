const config = require('../config');
const {owner, tokenAddress, contract, web3, privateKey} = config;

class TransactionChecker {
    web3;
    account;

    constructor(web3,account) {
        this.web3 = web3;
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        let number = block.number;
        //console.log('Searching block ' + number);

        if (block != null && block.transactions != null) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                if (this.account.toLowerCase() == tx.to.toLowerCase()) {
                    console.log(tx);
                    //console.log('Transaction found on block: ' + number);
                    //console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                }
            }
        }
    }
}

let txChecker = new TransactionChecker(web3, '0x71B50b1a7eb00D52c4fDAa0e0F1Ac9701676f17c');
setInterval(() => {
    txChecker.checkBlock();
}, 15 * 1000);
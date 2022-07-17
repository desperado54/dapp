// ws local ganache

const abiFile = require('../build/contracts/ERC20.json');
const Web3 = require('web3')

class TransactionChecker {
    web3;
    web3ws;
    account;
    contract;
    subscription;

    constructor(account, contract) {
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        this.account = account.toLowerCase();
        this.contract = contract.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions...');
        this.subscription.on('data', (txHash) => {
            console.log(txHash);
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                        if (this.account == tx.to.toLowerCase()) {
                            console.log({type: "eth transfer", address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                        } 
                        if(this.contract == tx.to.toLowerCase()) {
                            //decode input
                            
                            //this.web3.eth.abi.decodeParameter(abiFile.abi, tx.input)
                            console.log(tx);
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 5000)
        });
    }
}

let txChecker = new TransactionChecker('0x71B50b1a7eb00D52c4fDAa0e0F1Ac9701676f17c','0xa92644E4A23cc3E57a4a980E350DB57d595c50cC');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();
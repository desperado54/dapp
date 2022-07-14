const Web3 = require('web3')
    
const abiFile=require('./build/contracts/ERC20.json');
const infuraURL = 'https://rinkeby.infura.io/v3/05c4205740d347d9bf0e30b77b2ac960';

const to='0x26bdf75C1A3559060B10206AC99Af5A6dAb2aA03';

const web3 = new Web3(new Web3.providers.HttpProvider(infuraURL));

const tokenAddress=abiFile.networks['4'].address; 

const contract = new web3.eth.Contract(abiFile.abi, tokenAddress);


const privateKey='e0a2afdfea4ede6ea5ce1ac3f6807fa9205234c09056de89bb9901d51a1070df';

const data = contract.methods.transfer(to, '10000000000000000000').encodeABI();

const send = async() => {

    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    console.log(from);

    const rawTransaction = {
        //'from': owner,
        //'nonce': web3.utils.toHex(web3.eth.getTransactionCount(from)),
        'gas': web3.utils.toHex("2100000"),
        'gasPrice': web3.utils.toHex('20000000000'),
        'to': tokenAddress,
        'value': '0x00',
        'data': data
        //'chainId': web3.utils.toHex(chainId)
      };
    
    const signedTx = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
    
    console.log(signedTx);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .once('receipt', function(receipt){ console.log("receipt", receipt) })}

send();
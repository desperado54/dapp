const Web3 = require('web3')
    
const tokenAddress='0xAaD158C41620B5607642b5c275E43cbFcB7872CA'; 
const abiFile=require('./build/contracts/ERC20.json');
const infuraURL = 'http://localhost:7545';

const to='0x39e3bcDed88A0F7EE7DFD0D91adF71CdC918CbC7';

const web3 = new Web3(infuraURL);

const contract = new web3.eth.Contract(abiFile.abi, abiFile.networks['5777'].address);

const privateKey='d6c40dc480dddb4a8d97f83119bd64fdb49efc7ce421d2de58671db0a5de10ae';

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
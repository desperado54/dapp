const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const decoder=require('../utils/abiExtractor')
const abiFile = require('../build/contracts/ERC20.json');

mc= {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": '0xa9059cbb'
  };

  input='0xa9059cbb00000000000000000000000071b50b1a7eb00d52c4fdaa0e0f1ac9701676f17c0000000000000000000000000000000000000000000000004563918244f40000'

r = decoder.decodeParams(web3, input, mc)
console.log(r)
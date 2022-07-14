const fs = require('fs');
const path = require("path");
const Provider = require('@truffle/hdwallet-provider');

const Web3 = require('web3')
    
//const tokenAddress='0x46066Ebc06c7d01f75E242F571aD14449CEb433A' //goerli
//const tokenAddress='0xe3ECD1852f8D50829E7ec3aAced2a98cfB96691b' //rinkeby
const tokenAddress='0xAaD158C41620B5607642b5c275E43cbFcB7872CA'; //ganache
const ownerAddress='0x734D25beb8c90DB557f330a756cf224866C67547'
const contractABI=require('./build/contracts/ERC20.json');
const infuraURL = 'http://localhost:7545';
const privateKey = 'e0a2afdfea4ede6ea5ce1ac3f6807fa9205234c09056de89bb9901d51a1070df';

const web3js = new Web3(new Web3.providers.HttpProvider(infuraURL));

//const provider = new Provider('e0a2afdfea4ede6ea5ce1ac3f6807fa9205234c09056de89bb9901d51a1070df', infuraURL); 
//const web3js = new Web3(provider);
const contract = new web3js.eth.Contract(contractABI, tokenAddress);


function buildConfig(argv) {

    let config = {
    'serviceName': argv.service,
    'port': argv.port,
    'https': {
        'key': argv.key ,
        'cert': argv.cert,
    }, 
    'web3': web3js,
    'chainId' : 4,
    'contract': contract,
    'owner': ownerAddress,
    'tokenAddress': tokenAddress,
    'privateKey': privateKey
    };

    console.log('loading.........')
    config.isHttps = isHttps(config);
    if(config.isHttps) {
        config = loadCertificateFiles(config);
    }
    return config;
}

function isHttps(config) {
    return config.https.key>'' && config.https.cert>''
}

function loadCertificateFiles(config) {
    // load https certs file content
    if (config && config.https) {
        ['key', 'cert'].forEach(key => {
        if (config.https[key]) {
            let file = config.https[key];
            config.https[key] = fs.readFileSync(file);
        }
        });
    }
    return config;
};

function validateParams (argv) {
    let isValid = true;
    const serviceName=argv.s;

    if((argv.p==='' || !argv.p) && isValid) {
        isValid = false;
        process.stderr.write(`[${serviceName}] port configuration is missing\n`);
    }

    if( ( (argv.k==='' && argv.c>'') || (argv.k>'' && argv.c==='') ) && isValid) {
        isValid = false;
        process.stderr.write(`[${serviceName}] https configuration is missing\n`);
    }

    if(!isValid) {
        process.stderr.write(`[${serviceName}] is failed to start, error:\n`);
        process.exit(1);
        return false;
    }

    return true;
}

function setUpParams() {
    var argv = require('yargs')
    .usage('Usage: $0 [options]')
    .option('s', {
    alias: 'service',
    description: 'service-for path',
    default: 'sample-node-api'
    })
    .option('p', {
    alias: 'port',
    description: 'listening port',
    default: 18000
    })
    .option('k', {
    alias: 'key',
    default: '',
    description: 'server key'
    })
    .option('c', {
    alias: 'cert',
    default: '',
    description: 'server cert',
    })
    .option('v', {
    alias: 'verbose',
    default: false,
    description: 'show request logs',
        type: 'boolean'
        })
        .help('h')
        .alias('h', 'help')
        .check(validateParams)
        .argv;

        return argv;
}

function buildConfigFromParams() {
    let argv = setUpParams();
    let config = buildConfig(argv);
    return config;
}

const config = buildConfigFromParams();

module.exports = config;
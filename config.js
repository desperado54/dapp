const fs = require('fs');
const path = require("path");
const Provider = require('@truffle/hdwallet-provider');
const env = require('./env-local.json');

const Web3 = require('web3')
const abiFile = require(env.abiFile);

var web3;
if(env.local) {
    web3 = new Web3(env.providerUrl);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(env.providerUrl));
}

const tokenAddress=abiFile.networks[env.networkId].address; 

const contract = new web3.eth.Contract(abiFile.abi, tokenAddress);

function buildConfig(argv) {

    let config = {
    'serviceName': argv.service,
    'port': argv.port,
    'https': {
        'key': argv.key ,
        'cert': argv.cert,
    }, 
    'web3': web3,
    'contract': contract,
    'owner': env.tokenOwner,
    'tokenAddress': tokenAddress,
    'privateKey': env.privateKey
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
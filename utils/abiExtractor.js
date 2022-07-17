const decodeParams = function (web3,input, func_abi) {
    var types = func_abi.inputs.map(x=>x.internalType);
    console.log(types);
    var _d = "0x"+input.replace(func_abi.signature,"");
    var names = func_abi.inputs.map(x=>x.name);
    var r = web3.eth.abi.decodeParameters(types, _d);
    var dic = {}
    for(var i=0; i<names.length; i++){
        dic[names[i]] = r[i];
    }
    return dic
}

module.exports= {decodeParams};

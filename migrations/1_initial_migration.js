const contract = artifacts.require("GameToken");

// module.exports = function (deployer) {
//   deployer.deploy(contract,'ERC20','DAPT','80000000000000000000000');
// };

module.exports = function (deployer) {
    deployer.deploy(contract);
};
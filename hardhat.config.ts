import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import 'dotenv/config';

/**
* @type import('hardhat/config').HardhatUserConfig
*/
export default {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

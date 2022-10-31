import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "./tasks"

const {PRIVATE_KEY, COINMARKETCAP_API , ETHERSCAN_API_KEYS, RPC_URLS} = require("./.env.json")

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: RPC_URLS.goerli,
      accounts: [PRIVATE_KEY],
    },
    polygonMumbai:{
      url:RPC_URLS.polygonMumbai,
      accounts: [PRIVATE_KEY]
    },
    polygon:{
      url:RPC_URLS.polygon,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEYS
  },
  gasReporter: {
    coinmarketcap: COINMARKETCAP_API,
    // token: 'ETH',
    // gasPriceApi: 'ETH'
  }
};

export default config;

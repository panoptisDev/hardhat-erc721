# HARDHAT-ERC721

This project is an example on how to use hardhat to deploy ERC721 tokens.
This project includes:

- An NFT Contract
- A script to deploy it
- Some tests for the NFT
- Hardhat tasks to deploy, mint, and update the base URI.

## Steps

- Clone the repo.
- Rename example.env.json to .env.json and fill the variables.
- install dependencies using npm install

## commands

### deploy

```bash
#compiles NFT.sol
npx hardhat compile
#deploy NFT.sol
yarn deploy --baseuri <yorurl> --network <network_name>
#or
npx hardhat deploy-nft --baseuri <yorurl> --network <network_name>
```

### util

```bash
#mints a token
npx hardhat mint-token --address <contract_address> --network <network_name>
#updates baseURI
npx hardhat set-baseuri --baseuri <yorurl> --address <contract_address> --network <network_name>
```

### testing

```bash
#runs all tests under test folder
npx hardhat test
#run test for NFT and enables gas reporter
yarn test
```

import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

task("mint-token", "Mint a NFT token")
    .addParam("address", "nft contract address")
    .setAction(async (taskArgs, hre) => {
        const { ethers } = hre;
        const { address } = taskArgs;
        const [signer,] = await ethers.getSigners();
        const contract = await ethers.getContractAt("NFT", address);
        let tokenId = await contract.totalSupply();
        const tx = await contract.safeMint(signer.address);
        await tx.wait();
        console.log(`Minted token ${tokenId.toString()} to ${signer.address}`);
    })

task("deploy-nft", "Deploy an NFT")
    .addParam("baseuri", "external URI for NFT Metadata")
    .setAction(async (taskArgs, hre) => {
        const { ethers } = hre;
        const baseURI = taskArgs.baseuri;
        const [signer,] = await ethers.getSigners();
        const balancePrevious = ethers.utils.formatEther((await signer.getBalance()).toString());
        console.log(`Deploying NFT using address ${signer.address} with balance ${balancePrevious} ETH`)
        const NFT = await ethers.getContractFactory("NFT");
        const nft = await NFT.deploy(baseURI);
        await nft.deployed();
        console.log(`NFT deployed to ${nft.address}`);
    });

task("set-baseuri", "Change the baseURI of an NFT address")
    .addParam("address", "nft contract address")
    .addParam("baseuri", "external URI for NFT Metadata")
    .setAction(async (taskArgs, hre) => {
        const { address, baseuri } = taskArgs;
        const { ethers } = hre;
        const contract = await ethers.getContractAt("NFT", address);
        const previousURI = await contract.baseURI();
        const tx = await contract.updateBaseURI(baseuri)
        console.log(`Tx sent ${tx.hash}`)
        await tx.wait();
        console.log(`BaseURI changed from\n${previousURI}\nto\n${baseuri}`);
    });
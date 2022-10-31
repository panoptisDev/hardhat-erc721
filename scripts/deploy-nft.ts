import { ethers } from "hardhat";

async function main() {
  console.log(process.argv);
  const [signer, otherAccount] = await ethers.getSigners()
  const balancePrevious = ethers.utils.formatEther((await signer.getBalance()).toString()) ;
  console.log(`Deploying NFT using address ${signer.address} with balance ${balancePrevious} ETH`)
  const baseURI = "ipfs://bafybeidecnogeblj74qvzs34dvmnk7fkkggvotzm3ohfd3l5cn2envja6e/metadata/";
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(baseURI);

  await nft.deployed();

  console.log(`NFT deployed to ${nft.address}`);
  
  
  const tx = await nft.safeMint(signer.address);
  await tx.wait()
  console.log(`Minted tokenId 0 to ${signer.address}`)
  await nft.safeMint(signer.address);
  await tx.wait()
  console.log(`Minted tokenId 1 to ${signer.address}`)
  await nft.safeMint(signer.address);
  console.log(`Minted tokenId 2 to ${signer.address}`)
  await tx.wait()
  const currentBalance = ethers.utils.formatEther((await signer.getBalance()).toString());
  console.log(`Current balance of ${signer.address}: ${currentBalance} ETH`)

  let tokenUri = await nft.tokenURI(0);
  console.log(tokenUri);

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

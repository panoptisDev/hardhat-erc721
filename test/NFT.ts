import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNFTLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const baseURI = "ipfs://bafybeic6tciim675zupwipx6ju7vdpqisxiq3iurxgpqn42rhg6pkoms2y/";
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(baseURI);
    await nft.deployed();

    await nft.safeMint(owner.address);
    await nft.safeMint(owner.address);
    await nft.safeMint(owner.address);

    return { nft, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { nft, owner } = await loadFixture(deployNFTLockFixture);

      expect(await nft.owner()).to.equal(owner.address);
    });

    it("Should mint 3 NFT", async function () {
      const { nft , owner} = await loadFixture(
        deployNFTLockFixture
      );
      expect(await nft.balanceOf(owner.address)).to.equal(3);      
    });    
  });

  describe("Security", () => {
    it("Only owner can mint", async () => {
      const { nft , owner, otherAccount} = await loadFixture(deployNFTLockFixture);      
      await expect(nft.connect(otherAccount).safeMint(otherAccount.address)).to.be.reverted;
    });
    it("Only owner can update baseURI", async () => {
      const { nft , owner, otherAccount} = await loadFixture(deployNFTLockFixture);      
      await expect(nft.connect(otherAccount).updateBaseURI("bad ipfs url")).to.be.reverted;
    });
  });
});

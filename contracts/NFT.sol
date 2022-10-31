// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
    // base uri for the token metadata, will be concatenated along the token id. Example: ipfs://blablabla/0
    string public baseURI;
    uint tokenIdIndex = 0;

    constructor(string memory baseURI_ ) ERC721("TestNFT", "tNFT") {
        baseURI = baseURI_;
    }

    function safeMint(address to) public onlyOwner
    {        
        uint currentIndex = tokenIdIndex;
        _safeMint(to, currentIndex);  
        tokenIdIndex++;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }         

    function updateBaseURI(string memory newBaseURI) public onlyOwner{
        baseURI = newBaseURI;
    }
}

contract NFTWithConstructorArgs is ERC721Enumerable, Ownable{
        // base uri for the token metadata, will be concatenated along the token id. Example: ipfs://blablabla/0
    string public baseURI;    
    uint tokenIdIndex = 0;

    constructor(string memory name_, string memory symbol_ , string memory baseURI_ ) ERC721(name_, symbol_) {
        baseURI = baseURI_;
    }

    function safeMint(address to)
        public
        onlyOwner
    {        
        uint currentIndex = tokenIdIndex;
        _safeMint(to, currentIndex);  
        tokenIdIndex++;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }         

    function updateBaseURI(string memory newBaseURI) public onlyOwner{
        baseURI = newBaseURI;
    }
}
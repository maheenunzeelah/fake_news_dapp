const NewsStorage = artifacts.require("News.sol");

module.exports = function (deployer,network,accounts) {
  deployer.deploy(NewsStorage,{from:accounts[0]});
  deployer.deploy(NewsStorage,{from:accounts[1]});
  deployer.deploy(NewsStorage,{from:accounts[2]});
  deployer.deploy(NewsStorage,{from:accounts[3]});
};

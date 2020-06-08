const CampaignGenerator = artifacts.require("CampaignGenerator");

const adminAccount = "";
module.exports = function(deployer) {
  deployer.deploy(CampaignGenerator, adminAccount);
};

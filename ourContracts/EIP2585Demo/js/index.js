var Web3 = require("web3");
var Biconomy = require("@biconomy/mexa");
const { config } = require("./config");
let sigUtil = require("eth-sig-util");
var web3;
var contract;
var erc20Contract;
var biconomy;

const domainTypeEIP2585 = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
];
const MetaTransactionType = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "chainId", type: "uint256" },
  { name: "replayProtection", type: "address" },
  { name: "nonce", type: "bytes" },
  { name: "data", type: "bytes" },
  { name: "innerMessageHash", type: "bytes32" },
];
const domainData = {
  name: "Forwarder",
  version: "1",
};

const forwarderEIP2585 = async function (_data) {
  var EIP712ForwarderContract = new web3.eth.Contract(
    config.contract.EIP712forwarderABI,
    config.address.EIP712forwarderAddress
  );
  signer = ethereum.selectedAddress;
  var from = signer;
  var to = config.address.campaignGeneratorAddress;
  var value = 0;
  var chainId = await web3.eth.net.getId();
  var replayProtection = config.address.EIP712forwarderAddress;
  console.log("chainID" + chainId);
  var batchId = 0;
  var batchNonce = await EIP712ForwarderContract.methods
    .getNonce(signer, batchId)
    .call();
  var value1 = batchId * Math.pow(2, 128) + batchNonce;
  var valueBn = new web3.utils.BN(value1);
  var nonce = await web3.eth.abi.encodeParameter("uint256", valueBn);
  // var decoded = await web3.eth.abi.decodeParameter("uint256", nonce);
  // console.log(decoded);
  var data = _data;
  var innerMessageHash =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  var forwardMessage = {
    from: from,
    to: to,
    value: 0,
    chainId,
    replayProtection: replayProtection,
    nonce: nonce,
    data,
    innerMessageHash: innerMessageHash,
  };
  var signatureData = {
    types: {
      EIP712Domain: domainTypeEIP2585,
      MetaTransaction: MetaTransactionType,
    },
    domain: domainData,
    primaryType: "MetaTransaction",
    message: forwardMessage,
  };
  console.log(signatureData);
  var sigString = JSON.stringify(signatureData);
  web3.providers.HttpProvider.prototype.sendAsync =
    web3.providers.HttpProvider.prototype.send;

  web3.currentProvider.sendAsync(
    {
      method: "eth_signTypedData_v4",
      params: [signer, sigString],
      from: signer,
    },
    function (err, result) {
      if (err) {
        return console.error(err);
      }

      var signatureType = {
        SignatureType: 0,
      };
      console.log(forwardMessage);
      // var signatureType = 2;
      const signature = result.result;
      console.log(signature);

      let tx = EIP712ForwarderContract.methods
        .forward(forwardMessage, 0, signature)
        .send({ from: signer }, (err, res) => {
          if (err) console.log(err);
          else console.log(res);
        });

      tx.on("transactionHash", function (hash) {
        console.log(`Transaction hash is ${hash}`);
      }).once("confirmation", function (confirmationNumber, receipt) {
        console.log(receipt);
      });
    }
  );
};

const connectWallet = async function () {
  if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
    // Ethereum user detected. You can now use the provider.
    const provider = window["ethereum"];
    let accounts = await provider.enable();
    console.log(provider.networkVersion);
    var _chainId = provider.networkVersion;

    //var chainId = parseInt(_chainId);
    console.log(_chainId);
    web3 = new Web3(provider);

    // biconomy = new Biconomy(window.ethereum, {
    //   apiKey: "Q34QBan9O.1fb12039-9bbe-45d2-a1f9-22cbb2636fe9",
    //   debug: "true",
    // });
    // web3 = new Web3(biconomy);
    // biconomy
    //   .onEvent(biconomy.READY, async () => {
    //     console.log("hello");
    //     //await justTrying();
    //   })
    //   .onEvent(biconomy.ERROR, (error, message) => {
    //     console.log(error);
    //   });

    contract = new web3.eth.Contract(
      config.contract.campaignGeneratorABI,
      config.address.campaignGeneratorAddress
    );

    //console.log(await contract.methods.getQuote().call());
  } else {
    alert("Install meatamask first:  https://metamask.io/ ");
  }
};

const getNow = async function () {
  var latestBlock = await web3.eth.getBlock("latest");
  var now = latestBlock.timestamp;
  return parseInt(now);
};

const makeCordinator = async function () {
  await connectWallet();
  var makeCordinatorABI = contract.methods
    .makeCoordinator("0xd2D23c14F42B5B8d6FDe73dD4a5df4d2539970e3")
    .encodeABI();
  forwarderEIP2585(makeCordinatorABI);
};
// init();

var moduleTry = { connectWallet, makeCordinator };
module.exports = moduleTry;

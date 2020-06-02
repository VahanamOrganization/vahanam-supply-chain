let config = {};

config.address = {
  //addresses
  campaignGeneratorAddress: "0xd7b1eB9D6f65cf114e3Fa039Ef5BAEc73A1169bb",
  EIP712forwarderAddress: "0xe314Aa0Db4dF0043Fa1E494E869c35263e2bA893",
};

//add routerABI and ForwarderAbi
config.contract = {
  EIP712forwarderABI: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_chainId",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      constant: true,
      inputs: [],
      name: "chainId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "chainId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "replayProtection",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "nonce",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
            {
              internalType: "bytes32",
              name: "innerMessageHash",
              type: "bytes32",
            },
          ],
          internalType: "struct Forwarder.Message",
          name: "message",
          type: "tuple",
        },
        {
          internalType: "enum Forwarder.SignatureType",
          name: "signatureType",
          type: "uint8",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "forward",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          internalType: "struct EIP712Forwarder.Call[]",
          name: "calls",
          type: "tuple[]",
        },
      ],
      name: "batch",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "signer",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "nonce",
          type: "bytes",
        },
      ],
      name: "checkAndUpdateNonce",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "signer",
          type: "address",
        },
        {
          internalType: "uint128",
          name: "batchId",
          type: "uint128",
        },
      ],
      name: "getNonce",
      outputs: [
        {
          internalType: "uint128",
          name: "",
          type: "uint128",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  campaignGeneratorABI: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_admin",
          type: "address",
        },
        {
          internalType: "address",
          name: "_forwarderAdderss",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
      ],
      name: "CampaignStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "branchId",
          type: "uint256",
        },
      ],
      name: "MasksPickedUpByCourier2",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "branchId",
          type: "uint256",
        },
      ],
      name: "MasksRceivedByReceiver",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "branchId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountOfMasksMade",
          type: "uint256",
        },
      ],
      name: "MasksReady",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "branchId",
          type: "uint256",
        },
      ],
      name: "MasksVerifiedForQuality",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "branchId",
          type: "uint256",
        },
      ],
      name: "PLAPacked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "branchId",
          type: "uint256",
        },
      ],
      name: "PLAPickedUpByCourier1",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "branchId",
          type: "uint256",
        },
      ],
      name: "PLARecivedByManufacturer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      inputs: [],
      name: "ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "COORDINATOR_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "COURIER_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "MANUFATURER_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "campaignCounter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "getRoleMember",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleMemberCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_who",
          type: "address",
        },
      ],
      name: "makeCoordinator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_manufacturers",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "_couriers",
          type: "address[]",
        },
        {
          internalType: "address",
          name: "_receiver",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_totalPLA",
          type: "uint256",
        },
      ],
      name: "startCampaign",
      outputs: [
        {
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "_manufacturers",
          type: "address[]",
        },
      ],
      name: "addManufacturers",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "_couriers",
          type: "address[]",
        },
      ],
      name: "addCouriers",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_amountOfPLA",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_amountOfMasksMade",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_tfForDeliveryToManufacturer",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_tfForMakingMasks",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_tfForDeliveryToReciver",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_courier1",
          type: "address",
        },
        {
          internalType: "address",
          name: "_courier2",
          type: "address",
        },
        {
          internalType: "address",
          name: "_manufacturer",
          type: "address",
        },
      ],
      name: "createNewBatch",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_batchId",
          type: "uint256",
        },
      ],
      name: "confirmPLAPickedUpByCourier1",
      outputs: [
        {
          internalType: "bool",
          name: "stageChange",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_batchId",
          type: "uint256",
        },
      ],
      name: "confirmPLARecivedByManufacturer",
      outputs: [
        {
          internalType: "bool",
          name: "stageChange",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_batchId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_amountOfMasksMade",
          type: "uint256",
        },
      ],
      name: "confirmMasksMade",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_batchId",
          type: "uint256",
        },
      ],
      name: "confirmMasksPickedUpByCourier2",
      outputs: [
        {
          internalType: "bool",
          name: "stageChange",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_batchId",
          type: "uint256",
        },
      ],
      name: "confirmMasksRceivedByReceiver",
      outputs: [
        {
          internalType: "bool",
          name: "stageChange",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
      ],
      name: "getCampaignDetalis",
      outputs: [
        {
          internalType: "address",
          name: "coordinator",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "totalPLA",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "manufacturers",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "couriers",
          type: "address[]",
        },
        {
          internalType: "uint256",
          name: "lastOfManufactures",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "lastOfCaouriers",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_batchId",
          type: "uint256",
        },
      ],
      name: "getBatchDetails",
      outputs: [
        {
          components: [
            {
              internalType: "enum Storage.BatchStages",
              name: "stage",
              type: "uint8",
            },
            {
              internalType: "bool",
              name: "isPLAPickedUpCourier1",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "isPLAPickedUpCoordinator",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "isPLARecivedCourier1",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "isPLAReceivedManufacturer",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "isMasksPickedUpCourier2",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "isMasksPickedUpManufacturer",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "isMasksaReceviedCourier2",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "isMasksReceviedReceviver",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "amountOfPLA",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amountOfExpectedMasks",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amountOfMasksMade",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "tfForDeliveryToManufacturer",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "tfForMakingMasks",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "tfForDeliveryToReciver",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "courier1",
              type: "address",
            },
            {
              internalType: "address",
              name: "courier2",
              type: "address",
            },
            {
              internalType: "address",
              name: "manufacturer",
              type: "address",
            },
          ],
          internalType: "struct Storage.Batch",
          name: "batch",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ],
};

module.exports = { config };

# stopcovid19-react

Blockchain-based Supply Chain Tracking System

frontend built using react, redux, web3 & webpack

## Install Dependencies

```
npm install
```

## Run Locally

First the CampaignGenerator contract must be deployed in a local ethereum blockchain.
Then make sure to edit the config file webpack.config.js to give the correct networkId and address for the CampaignGenerator contract. 
The compiled Abi for the contract is at `./src/assets/json/CampaignGenerator.json`, and may be changed to the abi of the latest contract that you deploy.
The following command will start the frontend and serve it on `http://localhost:8080`

```
npm run start
```

## Make Production Build

```
npm run build
```

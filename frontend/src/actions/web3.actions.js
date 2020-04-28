import Web3 from "web3";
import config from "config";
import { history } from "../helpers";
import { alertActions } from "./";
import { web3Constants } from "../constants";
import campaignGenerator from "../assets/contracts/CampaignGenerator.json";

export const web3Actions = {
    load,
    account,
    network,
    loadContract
};

function load() {
    return async dispatch => {
        dispatch(started());
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            let error = "MetaMask not found";
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded(web3));
        dispatch(alertActions.success("Found MetaMask Web3 "));
        return web3;
    };

    function started() {
        return {
            type: web3Constants.CONNECTION_STARTED
        };
    }

    function loaded(connection) {
        return {
            type: web3Constants.CONNECTION_LOADED,
            connection
        };
    }

    function failure(error) {
        return {
            type: web3Constants.CONNECTION_ERROR,
            error
        };
    }
}

function account() {
    return async (dispatch, getState) => {
        dispatch(started());
        let account;
        try {
            const { connection } = getState().web3;
            const accounts = await connection.eth.getAccounts();
            account = accounts[0];
        } catch (e) {
            let error = "Could not load Web3 Account";
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded(account));
        dispatch(alertActions.success("Found Web3 Account"));
        return account;
    };

    function started() {
        return {
            type: web3Constants.ACCOUNT_STARTED
        };
    }

    function loaded(account) {
        return {
            type: web3Constants.ACCOUNT_LOADED,
            account
        };
    }

    function failure(error) {
        return {
            type: web3Constants.ACCOUNT_ERROR,
            error
        };
    }
}

function network() {
    return async (dispatch, getState) => {
        dispatch(started());
        let network;
        try {
            const { connection } = getState().web3;
            network = await connection.eth.net.getId();
        } catch (e) {
            let error = "Could not load Web3 Network";
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded(network));
        dispatch(alertActions.success("Found Correct NetworkID"));
        if (network !== config.networkId) {
            let error = "Incorrect NetworkID, Expecting " + config.networkId;
            dispatch(failure(error));
            dispatch(alertActions.error(error));
        }
        return network;
    };

    function started() {
        return {
            type: web3Constants.NETWORK_STARTED
        };
    }

    function loaded(network) {
        return {
            type: web3Constants.NETWORK_LOADED,
            network
        };
    }

    function failure(error) {
        return {
            type: web3Constants.NETWORK_ERROR,
            error
        };
    }
}

function loadContract() {
    return async (dispatch, getState) => {
        dispatch(started());
        let contract;
        try {
            const { account, connection } = getState().web3;
            contract = await new connection.eth.Contract(
                campaignGenerator["abi"],
                config.contractAddress,
                {
                    from: account
                }
            );
        } catch (e) {
            let error = "Could not load CampaignGenerator Contract";
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded(contract));
        dispatch(alertActions.success("Loaded CampaignGenerator Contract"));
        return contract;
    };

    function started() {
        return {
            type: web3Constants.CONTRACT_STARTED
        };
    }

    function loaded(contract) {
        return {
            type: web3Constants.CONTRACT_LOADED,
            contract
        };
    }

    function failure(error) {
        return {
            type: web3Constants.CONTRACT_ERROR,
            error
        };
    }
}

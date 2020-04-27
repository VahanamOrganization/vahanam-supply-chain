import Web3 from "web3";
import { alertActions } from "./";
import { web3Constants } from "../constants";

export const web3Actions = {
    load,
    account,
    network
};

function load() {
    return async dispatch => {
        dispatch(started());
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            let error = "Metamask not found";
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded(web3));
        dispatch(alertActions.success("Login successful"));
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

const network = async (web3, dispatch) => {
    const network = await web3.eth.net.getNetworkType();
    dispatch(loaded(network));
    return account;

    function loaded(network) {
        return {
            type: web3Constants.NETWORK_LOADED,
            network
        };
    }
};

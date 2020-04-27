import { web3Constants } from "../constants";

export function web3(state = { inProgress: false }, action) {
    switch (action.type) {
        case web3Constants.CONNECTION_STARTED:
            return {
                ...state,
                inProgress: true,
                connection: action.connection
            };
        case web3Constants.CONNECTION_LOADED:
            return {
                ...state,
                inProgress: false,
                connection: action.connection
            };
        case web3Constants.CONNECTION_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };
        case web3Constants.ACCOUNT_STARTED:
            return {
                ...state,
                inProgress: true,
                account: action.account
            };
        case web3Constants.ACCOUNT_LOADED:
            return {
                ...state,
                inProgress: false,
                account: action.account
            };
        case web3Constants.ACCOUNT_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };
        case web3Constants.NETWORK_LOADED:
            return {
                ...state,
                inProgress: false,
                network: action.network
            };
        default:
            return state;
    }
}

import { web3Constants } from "../constants";

export function web3(state = {account: ""}, action) {
    switch (action.type) {
        case web3Constants.WEB3_STARTED:
            return {
                ...state,
                inProgress: true
            };
        case web3Constants.WEB3_LOADED:
            return {
                ...state,
                inProgress: false,
                connected: true,
                ...action
            };
        case web3Constants.WEB3_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };
        default:
            return state;
    }
}

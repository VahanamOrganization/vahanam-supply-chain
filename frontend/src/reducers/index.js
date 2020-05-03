import { combineReducers } from "redux";
import { authConstants } from "../constants";
import { authentication } from "./authentication.reducer";
import { campaigns } from "./campaigns.reducer";
import { alert } from "./alert.reducer";
import { web3 } from "./web3.reducer";
import { qrCode } from "./qrCode.reducer";
import { contract } from "./contract.reducer";

const appReducer = combineReducers({
    authentication,
    campaigns,
    alert,
    web3,
    qrCode,
    contract
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;

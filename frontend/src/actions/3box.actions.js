import Box from "3box";
import { alertActions } from "./";
import { boxConstants } from "../constants";

export const boxActions = {
    login,
    loadProfile
};

function login(account) {
    return async (dispatch, getState) => {
        dispatch(started());
        let box, space;
        try {
            const provider = await Box.get3idConnectProvider()
            //box = await Box.openBox(account, provider)
            box = await Box.create(provider)
            await box.auth(["dSupply"], { address: account })
            space = await box.openSpace("dSupply");
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            let error = "Could not load 3Box";
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded({box, space}));
        dispatch(alertActions.success("Loaded 3Box"));
        //history.push("/");
    };
}

function loadProfile(account) {
    return async (dispatch, getState) => {
        dispatch(started());
        let profile, accounts = {};
        try {
            profile = await Box.getProfile(account);
            //accounts = await Box.getVerifiedAccounts(profile)
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            let error = "Could not load 3Box Profile";
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded({profile, accounts}));
        dispatch(alertActions.success("Loaded 3Box Profile"));
    };
}


function started() {
    return {
        type: boxConstants.BOX_STARTED
    };
}

function loaded(box) {
    return {
        type: boxConstants.BOX_LOADED,
        ...box
    };
}

function failure(error) {
    return {
        type: boxConstants.BOX_ERROR,
        error
    };
}

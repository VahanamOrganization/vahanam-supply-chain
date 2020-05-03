import Box from "3box";
import { alertActions } from "./";
import { boxConstants } from "../constants";
import { history } from "../helpers";

export const boxActions = {
    login,
    loadProfile
};

function login(account) {
    return async (dispatch, getState) => {
        dispatch(started());
        let box;
        try {
            box = await Box.openBox(account, window.ethereum)
        } catch (e) {
            console.log(e);
            dispatch(failure(e.toString()));
            let error = "Could not load 3Box";
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded({box}));
        dispatch(alertActions.success("Login with 3Box Successful"));
        history.push("/");
    };
}

function loadProfile(account) {
    return async (dispatch, getState) => {
        dispatch(started());
        let profile;
        try {
            profile = await Box.getProfile(account);
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            let error = "Could not load 3Box Profile";
            dispatch(alertActions.error(error));
            return;
        }
        dispatch(loaded({profile}));
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

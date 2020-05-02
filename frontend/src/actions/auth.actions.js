import { authConstants } from "../constants";
import { authService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const authActions = {
    login,
    logout,
    register
};

function login(username) {
    return dispatch => {
        dispatch(request({ username }));
        dispatch(success({displayName: "displayName", address: username}));
        history.push("/");
        dispatch(alertActions.success("Login successful"));
        return;
    };

    function request(user) {
        return { type: authConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
        return { type: authConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
        return { type: authConstants.LOGIN_FAILURE, error };
    }
}

function logout() {
    return dispatch => {
        dispatch({ type: authConstants.LOGOUT });
    };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        /*
        authService.register(user).then(
            user => {
                dispatch(success(user));
                history.push("/");
                dispatch(alertActions.success("Registration successful"));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
        */
    };

    function request(user) {
        return { type: authConstants.REGISTER_REQUEST, user };
    }
    function success(user) {
        return { type: authConstants.REGISTER_SUCCESS, user };
    }
    function failure(error) {
        return { type: authConstants.REGISTER_FAILURE, error };
    }
}

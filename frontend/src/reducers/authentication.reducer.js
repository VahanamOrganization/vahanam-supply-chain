import { authConstants } from "../constants";

//let user = JSON.parse(localStorage.getItem("user"));
//const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = {}, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                inProgress: true,
                user: action.user
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                inProgress: false,
                loggedIn: true,
                user: action.user
            };
        case authConstants.LOGIN_FAILURE:
            return {
                inProgress: false,
                loggedIn: false
            };
        case authConstants.LOGOUT:
            return {
                inProgress: false,
                loggedIn: false
            };
        case authConstants.REGISTER_REQUEST:
            return {
                inProgress: true,
                user: action.user
            };
        case authConstants.REGISTER_SUCCESS:
            return {
                loggedIn: true,
                inProgress: false,
                user: action.user
            };
        case authConstants.REGISTER_FAILURE:
            return {
                inProgress: false,
                loggedIn: false
            };
        default:
            return state;
    }
}

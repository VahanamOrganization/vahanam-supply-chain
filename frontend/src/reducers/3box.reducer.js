import { boxConstants, authConstants } from "../constants";

const initialState = {profile: {}, inProgress: false, loggedIn: false}
export function box(state = initialState, action) {
    switch (action.type) {
        case boxConstants.BOX_STARTED:
            return {
                ...state,
                inProgress: true
            };
        case boxConstants.BOX_LOADED:
            return {
                ...state,
                inProgress: false,
                ...action
            };
        case boxConstants.BOX_ERROR:
            return {
                ...state,
                inProgress: false,
                loggedIn: false,
                error: action.error
            };
        case authConstants.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

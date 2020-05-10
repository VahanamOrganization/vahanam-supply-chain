import { boxConstants, authConstants } from "../constants";

const initialState = {
    profile: {},
    inProgress: false,
    loggedIn: false,
    data: {}
};
export function box(state = initialState, action) {
    switch (action.type) {
        case boxConstants.STARTED:
            return {
                ...state,
                inProgress: true
            };
        case boxConstants.LOADED:
            return {
                ...state,
                inProgress: false,
                ...action,
                data: {
                    ...action.data,
                    ...state.data
                }
            };
        case boxConstants.CLEAN:
            return {
                ...state,
                inProgress: false,
                data: {}
            };
        case boxConstants.ERROR:
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

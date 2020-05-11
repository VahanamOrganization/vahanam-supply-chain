import { contractConstants, authConstants } from "../constants";

export function contract(state = {data: {}}, action) {
    switch (action.type) {
        case contractConstants.STARTED:
            return {
                ...state,
                inProgress: true
            };
        case contractConstants.DONE:
            return {
                ...state,
                inProgress: false
            };
        case contractConstants.CLEAN:
            return {
                ...state,
                data: {},
                inProgress: false,
            };
        case contractConstants.ERROR:
            return {
                role: state.role,
                inProgress: false,
                error: action.error
            };
        case contractConstants.RESULT:
            const newState = {
                ...state,
                inProgress: false,
                ...action,
                data: {
                    ...action.data,
                    ...state.data
                }
            };
            return newState;
        case authConstants.LOGOUT:
        default:
            return state;
    }
}

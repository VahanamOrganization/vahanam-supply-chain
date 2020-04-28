import { contractConstants } from "../constants";

export function contract(state = { inProgress: false }, action) {
    switch (action.type) {
        case contractConstants.ROLE_STARTED:
            return {
                ...state,
                inProgress: true
            };
        case contractConstants.ROLE_DONE:
            return {
                ...state,
                inProgress: false,
                role: action.role
            };
        case contractConstants.ROLE_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };
        case contractConstants.MAKE_COORDINATOR_STARTED:
            return {
                ...state,
                inProgress: true
            };
        case contractConstants.MAKE_COORDINATOR_DONE:
            return {
                ...state,
                inProgress: false,
            };
        case contractConstants.MAKE_COORDINATOR_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };
        case contractConstants.GRANT_ROLE_STARTED:
            return {
                ...state,
                inProgress: true
            };
        case contractConstants.GRANT_ROLE_DONE:
            return {
                ...state,
                inProgress: false,
            };
        case contractConstants.GRANT_ROLE_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };
        default:
            return state;
    }
}

import { boxConstants } from "../constants";

export function box(state = {}, action) {
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
                error: action.error
            };
        default:
            return state;
    }
}

import config from "config";
import { getStringFromRole, getRoleFromString } from "../helpers";
import { alertActions } from "./";
import { contractConstants } from "../constants";

export const contractActions = {
    getRole,
    makeCoordinator,
    grantRole
};

function getRole() {
    return async (dispatch, getState) => {
        dispatch(started());
        let role;
        try {
            const { account, contract } = getState().web3;
            role = await contract.methods.getRole(account).call();
            role = getStringFromRole(role);
        } catch (e) {
            dispatch(failure(e));
            dispatch(alertActions.error(e));
            return;
        }
        dispatch(alertActions.success("Found Role: " + role));
        dispatch(done(role));
        return role;
    };

    function started() {
        return {
            type: contractConstants.ROLE_STARTED
        };
    }

    function done(role) {
        return {
            type: contractConstants.ROLE_DONE,
            role
        };
    }

    function failure(error) {
        return {
            type: contractConstants.ROLE_ERROR,
            error
        };
    }
}

function makeCoordinator(address) {
    return async (dispatch, getState) => {
        dispatch(started());
        let info;
        try {
            const { contract } = getState().web3;
            info = await contract.methods.makeCoordinator(address).send();
        } catch (e) {
            dispatch(failure(e));
            dispatch(alertActions.error(e));
            return;
        }
        if (info.status) {
            dispatch(alertActions.success("Made Coordinator"));
            dispatch(done());
        } else {
            console.log(info)
            e = info.toString();
            dispatch(failure(e));
            dispatch(alertActions.error("Error Making Coordinator: "+e));
        }
        return;
    };

    function started() {
        return {
            type: contractConstants.MAKE_COORDINATOR_STARTED
        };
    }

    function done() {
        return {
            type: contractConstants.MAKE_COORDINATOR_DONE,
        };
    }

    function failure(error) {
        return {
            type: contractConstants.MAKE_COORDINATOR_ERROR,
            error
        };
    }
}

function grantRole(role, address) {
    return async (dispatch, getState) => {
        dispatch(started());
        let info;
        try {
            role = getRoleFromString(role);
            const { contract } = getState().web3;
            info = await contract.methods.grantRole(role, address).send();
        } catch (e) {
            dispatch(failure(e));
            dispatch(alertActions.error(e));
            return;
        }
        if (info.status) {
            dispatch(alertActions.success("Role Granted"));
            dispatch(done());
        } else {
            console.log(info)
            e = info.toString();
            dispatch(failure(e));
            dispatch(alertActions.error("Error Granting Role: "+e));
        }
        return;
    };

    function started() {
        return {
            type: contractConstants.GRANT_ROLE_STARTED
        };
    }

    function done() {
        return {
            type: contractConstants.GRANT_ROLE_DONE,
        };
    }

    function failure(error) {
        return {
            type: contractConstants.GRANT_ROLE_ERROR,
            error
        };
    }
}
/*

function startCampaign(campaign) {
    return async (dispatch, getState) => {
        dispatch(started());
        let info;
        try {
            const { contract } = getState().web3;
            info = await contract.methods.startCampaign(campaign).send();
        } catch (e) {
            dispatch(failure(e));
            dispatch(alertActions.error(e));
            return;
        }
        if (info.status) {
            dispatch(alertActions.success("Started Campaign: "+info.result.campaignId));
            dispatch(done());
        } else {
            console.log(info)
            e = info.toString();
            dispatch(failure(e));
            dispatch(alertActions.error("Error Starting Campaign: "+e));
        }
        return role;
    };

    function started() {
        return {
            type: contractConstants.MAKE_COORDINATOR_STARTED
        };
    }

    function done() {
        return {
            type: contractConstants.MAKE_COORDINATOR_DONE,
        };
    }

    function failure(error) {
        return {
            type: contractConstants.MAKE_COORDINATOR_ERROR,
            error
        };
    }
}

function getCampaign(campaignId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let info;
        try {
            const { contract } = getState().web3;
            info = await contract.methods.getCampaign(campaignId).send();
        } catch (e) {
            dispatch(failure(e));
            dispatch(alertActions.error(e));
            return;
        }
        if (info.status) {
            dispatch(alertActions.success("Made Coordinator"));
            dispatch(done());
        } else {
            console.log(info)
            e = info.toString();
            dispatch(failure(e));
            dispatch(alertActions.error("Error Making Coordinator: "+e));
        }
        return role;
    };

    function started() {
        return {
            type: contractConstants.MAKE_COORDINATOR_STARTED
        };
    }

    function done() {
        return {
            type: contractConstants.MAKE_COORDINATOR_DONE,
        };
    }

    function failure(error) {
        return {
            type: contractConstants.MAKE_COORDINATOR_ERROR,
            error
        };
    }
}

function createNewBatch(batch) {
    return async (dispatch, getState) => {
        dispatch(started());
        let info;
        try {
            const { contract } = getState().web3;
            info = await contract.methods.createNewBatch(batch).send();
        } catch (e) {
            dispatch(failure(e));
            dispatch(alertActions.error(e));
            return;
        }
        if (info.status) {
            dispatch(alertActions.success("Created New Batch"));
            dispatch(done());
        } else {
            console.log(info)
            e = info.toString();
            dispatch(failure(e));
            dispatch(alertActions.error("Error Creating New Batch: "+e));
        }
        return role;
    };

    function started() {
        return {
            type: contractConstants.MAKE_COORDINATOR_STARTED
        };
    }

    function done() {
        return {
            type: contractConstants.MAKE_COORDINATOR_DONE,
        };
    }

    function failure(error) {
        return {
            type: contractConstants.MAKE_COORDINATOR_ERROR,
            error
        };
    }
}
*/

import config from "config";
import { getStringFromRole, getRoleFromString } from "../helpers";
import { alertActions } from "./";
import { contractConstants } from "../constants";

export const contractActions = {
    getRole,
    makeCoordinator,
    startCampaign,
    addManufacturers,
    addCouriers,
    getCampaignDetails,
    createNewBatch,
    getBatchDetails
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
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Getting Role"));
            return;
        }
        dispatch(alertActions.success("Found Role: " + role));
        dispatch(result({role}));
        dispatch(done());
        return role;
    };
}

function getCampaignDetails(campaignId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let campaign;
        try {
            const { contract } = getState().web3;
            campaign = await contract.methods
                .getCampaignDetalis(campaignId)
                .call();
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Getting Campaign"));
            return;
        }
        dispatch(alertActions.success("Got Campaign"));
        dispatch(result({campaign}));
        dispatch(done());
    };
}

function getBatchDetails(campaignId, batchId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let batch;
        try {
            const { contract } = getState().web3;
            batch = await contract.methods
                .getBatchDetails(campaignId, batchId)
                .call();
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Getting Batch"));
            return;
        }
        dispatch(alertActions.success("Got Batch"));
        dispatch(result({batch}));
        dispatch(done());
    };
}

function makeCoordinator(address) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        try {
            const { contract } = getState().web3;
            receipt = await contract.methods.makeCoordinator(address).send();
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Making Coordinator"));
            return;
        }
        if (receipt.status) {
            dispatch(alertActions.success("Made Coordinator"));
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Making Coordinator: " + e));
        }
        return;
    };
}

function startCampaign(campaign) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        try {
            const { contract } = getState().web3;
            receipt = await contract.methods
                .startCampaign(
                    campaign.manufacturers,
                    campaign.couriers,
                    campaign.receiver,
                    campaign.totalPLA
                )
                .send();
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Starting Campaign"));
            return;
        }
        if (receipt.status) {
            let event = receipt.events["CampaignStarted"];
            dispatch(
                alertActions.success(
                    "Started Campaign ID: " + event.returnValues.campaignId
                )
            );
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Starting Campaign"));
        }
    };
}

function addManufacturers(data) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        try {
            const { contract } = getState().web3;
            receipt = await contract.methods
                .addManufacturers(data.campaignId, data.manufacturers)
                .send();
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Adding Manufacturers"));
            return;
        }
        if (receipt.status) {
            printReceipt(receipt);
            let events = receipt.events["RoleGranted"];
            if (events) {
                let number = Array.isArray(events) ? events.length : 1;
                dispatch(
                    alertActions.success(number + " Manufacturer Roles Granted")
                );
            } else {
                dispatch(alertActions.success("No Roles Granted"));
            }
            dispatch(alertActions.success("Added Manufacturers"));
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Adding Manufacturers"));
        }
    };
}

function addCouriers(data) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        try {
            const { contract } = getState().web3;
            receipt = await contract.methods
                .addCouriers(data.campaignId, data.couriers)
                .send();
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Adding Couriers"));
            return;
        }
        if (receipt.status) {
            let events = receipt.events["RoleGranted"];
            if (events) {
                let number = Array.isArray(events) ? events.length : 1;
                dispatch(
                    alertActions.success(number + " Courier Roles Granted")
                );
            } else {
                dispatch(alertActions.success("No Roles Granted"));
            }
            dispatch(alertActions.success("Added Couriers"));
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Adding Couriers"));
        }
    };
}

function createNewBatch(batch) {
    return async (dispatch, getState) => {
        const {
            campaignId,
            amountOfPLA,
            expectedAmountOfMasks,
            tfForDeliveryToManufacturer,
            tfForMakingMasks,
            tfForDeliveryToReceiver,
            courier1,
            courier2,
            manufacturer
        } = batch;
        dispatch(started());
        let receipt;
        try {
            const { contract } = getState().web3;
            receipt = await contract.methods
                .createNewBatch(
                    campaignId,
                    amountOfPLA,
                    expectedAmountOfMasks,
                    tfForDeliveryToManufacturer,
                    tfForMakingMasks,
                    tfForDeliveryToReceiver,
                    courier1,
                    courier2,
                    manufacturer
                )
                .send();
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Creating Batch"));
            return;
        }
        if (receipt.status) {
            let event = receipt.events["PLAPacked"];
            dispatch(
                alertActions.success(
                    "Created & Packed Batch ID: " + event.returnValues.branchId
                )
            );
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Creating Batch"));
        }
    };
}

function started() {
    return {
        type: contractConstants.TRANSACTION_STARTED
    };
}

function done() {
    return {
        type: contractConstants.TRANSACTION_DONE
    };
}

function result(result) {
    return {
        type: contractConstants.TRANSACTION_RESULT,
        ...result

    };
}

function failure(error) {
    return {
        type: contractConstants.TRANSACTION_ERROR,
        error
    };
}

function printReceipt(receipt) {
    console.log("Got Receipt");
    Object.keys(receipt).map((key, index) => {
        console.log(key, receipt[key]);
    });
}

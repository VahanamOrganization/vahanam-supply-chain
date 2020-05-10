import config from "config";
import { getStringFromRole, getRoleFromString } from "../helpers";
import { alertActions } from "./";
import { contractConstants } from "../constants";

export const contractActions = {
    getRole,
    clean,
    makeCoordinator,
    startCampaign,
    addManufacturers,
    addCouriers,
    getCampaignDetails,
    createNewBatch,
    getBatchDetails,
    getBatches,
    confirmPLAPickedUp,
    confirmPLAReceived,
    confirmMasksMade,
    confirmMasksPickedUp,
    confirmMasksReceived
};

function clean() {
    return dispatch => {
        dispatch({
            type: contractConstants.CLEAN
        });
    };
}

function getRole() {
    return async (dispatch, getState) => {
        dispatch(started());
        let role;
        try {
            const { account, contract } = getState().web3;
            role = await contract.methods
                .getRole(account)
                .call({ from: account });
            role = getStringFromRole(role);
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Getting Role"));
            return;
        }
        dispatch(result({ role }));
        return role;
    };
}

function getCampaignDetails(campaignId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let campaign;
        try {
            const { account, contract } = getState().web3;
            campaign = await contract.methods
                .getCampaignDetalis(campaignId)
                .call({ from: account });
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Getting Campaign"));
            return;
        }
        dispatch(alertActions.success("Got Campaign"));
        dispatch(result({ data: { campaign } }));
    };
}

function getBatchDetails(campaignId, batchId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let batch;
        try {
            const { account, contract } = getState().web3;
            batch = await contract.methods
                .getBatchDetails(campaignId, batchId)
                .call({ from: account });
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Getting Batch"));
            return;
        }
        dispatch(alertActions.success("Got Batch"));
        dispatch(result({ data: { batch } }));
    };
}

function getBatches(campaignId, totalBatches) {
    return async (dispatch, getState) => {
        dispatch(started());
        let batches;
        try {
            const { account, contract } = getState().web3;
            batches = await Promise.all(
                Array(totalBatches).fill(1).map((el, i) =>
                    contract.methods
                        .getBatchDetails(campaignId, i + 1)
                        .call({ from: account })
                )
            );
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Getting Batches"));
            return;
        }
        dispatch(result({ data: { batches } }));
    };
}

function makeCoordinator(address) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        try {
            const { account, contract } = getState().web3;
            receipt = await contract.methods
                .makeCoordinator(address)
                .send({ from: account });
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

function confirmPLAPickedUp(campaignId, batchId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        let otherRole = "COURIER";
        try {
            const { account, contract } = getState().web3;
            const { role } = getState().contract;
            if (role === "COURIER") {
                otherRole = "COORDINATOR";
            }
            receipt = await contract.methods
                .confirmPLAPickedUpByCourier1(campaignId, batchId)
                .send({ from: account });
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Confirming Pickup"));
            return;
        }
        if (receipt.status) {
            let event = receipt.events["PLAPickedUpByCourier1"];
            if (event) {
                dispatch(alertActions.success("PLA Picked Up Confirmed"));
            } else {
                dispatch(
                    alertActions.success("Success. Waiting For " + otherRole)
                );
            }
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Confirming Pickup"));
        }
    };
}

function confirmPLAReceived(campaignId, batchId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        let otherRole = "COURIER";
        try {
            const { account, contract } = getState().web3;
            const { role } = getState().contract;
            if (role === "COURIER") {
                otherRole = "MANUFACTURER";
            }
            receipt = await contract.methods
                .confirmPLARecivedByManufacturer(campaignId, batchId)
                .send({ from: account });
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Confirming Received"));
            return;
        }
        if (receipt.status) {
            let event = receipt.events["PLARecivedByManufacturer"];
            if (event) {
                dispatch(alertActions.success("PLA Received Confirmed"));
            } else {
                dispatch(
                    alertActions.success("Success. Waiting For " + otherRole)
                );
            }
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Confirming Received"));
        }
    };
}

function confirmMasksMade(campaignId, batchId, amountOfMasks) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        try {
            const { account, contract } = getState().web3;
            receipt = await contract.methods
                .confirmMasksMade(campaignId, batchId, amountOfMasks)
                .send({ from: account });
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Confirming Masks Made"));
            return;
        }
        if (receipt.status) {
            let event = receipt.events["MasksReady"];
            if (event) {
                dispatch(alertActions.success("Masks Made Confirmed"));
            }
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Confirming Masks Made"));
        }
    };
}

function confirmMasksPickedUp(campaignId, batchId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        let otherRole = "COURIER";
        try {
            const { account, contract } = getState().web3;
            const { role } = getState().contract;
            if (role === "COURIER") {
                otherRole = "MANUFACTURER";
            }
            receipt = await contract.methods
                .confirmMasksPickedUpByCourier2(campaignId, batchId)
                .send({ from: account });
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Confirming Pickup"));
            return;
        }
        if (receipt.status) {
            let event = receipt.events["MasksPickedUpByCourier2"];
            if (event) {
                dispatch(alertActions.success("Masks Picked Up Confirmed"));
            } else {
                dispatch(
                    alertActions.success("Success. Waiting For " + otherRole)
                );
            }
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Confirming Pickup"));
        }
    };
}

function confirmMasksReceived(campaignId, batchId) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        let otherRole = "COURIER";
        try {
            const { account, contract } = getState().web3;
            const { role } = getState().contract;
            if (role === "COURIER") {
                otherRole = "RECEIVER";
            }
            receipt = await contract.methods
                .confirmMasksRceivedByReceiver(campaignId, batchId)
                .send({ from: account });
        } catch (e) {
            console.log(e);
            dispatch(failure(e));
            dispatch(alertActions.error("Error Confirming Received"));
            return;
        }
        if (receipt.status) {
            let event = receipt.events["MasksRceivedByReceiver"];
            if (event) {
                dispatch(alertActions.success("Masks Received Confirmed"));
            } else {
                dispatch(
                    alertActions.success("Success. Waiting For " + otherRole)
                );
            }
            dispatch(done());
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Confirming Received"));
        }
    };
}

function startCampaign(campaign) {
    return async (dispatch, getState) => {
        dispatch(started());
        let receipt;
        try {
            const { account, contract } = getState().web3;
            receipt = await contract.methods
                .startCampaign(
                    campaign.manufacturers,
                    campaign.couriers,
                    campaign.receiver,
                    campaign.totalPLA
                )
                .send({ from: account });
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
            const { account, contract } = getState().web3;
            receipt = await contract.methods
                .addManufacturers(data.campaignId, data.manufacturers)
                .send({ from: account });
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
            const { account, contract } = getState().web3;
            receipt = await contract.methods
                .addCouriers(data.campaignId, data.couriers)
                .send({ from: account });
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
            const { account, contract } = getState().web3;
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
                .send({ from: account });
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
            dispatch(
                result({
                    data: {
                        newBatchId: event.returnValues.branchId,
                        newCampaignId: event.returnValues.campaignId
                    }
                })
            );
        } else {
            printReceipt(receipt);
            dispatch(failure(receipt.toString()));
            dispatch(alertActions.error("Error Creating Batch"));
        }
    };
}

function started() {
    return {
        type: contractConstants.STARTED
    };
}

function done() {
    return {
        type: contractConstants.DONE
    };
}

function result(result) {
    return {
        type: contractConstants.RESULT,
        ...result
    };
}

function failure(error) {
    return {
        type: contractConstants.ERROR,
        error
    };
}

function printReceipt(receipt) {
    console.log("Got Receipt");
    Object.keys(receipt).map((key, index) => {
        console.log(key, receipt[key]);
    });
}

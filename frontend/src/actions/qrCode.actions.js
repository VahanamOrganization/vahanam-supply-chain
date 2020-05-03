import Web3 from "web3";
import config from "config";
import { history } from "../helpers";
import { alertActions } from "./";
import { qrCodeConstants } from "../constants";
import campaignGenerator from "../assets/contracts/CampaignGenerator.json";

export const qrCodeActions = {
    toggle,
    data,
    clean
};

function toggle() {
    return async (dispatch, getState) => {
        dispatch({
            type: qrCodeConstants.QRCODE_TOGGLE
        });
    };
}

function data() {
    return async (dispatch, getState) => {
        dispatch({
            type: qrCodeConstants.QRCODE_DATA,
            data
        });
    };
}

function clean() {
    return async (dispatch, getState) => {
        dispatch({
            type: qrCodeConstants.QRCODE_CLEAR
        });
    };
}

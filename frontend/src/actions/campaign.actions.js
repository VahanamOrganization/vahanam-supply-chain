import { campaignConstants } from "../constants";
import { campaignService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const campaignActions = {
    getAll,
    create
};

function getAll() {
    return dispatch => {
        dispatch(request());

        campaignService.getAll().then(
            campaigns => dispatch(success(campaigns)),
            error => dispatch(failure(error.toString()))
        );
    };

    function request() {
        return { type: campaignConstants.GETALL_REQUEST };
    }
    function success(campaigns) {
        return { type: campaignConstants.GETALL_SUCCESS, campaigns };
    }
    function failure(error) {
        return { type: campaignConstants.GETALL_FAILURE, error };
    }
}

function create(campaign) {
    return dispatch => {
        dispatch(request(campaign));

        campaignService.create(campaign).then(
            campaign => dispatch(success(campaign)),
            error => dispatch(failure(campaign, error.toString()))
        );
    };

    function request(campaign) {
        return { type: campaignConstants.CREATE_REQUEST, campaign };
    }
    function success(campaign) {
        return { type: campaignConstants.CREATE_SUCCESS, campaign };
    }
    function failure(campaign, error) {
        return { type: campaignConstants.CREATE_FAILURE, campaign, error };
    }
}

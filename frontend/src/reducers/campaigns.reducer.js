import { campaignConstants } from "../constants";

export function campaigns(state = {}, action) {
    switch (action.type) {
        case campaignConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case campaignConstants.GETALL_SUCCESS:
            return {
                items: action.campaigns
            };
        case campaignConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case campaignConstants.CREATE_REQUEST:
            // add 'creating:true' property to campaign being created
            return {
                creating: true,
                ...state,
                items: state.items.map(campaign =>
                    campaign.id === action.id
                        ? { ...campaign, creating: true }
                        : campaign
                )
            };
        case campaignConstants.CREATE_SUCCESS:
            // remove created campaign from state
            return {
                created: true,
                items: state.items.filter(campaign => campaign.id !== action.id)
            };
        case campaignConstants.CREATE_FAILURE:
            // remove 'creating:true' property and add 'createError:[error]' property to campaign
            return {
                created: false,
                ...state,
                items: state.items.map(campaign => {
                    if (campaign.id === action.id) {
                        // make copy of campaign without 'creating:true' property
                        const { creating, ...campaignCopy } = campaign;
                        // return copy of campaign with 'createError:[error]' property
                        return { ...campaignCopy, createError: action.error };
                    }

                    return campaign;
                }),
                error: action.error
            };
        default:
            return state;
    }
}

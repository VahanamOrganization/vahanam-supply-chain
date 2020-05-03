import { qrCodeConstants } from "../constants";

export function qrCode(state = {open: false}, action) {
    switch (action.type) {
        case qrCodeConstants.QRCODE_DATA:
            return {
                data: action.data,
                open: false
            };
        case qrCodeConstants.QRCODE_TOGGLE:
            return {
                open: !state.open
            };
        case qrCodeConstants.QRCODE_CLEAR:
            return {
                open: false
            };
        default:
            return state;
    }
}

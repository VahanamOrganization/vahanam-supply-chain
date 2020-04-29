import { contractConstants } from "../constants";
export const getStringFromRole = role => {
    switch (role) {
        case contractConstants.ADMIN_ROLE:
            return "ADMIN";
        case contractConstants.COORDINATOR_ROLE:
            return "COORDINATOR";
        case contractConstants.COURIER_ROLE:
            return "COURIER";
        case contractConstants.MANUFACTURER_ROLE:
            return "MANUFACTURER";
        case contractConstants.RECEIVER_ROLE:
            return "RECEIVER";
        default:
            throw "Unknown Role Found";
    }
};

export const getRoleFromString = role => {
    switch (role) {
        case "ADMIN":
            return contractConstants.ADMIN_ROLE;
        case "COORDINATOR":
            return contractConstants.COORDINATOR_ROLE;
        case "COURIER":
            return contractConstants.COURIER_ROLE;
        case "MANUFACTURER":
            return contractConstants.MANUFACTURER_ROLE;
        case "RECEIVER":
            return contractConstants.RECEIVER_ROLE;
        default:
            throw "Unknown Role Found";
    }
};

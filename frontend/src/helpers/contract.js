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
            return "ROLE NOT FOUND";
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

const qrRegex = new RegExp("[0-9]*:[0-9]*");
export const getQRString = (campaignId, batchId) => {
    return campaignId.toString() + ":" + batchId.toString();
};

export const getQRValue = qrString => {
    if (qrRegex.test(qrString)) {
        let [campaignId, batchId] = qrString.split(":");
        campaignId = parseInt(campaignId);
        batchId = parseInt(batchId);
        return { campaignId, batchId };
    } else {
        throw "Invalid QR Code";
    }
};

export const getBatchStatusString = stage => {
    return contractConstants.STAGES[parseInt(stage)];
};

export const getBatchDateString = batch => {
    const stage = parseInt(batch.stage);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    switch (stage) {
        case 0:
            return new Date(
                batch.tfForDeliveryToManufacturer * 1000
            ).toLocaleDateString(undefined, options);
        case 1:
            return new Date(
                batch.tfForDeliveryToManufacturer * 1000
            ).toLocaleDateString(undefined, options);
        case 2:
            return new Date(batch.tfForMakingMasks * 1000).toLocaleDateString(
                undefined,
                options
            );
        case 3:
            return new Date(
                batch.tfForDeliveryToReciver * 1000
            ).toLocaleDateString(undefined, options);
        case 4:
            return new Date(
                batch.tfForDeliveryToReciver * 1000
            ).toLocaleDateString(undefined, options);
        case 5:
            return new Date(
                batch.tfForDeliveryToReciver * 1000
            ).toLocaleDateString(undefined, options);
        case 6:
            return new Date(
                batch.tfForDeliveryToReciver * 1000
            ).toLocaleDateString(undefined, options);
        default:
            return "Status Unknown: " + stage.toString();
    }
};

export const contractConstants = {
    ROLES: [
        "COORDINATOR",
        "MANUFACTURER",
        "COURIER",
        "ADMIN",
        "RECEIVER"
    ],

    STAGES: [
        "PLAPacked",
        "PLAPickedUpByCourier1",
        "PLARecivedByManufaturer",
        "MasksReady",
        "MasksPickedUpByCourier2",
        "MasksRceivedByReceiver", 
        "MasksVerifiedForQuality"
    ],

    ADMIN_ROLE:
        "0xf23ec0bb4210edd5cba85afd05127efcd2fc6a781bfed49188da1081670b22d8",
    COORDINATOR_ROLE:
        "0xaf8c8b3d1b230c888f16d0aac400b28aa51e631d580aaa7cb46e571590ed44e7",
    COURIER_ROLE:
        "0x7fc3771f539a03c47afbbf258702c19273ef5e735e24ee7978081dc07288c687",
    MANUFACTURER_ROLE:
        "0xb528929ed79eb79a87ae6f578d3125509c91bfea9ac8b7fb9f69aa0bc28298dd",
    RECEIVER_ROLE:
        "0xb914ce1854b65b7506ae428aeca250f95704e80b73c091b55e0e8c805a63c657",


    TRANSACTION_STARTED: "TRANSACTION_STARTED",
    TRANSACTION_DONE: "TRANSACTION_DONE",
    TRANSACTION_ERROR: "TRANSACTION_ERROR",
    TRANSACTION_RESULT: "TRANSACTION_RESULT"
};

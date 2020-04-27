export * from "./history";
export * from "./store";
export * from "./auth-header";
export * from "./web3.js";
export const wait = async ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

import React from "react";
import { connect } from "react-redux";

import transakSDK from "@transak/transak-sdk";

// class ChatPage extends React.Component {
//     componentDidMount() {
//         this.init();
//     }

//     async init() {}

//     render() {
export default function ChatPage(props) {
    let transak = new transakSDK({
        apiKey: "d26beb2a-5f39-40a1-899b-d317136ae987", // Your API Key (Required)
        environment: "STAGING", // STAGING/PRODUCTION (Required)
        defaultCryptoCurrency: "ETH",
        walletAddress: "0x1e9c89aFf77215F3AD26bFfe0C50d4FdEBa6a352", // Your customer wallet address
        themeColor: "000000", // App theme color in hex
        fiatCurrency: 'INR', // INR/GBP
        email: "", // Your customer email address (Optional)
        redirectURL: "",
        hostURL: window.location.origin, // Required field
        widgetHeight: '600px',
        widgetWidth: '500px'
    });

    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, data => {
        console.log(data);
    });

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, orderData => {
        transak.close();
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, orderData => {
        console.log(orderData);
        transak.close();
    });
    return (
        <div className="chatPage page">
            <div className="chatPageInner pageInner">
                <div className="title">Chat</div>
            </div>
        </div>
    );
}

// function mapState(state) {
//     return {};
// }

// const actionCreators = {};

// const connectedChatPage = connect(mapState, actionCreators)(ChatPage);
// export default connectedChatPage;

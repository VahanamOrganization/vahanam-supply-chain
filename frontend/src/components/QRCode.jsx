import React from "react";
import { connect } from "react-redux";
import { alertActions, qrCodeActions } from "../actions";
import QrReader from "react-qr-reader";

class QRCode extends React.Component {
    constructor(props) {
        super(props);
        this.onScan = this.onScan.bind(this);
        this.onError = this.onError.bind(this);
    }

    onScan(data) {
        if (data) {
            this.props.success("Scanned QR Code: " + data);
            this.props.data(data);
        }
    }

    onError(err) {
        this.props.error("QR Scanner Error: " + err.toString());
    }

    render() {
        return (
            <div
                className={
                    this.props.open ? "qrCodeReader open" : "qrCodeReader"
                }
            >
                <div className="close" onClick={this.props.toggle}>
                    {"\u2715"}
                </div>
                <div className="qrCodeInner">
                    <div className="title"> Scan QR Code </div>
                    {this.props.open && (
                        <QrReader
                            delay={500}
                            onError={this.onError}
                            onScan={this.onScan}
                            style={{ width: "100%" }}
                        />
                    )}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    success: alertActions.success,
    error: alertActions.error,
    toggle: qrCodeActions.toggle,
    data: qrCodeActions.data
};

const connectedQRCode = connect(mapState, actionCreators)(QRCode);
export { connectedQRCode as QRCode };

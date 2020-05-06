import React from "react";
import { connect } from "react-redux";
import { contractConstants } from "../../constants";
import { contractActions, alertActions } from "../../actions";
import QrReader from "react-qr-reader";
import { getQRValue } from "../../helpers";

class ConfirmPLAReceived extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignId: 0,
            batchId: 0,
            showScanner: false,
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
        this.toggleScanner = this.toggleScanner.bind(this);
    }

    handleScan(data) {
        if (data) {
            this.props.success("Scanned QR Code: " + data);
            try {
                let { campaignId, batchId } = getQRValue(data);
                this.setState({
                    campaignId,
                    batchId,
                    showScanner: !this.state.showScanner
                });
            } catch (e) {
                this.props.error(e.toString());
            }
        }
    }

    toggleScanner() {
        this.setState({ showScanner: !this.state.showScanner });
    }
    
    handleError(err) {
        this.props.error("QR Scanner Error: " + err.toString());
    }

    clearForm(event) {
        event.preventDefault();
        this.setState({
            campaignId: 0,
            batchId: 0,
            showScanner: false,
            submitted: false
        });
    }

    handleChange(event) {
        let { name, value } = event.target;
        value = value.trim();
        this.setState({
            [name]: value
        });
    }

    handleEnter(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            //13 is the enter keycode
            this.handleSubmit(e);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.props.inProgress) {
            return;
        }
        this.setState({ submitted: true, showScanner: false });
        const { campaignId, batchId } = this.state;
        if (campaignId > 0 && batchId > 0) {
            await this.props.confirmPLAReceived(campaignId, batchId);
        }
    }

    render() {
        const { campaignId, batchId, submitted, showScanner } = this.state;
        return (
            <div className="getBatchDetails form">
                <span className="label">Campaign ID</span>
                <input
                    className="input"
                    type="number"
                    name="campaignId"
                    value={campaignId}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && campaignId == 0 && (
                    <div className="helpBlock">CampaignId cannot be 0</div>
                )}
                <span className="label">Batch ID</span>
                <input
                    className="input"
                    type="number"
                    name="batchId"
                    value={batchId}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && batchId == 0 && (
                    <div className="helpBlock">BatchId cannot be 0</div>
                )}
                <div className="submitForm">
                    <div className="submit">
                        <a href="#" onClick={this.handleSubmit}>
                            Confirm
                        </a>
                    </div>
                    <div className="cancel">
                        <a href="#" onClick={this.clearForm}>
                            Clear
                        </a>
                    </div>
                </div>
                <div className="display">
                    {showScanner ? (
                        <QrReader
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: "100%" }}
                        />
                    ) : (
                        <a href="#" onClick={this.toggleScanner}>
                            Scan QR Code
                        </a>
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
    confirmPLAReceived: contractActions.confirmPLAReceived,
    success: alertActions.success,
    error: alertActions.error
};

const connectedConfirmPLAReceived = connect(
    mapState,
    actionCreators
)(ConfirmPLAReceived);
export { connectedConfirmPLAReceived as ConfirmPLAReceived };

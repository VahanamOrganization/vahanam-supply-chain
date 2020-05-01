import React from "react";
import { connect } from "react-redux";
import { contractConstants } from "../../../constants";
import { contractActions, alertActions } from "../../../actions";
import QrReader from "react-qr-reader";

class GetBatchDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignId: 0,
            batchId: 0,
            scanData: "",
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
            this.setState({
                scanData: data
            });
            this.props.success("Scanned QR Code");
            this.setState({ showScanner: !this.state.showScanner });
        }
    }

    toggleScanner() {
        this.setState({ showScanner: !this.state.showScanner });
    }
    handleError(err) {
        this.props.success("QR Code Error: " + err);
    }

    clearForm(event) {
        event.preventDefault();
        this.setState({
            campaignId: 0,
            batchId: 0,
            scanData: "",
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
        this.setState({ submitted: true });
        const { campaignId, batchId } = this.state;
        if (campaignId > 0 && batchId > 0) {
            await this.props.getBatchDetails(campaignId, batchId);
        }
    }

    render() {
        const {
            campaignId,
            batchId,
            scanData,
            submitted,
            showScanner
        } = this.state;
        const { inProgress, batch } = this.props;
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
                <span className="label">Batch ID</span>
                <input className="input" type="text" value={scanData} />
                <div className="submitForm">
                    <div className="submit">
                        <a href="#" onClick={this.handleSubmit}>
                            Get
                        </a>
                    </div>
                    <div className="cancel">
                        <a href="#" onClick={this.clearForm}>
                            Clear
                        </a>
                    </div>
                </div>
                {!inProgress && submitted && batch ? (
                    <BatchDisplay batch={batch} />
                ) : (
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
                )}
            </div>
        );
    }
}

function BatchDisplay(props) {
    return (
        <div className="batchDisplay display">
            <span className="label">Stage</span>
            <p className="data">
                {props.batch.stage +
                    " => " +
                    contractConstants.STAGES[props.batch.stage]}
            </p>
            <span className="label">Amount of PLA</span>
            <p className="data">{props.batch.amountOfPLA}</p>
            <span className="label">Expected Amount of Masks</span>
            <p className="data">{props.batch.amountOfMasksMade}</p>
            <span className="label">Expected Date of PLA Delivery</span>
            <p className="data">
                {new Date(
                    props.batch.tfForDeliveryToManufacturer * 1000
                ).toString()}
            </p>
            <span className="label">Expected Date of Masks Made</span>
            <p className="data">
                {new Date(props.batch.tfForMakingMasks * 1000).toString()}
            </p>
            <span className="label">Expected Date of Masks Delivery</span>
            <p className="data">
                {new Date(props.batch.tfForDeliveryToReciver * 1000).toString()}
            </p>
            <span className="label">Courier 1</span>
            <p className="data">{props.batch.courier1}</p>
            <span className="label">Courier 2</span>
            <p className="data">{props.batch.courier2}</p>
            <span className="label">Manufacturer</span>
            <p className="data">{props.batch.manufacturer}</p>
        </div>
    );
}

function mapState(state) {
    const { inProgress, batch } = state.contract;
    return { inProgress, batch };
}

const actionCreators = {
    getBatchDetails: contractActions.getBatchDetails,
    success: alertActions.success,
    error: alertActions.error
};

const connectedGetBatchDetails = connect(
    mapState,
    actionCreators
)(GetBatchDetails);
export { connectedGetBatchDetails as GetBatchDetails };

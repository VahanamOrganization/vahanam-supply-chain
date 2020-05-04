import React from "react";
import { connect } from "react-redux";
import { contractConstants } from "../../../constants";
import { contractActions, qrCodeActions, alertActions } from "../../../actions";
import QRCode from "qrcode";
import { getQRString } from "../../../helpers";

class GetBatchDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignId: 0,
            batchId: 0,
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    componentDidMount() {
        this.props.cleanScanner();
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.qrData) {
            try {
                let { campaignId, batchId } = getQRValue(nextProps.qrData);
                return {
                    campaignId,
                    batchId,
                    submitted: false
                };
            } catch (e) {
                this.props.error(e.toString());
            }
        }
        return null;
    }

    clearForm(event) {
        event.preventDefault();
        this.setState({
            campaignId: 0,
            batchId: 0,
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
            await this.props.getBatchDetails(campaignId, batchId);
        }
    }

    render() {
        const { campaignId, batchId, submitted } = this.state;
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
                    <BatchDisplay
                        batch={batch}
                        campaignId={campaignId}
                        batchId={batchId}
                    />
                ) : (
                    <div className="display">
                        <a href="#" onClick={this.props.toggleScanner}>
                            Scan QR Code
                        </a>
                    </div>
                )}
            </div>
        );
    }
}

class BatchDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dataURI: ""
        };
    }
    async componentDidMount() {
        const qrString = getQRString(this.props.campaignId, this.props.batchId);
        const dataURI = await QRCode.toDataURL(qrString);
        this.setState({ loaded: true, dataURI });
    }
    render() {
        return (
            <div className="batchDisplay display">
                {this.state.loaded ? (
                    <img
                        className="qrcode"
                        alt="qrcode"
                        src={this.state.dataURI}
                    />
                ) : null}
                <span className="label">Stage</span>
                <p className="data">
                    {this.props.batch.stage +
                        " => " +
                        contractConstants.STAGES[this.props.batch.stage]}
                </p>
                <span className="label">Amount of PLA</span>
                <p className="data">{this.props.batch.amountOfPLA}</p>
                <span className="label">Expected Amount of Masks</span>
                <p className="data">{this.props.batch.amountOfMasksMade}</p>
                <span className="label">Expected Date of PLA Delivery</span>
                <p className="data">
                    {new Date(
                        this.props.batch.tfForDeliveryToManufacturer * 1000
                    ).toString()}
                </p>
                <span className="label">Expected Date of Masks Made</span>
                <p className="data">
                    {new Date(
                        this.props.batch.tfForMakingMasks * 1000
                    ).toString()}
                </p>
                <span className="label">Expected Date of Masks Delivery</span>
                <p className="data">
                    {new Date(
                        this.props.batch.tfForDeliveryToReciver * 1000
                    ).toString()}
                </p>
                <span className="label">Courier 1</span>
                <p className="data">{this.props.batch.courier1}</p>
                <span className="label">Courier 2</span>
                <p className="data">{this.props.batch.courier2}</p>
                <span className="label">Manufacturer</span>
                <p className="data">{this.props.batch.manufacturer}</p>
            </div>
        );
    }
}

function mapState(state) {
    const { inProgress, batch } = state.contract;
    let qrData = state.qrCode.data;
    return { inProgress, batch, qrData };
}

const actionCreators = {
    getBatchDetails: contractActions.getBatchDetails,
    toggleScanner: qrCodeActions.toggle,
    cleanScanner: qrCodeActions.clean,
    error: alertActions.error
};

const connectedGetBatchDetails = connect(
    mapState,
    actionCreators
)(GetBatchDetails);
export { connectedGetBatchDetails as GetBatchDetails };

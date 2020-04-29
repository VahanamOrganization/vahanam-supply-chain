import React from "react";
import { connect } from "react-redux";
import { contractConstants } from "../../../constants";
import { contractActions } from "../../../actions";

class ConfirmPLAReceived extends React.Component {
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
        this.setState({ submitted: true });
        const { campaignId, batchId } = this.state;
        if (campaignId > 0 && batchId > 0) {
            await this.props.confirmPLAReceived(campaignId, batchId);
        }
    }

    render() {
        const { campaignId, batchId, submitted } = this.state;
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
                    <a href="#" onClick={this.handleSubmit}>
                        Confirm
                    </a>
                    <a href="#" onClick={this.clearForm}>
                        Clear
                    </a>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    confirmPLAReceived: contractActions.confirmPLAReceived
};

const connectedConfirmPLAReceived = connect(
    mapState,
    actionCreators
)(ConfirmPLAReceived);
export { connectedConfirmPLAReceived as ConfirmPLAReceived };

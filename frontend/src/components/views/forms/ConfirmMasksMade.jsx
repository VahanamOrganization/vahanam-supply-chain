import React from "react";
import { connect } from "react-redux";
import { contractConstants } from "../../../constants";
import { contractActions } from "../../../actions";

class ConfirmMasksMade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignId: 0,
            batchId: 0,
            amountOfMasks: 0,
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
            amountOfMasks: 0,
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
        const { campaignId, batchId, amountOfMasks } = this.state;
        if (campaignId > 0 && batchId > 0 && amountOfMasks > 0) {
            await this.props.confirmMasksMade(campaignId, batchId, amountOfMaks);
        }
    }

    render() {
        const { campaignId, batchId, amountOfMasks, submitted } = this.state;
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
                <span className="label">Amount of Masks Made</span>
                <input
                    className="input"
                    type="number"
                    name="amountOfMasks"
                    value={amountOfMasks}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && amountOfMasks == 0 && (
                    <div className="helpBlock">Amount of Masks Made cannot be 0</div>
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
    confirmMasksMade: contractActions.confirmMasksMade
};

const connectedConfirmMasksMade = connect(
    mapState,
    actionCreators
)(ConfirmMasksMade);
export { connectedConfirmMasksMade as ConfirmMasksMade };

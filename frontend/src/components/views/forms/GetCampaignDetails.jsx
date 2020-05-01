import React from "react";
import { connect } from "react-redux";
import { contractActions } from "../../../actions";

class GetCampaignDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignId: 0,
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
        const { campaignId } = this.state;
        if (campaignId > 0) {
            await this.props.getCampaignDetails(campaignId);
        }
    }

    render() {
        const { campaignId, submitted } = this.state;
        const { inProgress, campaign } = this.props;
        return (
            <div className="getCampaignDetails form">
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
                {!inProgress && submitted && campaign ? (
                    <CampaignDisplay campaign={campaign} />
                ) : null}
            </div>
        );
    }
}

function CampaignDisplay(props) {
    return (
        <div className="campaignDisplay display">
            <span className="label">Coordinator</span>
            <p className="data">{props.campaign.coordinator}</p>
            <span className="label">Couriers</span>
            <ul className="data">
                {props.campaign.couriers.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <span className="label">Manufacturers</span>
            <ul className="data">
                {props.campaign.manufacturers.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <span className="label">Total PLA</span>
            <p className="data">{props.campaign.totalPLA}</p>
        </div>
    );
}

function mapState(state) {
    const { inProgress, campaign } = state.contract;
    return { inProgress, campaign };
}

const actionCreators = {
    getCampaignDetails: contractActions.getCampaignDetails
};

const connectedGetCampaignDetails = connect(
    mapState,
    actionCreators
)(GetCampaignDetails);
export { connectedGetCampaignDetails as GetCampaignDetails };

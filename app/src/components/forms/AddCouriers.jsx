import React from "react";
import { connect } from "react-redux";
import { contractActions } from "../../actions";

class AddCouriers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            couriers: [],
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
            couriers: [],
            campaignId: 0,
            submitted: false
        });
    }

    handleChange(event) {
        let { name, value } = event.target;
        value = value.trim();
        if (["couriers", "couriers"].includes(name)) {
            value = value.split(",").map(val => val.trim());
        }
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
        const { couriers, campaignId } = this.state;
        if (couriers.length != 0 && campaignId > 0) {
            await this.props.addCouriers(this.state);
        }
    }

    render() {
        const { couriers, campaignId, submitted } = this.state;
        return (
            <div className="addCouriers form">
                <span className="label">Couriers Addresses</span>
                <input
                    className="input"
                    type="text"
                    name="couriers"
                    value={couriers}
                    placeholder="0x..., 0x..., ..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && couriers.length == 0 && (
                    <div className="helpBlock">Couriers Address Required</div>
                )}
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
                            Add
                        </a>
                    </div>
                    <div className="cancel">
                        <a href="#" onClick={this.clearForm}>
                            Clear
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    addCouriers: contractActions.addCouriers
};

const connectedAddCouriers = connect(mapState, actionCreators)(AddCouriers);
export { connectedAddCouriers as AddCouriers };

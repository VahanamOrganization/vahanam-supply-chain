import React from "react";
import { connect } from "react-redux";
import { contractActions } from "../../actions";

class StartCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            couriers: [],
            receiver: "",
            totalPLA: 0,
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
            manufacturers: [],
            couriers: [],
            receiver: "",
            totalPLA: 0,
            submitted: false
        });
    }

    handleChange(event) {
        let { name, value } = event.target;
        value = value.trim();
        if (["couriers", "manufacturers"].includes(name)) {
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
        const { couriers, manufacturers, receiver, totalPLA } = this.state;
        if (
            couriers.length != 0 &&
            manufacturers.length != 0 &&
            receiver &&
            totalPLA > 0
        ) {
            await this.props.startCampaign(this.state);
        }
    }

    render() {
        const {
            manufacturers,
            couriers,
            receiver,
            totalPLA,
            submitted
        } = this.state;
        return (
            <div className="startCampaign form">
                <span className="label">Courier Addresses</span>
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
                    <div className="helpBlock">Courier Address Required</div>
                )}
                <span className="label">Manufacturer Addresses</span>
                <input
                    className="input"
                    type="text"
                    name="manufacturers"
                    value={manufacturers}
                    placeholder="0x..., 0x..., ..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && manufacturers.length == 0 && (
                    <div className="helpBlock">
                        Manufacturer Address Required
                    </div>
                )}
                <span className="label">Receiver Address</span>
                <input
                    className="input"
                    type="text"
                    name="receiver"
                    value={receiver}
                    placeholder="0x..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && !receiver && (
                    <div className="helpBlock">Receiver Address Required</div>
                )}
                <span className="label">Total PLA</span>
                <input
                    className="input"
                    type="number"
                    name="totalPLA"
                    value={totalPLA}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && totalPLA == 0 && (
                    <div className="helpBlock">Total PLA cannot be 0</div>
                )}
                <div className="submitForm">
                    <div className="submit">
                        <a href="#" onClick={this.handleSubmit}>
                            Start
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
    startCampaign: contractActions.startCampaign
};

const connectedStartCampaign = connect(mapState, actionCreators)(StartCampaign);
export { connectedStartCampaign as StartCampaign };

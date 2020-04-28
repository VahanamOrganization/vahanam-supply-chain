import React from "react";
import { connect } from "react-redux";
import { contractActions } from "../../../actions";

class CreateNewBatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignId: 0,
            amountOfPLA: 0,
            expectedAmountOfMasks: 0,
            tfForDeliveryToManufacturer: 0,
            tfForMakingMasks: 0,
            tfForDeliveryToReciver: 0,
            courier1: "",
            courier2: "",
            manufacturer: "",
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
            amountOfPLA: 0,
            expectedAmountOfMasks: 0,
            tfForDeliveryToManufacturer: 0,
            tfForMakingMasks: 0,
            tfForDeliveryToReciver: 0,
            courier1: "",
            courier2: "",
            manufacturer: "",
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
            await this.props.createNewBatch(this.state);
        }
    }

    render() {
        const {
            campaignId,
            amountOfPLA,
            expectedAmountOfMasks,
            tfForDeliveryToManufacturer,
            tfForMakingMasks,
            tfForDeliveryToReciver,
            courier1,
            courier2,
            manufacturer,
            submitted
        } = this.state;
        return (
            <div className="createNewBatch form">
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
                <span className="label">Amount of PLA</span>
                <input
                    className="input"
                    type="number"
                    name="amountOfPLA"
                    value={amountOfPLA}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && totalPLA == 0 && (
                    <div className="helpBlock">Amount of PLA cannot be 0</div>
                )}
                <span className="label">Expected Amount of Masks</span>
                <input
                    className="input"
                    type="number"
                    name="expectedAmountOfMasks"
                    value={expectedAmountOfMasks}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && totalPLA == 0 && (
                    <div className="helpBlock">
                        Expected Amount of Masks cannot be 0
                    </div>
                )}
                <span className="label">Courier 1 Address</span>
                <input
                    className="input"
                    type="text"
                    name="courier1"
                    value={courier1}
                    placeholder="0x..., 0x..., ..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && !courier1 && (
                    <div className="helpBlock">Courier 1 Address Required</div>
                )}
                <span className="label">Courier 2 Address</span>
                <input
                    className="input"
                    type="text"
                    name="courier2"
                    value={courier2}
                    placeholder="0x..., 0x..., ..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && !courier2 && (
                    <div className="helpBlock">Courier 2 Address Required</div>
                )}
                <span className="label">Manufacturer Address</span>
                <input
                    className="input"
                    type="text"
                    name="manufacturer"
                    value={manufacturer}
                    placeholder="0x..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && !receiver && (
                    <div className="helpBlock">
                        Manufacturer Address Required
                    </div>
                )}
                <div className="submitForm">
                    <a href="#" onClick={this.handleSubmit}>
                        Create
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
    createNewBatch: contractActions.createNewBatch
};

const connectedCreateNewBatch = connect(
    mapState,
    actionCreators
)(CreateNewBatch);
export { connectedCreateNewBatch as CreateNewBatch };

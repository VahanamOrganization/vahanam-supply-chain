import React from "react";
import * as Forms from "../forms";

class ManufacturerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: "0"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="manufacturerView view ">
                <div className="manufacturerViewInner viewInner">
                    <select
                        name="form"
                        className="chooseForm"
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                        defaultValue="0"
                    >
                        <option value="0">Get Campaign Details</option>
                        <option value="1">Get Batch Details</option>
                        <option value="2">Confirm PLA Received</option>
                        <option value="3">Confirm Masks Made</option>
                        <option value="4">Confirm Masks Picked Up</option>
                    </select>
                    <DisplayForm form={this.state.form} />
                </div>
            </div>
        );
    }
}

function DisplayForm(props) {
    switch (props.form) {
        case "0":
            return <Forms.GetCampaignDetails />;
        case "1":
            return <Forms.GetBatchDetails />;
        case "2":
            return <Forms.ConfirmPLAReceived />;
        case "3":
            return <Forms.ConfirmMasksMade />;
        case "4":
            return <Forms.ConfirmMasksPickUp />;
        default:
            return <Forms.GetCampaignDetails />;
    }
}

export { ManufacturerView };

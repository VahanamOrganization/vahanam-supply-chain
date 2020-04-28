import React from "react";
import * as Forms from "./forms";

class CoordinatorView extends React.Component {
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
            <div className="coordinatorView view ">
                <div className="coordinatorViewInner viewInner">
                    <select
                        name="form"
                        className="chooseForm"
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                        defaultValue="0"
                    >
                        <option value="0">Start Campaign</option>
                        <option value="1">Get Campaign Details</option>
                        <option value="2">Add Manufacturers</option>
                        <option value="3">Add Couriers</option>
                        <option value="4">Create New Batch</option>
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
            return <Forms.StartCampaign />;
        case "1":
            return <Forms.GetCampaignDetails />;
        case "2":
            return <Forms.AddManufacturers />;
        case "3":
            return <Forms.AddCouriers />;
        case "4":
            return <Forms.CreateNewBatch />;
        default:
            return <Forms.StartCampaign />;
    }
}

export { CoordinatorView };

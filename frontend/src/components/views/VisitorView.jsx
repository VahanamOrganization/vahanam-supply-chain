import React from "react";
import * as Forms from "../forms";

class VisitorView extends React.Component {
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
            <div className="visitorView view ">
                <div className="visitorViewInner viewInner">
                    <select
                        name="form"
                        className="chooseForm"
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                        defaultValue="0"
                    >
                        <option value="0">Get Campaign Details</option>
                        <option value="1">Get Batch Details</option>
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
        default:
            return <Forms.GetCampaignDetails />;
    }
}

export { VisitorView };

import React from "react";
import { connect } from "react-redux";
import { contractActions } from "../../../actions";

class StartCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
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

    handleSubmit(event) {
        event.preventDefault();
        this.setState({  submitted: true });
        const { address } = this.state;
        if (address) {
            this.props.startCampaign(address);
        }
    }

    render() {
        const { address, submitted } = this.state;
        return (
            <div className="startCampaign">
                <span className="title">Make Coordinator</span>
                <span className="label">Coordinator Address</span>
                <input
                    className="input"
                    type="text"
                    name="address"
                    placeholder="0x..."
                    value={address}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                {submitted && !address && (
                    <div className="helpBlock">
                        Coordinator Address Required
                    </div>
                )}
                <div className="submitForm">
                    <a href="#" onClick={this.handleSubmit}>
                        Make
                    </a>
                    <a href="#" onClick={ () => this.setState({address:""})}>
                        Clear
                    </a>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return { };
}

const actionCreators = {
    startCampaign: contractActions.startCampaign
};

const connectedStartCampaign = connect(mapState, actionCreators)(StartCampaign);
export { connectedStartCampaign as StartCampaign };

import React from "react";
import { connect } from "react-redux";
import { contractActions } from "../../../actions";
import { contractConstants } from "../../../constants";

class GrantRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            address: "",
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
            role: "",
            address: "",
            submitted: false
        });
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

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { address, role } = this.state;
        if (address && role) {
            await this.props.grantRole(role, address);
        }
    }

    render() {
        const { role, address, submitted } = this.state;
        return (
            <div className="grantRole form">
                <span className="title">Grant Role</span>
                <span className="label">Role</span>
                <select
                    name="role"
                    className="input"
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                    defaultValue="NONE"
                >
                {contractConstants.ROLES.map((role, index) => {
                    if (role === "COORDINATOR") {
                        role = "NONE";
                    } else if (role === "ADMIN") {
                        return;
                    }
                    return (
                        <option key={index} value={role}>{role}</option>
                    );
                })}
                </select>
                {submitted && (!role || role === "NONE") && (
                    <div className="helpBlock">Role is required</div>
                )}
                <span className="label">Address</span>
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
                    <div className="helpBlock">Address is Required</div>
                )}
                <div className="submitForm">
                    <a href="#" onClick={this.handleSubmit}>
                        Make
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
    grantRole: contractActions.grantRole

};

const connectedGrantRole = connect(mapState, actionCreators)(GrantRole);
export { connectedGrantRole as GrantRole };

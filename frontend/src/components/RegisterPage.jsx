import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { contractConstants } from "../constants";
import { authActions } from "../actions";
import loading from "../assets/img/loading.gif";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                displayName: "",
                role: 0,
                password: "",
                confirmPassword: ""
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
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
        this.setState({ submitted: true });
        let { user } = this.state;
        user.address = this.props.account;
        if (
            user.address &&
            user.displayName &&
            user.role &&
            user.role >= 0 &&
            user.password &&
            user.confirmPassword &&
            user.password === user.confirmPassword
        ) {
            this.props.register(user);
        }
    }

    render() {
        const { inProgress, account } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="registerPage page">
                <div className="registerPageInner pageInner">
                    <div className="form">
                        <div className="title">
                            <span>Register</span>
                        </div>
                        <span className="label">Account</span>
                        <input
                            className="account"
                            type="text"
                            name="account"
                            value={account}
                            disabled
                        />
                        {!account && (
                            <div className="helpBlock">
                                MetaMask not connected
                            </div>
                        )}
                        {account && (
                            <div className="successBlock">
                                MetaMask connected
                            </div>
                        )}
                        <span className="label">Display Name</span>
                        <input
                            className="input"
                            type="text"
                            name="displayName"
                            value={user.displayName}
                            onChange={this.handleChange}
                            onKeyPress={this.handleEnter}
                        />
                        {submitted && !user.displayName && (
                            <div className="helpBlock">
                                Display Name is required
                            </div>
                        )}
                        <span className="label">Role</span>
                        <select
                            name="role"
                            onChange={this.handleChange}
                            onKeyPress={this.handleEnter}
                            className="input"
                            defaultValue={0}
                        >
                            <option value={0}>NONE</option>
                            {contractConstants.ROLES.map((role, index) => (
                                <option key={index} value={index + 1}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        {submitted && (!user.role || user.role === "0") && (
                            <div className="helpBlock">Role is required</div>
                        )}
                        {/*
                    <span className="label">Phone Number</span>
                    <input
                        className="input"
                        type="tel"
                        name="phone_number"
                        value={user.phone_number}
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                    />
                    {submitted &&
                        (!user.phone_number || user.phone_number === "0") && (
                            <div className="helpBlock">
                                Phone Number is required
                            </div>
                        )}
                    */}
                        <span className="label">Password</span>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={this.handleChange}
                            onKeyPress={this.handleEnter}
                        />
                        {submitted && !user.password && (
                            <div className="helpBlock">
                                Password is required
                            </div>
                        )}
                        <span className="label">Confirm Password</span>
                        <input
                            className="input"
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={this.handleChange}
                            onKeyPress={this.handleEnter}
                        />
                        {submitted &&
                            ((!user.confirmPassword && (
                                <div className="helpBlock">
                                    Confirm Password is required
                                </div>
                            )) ||
                                (user.confirmPassword !== user.password && (
                                    <div className="helpBlock">
                                        Passwords don't match
                                    </div>
                                )))}
                        <div className="submitForm">
                            <div className="submit">
                                <a href="#" onClick={this.handleSubmit}>
                                    Register
                                </a>
                            </div>
                            <div className="cancel">
                                <Link to="/login">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { account } = state.web3;
    let inProgress = state.web3.inProgress || state.authentication.inProgress;
    return { inProgress, account };
}

const actionCreators = {
    register: authActions.register
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };

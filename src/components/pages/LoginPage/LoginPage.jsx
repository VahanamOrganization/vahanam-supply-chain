import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../../../helpers";

import { web3Actions, authActions } from "../../../actions";
import loading from "../../../assets/img/loading.gif";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.logout();
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.props.loadWeb3();
        await this.props.loadAccount();
        history.push("/");
    }

    render() {
        console.log(this.props);
        return (
            <div className="loginPage">
                <div className="loginPageInner">
                    <span className="title">3D Printed Masks</span>
                    <img
                        src={loading}
                        style={
                            this.props.inProgress
                                ? { opacity: 1 }
                                : { opacity: 0 }
                        }
                    />
                    <a className="login" href="#" onClick={this.handleSubmit}>
                        Login with MetaMask
                    </a>
                    <Link className="register" to="/register">
                        Register
                    </Link>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { inProgress } = state.web3;
    return { inProgress };
}

const actionCreators = {
    loadWeb3: web3Actions.load,
    loadAccount: web3Actions.account,
    logout: authActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };

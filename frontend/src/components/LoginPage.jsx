import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../helpers";
import { contractActions, web3Actions, authActions } from "../actions";
import loading from "../assets/img/loading.gif";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    componentDidMount() {
        this.props.logout();
    }

    handleChange(event) {
        let { name, value } = event.target;
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
        const { password } = this.state;
        const { account } = this.props;
        if (account && password) {
            await this.props.login(account, password);
        }
    }

    render() {
        const { inProgress, account } = this.props;
        const { password, submitted } = this.state;
        return (
            <div className="loginPage">
                <div className="loginPageInner">
                    <div className="title">
                        <span>3D Printed Masks</span>
                        <img
                            src={loading}
                            style={inProgress ? { opacity: 1 } : { opacity: 0 }}
                        />
                    </div>
                    <div className="loginForm form">
                    <a className="login" href="#" onClick={this.handleSubmit}>
                        Login with MetaMask
                    </a>
                    <Link className="register" to="/register">
                        Register
                    </Link>
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
    login: authActions.login,
    logout: authActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };

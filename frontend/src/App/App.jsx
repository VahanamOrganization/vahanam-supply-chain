import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { history } from "../helpers";
import { web3Actions } from "../actions";
import { PrivateRoute, HomePage, ProfilePage, NavBar, LoginPage, RegisterPage, QRCode, CampaignPage, LandingPage } from "../components";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.accountChanged = this.accountChanged.bind(this);
        this.networkChanged = this.networkChanged.bind(this);
    }

    async accountChanged() {
        if (this.props.web3) {
            await this.props.loadAccount();
        }
        if (!["/login", "/register"].includes(history.location.pathname)){
            history.push("/login");
        }
    }
    async networkChanged() {
        if (this.props.web3) {
            await this.props.loadNetwork();
        }
        if (!["/login", "/register"].includes(history.location.pathname)){
            history.push("/login");
        }
    }

    componentDidMount() {
        if (window.ethereum) {
            window.ethereum.autoRefreshOnNetworkChange = false;
            window.ethereum.on("accountsChanged", this.accountChanged);
            window.ethereum.on("networkChanged", this.networkChanged);
        }
        this.props.loadWeb3();
    }

    render() {
        return (
            <div className="app">
                <ToastContainer closeButton={false} autoClose={5000}/>
                <QRCode open={this.props.open}/>
                <Router history={history}>
                    <NavBar />
                    <Switch>
                        <PrivateRoute exact path="/home" component={HomePage} />
                        <PrivateRoute exact path="/profile" component={ProfilePage} />
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/campaign/:id" component={CampaignPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    const { web3 } = state.web3;
    const { open } = state.qrCode;
    return { web3, open };
}

const actionCreators = {
    loadWeb3: web3Actions.loadWeb3,
    loadAccount: web3Actions.loadAccount,
    loadNetwork: web3Actions.loadNetwork
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

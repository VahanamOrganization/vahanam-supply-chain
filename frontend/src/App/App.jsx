import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { history } from "../helpers";
import { alertActions } from "../actions";
import { PrivateRoute } from "../components";
import { HomePage } from "../components/HomePage";
import { LoginPage } from "../components/LoginPage";
import { RegisterPage } from "../components/RegisterPage";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (window.ethereum) {
            window.ethereum.autoRefreshOnNetworkChange = false;
            window.ethereum.on("accountsChanged", function(accounts) {
                history.push("/login");
            });
            window.ethereum.on("networkChanged", function(accounts) {
                history.push("/login");
            });
        }
    }

    render() {
        return (
            <div className="app">
                <ToastContainer closeButton={false} autoClose={2000}/>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

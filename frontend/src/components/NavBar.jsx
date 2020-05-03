import React from "react";
import config from "config";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { contractActions } from "../actions";
import loading from "../assets/img/loading.gif";
import profile from "../assets/img/profile.png";
import * as Views from "./views";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.sliderInner = React.createRef;
        this.state = {
            open: false
        };
    }

    toggleOpen(event) {
        event.preventDefault();
        if (true) {
            console.log(event.target);
            this.setState({ open: !this.state.open });
        }
    }

    render() {
        const { account, user, loggedIn, role, inProgress } = this.props;
        return (
            <div className="navBar">
                <div className="topBar">
                    <div className="logoContainer">3d Printed Masks</div>
                    <div className="iconContainer">
                        <img
                            className="loading"
                            src={loading}
                            style={inProgress ? { opacity: 1 } : { opacity: 0 }}
                        />
                        <div className="navToggle" onClick={this.toggleOpen}>
                            {this.state.open ? "\u2715" : "\u2630"}
                        </div>
                    </div>
                </div>
                <div
                    className={this.state.open ? "slider open" : "slider"}
                    onClick={this.toggleOpen}
                >
                    {loggedIn ? (
                        <div className="sliderInner" ref={this.sliderInner}>
                            <Link className="user" to="/profile">
                                <img
                                    className="profile"
                                    src={profile}
                                />
                                <span className="displayName">
                                    {user.displayName}
                                </span>
                            </Link>
                            <NavLink activeClassName="active" exact to="/">
                                Home
                            </NavLink>
                            <NavLink activeClassName="active" exact to="/login">
                                Logout
                            </NavLink>
                        </div>
                    ) : (
                        <div className="sliderInner" ref={this.sliderInner}>
                            <NavLink activeClassName="active" exact to="/">
                                Home
                            </NavLink>
                            <NavLink activeClassName="active" exact to="/login">
                                Login
                            </NavLink>
                            <NavLink
                                activeClassName="active"
                                exact
                                to="/register"
                            >
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
function mapState(state) {
    const { role } = state.contract;
    const { account } = state.web3;
    const { user, loggedIn } = state.authentication;
    const inProgress =
        state.contract.inProgress ||
        state.authentication.inProgress ||
        state.web3.inProgress;
    return { account, user, loggedIn, role, inProgress };
}

const actionCreators = {};

const connectedNavBar = connect(mapState, actionCreators)(NavBar);
export { connectedNavBar as NavBar };

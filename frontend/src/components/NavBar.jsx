import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { contractActions } from "../actions";
import loading from "../assets/img/loading.gif";
import homeIcon from "../assets/img/home.png";
import chatIcon from "../assets/img/chat.png";
import profileIcon from "../assets/img/profile.png";
import searchIcon from "../assets/img/search.png";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loggedIn, inProgress } = this.props;
        return (
            <div className="navBar">
                <img
                    className="loading"
                    src={loading}
                    style={inProgress ? { opacity: 1 } : { opacity: 0 }}
                />
                <div className="bottomBar">
                    {loggedIn ? (
                        <div className="barInner loggedIn">
                            <div className="barIconContainer">
                                <Link to="/">
                                    <img className="barIcon" src={homeIcon} />
                                </Link>
                            </div>
                            <div className="barIconContainer">
                                <Link to="/">
                                    <img className="barIcon" src={searchIcon} />
                                </Link>
                            </div>
                            <div className="barIconContainer plus">
                                <span>{"\uFF0B"}</span>
                            </div>
                            <div className="barIconContainer">
                                <Link to="/profile">
                                    <img className="barIcon" src={chatIcon} />
                                </Link>
                            </div>
                            <div className="barIconContainer">
                                <Link to="/profile">
                                    <img
                                        className="barIcon"
                                        src={profileIcon}
                                    />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="barInner needLogin">
                            <Link to="/login">Login</Link>
                            <Link to="/login">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
function mapState(state) {
    const { loggedIn } = state.box;
    const inProgress =
        state.contract.inProgress ||
        state.box.inProgress ||
        state.web3.inProgress;
    return { loggedIn, inProgress };
}

const actionCreators = {};

const connectedNavBar = connect(mapState, actionCreators)(NavBar);
export { connectedNavBar as NavBar };

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import loading from "../../assets/img/loading.gif";
import { Icon, InlineIcon } from "@iconify/react";
import homeFill from "@iconify/icons-ant-design/home-fill";
import homeOutline from "@iconify/icons-ant-design/home-outlined";
import searchFill from "@iconify/icons-bx/bx-search-alt";
import searchOutline from "@iconify/icons-bx/bx-search";
import chatOutline from "@iconify/icons-bi/chat";
import chatFill from "@iconify/icons-bi/chat-fill";
import profileOutline from "@iconify/icons-bi/person";
import profileFill from "@iconify/icons-bi/person-fill";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: this.props.location.pathname
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.location.pathname !== state.pathname) {
            return {
                pathname: props.location.pathname
            };
        }
        return null;
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
                <div
                    className={
                        this.state.pathname === "/login"
                            ? "bottomBar hidden"
                            : "bottomBar"
                    }
                >
                    {loggedIn ? (
                        <div className="barInner loggedIn">
                            <div className="barIconContainer">
                                <Link to="/home">
                                    <Icon
                                        className="barIcon"
                                        icon={
                                            this.state.pathname === "/home"
                                                ? homeFill
                                                : homeOutline
                                        }
                                    />
                                </Link>
                            </div>
                            <div className="barIconContainer">
                                <Link to="/search">
                                    <Icon
                                        className="barIcon"
                                        icon={
                                            this.state.pathname === "/search"
                                                ? searchFill
                                                : searchOutline
                                        }
                                    />
                                </Link>
                            </div>
                            <div className="barIconContainer plus">
                                <Link to="/actions">
                                    <span>{"\uFF0B"}</span>
                                </Link>
                            </div>
                            <div className="barIconContainer">
                                <Link to="/chat">
                                    <Icon
                                        className="barIcon"
                                        icon={
                                            this.state.pathname === "/chat"
                                                ? chatFill
                                                : chatOutline
                                        }
                                    />
                                </Link>
                            </div>
                            <div className="barIconContainer">
                                <Link to="/profile">
                                    <Icon
                                        className="barIcon"
                                        icon={
                                            this.state.pathname === "/profile"
                                                ? profileFill
                                                : profileOutline
                                        }
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

const connectedNavBar = withRouter(connect(mapState, actionCreators)(NavBar));
export { connectedNavBar as NavBar };

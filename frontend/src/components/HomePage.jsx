import React from "react";
import config from "config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { contractActions } from "../actions";
import loading from "../assets/img/loading.gif";
import * as Views from "./views";
import UserDisplay from "./UserDisplay";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.props.getRole();
    }

    render() {
        const { account, user, role, inProgress } = this.props;
        return (
            <div className="homePage">
                <div className="navBar">
                    <img
                        className="loading"
                        src={loading}
                        style={inProgress ? { opacity: 1 } : { opacity: 0 }}
                    />
                    <div className="user">
                        <UserDisplay address={account} displayName={user.displayName} />
                        <span className="role">{role ? role : ""}</span>
                    </div>
                    <Link to="/login">Logout</Link>
                </div>
                <div className="homePageInner">
                    {inProgress && !role ? (
                        <img className="loading" src={loading} />
                    ) : (
                        <RoleBasedView role={role} />
                    )}
                </div>
            </div>
        );
    }
}

function RoleBasedView(props) {
    switch (props.role) {
        case "ADMIN":
            return <Views.AdminView />;
        case "COORDINATOR":
            return <Views.CoordinatorView />;
        case "COURIER":
            return <Views.CourierView />;
        case "MANUFACTURER":
            return <Views.ManufacturerView />;
        case "RECEIVER":
            return <Views.ReceiverView />;
        default:
            return (
                <p>
                    {" "}
                    You do not have a role assigned.
                    <br />
                    Please contact a local coordinator to get a role assigned.{" "}
                </p>
            );
    }
}

function mapState(state) {
    const { role, inProgress } = state.contract;
    const { account } = state.web3;
    const { user } = state.authentication;
    return { account, user, role, inProgress };
}

const actionCreators = {
    getRole: contractActions.getRole
    //createCampaign: campaignActions.create
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

import React from "react";
import config from "config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { contractActions } from "../actions";
import loading from "../assets/img/loading.gif";
import * as Views from "./views";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.props.getRole();
    }

    render() {
        const { account, contract } = this.props;
        const { role, inProgress } = contract;
        return (
            <div className="homePage">
                <div className="navBar">
                    <img
                        className="loading"
                        src={loading}
                        style={inProgress ? { opacity: 1 } : { opacity: 0 }}
                    />
                    <div className="user">
                        <span className="email">{account}</span>
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
    const { web3, contract } = state;
    const { account } = web3;
    return { account, contract };
}

const actionCreators = {
    getRole: contractActions.getRole
    //createCampaign: campaignActions.create
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

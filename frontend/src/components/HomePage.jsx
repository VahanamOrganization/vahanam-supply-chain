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
        if (this.props.loggedIn) {
            await this.props.getRole();
        }
    }

    render() {
        const { role } = this.props;
        return (
            <div className="homePage page">
                <div className="homePageInner pageInner">
                    <RoleBasedView role={role} />
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
    const { role } = state.contract;
    const { loggedIn } = state.authentication;
    return { role, loggedIn };
}

const actionCreators = {
    getRole: contractActions.getRole
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

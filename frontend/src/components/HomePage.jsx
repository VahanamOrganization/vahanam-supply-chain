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
        case "ROLE NOT FOUND":
            return (
                <div className="view">
                    <div className="viewInner">
                        <div className="display">
                            <span className="label">ROLE NOT FOUND.</span>
                            <p className="data">
                                Please contact a local coordinator to get a role
                                assigned.
                            </p>
                        </div>
                    </div>
                </div>
            );
        default:
            return null;
    }
}

function mapState(state) {
    const { role } = state.contract;
    return { role };
}

const actionCreators = {};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

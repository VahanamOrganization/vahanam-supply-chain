import React from "react";
import config from "config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { campaignActions } from "../../../actions";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getCampaigns();
    }

    handleCreateCampaign(id) {
        return e => this.props.createCampaign(id);
    }

    render() {
        const { account, campaigns } = this.props;
        return (
            <div className="homePage">
                <div className="navBar">
                    <div className="user">
                        <span className="email">{account}</span>
                        {/*
                        <span className="role">
                            {config.roles[parseInt(user.role)]}
                        </span>
                        */}
                    </div>
                    <Link to="/login">Logout</Link>
                </div>
                <h3>All registered campaigns:</h3>
                {campaigns.loading && <em>Loading campaigns...</em>}
                {campaigns.error && (
                    <span className="text-danger">
                        ERROR: {campaigns.error}
                    </span>
                )}
                {campaigns.items && (
                    <div className="campaignsList">
                        {campaigns.items.map((campaign, index) => (
                            <div className="campaignsItem" key={campaign.id}>
                                <p> ID: {campaign.id} </p>
                                <p> Title: {campaign.title} </p>
                                <p> Description: {campaign.description} </p>
                                <p> Account: {campaign.account} </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

function mapState(state) {
    const { campaigns, web3 } = state;
    const { account } = web3;
    return { account, campaigns };
}

const actionCreators = {
    getCampaigns: campaignActions.getAll,
    createCampaign: campaignActions.create
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { web3Actions, boxActions, contractActions } from "../../actions";
import tempProfile from "../../assets/img/profile.webp";
import { getImageUrl, getAccountString } from "../../helpers";
import { Icon } from "@iconify/react";
import copyOutline from "@iconify/icons-ic/outline-content-copy";
import { UserCampaigns } from "../displays";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.init();
    }

    async init() {
        //TODO: remove this extra call
        await this.props.loadWeb3();
        await this.loadData(this.props.match.params.address);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.address != this.props.match.params.address) {
            this.loadData(this.props.match.params.address);
        }
    }

    async loadData(address) {
        await this.props.clean3Box();
        await this.props.cleanDataRole();
        await this.props.getDataProfile(address);
        await this.props.getDataRole(address);
    }

    render() {
        const { profile, role, account, loggedIn } = this.props;
        const address = this.props.match.params.address;
        return (
            <div className="profilePage page">
                {profile && (
                    <div className="profilePageInner pageInner">
                        <div className="titleBar">
                            <div className="photo">
                                {profile.image ? (
                                    <img src={getImageUrl(profile.image)} />
                                ) : (
                                    <img src={tempProfile} />
                                )}
                            </div>
                            <div className="title">
                                <div className="name">{profile.name}</div>
                                <div className="location">
                                    {profile.location}
                                </div>
                                {loggedIn && account === address && (
                                    <Link to="/login" className="logout">
                                        Logout
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="display">
                            <span className="label">Account</span>
                            <p className="data">
                                {getAccountString(address)}{" "}
                                <Icon className="copyIcon" icon={copyOutline} />
                            </p>
                            <span className="label">Role</span>
                            <p className="data">{role}</p>
                        </div>
                        <UserCampaigns address={address} />
                    </div>
                )}
            </div>
        );
    }
}

function mapState(state) {
    const { account } = state.web3;
    const { role } = state.contract.data;
    const { data, loggedIn } = state.box;
    const { profile } = data;
    return { profile, role, account, loggedIn };
}

const actionCreators = {
    loadWeb3: web3Actions.loadWeb3,
    clean3Box: boxActions.clean,
    cleanDataRole: contractActions.cleanDataRole,
    getDataProfile: boxActions.getDataProfile,
    getDataRole: contractActions.getDataRole
};

const connectedProfilePage = connect(mapState, actionCreators)(ProfilePage);
export default connectedProfilePage;

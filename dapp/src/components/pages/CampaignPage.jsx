import React from "react";
import { connect } from "react-redux";
import { contractActions, web3Actions } from "../../actions";
import { Icon, InlineIcon } from "@iconify/react";
import gearIcon from "@iconify/icons-octicon/gear";
import peopleIcon from "@iconify/icons-eva/people-fill";
import detailsIcon from "@iconify/icons-ic/baseline-assignment";
import arrowDownIcon from "@iconify/icons-dashicons/arrow-down-alt2";
import tempCampaign from "../../assets/img/tempCampaign.png";
import { CampaignDetails, PeopleList } from "../displays";

class CampaignPage extends React.Component {
    constructor(props) {
        super(props);
        this.campaignId = this.props.match.params.id;
        this.state = {
            selected: 1
        };
    }

    componentDidMount() {
        this.init();
    }

    async init() {
        this.props.clean();
        await this.props.loadWeb3();
        await this.props.getCampaignDetails(this.campaignId);
    }

    render() {
        const { campaign } = this.props;
        const title = "Campaign SuperNova";
        const description = "We are making masks using 3d printers. You are welcome to join and help!";

        return (
            <div className="campaignPage page">
                {campaign && (
                    <div className="campaignPageInner pageInner">
                        <div className="topBar">
                            <div className="photo">
                                <img src={tempCampaign} />
                            </div>
                            <div className="goal">
                                <span className="data">
                                    {campaign.totalPLA}
                                </span>
                                <span className="label">Total</span>
                            </div>
                            <div className="status">
                                <span className="data">
                                    {campaign.totalPLA - campaign.currentPLA}
                                </span>
                                <span className="label">Packed</span>
                            </div>
                        </div>
                        <div className="titleBar">
                            <div className="title">{title}</div>
                            <div className="description">{description}</div>
                        </div>
                        <div className="actionBar">
                            <div className="action">follow</div>
                            <div className="action">participate</div>
                            <div className="action">message</div>
                            <div className="other">
                                <Icon icon={arrowDownIcon} />
                            </div>
                        </div>
                        <div className="tabBar">
                            <div
                                className={
                                    this.state.selected === 0
                                        ? "tab selected"
                                        : "tab"
                                }
                                onClick={() => this.setState({ selected: 0 })}
                            >
                                <Icon className="tabIcon" icon={gearIcon} />
                            </div>
                            <div
                                className={
                                    this.state.selected === 1
                                        ? "tab selected"
                                        : "tab"
                                }
                                onClick={() => this.setState({ selected: 1 })}
                            >
                                <Icon className="tabIcon" icon={detailsIcon} />
                            </div>
                            <div
                                className={
                                    this.state.selected === 2
                                        ? "tab selected"
                                        : "tab"
                                }
                                onClick={() => this.setState({ selected: 2 })}
                            >
                                <Icon className="tabIcon" icon={peopleIcon} />
                            </div>
                        </div>
                        <div className="tabData">
                            <div
                                className={
                                    this.state.selected === 0
                                        ? "tabDataInner selected"
                                        : "tabDataInner"
                                }
                            >
                                DONATE HERE
                            </div>
                            <div
                                className={
                                    this.state.selected === 1
                                        ? "tabDataInner selected"
                                        : "tabDataInner"
                                }
                            >
                                <CampaignDetails
                                    campaignId={this.campaignId}
                                    campaign={campaign}
                                />
                            </div>
                            <div
                                className={
                                    this.state.selected === 2
                                        ? "tabDataInner selected"
                                        : "tabDataInner"
                                }
                            >
                                <PeopleList campaign={campaign} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

function mapState(state) {
    const { campaign } = state.contract.data;
    return { campaign };
}

const actionCreators = {
    getCampaignDetails: contractActions.getCampaignDetails,
    loadWeb3: web3Actions.loadWeb3,
    clean: contractActions.clean
};

const connectedCampaignPage = connect(mapState, actionCreators)(CampaignPage);
export default connectedCampaignPage;

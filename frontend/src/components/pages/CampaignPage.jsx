import React from "react";
import { connect } from "react-redux";
import { contractActions, web3Actions } from "../../actions";
import { history } from "../../helpers";
import { Icon, InlineIcon } from "@iconify/react";
import gearIcon from "@iconify/icons-octicon/gear";
import peopleIcon from "@iconify/icons-eva/people-fill";
import detailsIcon from "@iconify/icons-ic/baseline-assignment";
import arrowDownIcon from "@iconify/icons-dashicons/arrow-down-alt2";
import tempProfile from "../../assets/img/profile.webp";
import * as Displays from "./displays";

class CampaignPage extends React.Component {
    constructor(props) {
        super(props);
        this.campaignId = this.props.match.params.id;
        this.state = {
            loaded: false,
            selected: 0
        };
    }

    componentDidMount() {
        this.init();
    }

    async init() {
        this.props.clean();
        //TODO: remove this extra call
        await this.props.loadWeb3();
        await this.props.getCampaignDetails(this.campaignId);
        this.setState({ loaded: true });
    }

    render() {
        const { campaign, role, box, account, inProgress } = this.props;
        const title = "Hellas covid19";
        const description = "We are making masks everwhere, yes we are!";
        const status = 50;

        return (
            <div className="campaignPage page">
                {this.state.loaded && !inProgress && campaign && (
                    <div className="campaignPageInner">
                        <div
                            className="back"
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            <span>{"\u2190"}</span>
                        </div>
                        <div className="topBar">
                            <div className="photo">
                                <div className="photoInner">
                                    <img src={tempProfile} />
                                </div>
                            </div>
                            <div className="goal">
                                <span className="data">
                                    {campaign.totalPLA}
                                </span>
                                <span className="label">Goal</span>
                            </div>
                            <div className="status">
                                <span className="data">{status}</span>
                                <span className="label">Status</span>
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
                                <Displays.CampaignDetails
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
                                <Displays.PeopleList
                                    campaign={campaign}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}


function mapState(state) {
    const { role, campaign, inProgress } = state.contract;
    const { account } = state.web3;
    const { box } = state.box;
    return { role, campaign, account, box };
}

const actionCreators = {
    getCampaignDetails: contractActions.getCampaignDetails,
    loadWeb3: web3Actions.loadWeb3,
    clean: contractActions.clean
};

const connectedCampaignPage = connect(mapState, actionCreators)(CampaignPage);
export { connectedCampaignPage as CampaignPage };

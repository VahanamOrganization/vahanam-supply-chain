import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { contractActions } from "../../actions";
import { contractConstants } from "../../constants";
import { getBatchDateString } from "../../helpers";
import { Icon, InlineIcon } from "@iconify/react";
import packageIcon from "@iconify/icons-feather/package";
import tempCampaign from "../../assets/img/tempCampaign.png";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined
        };
        this.setSelected = this.setSelected.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    async init() {
        this.props.clean();
        await this.props.getAllCampaigns();
    }

    setSelected(selected) {
        this.props.cleanDataBatches();
        selected = selected == this.state.selected ? undefined : selected;
        if (selected >= 0) {
            const campaignId = selected + 1;
            const totalBatches = this.props.data.campaigns[selected]
                .totalBatches;

            this.props.getBatches(campaignId, totalBatches);
        }
        this.setState({ selected });
    }

    render() {
        const { campaigns, batches } = this.props.data;
        return (
            <div className="homePage page">
                <div className="homePageInner pageInner">
                    <div className="title">All Campaigns</div>
                    {campaigns &&
                        campaigns.map((campaign, i) => (
                            <div className="campaign" key={i + 1}>
                                <Link
                                    className="inner"
                                    to={"/campaign/" + (i + 1).toString()}
                                >
                                    <div className="photo">
                                        <img src={tempCampaign} />
                                    </div>
                                    <div className="details">
                                        Campaign #{i + 1}
                                        <br />
                                        Total: {campaign.totalPLA}
                                        <br />
                                        Remaining: {campaign.currentPLA}
                                        <br />
                                        Total Batches: {campaign.totalBatches}
                                        <br />
                                    </div>
                                </Link>
                                <div className="links">
                                    <Link
                                        to={"/campaign/" + (i + 1).toString()}
                                    >
                                        View Campaign Details {"\u2197"}
                                    </Link>
                                    {parseInt(campaign.totalBatches) > 0 && (
                                        <span
                                            onClick={() => this.setSelected(i)}
                                        >
                                            {this.state.selected === i
                                                ? "Close Batches \u21A5"
                                                : "View Batches \u21A7"}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={
                                        this.state.selected === i
                                            ? "batches selected"
                                            : "batches"
                                    }
                                >
                                    {batches &&
                                        batches.map((batch, j) => (
                                            <div className="batch" key={j + 1}>
                                                <Link
                                                    to={
                                                        "/batch/" +
                                                        (i + 1).toString() +
                                                        "/" +
                                                        (j + 1).toString()
                                                    }
                                                >
                                                    <div className="batchDetails">
                                                        <Icon
                                                            icon={packageIcon}
                                                            className="icon"
                                                        />
                                                        <div className="inner">
                                                            Batch #{j + 1}
                                                            <br />
                                                            Status:{" "}
                                                            {
                                                                contractConstants
                                                                    .STAGES[
                                                                    parseInt(
                                                                        batch.stage
                                                                    )
                                                                ]
                                                            }
                                                            <br />
                                                            Delivery:{" "}
                                                            {getBatchDateString(
                                                                batch
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="batchLink">
                                                        View Batch Details{" "}
                                                        {"\u2197"}
                                                    </span>
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { data } = state.contract;
    return { data };
}

const actionCreators = {
    getAllCampaigns: contractActions.getAllCampaigns,
    getBatches: contractActions.getBatches,
    cleanDataBatches: contractActions.cleanDataBatches,
    clean: contractActions.clean
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export default connectedHomePage;

import React from "react";
import { connect } from "react-redux";
import { contractActions } from "../../actions";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.init();
    }

    async init() {
        this.props.clean();
        await this.props.getMyCampaigns();
    }

    render() {
        const { campaigns, batches } = this.props.data;
        console.log(campaigns);
        return (
            <div className="homePage page">
                { campaigns && (
                <div className="homePageInner pageInner">
                    <div className="title">Home</div>
                </div>
                )}
            </div>
        );
    }
}

function mapState(state) {
    const { data } = state.contract;
    return { data };
}

const actionCreators = {
    getMyCampaigns: contractActions.getMyCampaigns,
    getMyBatches: contractActions.getMyBatches,
    clean: contractActions.clean
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export default connectedHomePage;

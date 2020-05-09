import React from "react";
import { connect } from "react-redux";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="homePage page">
                <div className="homePageInner pageInner">
                    <div className="title">Home</div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export default connectedHomePage;

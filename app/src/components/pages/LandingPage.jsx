import React from "react";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="landingPage">
                    <div className="title">
                        Welcome to Vahanam
                    </div>
                    <div className="subtitle">
                        A Decentralized Supply Chain
                    </div>
            </div>
        );
    }
}

export default LandingPage;

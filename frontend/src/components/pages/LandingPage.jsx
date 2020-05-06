import React from "react";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="landingPage">
                    <div className="title">
                        Welcome to Decentralised Supply Chain
                    </div>
                    <div className="subtitle">
                        Stop Covid-19
                    </div>
            </div>
        );
    }
}

export default LandingPage;

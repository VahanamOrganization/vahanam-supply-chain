import React from "react";
import * as Forms from "./forms";

class CoordinatorView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="coordinatorView view">
                <div className="coordinatorViewInner viewInner">
                    <Forms.GrantRole />
                </div>
            </div>
        );
    }
}

export { CoordinatorView };

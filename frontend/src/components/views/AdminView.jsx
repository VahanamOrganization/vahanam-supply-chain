import React from "react";
import * as Forms from "./forms";

class AdminView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="adminView view ">
                <div className="adminViewInner viewInner">
                    <Forms.MakeCoordinator />
                </div>
            </div>
        );
    }
}

export { AdminView };

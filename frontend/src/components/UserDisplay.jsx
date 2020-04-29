import React from "react";

export default function UserDisplay(props) {
    return (
        <div className="userDisplay">
            <div className="displayName">{props.displayName}</div>
            <div className="tooltip">
                &#160;Ξ&#160;
                <span className="tooltiptext">{props.address}</span>
            </div>
        </div>
    );
}

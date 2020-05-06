import React from "react";

export const CampaignDetails = (props) => {

    const { campaign } = props;
    return (
        <div className="campaignDetails display">
            <span className="label">Coordinator</span>
            <p className="data">{campaign.coordinator}</p>
            <span className="label">Couriers</span>
            <ul className="data">
                {campaign.couriers.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <span className="label">Manufacturers</span>
            <ul className="data">
                {campaign.manufacturers.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <span className="label">Total PLA</span>
            <p className="data">{campaign.totalPLA}</p>

        </div>
    );
}

import React from "react";
import { connect } from "react-redux";
import { boxActions } from "../../../actions";
import { getImageUrl, getAccountString } from "../../../helpers";
import tempProfile from "../../../assets/img/profile.webp";

class PeopleList extends React.Component {
    constructor(props) {
        super(props);
    }

    async loadContent() {
        this.props.clean();
        const { campaign } = this.props;
        this.accounts = [
            campaign.coordinator,
            campaign.receiver,
            ...campaign.couriers,
            ...campaign.manufacturers
        ];

        await this.props.getProfiles(this.accounts);
    }

    componentDidMount() {
        this.loadContent();
    }

    render() {
        const { campaign, data } = this.props;
        const numCouriers = campaign.couriers.length;
        return (
            <div className="peopleList">
                {data &&
                    data.profiles.map((profile, index) => (
                        <Person
                            key={index.toString()}
                            profile={profile}
                            account={this.accounts[index]}
                            role={
                                index > 1
                                    ? index <= numCouriers + 1
                                        ? "COURIER"
                                        : "MANUFACTURER"
                                    : index == 0
                                    ? "COORDINATOR"
                                    : "RECEIVER"
                            }
                        />
                    ))}
            </div>
        );
    }
}

function Person(props) {
    const { profile, role, account } = props;
    return (
        <div className="person">
            <div className="photo">
                <div className="photoInner">
                    {profile.image && profile.image.length >= 1 ? (
                        <img src={getImageUrl(profile.image)} />
                    ) : (
                        <img src={tempProfile} />
                    )}
                </div>
            </div>
            <div className="details">
                <div className="name">
                    {profile.name ? profile.name : getAccountString(account)}
                </div>
                <div className="role">{role}</div>
            </div>
        </div>
    );
}

function mapState(state) {
    const { data } = state.box;
    return { data };
}

const actionCreators = {
    clean: boxActions.clean,
    getProfiles: boxActions.getProfiles
};

const connectedPeopleList = connect(mapState, actionCreators)(PeopleList);
export { connectedPeopleList as PeopleList };

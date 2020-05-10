import React from "react";
import QRCode from "qrcode";
import { getQRString } from "../../helpers";
import { contractConstants } from "../../constants";

export class BatchDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dataURI: ""
        };
    }
    async componentDidMount() {
        const qrString = getQRString(this.props.campaignId, this.props.batchId);
        const dataURI = await QRCode.toDataURL(qrString);
        this.setState({ loaded: true, dataURI });
    }
    render() {
        const { batch, batchId, campaignId } = this.props;
        return (
            <div className="batchDetails">
                {/*this.state.loaded ? (
                    <img
                        className="qrcode"
                        alt="qrcode"
                        src={this.state.dataURI}
                    />
                ) : null*/}
                <span className="label">Stage</span>
                <p className="data">
                    {batch.stage +
                        " => " +
                        contractConstants.STAGES[batch.stage]}
                </p>
                <span className="label">Amount of PLA</span>
                <p className="data">{batch.amountOfPLA}</p>
                <span className="label">Expected Amount of Masks</span>
                <p className="data">{batch.amountOfMasksMade}</p>
                <span className="label">Expected Date of PLA Delivery</span>
                <p className="data">
                    {new Date(
                        batch.tfForDeliveryToManufacturer * 1000
                    ).toString()}
                </p>
                <span className="label">Expected Date of Masks Made</span>
                <p className="data">
                    {new Date(
                        batch.tfForMakingMasks * 1000
                    ).toString()}
                </p>
                <span className="label">Expected Date of Masks Delivery</span>
                <p className="data">
                    {new Date(
                        batch.tfForDeliveryToReciver * 1000
                    ).toString()}
                </p>
                <span className="label">Courier 1</span>
                <p className="data">{batch.courier1}</p>
                <span className="label">Courier 2</span>
                <p className="data">{batch.courier2}</p>
                <span className="label">Manufacturer</span>
                <p className="data">{batch.manufacturer}</p>
            </div>
        );
    }
}

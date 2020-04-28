import React from "react";
import config from "config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { contractActions } from "../../actions";

class ManufacturerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
        this.setState({
            [name]: value
        });
    }

    handleEnter(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            //13 is the enter keycode
            this.handleSubmit(e);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({  submitted: true });
        const { address } = this.state;
        if (address) {
            this.props.makeManufacturer(address);
        }
    }

    render() {
        const { address, submitted } = this.state;
        return (
            <div className="manufacturerView">
                <div className="manufacturerViewInner">
                    <span className="title">Manufacturer</span>
                    {/*
                    <span className="label">Manufacturer Address</span>
                    <input
                        className="input"
                        type="text"
                        name="address"
                        placeholder="0x..."
                        value={address}
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                    />
                    {submitted && !address && (
                        <div className="helpBlock">
                            Manufacturer Address Required
                        </div>
                    )}
                    <div className="submitForm">
                            <a href="#" onClick={this.handleSubmit}>
                                Make
                            </a>
                            <a href="#" onClick={ () => this.setState({address:""})}>
                                Clear
                            </a>
                    </div>
                    */}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return { };
}

const actionCreators = {
    makeManufacturer: contractActions.makeManufacturer
};

const connectedManufacturerView = connect(mapState, actionCreators)(ManufacturerView);
export { connectedManufacturerView as ManufacturerView };

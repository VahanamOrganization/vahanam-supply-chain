import React from "react";
import config from "config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { contractActions } from "../../actions";

class CourierView extends React.Component {
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
            this.props.makeCourier(address);
        }
    }

    render() {
        const { address, submitted } = this.state;
        return (
            <div className="courierView">
                <div className="courierViewInner">
                    <span className="title">Courier</span>
                    {/*
                    <span className="label">Courier Address</span>
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
                            Courier Address Required
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
    makeCourier: contractActions.makeCourier
};

const connectedCourierView = connect(mapState, actionCreators)(CourierView);
export { connectedCourierView as CourierView };

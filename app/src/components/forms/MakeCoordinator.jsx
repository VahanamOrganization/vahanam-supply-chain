import React from "react";
import { connect } from "react-redux";
import { contractActions } from "../../actions";

class MakeCoordinator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    clearForm(event) {
        event.preventDefault();
        this.setState({
            address: "",
            submitted: false
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
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

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({  submitted: true });
        const { address } = this.state;
        if (address) {
            await this.props.makeCoordinator(address);
        }
    }

    render() {
        const { address, submitted } = this.state;
        return (
            <div className="makeCoordinator form">
                <span className="label">Coordinator Address</span>
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
                        Coordinator Address is Required
                    </div>
                )}
                <div className="submitForm">
                    <div className="submit">
                        <a href="#" onClick={this.handleSubmit}>
                            Make
                        </a>
                    </div>
                    <div className="cancel">
                        <a href="#" onClick={this.clearForm}>
                            Clear
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return { };
}

const actionCreators = {
    makeCoordinator: contractActions.makeCoordinator
};

const connectedMakeCoordinator = connect(mapState, actionCreators)(MakeCoordinator);
export { connectedMakeCoordinator as MakeCoordinator };

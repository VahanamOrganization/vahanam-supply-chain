import React from "react";
import config from "config";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { account, network } = useSelector(state => state.web3);
    let isPrivateNetwork = account && network == config.networkId;
    return (
        <Route
            {...rest}
            render={props =>
                isPrivateNetwork ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

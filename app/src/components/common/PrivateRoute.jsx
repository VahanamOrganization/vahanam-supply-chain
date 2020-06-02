import React from "react";
import config from "config";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { web3, box } = useSelector(state => state);
    let isCorrectNetwork = web3.account && web3.networkId == config.networkId;
    let isLoggedIn = box.loggedIn;
    return (
        <Route
            {...rest}
            render={props =>
                isCorrectNetwork && isLoggedIn ? (
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

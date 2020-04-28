import React from "react";
import config from "config";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { web3, authentication } = useSelector(state => state);
    let isCorrectNetwork = web3.account && web3.networkId == config.networkId;
    let isLoggedIn = authentication.loggedIn && authentication.user;
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

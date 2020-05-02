import config from "config";
import { authHeader } from "../helpers";

export const authService = {
    login,
    logout,
    register
};

function login(username, password) {
    return {displayName: "displayName", address: username}
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/login/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem("user", JSON.stringify(user));
            return user;
        });
}

export function logout() {
    return;
    // remove user from local storage to log user out
    //localStorage.removeItem("user");
    const requestOptions = {
        method: "POST"
    };

    return fetch(`${config.apiUrl}/logout/`, requestOptions);
}

function register(user) {
    // TODO: Remove this additionalData
    user = {
        ...user,
        additionalData: {
            test: true
        }
    };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/signup/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem("user", JSON.stringify(user));

            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            let error = (data && data.message) || response.statusText;
            if (text.includes("UNIQUE")) {
                if (text.includes("accounts_account.address")) {
                    error = "Account already registered";
                } else if (text.includes("accounts_account.displayName")) {
                    error = "Display Name already taken";
                }
            }
            return Promise.reject(error);
        }
        const data = text && JSON.parse(text);
        if (!data.address) {
            return Promise.reject("Login failed");
        }
        return data;
    });
}

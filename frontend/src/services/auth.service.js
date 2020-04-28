import config from "config";
import { authHeader } from "../helpers";

export const authService = {
    login,
    logout,
    register
};

function login(username, password) {
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
    // remove user from local storage to log user out
    //localStorage.removeItem("user");
    const requestOptions = {
        method: "POST"
    };

    return fetch(`${config.apiUrl}/logout/`, requestOptions);
}

function register(user) {
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
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (!data.address) {
            return Promise.reject("Login failed");
        }
        return data;
    });
}

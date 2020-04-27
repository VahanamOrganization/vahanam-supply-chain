import config from "config";
import { authHeader } from "../helpers";
import { logout } from "./auth.service";

export const campaignService = {
    getAll,
    create
};

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/campaigns`, requestOptions).then(
        handleResponse
    );
}

function create(user) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/campaignts/create`, requestOptions).then(
        handleResponse
    );
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

        return data;
    });
}

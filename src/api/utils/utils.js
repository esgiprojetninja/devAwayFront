/* global window, fetch */
import "isomorphic-fetch";

export const API_VERSION = "v1";

export const dataToGetParams = (params) => {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
};

export const defaultErrorHandler = (err) => {
    return Promise.resolve({
        hasError: true,
        message: (err && err.message) ? err.message : "Unknown server error",
    });
};

export function generateFetch(entity, verb, id, data) {
    const baseUrl = process.env.REACT_APP_API_URL;
    const token = window.localStorage.getItem("authToken");
    let url = `https://${baseUrl}/api/${API_VERSION}/${entity}`;
    if (id) {
        url = `${url}/${id}`;
    }
    return fetch(`${url}`, {
        method: verb,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`, // eslint-disable-line
        },
        mode: "cors", // no-cors, cors, *same-origin
        redirect: "error", // manual, *follow, error
        referrer: "no-referrer", // *client, no-referrer
        body: JSON.stringify(data)
    }).then((response) => {
        if (!response.ok) {
            return Promise.resolve({
                hasError: true,
                message: response.statusText
            });
        }
        return response.json();
    }).catch(defaultErrorHandler);
}

export function generateAnonymousFetch(
    path,
    verb,
    data,
    param
) {
    const baseUrl = process.env.REACT_APP_API_URL;
    let url = `https://${baseUrl}/api/${API_VERSION}/${path}`;
    if (param) {
        url = `${url}/${param}`;
    }
    return fetch(url, {
        method: verb,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        mode: "cors", // no-cors, cors, *same-origin
        redirect: "error", // manual, *follow, error
        referrer: "no-referrer", // *client, no-referrer
        body: JSON.stringify(data)
    }).then((response) => {
        if (!response.ok) {
            return Promise.resolve({
                hasError: true,
                message: response.statusText
            });
        }
        return response.json();
    }).catch(defaultErrorHandler);
}


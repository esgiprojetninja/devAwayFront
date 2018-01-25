/* global window, fetch */
import "isomorphic-fetch";


export function generateFetch(entity, verb, id, data, format) {
    const baseUrl = process.env.REACT_APP_API_URL;
    const token = window.localStorage.getItem("authToken");
    const isJson = (verb === "DELETE" || format === "json") ? "" : ".json";
    const protocole = process.env.NODE_ENV === "development" ? "http" : "https";
    let url = `${protocole}://${baseUrl}/api/${entity}`;
    if (id) {
        url = `${url}/${id}`;
    }
    return fetch(`${url}${isJson}`, {
        method: verb,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (!response.ok) {
            return Promise.resolve({
                hasError: true,
                message: response.statusText
            });
        }
        return response.json();
    });
}

export function generateAnonymousFetch(
    path,
    verb,
    data,
    param,
    isJson
) {
    const baseUrl = process.env.REACT_APP_API_URL;
    const protocole = process.env.NODE_ENV === "development" ? "http" : "https";
    let url = `${protocole}://${baseUrl}/api/${path}`;
    if (param) {
        url = `${url}/${param}`;
    }
    if (isJson) {
        url = `${url}.json`;
    }
    return fetch(url, {
        method: verb,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (!response.ok) {
            return Promise.resolve({
                hasError: true,
                message: response.statusText
            });
        }
        return response.json();
    });
}


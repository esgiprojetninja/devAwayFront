/* global window */
import "isomorphic-fetch";

const baseUrl = process.env.REACT_APP_API_URL;

// This file is meant to export more than one util
// TODO: remove eslint-disable comments
/* eslint-disable */
export function generateFetch(entity, verb, id, data) {
    const token = window.localStorage.getItem("authToken");
    const isJson = verb === "DELETE" ? "" : ".json";
    let url = `http://${baseUrl}/api/${entity}`;
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
/* eslint-enable */

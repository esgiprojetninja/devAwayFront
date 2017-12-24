/* global window */
import fetch from "isomorphic-fetch";

import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

const baseUrl = process.env.REACT_APP_API_URL;

function generateFetch(entity, verb, id, data) {
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

export function fetchAll() {
    return generateFetch("accommodations", "GET").then((parsed) => {
        if (parsed.hasError) {
            return parsed;
        }
        const {
            byID,
            data
        } = parseCollectionFromApi(parsed);
        return {
            byID,
            data
        };
    });
}

function create(accommodation) {
    return generateFetch("accommodations", "POST", null, accommodation);
}

function update(accommodation) {
    return generateFetch("accommodations", "PUT", accommodation.id, accommodation);
}


// TODO: check update and create methods when api is ok
export function createOrUpdate(accommodation) {
    return accommodation.id > 0 ? update(accommodation) : create(accommodation);
}

export function deleteItem(id) {
    return generateFetch("accommodations", "DELETE", id);
}

/* global window */
import fetch from "isomorphic-fetch";

import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

const baseUrl = process.env.REACT_APP_API_URL;

export function fetchAll() {
    const token = window.localStorage.getItem("authToken");
    // const req = await fetch(`http://${baseUrl}/api/graphql?${query}`, {
    return fetch(`http://${baseUrl}/api/accommodations`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(
        response => (
            response.json()
        ),
        error => error
    ).then((parsed) => {
        console.log(parsed["hydra:member"]);
        const {
            byID,
            data
        } = parseCollectionFromApi(parsed["hydra:member"]);
        return {
            byID,
            data
        };
    });
}

export const toto = "toto";

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
    }).then(response => (
        response.json()
    )).then((parsed) => {
        const member = parsed["hydra:member"];
        if (member) {
            const {
                byID,
                data
            } = parseCollectionFromApi(member);
            return {
                byID,
                data
            };
        }
        return {
            hasError: true,
            message: parsed.detail
        };
    });
}

export const toto = "toto";

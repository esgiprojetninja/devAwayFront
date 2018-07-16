/* global fetch */
import "isomorphic-fetch";

import {
    defaultErrorHandler,
} from "./utils/utils";

const openMapApi = {
    search: (address) => {
        return fetch(`https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${address}&limit=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            mode: "cors", // no-cors, cors, *same-origin
            redirect: "error", // manual, *follow, error
            referrer: "no-referrer", // *client, no-referrer
        }).then(response => response.json())
            .then(res => Promise.resolve(res[0]))
            .catch(defaultErrorHandler);
    },
};

export default openMapApi;

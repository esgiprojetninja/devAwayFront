/* global fetch */
import "isomorphic-fetch";
import { generateFetch } from "./utils/utils";

const baseUrl = process.env.REACT_APP_API_URL;

const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

const userApi = {
    login: credentials => (fetch(`${protocol}://${baseUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: credentials.username,
            password: credentials.password
        })
    })).then(res => res.json()),

    addUser: user => (fetch(`${protocol}://${baseUrl}/api/users/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })).then(res => res.json()),

    getUser: userId => (fetch(`${protocol}://${baseUrl}/api/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })).then(res => res.json()),

    getAccommodations: userId => generateFetch(`users/${userId}/accommodations`, "GET"),
};

export default userApi;

/* global fetch */
import "isomorphic-fetch";
import { generateFetch, defaultErrorHandler } from "./utils/utils";

const userApi = {
    login: credentials => (fetch(`https://${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: credentials.userName,
            password: credentials.password
        })
    })).then(res => res.json()).catch(defaultErrorHandler),

    upsertUser: (user) => {
        if (user.id || user.id === 0) {
            return generateFetch("users", "PUT", user.id, user);
        }
        return fetch(`https://${process.env.REACT_APP_API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(res => Promise.resolve(res.success))
            .catch(defaultErrorHandler);
    },

    getUser: userId => generateFetch("users", "GET", userId),

    getAccommodations: userId => generateFetch(`users/${userId}/accommodations`, "GET"),
};

export default userApi;

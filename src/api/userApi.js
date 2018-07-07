/* global fetch */
import "isomorphic-fetch";
import { generateFetch } from "./utils/utils";

const userApi = {
    login: credentials => (fetch(`https://${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: credentials.username,
            password: credentials.password
        })
    })).then(res => res.json()),

    upsertUser: (user) => {
        if (user.id || user.id === 0) {
            return generateFetch("users", "PUT", user.id, user);
        }
        return generateFetch("users", "POST", null, user);
    },

    getUser: userId => generateFetch("users", "GET", userId),

    getAccommodations: userId => generateFetch(`users/${userId}/accommodations`, "GET"),
};

export default userApi;

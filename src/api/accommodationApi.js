import fetch from "isomorphic-fetch";

const baseUrl = process.env.REACT_APP_API_URL;

export function fetchAll() {
    const query = `
    {
        accommodations {
            edges {
                node {
                    title
                    id
                 }
            }
        }
    }
    `;
    return fetch(`http://${baseUrl}/api/graphql`, {
        method: "POST",
        "Content-Type": "application/graphql",
        body: JSON.stringify({ query })
    });
}

export const toto = "toto";

import fetch from "isomorphic-fetch";

const baseUrl = process.env.REACT_APP_API_URL;

export async function fetchAll() {
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
    const req = await fetch(`http://${baseUrl}/api/graphql`, {
        method: "POST",
        "Content-Type": "application/graphql",
        body: JSON.stringify({ query })
    });
    const data = req.json();
    return data;
}

export const toto = "toto";

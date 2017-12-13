import fetch from "isomorphic-fetch";

const baseUrl = process.env.REACT_APP_API_URL;

export async function login(credentials) {
    const req = await fetch(`http://${baseUrl}/api/login_check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _username: credentials.username,
            _password: credentials.password
        })
    });
    console.log(req);
    const data = req.json();
    console.log(data);
    return data;
}

export const toto = "toto";

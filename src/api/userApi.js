import fetch from "isomorphic-fetch";

const baseUrl = process.env.REACT_APP_API_URL;

const userApi = {
    login: credentials => (fetch(`http://${baseUrl}/api/login_check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _username: credentials.username,
            _password: credentials.password
        })
    })).then(res => res.json())
};

export default userApi;

/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import userApi from "../../api/userApi";
import { accommodationMock } from "../mock/body/accommodation";

global.fetch = fetchMock;

describe("API user", () => {
    const baseUrl = "toto.poulayman";

    beforeAll(() => {
        process.env.REACT_APP_API_URL = baseUrl;
        global.fetch = fetchMock;
        window.localStorage = {
            getItem: () => "eerzearez",
            setItem: () => "eerzearez",
            removeItem: () => "eerzearez",
        };
        fetchMock.reset();
    });

    it("should login", async () => {
        const data = { username: "chibar", password: "singos" };
        const mockedCall = fetchMock.post(`https://${baseUrl}/api/login`, data);
        await userApi.login(data);
        const body = JSON.parse(mockedCall.lastCall()[1].body);
        expect(body).toEqual({ email: data.username, password: data.password });
    });

    it("should create a USER", async () => {
        const profile = {
            name: "prout",
            POULAY: "man"
        };
        const mockedCall = fetchMock.post(`https://${baseUrl}/api/v1/users`, profile);
        await userApi.upsertUser(profile);
        const body = JSON.parse(mockedCall.lastCall()[1].body);
        expect(body).toEqual(profile);
    });

    it("should update a USER", async () => {
        const user = {
            username: "poulay",
            id: 123,
            lastname: "fongalakwaki",
        };
        const mockedCall = fetchMock.put(`https://${baseUrl}/api/v1/users/123`, user);
        await userApi.upsertUser(user);
        const body = JSON.parse(mockedCall.lastCall()[1].body);
        expect(body).toEqual(user);
    });

    it("should get one user's accommodations", async () => {
        const userId = 123;
        fetchMock.get(`https://${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/accommodations`, [accommodationMock]);
        const res = await userApi.getAccommodations(userId);
        expect(res).toEqual([accommodationMock]);
    });
});

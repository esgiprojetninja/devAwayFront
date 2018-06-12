/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import accommodationApi from "../../api/accommodationApi";
import {
    parseCollectionFromApi
} from "../../parsers/entityParsers";

global.fetch = fetchMock;

describe("API accommodation", () => {
    const baseUrl = "toto.poulayman";

    beforeAll(() => {
        process.env.REACT_APP_API_URL = baseUrl;
        window.localStorage = {
            getItem: () => "coucou"
        };
    });

    it("should check accommodation", async () => {
        const data = [{ id: 100, name: "Toto" }];
        fetchMock.get(`https://${baseUrl}/api/v1/accommodations`, data);
        const res = await accommodationApi.fetchAllWithoutAuth();
        expect(res).toEqual(parseCollectionFromApi(data));
    });

    it("should check create", async () => {
        const data = [{ id: 100, name: "Toto" }];
        fetchMock.post(`https://${baseUrl}/api/v1/accommodations`, data);
        const res = await accommodationApi.createOrUpdate(data);
        expect(res).toEqual(data);
    });

    it("should update", async () => {
        const data = { id: "100", name: "Toto" };
        fetchMock.put(`https://${baseUrl}/api/v1/accommodations/100`, data);
        const res = await accommodationApi.createOrUpdate(data);
        expect(res).toEqual(data);
    });
});

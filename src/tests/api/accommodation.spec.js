/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import accommodationApi from "../../api/accommodationApi";
import {
    parseCollectionFromApi
} from "../../parsers/entityParsers";

global.fetch = fetchMock;

describe("API accommodation", () => {
    const baseUrl = "toto.api";

    beforeAll(() => {
        process.env.REACT_APP_API_URL = baseUrl;
        window.localStorage = {
            getItem: () => "eerzearez"
        };
    });

    it("should check accommodation", (done) => {
        const data = [{ id: 100, name: "Toto" }];
        fetchMock.get(`https://${baseUrl}/api/accommodations.json`, data);
        accommodationApi.fetchAllWithoutAuth().then((res) => {
            expect(res).toEqual(parseCollectionFromApi(data));
            done();
        });
    });

    it("should check create", (done) => {
        const data = [{ id: 100, name: "Toto" }];
        fetchMock.post(`https://${baseUrl}/api/accommodations`, data);
        accommodationApi.createOrUpdate(data).then((res) => {
            expect(res).toEqual(data);
            done();
        });
    });

    it("should update", (done) => {
        const data = { id: "100", name: "Toto" };
        fetchMock.put(`https://${baseUrl}/api/accommodations/100`, data);
        accommodationApi.createOrUpdate(data).then((res) => {
            expect(res).toEqual(data);
            done();
        });
    });
});

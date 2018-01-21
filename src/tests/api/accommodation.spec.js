/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import accommodationApi from "../../api/accommodationApi";
import {
    parseCollectionFromApi
} from "../../parsers/entityParsers";

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
        fetchMock.get(`http://${baseUrl}/api/accommodations.json`, data);
        accommodationApi.fetchAllWithoutAuth().then((res) => {
            expect(res).toEqual(parseCollectionFromApi(data));
            done();
        });
    });
});
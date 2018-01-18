/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import profileApi from "../../api/profileApi";
import {
    parseCollectionFromApi
} from "../../parsers/entityParsers";

describe("API profile", () => {
    const baseUrl = "toto.api";

    beforeAll(() => {
        process.env.REACT_APP_API_URL = "toto.api";
        window.localStorage = {
            getItem: () => "eerzearez"
        };
    });

    it("should fetchAll", (done) => {
        const data = [{ id: 100, name: "Toto" }];
        fetchMock.get(`http://${baseUrl}/api/profiles.json`, data);
        profileApi.fetchAll().then((res) => {
            expect(res).toEqual(parseCollectionFromApi(data));
            done();
        });
    });

    it("should create a profile", (done) => {
        const profile = {
            name: "prout"
        };
        fetchMock.post(`http://${baseUrl}/api/profiles.json`, profile);
        profileApi.createOrUpdate(profile).then((res) => {
            expect(res).toEqual(profile);
            done();
        });
    });

    it("should update a profile", (done) => {
        const profile = {
            id: 1000,
            name: "prout"
        };
        fetchMock.put(`http://${baseUrl}/api/profiles/1000.json`, profile);
        profileApi.createOrUpdate(profile).then((res) => {
            expect(res).toEqual(profile);
            done();
        });
    });

    it("should delete a profile", (done) => {
        fetchMock.delete(`http://${baseUrl}/api/profiles/20`, {});
        profileApi.deleteItem(20).then((res) => {
            expect(res).toEqual({});
            done();
        });
    });

    it("should get me", (done) => {
        fetchMock.get(`http://${baseUrl}/api/users/me.json`, {});
        profileApi.getMe().then((res) => {
            expect(res).toEqual({});
            done();
        });
    });
});

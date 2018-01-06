/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import missionApi from "../../api/missionApi";
import {
    parseCollectionFromApi
} from "../../parsers/entityParsers";

describe("API mission", () => {
    const baseUrl = "toto.api";

    beforeAll(() => {
        process.env.REACT_APP_API_URL = "toto.api";
        window.localStorage = {
            getItem: () => "eerzearez"
        };
    });

    it("should fetchAll", (done) => {
        const data = [{ id: 100, name: "Toto" }];
        fetchMock.get(`http://${baseUrl}/api/missions.json`, data);
        missionApi.fetchAll().then((res) => {
            expect(res).toEqual(parseCollectionFromApi(data));
            done();
        });
    });

    it("should create a mission", (done) => {
        const mission = {
            name: "prout"
        };
        fetchMock.post(`http://${baseUrl}/api/missions.json`, mission);
        missionApi.createOrUpdate(mission).then((res) => {
            expect(res).toEqual(mission);
            done();
        });
    });

    it("should update a mission", (done) => {
        const mission = {
            id: 1000,
            name: "prout"
        };
        fetchMock.put(`http://${baseUrl}/api/missions/1000.json`, mission);
        missionApi.createOrUpdate(mission).then((res) => {
            expect(res).toEqual(mission);
            done();
        });
    });

    it("should delete a mission", (done) => {
        fetchMock.delete(`http://${baseUrl}/api/missions/20`, {});
        missionApi.deleteItem(20).then((res) => {
            expect(res).toEqual({});
            done();
        });
    });
});

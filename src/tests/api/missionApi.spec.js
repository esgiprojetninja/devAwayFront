/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import missionApi from "../../api/missionApi";
import {
    parseCollectionFromApi
} from "../../parsers/entityParsers";

describe("API mission", () => {
    const baseUrl = "toto.api/api/v1";

    beforeAll(() => {
        process.env.REACT_APP_API_URL = "toto.api";
        window.localStorage = {
            getItem: () => "eerzearez"
        };
    });

    it("should fetchAll", (done) => {
        const data = [{ id: 100, name: "Toto" }];
        fetchMock.get(`https://${baseUrl}/missions`, data);
        missionApi.fetchAll().then((res) => {
            expect(res).toEqual(parseCollectionFromApi(data));
            done();
        });
    });

    it("should fetchById", (done) => {
        const data = { id: 123, name: "Toto" };
        fetchMock.get(`https://${baseUrl}/missions/123`, data);
        missionApi.fetchById(123).then((res) => {
            expect(res).toEqual(data);
            done();
        });
    });

    it("should create a mission", async () => {
        const mission = {
            name: "prout",
            success: {
                poulay: "man"
            }
        };
        fetchMock.post(`https://${baseUrl}/missions`, mission);
        const res = await missionApi.createOrUpdate(mission);
        expect(res).toEqual({
            poulay: "man"
        });
    });

    it("should update a mission", (done) => {
        const mission = {
            id: 1000,
            name: "prout"
        };
        fetchMock.put(`https://${baseUrl}/missions/1000`, mission);
        missionApi.createOrUpdate(mission).then((res) => {
            expect(res).toEqual(mission);
            done();
        });
    });

    it("should delete a mission", (done) => {
        fetchMock.delete(`https://${baseUrl}/missions/20`, {});
        missionApi.deleteItem(20).then((res) => {
            expect(res).toEqual({});
            done();
        });
    });

    it("should send a mission candidacy", async () => {
        const mission = {
            poulay: "man"
        };
        fetchMock.post(`https://${baseUrl}/missions/123/apply`, mission);
        const res = await missionApi.addCandidacy(123);
        expect(res).toEqual({
            poulay: "man"
        });
    });

    it("should send a mission candidacy cancelling", async () => {
        const mission = {
            poulay: "man"
        };
        fetchMock.post(`https://${baseUrl}/missions/123/leave`, mission);
        const res = await missionApi.cancelCandidacy(123);
        expect(res).toEqual({
            poulay: "man"
        });
    });

    it("should create a picture", async () => {
        const mission = {
            poulay: "man"
        };
        fetchMock.put(`https://${baseUrl}/missions/123/pictures`, mission);
        const res = await missionApi.upsertPicture({
            mission_id: 123
        });
        expect(res).toEqual({
            poulay: "man"
        });
    });

    it("should update a picture", async () => {
        const mission = {
            poulay: "man"
        };
        fetchMock.put(`https://${baseUrl}/pictures/missions/7687`, mission);
        const res = await missionApi.upsertPicture({
            mission_id: 123,
            id: 7687
        });
        expect(res).toEqual({
            poulay: "man"
        });
    });
});

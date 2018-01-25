/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import messageApi from "../../api/messageApi";
import {
    parseCollectionFromApi
} from "../../parsers/entityParsers";

describe("API message", () => {
    const baseUrl = "toto.api";

    beforeAll(() => {
        process.env.REACT_APP_API_URL = "toto.api";
        window.localStorage = {
            getItem: () => "eerzearez"
        };
    });

    it("should fetchAll", (done) => {
        const data = [{ id: 100, name: "Toto" }];
        fetchMock.get(`https://${baseUrl}/api/messages.json`, data);
        messageApi.fetchAll().then((res) => {
            expect(res).toEqual(parseCollectionFromApi(data));
            done();
        });
    });

    it("should create a message", (done) => {
        const message = {
            name: "prout"
        };
        fetchMock.post(`https://${baseUrl}/api/messages.json`, message);
        messageApi.createOrUpdate(message).then((res) => {
            expect(res).toEqual(message);
            done();
        });
    });

    it("should update a message", (done) => {
        const message = {
            id: 1000,
            name: "prout"
        };
        fetchMock.put(`https://${baseUrl}/api/messages/1000.json`, message);
        messageApi.createOrUpdate(message).then((res) => {
            expect(res).toEqual(message);
            done();
        });
    });

    it("should delete a message", (done) => {
        fetchMock.delete(`https://${baseUrl}/api/messages/20`, {});
        messageApi.deleteItem(20).then((res) => {
            expect(res).toEqual({});
            done();
        });
    });
});

/* eslint-env jest */
/* global window */
import fetchMock from "fetch-mock";
import guardApi from "../../api/guardApi";

describe("API guard", () => {
    const baseUrl = "toto.api";

    beforeAll(() => {
        process.env.REACT_APP_API_URL = baseUrl;
        window.localStorage = {
            getItem: () => "eerzearez"
        };
    });

    it("should check guard", () => {
        fetchMock.post(`https://${baseUrl}/api/v1/guard_code/create`, "123456");
        guardApi.createGuard().then((res) => {
            expect(res).toEqual(123456);
        });
    });
});

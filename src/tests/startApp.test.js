/* eslint-env jest */
/* global document */
import startApp from "../startApp";

it("renders without crashing", () => {
    global.localStorage = {
        getItem: jest.fn()
    };
    startApp(document.createElement("div"));
});

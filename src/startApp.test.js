/* eslint-env jest */
/* global document */
import startApp from "./startApp";

it("renders without crashing", () => {
    startApp(document.createElement("div"));
});

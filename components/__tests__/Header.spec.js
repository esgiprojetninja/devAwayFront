/* eslint-env jest */
import React from "react";
import {shallow} from "enzyme";

import Header from "../Header";

describe("<Header />", function () {
    test("should render", function () {
        const render = () => {
            shallow(<Header user={{}} />);
        };
        expect(render).not.toThrow();
    });
});

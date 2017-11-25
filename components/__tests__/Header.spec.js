/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Header from '../Header';
/* eslint prefer-arrow-callback: "off" */
describe('<Header />', function () {
    test('should render', function () {
        const render = () => {
            shallow(<Header user={{}} />);
        };
        expect(render).not.toThrow();
    });
});

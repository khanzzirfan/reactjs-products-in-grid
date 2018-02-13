import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import EndOfDataComponent from 'src/common/end-of-data-component';

describe("end of data component test", () => {

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<EndOfDataComponent />);
    })

    it("component should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("component should match to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("component should render text correctly", () => {
        expect(wrapper.text()).toEqual("~ end of catalogue ~");
    });

    it("component should render classes correctly", () => {
        expect(wrapper.find('.col-md-12 .text-center').exists()).toBeTruthy();
    });

});
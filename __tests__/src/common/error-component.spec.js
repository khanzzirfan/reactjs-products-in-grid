import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ErrorComponent from 'src/common/error-component';

describe("error component test", () => {

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<ErrorComponent />);
    })

    it("component should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("component should match to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("it should render with correct class names", ()=>{
        expect(wrapper.find('.error-template').exists()).toBeTruthy();
        expect(wrapper.find('.error-details').exists()).toBeTruthy();

        expect(wrapper.find('.error-actions').exists()).toBeTruthy();

    });

    it("it should render with correct text", ()=>{
        expect(wrapper.text()).toContain("404 Not Found");
        expect(wrapper.text()).toContain("Sorry, an error has occured, Requested data not found!");
        expect(wrapper.text()).toContain("Oops!");
    });

});
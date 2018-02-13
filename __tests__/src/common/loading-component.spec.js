import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LoadingComponent from 'src/common/loading-component';

describe("loading component test", () => {

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<LoadingComponent />);
    })

    it("component should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("component should match to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("it should render with correct class names", ()=>{
        expect(wrapper.find('.loading').exists()).toBeTruthy();
        expect(wrapper.find('.loading-bar').exists()).toBeTruthy();
        expect(wrapper.find('.p-2').exists()).toBeTruthy();

        expect(wrapper.find('.text-center').exists()).toBeTruthy();
        expect(wrapper.find('.flex-column').exists()).toBeTruthy();
        expect(wrapper.find('.justify-content-center').exists()).toBeTruthy();
        
        expect(wrapper.find('.loading-bar').length).toBe(4);
    });

    it("it should render with correct text", ()=>{
        expect(wrapper.text()).toContain("Loading....");
        
    });

});
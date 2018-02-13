import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import App from 'src/app/app.js';
import AppContainer from 'src/products/ui/containers/app-container.js';

describe("app test", () => {

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it("component should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("component should match to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("it should render with correct class names", ()=>{
       
        expect(wrapper.find('.fixed-top').exists()).toBeTruthy();
        expect(wrapper.find('.navbar-dark').exists()).toBeTruthy();
        expect(wrapper.find('.navbar-expand-lg').exists()).toBeTruthy();
       
    });

    it(" should render component with app container component", () => {
        expect(wrapper.find(AppContainer).exists()).toBeTruthy();
    });
});
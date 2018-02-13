import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AppHeaderComponent from 'src/common/app-header-component';

describe("app header component test", () => {

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<AppHeaderComponent />);
    });

    it("component should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("component should match to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("it should render with correct class names", ()=>{
       
        expect(wrapper.find('.text-center').exists()).toBeTruthy();
       
    });

    it("it should render with correct text", ()=>{
        expect(wrapper.text()).toContain("Creatella");
        expect(wrapper.text()).toContain("Products grid");
        expect(wrapper.text()).toContain("This is an ecommerce site");
        
    });

});
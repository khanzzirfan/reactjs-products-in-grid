import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SortButtonComponent from 'src/products/ui/components/sort-button-component';

describe("Sort Button Component test", () => {
    let _mockFunc = jest.fn();
    let stubDataProps = {
        onSortClick: _mockFunc,
        sortOption: "Size",
        currentSort: "size"
    };

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<SortButtonComponent {...stubDataProps} />);
    })

    it("component should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("component should match to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it(" should render component with correct props", () => {
        
        expect(wrapper.instance().props.sortOption).toEqual("Size");
        expect(wrapper.instance().props.currentSort).toEqual("size");
    });

    it("it should render class name btn-primary when currentSort is same as sortOption", ()=>{
        expect(wrapper.find('button').length).toEqual(1);
        expect(wrapper.find(".btn .btn-primary").exists()).toBeTruthy();
    })

    it("it should render class name btn-info when currentSort is not same as sortOption", ()=>{
        wrapper.setProps({ currentSort: 'id' });
        expect(wrapper.find('button').length).toEqual(1);
        expect(wrapper.find(".btn .btn-info").exists()).toBeTruthy();
    })

    it("on sort button click, it should call back onSortClick callback function", ()=>{
        let button = wrapper.find('button');
        button.simulate('click');
        expect(_mockFunc).toHaveBeenCalled();
        expect(_mockFunc).toHaveBeenCalledWith("size");
    });
});
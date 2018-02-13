import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProductSortComponent from 'src/products/ui/components/product-sort-component';
import SortButtonComponent from 'src/products/ui/components/sort-button-component';

describe("Sort Button Component test", () => {
    let _mockFunc = jest.fn();
    let stubDataProps = {
        onSortClick: _mockFunc,
        currentSort: "size"
    };

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<ProductSortComponent {...stubDataProps} />);
    })
    
    it("component should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("component should match to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it(" should render component with correct props", () => {
        expect(wrapper.instance().props.currentSort).toEqual("size");
    });

    it(" should render component with correct sort label", () => {
        let label = wrapper.find({id:"sort-label"});
        expect(wrapper.find('h3').exists()).toBeTruthy();
        expect(wrapper.find('.text-md-right .text-center').exists()).toBeTruthy();
        expect(label.text()).toEqual("Sort");
    });

    it(" should render component with 3 sort-button-components", () => {
        expect(wrapper.find(SortButtonComponent).exists()).toBeTruthy();
        expect(wrapper.find(SortButtonComponent).length).toEqual(3);
    });

    it(" should pass down child component props with right sort option", () => {
        let firstSortButton = wrapper.find(SortButtonComponent).first();
        expect(firstSortButton.prop('sortOption')).toBe('Size');
        
        let lastSortButton = wrapper.find(SortButtonComponent).last();
        expect(lastSortButton.prop('sortOption')).toBe('Id');
    });

    
    it(" buttons are places inside a class btn group large", () => {
        expect(wrapper.find('.btn-group .btn-group-lg').exists()).toBeTruthy();
    });
});
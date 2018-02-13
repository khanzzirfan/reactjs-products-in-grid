import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AdvertisementComponent from 'src/products/ui/components/advertisement-component';

describe("Advertisement Component test", () => {

    let stubDataProps = {
        adsId: 10,
    };

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<AdvertisementComponent {...stubDataProps} />);
        
    })

    it("component should exists", ()=>{
        expect(wrapper).toBeDefined();
    })

    it("should render the component with given props", ()=>{
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.instance().props.adsId).toEqual(10);
    });

    it("should render the component with correct image source url props", ()=>{
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.instance().props.adsId).toEqual(10);
        expect(wrapper.find({id:10}).prop('src')).toEqual("/ads/?r=10");

        //should be in center
        expect(wrapper.find(".text-center").exists()).toBeTruthy();

    });
});

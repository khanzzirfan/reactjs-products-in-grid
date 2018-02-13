import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ProductComponent from 'src/products/ui/components/product-component';

describe("Product Component test", () => {

    let stubDataProps = {
        product: {
            "id": "37622-2oagdixqdw3mcf20wudlwyiudi",
            "size": 35,
            "price": 149,
            "face": "(⊙ω⊙)",
            "date": "Sat Feb 10 2018 17:23:46 GMT+1300 (New Zealand Daylight Time)"
        }
    };

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<ProductComponent {...stubDataProps} />);
    })

    it("component should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("component should match to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it(" should render component with correct props", () => {
        expect(wrapper).toMatchSnapshot();
        
        expect(wrapper.instance().props.product.id).toEqual("37622-2oagdixqdw3mcf20wudlwyiudi");
        expect(wrapper.instance().props.product.size).toEqual(35);
        expect(wrapper.instance().props.product.price).toEqual(149);
        expect(wrapper.instance().props.product.face).toEqual("(⊙ω⊙)");
        expect(wrapper.instance().props.product.date).toEqual("Sat Feb 10 2018 17:23:46 GMT+1300 (New Zealand Daylight Time)");
    });

    it("should render the product face once and correct size from props", () => {
        let faceDiv = wrapper.find({ id: "product-face" });
        expect(faceDiv.length).toEqual(1);
        expect(faceDiv.text()).toEqual("(⊙ω⊙)");
        expect(faceDiv.prop('style')).toEqual({fontSize:'35px'});
    });

});
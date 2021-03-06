import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './index';
import BuildControls from '../../components/Burger/BuildControls';

configure({
    adapter: new Adapter()
});

describe('Burger Builder', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
    })

    it('should render build controls when reciving ingredients', () => {
        wrapper.setProps({ ings: { salad: 0} });

        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})
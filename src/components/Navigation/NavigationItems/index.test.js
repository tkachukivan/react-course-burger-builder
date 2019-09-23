import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './index';
import NavItem from './NavItem';

configure({
    adapter: new Adapter()
});

describe('NavigationItems', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render 2 navigation items if not authenticated', ()=> {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render 3 navigation items if authenticated', ()=> {
        wrapper.setProps({ isAuth: true })
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should render logout navigation item if authenticated', ()=> {
        wrapper.setProps({ isAuth: true })
        expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true);
    });
});
import React from 'react';

import classes from './style.module.css';
import NavItem from './NavItem';

const navigationItems = (props) => (
    <ul className={classes.navigation}>
        <NavItem link="/" active>Burger Builder</NavItem>
        <NavItem link="/">Checkout</NavItem>
    </ul>
);

export default navigationItems;
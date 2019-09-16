import React from 'react';

import classes from './style.module.css';
import NavItem from './NavItem';

const navigationItems = (props) => (
    <ul className={classes.navigation}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
        <NavItem link="/auth">Authenticate</NavItem>
    </ul>
);

export default navigationItems;
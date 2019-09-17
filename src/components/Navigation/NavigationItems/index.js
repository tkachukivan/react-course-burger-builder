import React from 'react';

import classes from './style.module.css';
import NavItem from './NavItem';

const navigationItems = (props) => (
    <ul className={classes.navigation}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        {
            !props.isAuth ?
                <NavItem link="/auth">Authenticate</NavItem> :
                <React.Fragment>
                    <NavItem link="/orders">Orders</NavItem>
                    <NavItem link="/logout">Logout</NavItem>
                </React.Fragment>
        }
    </ul>
);

export default navigationItems;
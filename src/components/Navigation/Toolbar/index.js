import React from 'react';

import classes from './style.module.css';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.logo}>
            <Logo />
        </div>
        <nav>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;
import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import Backdrop from '../../UI/Backdrop';
import classes from './style.module.css';

const sideDrawer = (props) => {
    const attachedClasses = [classes.sidedrawer];

    if (props.open) {
        attachedClasses.push(classes.open);
    } else {
        attachedClasses.push(classes.close);
    }

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
};

sideDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    closed: PropTypes.func.isRequired
}

export default sideDrawer;
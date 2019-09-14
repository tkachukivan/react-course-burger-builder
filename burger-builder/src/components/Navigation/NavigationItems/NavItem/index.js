import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './style.module.css'

const navItem = (props) => (
    <li className={classes.item}>
        <NavLink
            to={props.link}
            activeClassName={classes.active}
            exact={props.exact}
        >
            {props.children}
        </NavLink>
    </li>
);

navItem.propTypes = {
    link: PropTypes.string.isRequired,
    exact: PropTypes.bool,
};

export default navItem;
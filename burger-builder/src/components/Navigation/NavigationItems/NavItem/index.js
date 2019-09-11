import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.module.css'

const navItem = (props) => (
    <li className={classes.item}>
        <a
            href={props.link}
            className={props.active ? classes.active : null}
        >
            {props.children}
        </a>
    </li>
);

navItem.propTypes = {
    link: PropTypes.string.isRequired,
    active: PropTypes.bool
};

export default navItem;
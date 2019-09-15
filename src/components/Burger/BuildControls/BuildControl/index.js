import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.module.css';

const buildControl = (props) => (
    <div className={classes.control}>
        <div className={classes.label}>{props.label}</div>
        <button className={classes.less} onClick={props.removed} disabled={props.disabled}>Less</button>
        <button className={classes.more} onClick={props.added}>More</button>
    </div>
);

buildControl.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    removed: PropTypes.func.isRequired,
    added: PropTypes.func.isRequired,
}

export default buildControl;
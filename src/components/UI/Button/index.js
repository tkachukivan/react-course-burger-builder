import React from 'react';

import classes from './style.module.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.button, classes[props.buttonType]].join(' ')}
        onClick={props.clicked}
    >
        {props.children}
    </button>
);

export default button;
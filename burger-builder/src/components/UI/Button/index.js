import React from 'react';

import classes from './style.module.css';

const button = (props) => (
    <button
        className={[classes.button, classes[props.buttonType]].join(' ')}
        onClick={props.clicked}
    >
        {props.children}
    </button>
);

export default button;
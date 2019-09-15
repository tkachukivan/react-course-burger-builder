import React from 'react';

import classes from './style.module.css';

const input = (props) => {
    let inputElement = null;

    const inputClasses= [classes.input];

    if (!props.valid && props.touched) {
        inputClasses.push(classes.invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input
                                {...props.elementConfig}
                                className={inputClasses.join(' ')}
                                value={props.value}
                                onChange={props.changed}
                            />;
            break;
        case 'textarea':
            inputElement = <textarea
                                {...props.elementConfig}
                                className={inputClasses.join(' ')}
                                value={props.value}
                                onChange={props.changed}
                            />;
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {
                        props.elementConfig.options
                            .map((o) => (
                                <option value={o.value} key={o.value}>
                                    {o.displayValue}
                                </option>)
                            )
                    }
                </select>
            );
            break;
        default:
            inputElement = <input
                                {...props.elementConfig}
                                className={inputClasses.join(' ')}
                                value={props.value}
                                onChange={props.changed}
                            />;

    }

    return (
        <div className={classes.wrapper}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
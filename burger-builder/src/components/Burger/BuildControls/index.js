import React from 'react';

import classes from './style.module.css';

import BuildControl from './BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.controls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map((control) => (
                <BuildControl
                    label={control.label}
                    key={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemove(control.type)}
                    disabled={props.disabled[control.type]}
                />))
        }
        <button
            className={classes.order}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >
                ORDER NOW
        </button>
    </div>
);

export default buildControls;
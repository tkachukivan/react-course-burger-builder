import React from 'react';

import classes from './style.module.css';

const order = (props) => {
    const ingredients = Object.keys(props.ingredients)
                                .map((key) => {
                                    return <span
                                        className={classes.ingredient}
                                        key={key}
                                    >
                                        {key} ({props.ingredients[key]})
                                    </span>
                                });

    return (
        <div className={classes.order}>
            <p>Ingredients: { ingredients }</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
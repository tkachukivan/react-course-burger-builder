import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.module.css';

const burgerIngredient = (props) => {
    let ingredient = null;

    if (props.type === 'bread-top') {
        ingredient = (
            <div className={classes['bread-top']}>
                <div className={classes['seeds-1']}></div>
                <div className={classes['seeds-2']}></div>
            </div>
        );
    } else {
        ingredient = <div className={classes[props.type]}></div>;
    }

    return ingredient;
}

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
}

export default burgerIngredient;
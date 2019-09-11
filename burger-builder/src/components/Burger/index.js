import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.module.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => <BurgerIngredient type={igKey} key={igKey + i}/>)
        }).flat();

    if (!transformedIngredients.length) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

burger.propTypes = {
    ingredients: PropTypes.object.isRequired,
};

export default burger;
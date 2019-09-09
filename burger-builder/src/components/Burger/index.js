import React from 'react';

import classes from './style.module.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => <BurgerIngredient type={igKey} key={igKey + i}/>)
        });
    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;
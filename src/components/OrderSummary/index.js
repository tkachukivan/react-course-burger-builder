import React from 'react';

import Button from '../UI/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((key) => {
            return <li key={key}><span className="capitalize">{key}</span>: {props.ingredients[key]}</li>
        })
 
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button buttonType="danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button buttonType="success" clicked={props.purchaseContinued}>Continue</Button>
        </React.Fragment>
    );
}

export default orderSummary;
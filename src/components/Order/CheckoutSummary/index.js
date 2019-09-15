import React from 'react';

import Burger from '../../Burger';
import classes from './style.module.css';
import Button from '../../UI/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.summary}>
            <h1>We hope it tastes well!</h1>
            <div>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                buttonType="danger"
                clicked={props.checkoutCancelled}
            >
                Cancel
            </Button>
            <Button
                buttonType="success"
                clicked={props.checkoutContinued}
            >
                Continue
            </Button>
        </div>
    );
}

export default checkoutSummary;
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/OrderSummary'
import Spinner from '../../components//UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

import axios from '../../axios-orders';
import * as actions from '../../store/actions/';

export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
    const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const initPurchase = () => dispatch(actions.purchaseInit());
    const setAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    const initIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const isPurchasable = (ingredients) => {
        return Object.values(ingredients).some((value) => value > 0);
    }

    const purchaseHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            setAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        initPurchase();
        props.history.push('/checkout');
    }

    let orderSummary = null;
    let burger = !error ? <Spinner /> : <p>Ingredients can't be loaded</p>;

    if (ings) {
        const disableInfo = Object.keys(ings)
                                .reduce((acc, key) => {
                                    acc[key] = ings[key] <=0;
                                    return acc;
                                }, {});

        burger = (
            <React.Fragment>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemove={onIngredientRemoved}
                    disabled={disableInfo}
                    price={totalPrice}
                    purchasable={isPurchasable(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuth}
                />
            </React.Fragment>
        );

        orderSummary = <OrderSummary
                            ingredients={ings}
                            price={totalPrice}
                            purchaseCancelled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                        />;
    }

    return (
        <React.Fragment>
            { burger }
            <Modal show={purchasing} modalClose={purchaseCancelHandler}>
                { orderSummary }
            </Modal>
        </React.Fragment>
    );
}


export default withErrorHandler(BurgerBuilder, axios);
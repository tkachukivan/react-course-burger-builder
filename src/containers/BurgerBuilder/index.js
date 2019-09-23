import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/OrderSummary'
import Spinner from '../../components//UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

import axios from '../../axios-orders';
import * as actions from '../../store/actions/';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    isPurchasable = (ingredients) => {
        return Object.values(ingredients).some((value) => value > 0);
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true, });
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false, });
    }

    purchaseContinueHandler = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    render() {
        let orderSummary = null;
        let burger = !this.props.error ? <Spinner /> : <p>Ingredients can't be loaded</p>;

        if (this.props.ings) {
            const disableInfo = Object.keys(this.props.ings)
                                    .reduce((acc, key) => {
                                        acc[key] = this.props.ings[key] <=0;
                                        return acc;
                                    }, {});

            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.totalPrice}
                        purchasable={this.isPurchasable(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                    />
                </React.Fragment>
            );

            orderSummary = <OrderSummary
                                ingredients={this.props.ings}
                                price={this.props.totalPrice}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                            />;
        }

        return (
            <React.Fragment>
                { burger }
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: !!state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    initIngredients: () => dispatch(actions.initIngredients()),
    initPurchase: () => dispatch(actions.purchaseInit()),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
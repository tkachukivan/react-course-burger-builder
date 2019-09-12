import React, { Component } from 'react';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/OrderSummary'
import Spinner from '../../components//UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        loading: false,
        error: false,
    }

    isPurchasable = (ingredients) => {
        const sum = Object.values(ingredients).reduce((acc, value) => acc + value);

        return sum > 0;
    }

    addIngredientHandler = (type) => {
        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: this.state.ingredients[type] + 1
            },
            totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
            purchasable: true,
            purchasing: false,
        });
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0) {
            return;
        }

        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: this.state.ingredients[type] - 1
        }

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
            purchasable: this.isPurchasable(updatedIngredients)
        });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true,
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'Test 1',
                    zipCode: '12344',
                    country: 'Poland',
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .catch(error => {})
            .finally(() => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get('/ingredients.json')
            .then((response) => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            })
            .finally(()=> {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients,
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <Spinner /> : <p>Ingredients can't be loaded</p>;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>
            );

            orderSummary = <OrderSummary
                                ingredients={this.state.ingredients}
                                price={this.state.totalPrice}
                                purchaseCanselled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);
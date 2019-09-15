import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/';

import classes from './style.module.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false,
            },
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        const orderData = Object.keys(this.state.orderForm)
                                .reduce((acc, key) => {
                                    acc[key] = this.state.orderForm[key].value;
                                    return acc;
                                }, {});

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData,
        };

        this.props.onOrderBurger(order);
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputName) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputName],
            value: event.target.value,
            touched: true,
        };
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedOrderForm[inputName] = updatedFormElement;

        const formIsValid = Object.values(updatedOrderForm)
                                  .every((el) =>  el.validation && el.valid);

        this.setState({ 
            orderForm: updatedOrderForm,
            formIsValid,
        })
    }

    render() {
        const formElements = Object.keys(this.state.orderForm)
                                    .map((key) => {
                                        const config = this.state.orderForm[key];

                                        return <Input
                                                    elementType={config.elementType}
                                                    elementConfig={config.elementConfig}
                                                    value={config.value}
                                                    key={key}
                                                    valid={config.valid}
                                                    touched={config.touched}
                                                    changed={(event) => this.inputChangedHandler(event, key)}
                                                />
                                    });

        let form = (
                <form onSubmit={this.orderHandler}>
                    { formElements }
                    <Button
                        buttonType="success"
                        disabled={!this.state.formIsValid}
                    >
                        Order
                    </Button>
                </form>
        );
        
        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.contact}>
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading

});

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (order) => dispatch(actions.purchaseBurger(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
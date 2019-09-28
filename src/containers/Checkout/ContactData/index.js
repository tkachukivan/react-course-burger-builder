import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/';
import { checkValidity } from '../../../shared/utility';

import classes from './style.module.css';

const ContactData = (props) => {
    const [orderForm, setOrderFormState] = useState({
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
    });

    const [formIsValid, setFormValidity] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const orderData = Object.keys(orderForm)
                                .reduce((acc, key) => {
                                    acc[key] = orderForm[key].value;
                                    return acc;
                                }, {});

        props.onOrderBurger({ orderData });
    }

    const inputChangedHandler = (event, inputName) => {
        const updatedOrderForm = {
            ...orderForm,
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputName],
            value: event.target.value,
            touched: true,
        };
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedOrderForm[inputName] = updatedFormElement;

        const formIsValid = Object.values(updatedOrderForm)
                                  .every((el) =>  el.validation && el.valid);

        setOrderFormState(updatedOrderForm);
        setFormValidity(formIsValid);
    }

    const formElements = Object.keys(orderForm)
                                .map((key) => {
                                    const config = orderForm[key];

                                    return <Input
                                                elementType={config.elementType}
                                                elementConfig={config.elementConfig}
                                                value={config.value}
                                                key={key}
                                                valid={config.valid}
                                                touched={config.touched}
                                                changed={(event) => inputChangedHandler(event, key)}
                                            />
                                });

    let form = (
            <form onSubmit={orderHandler}>
                { formElements }
                <Button
                    buttonType="success"
                    disabled={!formIsValid}
                >
                    Order
                </Button>
            </form>
    );
    
    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.contact}>
            <h4>Enter your Contact Data</h4>
            { form }
        </div>
    )
}

const mapStateToProps = state => ({
    loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (order) => dispatch(actions.purchaseBurger(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
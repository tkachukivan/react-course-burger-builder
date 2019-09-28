import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components//UI/Spinner';
import * as actions from '../../store/actions/';
import { checkValidity } from '../../shared/utility';
import classes from './style.module.css';


const Auth = ({
    isAuth, building, authRedirectPath, setAuthRedirectPath, auth,
    loading, error,
}) => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });
    const [isSignUp, setIsSingUp] = useState(true);

    
    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            setAuthRedirectPath('/');
        }
    }, [building, authRedirectPath, setAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedForm = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation)
            }
        };

        setControls(updatedForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        auth(
            controls.email.value,
            controls.password.value,
            isSignUp,
        );
    }

    const switchAuthModeHandler = () => {
        setIsSingUp(!isSignUp);
    }

    if (isAuth) {
        return <Redirect to={authRedirectPath} />
    }

    if (loading) {
        return <Spinner />
    }

    const formElements = Object.keys(controls)
                                .map((key) => {
                                    const config = controls[key];

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

    return (
        <div className={classes.auth}>
            { error && <p>{error.message}</p>}
            <form onSubmit={submitHandler}>
                { formElements }
                <Button buttonType="success">
                    Submit
                </Button>
            </form>
            <Button buttonType="danger" clicked={switchAuthModeHandler}>
                Switch to { isSignUp ? 'SignIn' : 'SignUp'}
            </Button>
        </div>
    );
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: !!state.auth.token,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
    auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
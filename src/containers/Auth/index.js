import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components//UI/Spinner';
import * as actions from '../../store/actions/';
import { checkValidity } from '../../shared/utility';
import classes from './style.module.css';


class Auth extends Component {
    state = {
        controls: {
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
        },

        isSignUp: true
    }

    inputChangedHandler = (event, controlName) => {
        const updatedForm = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        };

        this.setState({ 
            controls: updatedForm,
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.auth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp,
            );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            isSignUp: !prevState.isSignUp,
        }));
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath('/');
        }
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to={this.props.authRedirectPath} />
        }

        if (this.props.loading) {
            return <Spinner />
        }

        const formElements = Object.keys(this.state.controls)
                                    .map((key) => {
                                        const config = this.state.controls[key];

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

        return (
            <div className={classes.auth}>
                { this.props.error && <p>{this.props.error.message}</p>}
                <form onSubmit={this.submitHandler}>
                    { formElements }
                    <Button buttonType="success">
                        Submit
                    </Button>
                </form>
                <Button buttonType="danger" clicked={this.switchAuthModeHandler}>
                    Switch to { this.state.isSignUp ? 'SignIn' : 'SignUp'}
                </Button>
            </div>
        );
    }
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
import axios from 'axios';
import * as actionTypes from './actionTypes';

import { apiKey } from '../../config';

export const authStart = () => ({
    type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
    type: actionTypes.AUTH_SUCCESS,
    userId: authData.userId,
    token: authData.token,
});

export const authFailed = error => ({
    type: actionTypes.AUTH_FAILED,
    error,
});

export const logout = () => {
    localStorage.removeItem('authData');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
}

export const checkAuthTimeout = expirationTimeout => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTimeout)
}

export const auth = (email, password, isSignUp) => dispatch => {
    dispatch(authStart());

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    if (!isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }

    axios.post( url, { email, password, returnSecureToken: true, })
        .then(response => {
            const authData = {
                expirationDate: new Date(new Date().getTime() + response.data.expiresIn * 1000),
                token: response.data.idToken,
                userId: response.data.localId,
            }

            localStorage.setItem('authData', JSON.stringify(authData));
            dispatch(authSuccess(authData))
            dispatch(checkAuthTimeout(response.data.expiresIn * 1000))
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error))
        });
}

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
});

export const authCheckState = () => dispatch => {
    const authData = JSON.parse(localStorage.getItem('authData'));

    if (!authData) {
        return;
    }

    authData.expirationDate = new Date(authData.expirationDate);

    if (authData.expirationDate < new Date()) {
        dispatch(logout())
        return;
    }
    
    const timeout = authData.expirationDate.getTime() - new Date().getTime();
    dispatch(authSuccess(authData));
    dispatch(checkAuthTimeout(timeout))
}
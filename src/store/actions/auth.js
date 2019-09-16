import axios from 'axios';
import * as actionTypes from './actionTypes';

import { apiKey } from '../../../config';

export const authStart = () => ({
    type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
    type: actionTypes.AUTH_SUCCESS,
    userId: authData.localId,
    token: authData.idToken,
});

export const authFailed = error => ({
    type: actionTypes.AUTH_FAILED,
    error,
});

export const auth = (email, password, isSignUp) => dispatch => {
    dispatch(authStart());

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    if (!isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }

    axios.post( url, { email, password, returnSecureToken: true, })
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data))
        })
        .catch(error => {
            dispatch(authFailed(error))
        });
}
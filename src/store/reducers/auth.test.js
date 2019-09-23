import reducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({...initialState});
    });

    it('should store token upon login', () => {
        expect(reducer({...initialState}, { type: actionTypes.AUTH_SUCCESS, token: 'token', userId: 'userId'}))
            .toEqual({
                ...initialState,
                token: 'token',
                userId: 'userId',
            });
    });
});
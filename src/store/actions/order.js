import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
});

export const purchaseBurgerFailed = error => ({
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = orderData => (dispatch, getState) => {
    dispatch(purchaseBurgerStart());
    const state = getState();
    orderData.userId = state.auth.userId;
    orderData.ingredients = state.burgerBuilder.ingredients;
    orderData.price = state.burgerBuilder.totalPrice;

    axios.post('/orders.json', orderData, { params: { auth: state.auth.token }})
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error));
        });
}

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrdersFailed = error => ({
    type: actionTypes.FETCH_ORDERS_FAILED,
    error
});

export const fetchOrderStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => (dispatch, getState) => {
    dispatch(fetchOrderStart())
    const state = getState();
    axios.get('/orders.json', {
        params: {
            auth: state.auth.token,
            orderBy: '"userId"',
            equalTo: `"${state.auth.userId}"`
        }
    })
        .then(response => {
            const fetchedOrders = Object.keys(response.data)
                                            .map(key => ({
                                                ...response.data[key],
                                                id: key,
                                            }));
            
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrdersFailed(error));
        })
}
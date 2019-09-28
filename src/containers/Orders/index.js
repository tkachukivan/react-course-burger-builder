import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/';


const Orders = (props) => {
    useEffect(() => {
        props.fetchOrders();
    }, []); // eslint-disable-line

    if (props.loading) {
        return <Spinner />;
    }

    return (
        <div>
            {
                props.orders
                    .map((order) => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))
            }
        </div>
    );
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
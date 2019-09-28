import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrapperdComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error)
        });

        useEffect(() => () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <React.Fragment>
                <WrapperdComponent {...props} />
                <Modal
                    show={!!error}
                    modalClose={errorConfirmedHandler}
                >
                    { error ? error.message : null }
                </Modal>
            </React.Fragment>
        );
    }
}

export default withErrorHandler;
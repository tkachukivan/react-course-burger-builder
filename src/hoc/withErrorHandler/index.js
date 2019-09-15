import React, { Component } from 'react';

import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrapperdComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <React.Fragment>
                    <WrapperdComponent {...this.props} />
                    <Modal
                        show={!!this.state.error}
                        modalClose={this.errorConfirmedHandler}
                    >
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;
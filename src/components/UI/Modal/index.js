import React, { Component } from 'react';
import classes from './style.module.css';

import Backdrop from '../Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.show !== nextProps.show ||
            this.props.children !== nextProps.children
            );
    }

    render() {
        const resultClasses = [classes.modal];

        if (this.props.show) {
            resultClasses.push(classes.show);
        } else {
            resultClasses.push(classes.hide)
        }

        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
                <div className={resultClasses.join(' ')}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;
import React from 'react';
import classes from './style.module.css';

import Backdrop from '../Backdrop';

const Modal = (props) => {
    const resultClasses = [classes.modal];

    if (props.show) {
        resultClasses.push(classes.show);
    } else {
        resultClasses.push(classes.hide)
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClose}/>
            <div className={resultClasses.join(' ')}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default React.memo(Modal);
import React from 'react';
import classes from './style.module.css';

import Backdrop from '../Backdrop';

const modal = (props) => {
    const resultClasses = [classes.modal];

    if (props.show) {
        resultClasses.push(classes.show);
    } else {
        resultClasses.push(classes.hide)
    }
    console.log(resultClasses)

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClose}/>
            <div className={resultClasses.join(' ')}>
                {props.children}
            </div>
        </React.Fragment>
    )
};

export default modal;
import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './style.module.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';

const Layout = (props) => {
    const [state, setState] = useState(false);

    const sideDrawerClosedHandler = () => {
        setState(false);
    }

    const sideDrawerToggleHandler = () => {
        setState(!state);
    }

    return (
        <React.Fragment>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuth}
            />
            <SideDrawer
                open={state}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuth}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
} 

const mapStateToProps = state => ({
    isAuth: !!state.auth.token
});

export default connect(mapStateToProps)(Layout);
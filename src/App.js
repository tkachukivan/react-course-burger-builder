import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout';
import * as actions from './store/actions/';

const Checkout = React.lazy(() => import('./containers/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders'));
const Auth = React.lazy(() => import('./containers/Auth'));

function App(props) {
  useEffect(() => {
    props.onTryAutoSignUp();
  }, []); // eslint-disable-line

  let routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
    )
  }

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
}

const mapStateToProps = state => ({
  isAuth: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

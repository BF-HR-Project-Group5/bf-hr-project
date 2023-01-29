import React, { Suspense, lazy, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { browserHistory, Router } from 'react-router'

const Login = lazy(() => import('./pages/Login'));
const PersonalInfor = lazy(() => import('./pages/Personal-Information'));

function App(props) {
  return (
    <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/PersonalInfor" exact component={PersonalInfor} />
          </Switch>
        </Suspense>
    </BrowserRouter>
  );
}

export default connect(null, {})(App);

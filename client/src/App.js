import React, { Suspense, lazy, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { browserHistory, Router } from 'react-router'

const Login = lazy(() => import('./pages/login'));
const PersonalInfor = lazy(() => import('./pages/personal-information'));
const OnboardingApp = lazy(() => import('./pages/onboarding-application/onboarding-index'));

function App(props) {
  return (
    <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/personalInfor" exact component={PersonalInfor} />
              <Route path="/onboardingApp" exact component={OnboardingApp} />
          </Switch>
        </Suspense>
    </BrowserRouter>
  );
}

export default connect(null, {})(App);

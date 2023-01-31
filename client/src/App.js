import React, { Suspense, lazy, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { browserHistory, Router } from 'react-router'

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/Signup'));
const PersonalInfor = lazy(() => import('./pages/Personal-Information'));
const OnboardingApp = lazy(() => import('./pages/onboarding-application/onboarding-index'));

function App(props) {
  return (
    <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
              <Route path="/signup" exact component={SignUp} />
              <Route path="/login" exact component={Login} />
              <Route path="/personalInfor" exact component={PersonalInfor} />
              <Route path="/onboardingApp" exact component={OnboardingApp} />
          </Switch>
        </Suspense>
    </BrowserRouter>
  );
}

export default connect(null, {})(App);

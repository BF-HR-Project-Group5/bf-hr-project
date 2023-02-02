import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/Signup'));
const PersonalInfo = lazy(() => import('./pages/Personal-Information'));
const OnboardingApp = lazy(() => import('./pages/onboarding-application/onboarding-index'));
const VisaStatus = lazy(() => import('./pages/Visa-Status'));
const Housing = lazy(() => import('./pages/housing/Housing'));
const HouseDetails = lazy(() => import('./pages/housing/House-Details'));
const FacilityReports = lazy(() => import('./pages/housing/Facility-Reports'));
const Comments = lazy(() => import('./pages/housing/Comments'));

function App(props) {
  return (
    <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
							<Route path='/' exact component={Home} />
              <Route path="/signup" exact component={SignUp} />{/* Done */}
              <Route path="/login" exact component={Login} />{/* Done */}
              <Route path="/personalInfo" exact component={PersonalInfo} />
              <Route path="/onboardingApp" exact component={OnboardingApp} />
              <Route path="/visaStatus" exact component={VisaStatus} />
              <Route path="/housing" exact component={Housing} /> {/* Done */}
              <Route path="/houseDetails" exact component={HouseDetails} />{/* Done */}
              <Route path="/facilityReports" exact component={FacilityReports} />{/* Progress */}
              <Route path="/housing/comments" exact component={Comments} />{/* Progress */}
          </Switch>
        </Suspense>
    </BrowserRouter>
  );
}

const Home = () => {
	return <Redirect to="/login" />
}

export default connect(null, {})(App);

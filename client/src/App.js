import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import GuardRouteAuth from './components/GuardRoute/GuardRouteAuth';
import GuardRouteHr from './components/GuardRoute/GuardRouteHr';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/Signup'));
const PersonalInfo = lazy(() => import('./pages/Personal-Information'));
const OnboardingApp = lazy(() => import('./pages/onboarding-application/onboarding-index'));
const VisaStatus = lazy(() => import('./pages/Visa-Status'));
const Housing = lazy(() => import('./pages/housing/Housing'));
const HouseDetails = lazy(() => import('./pages/housing/House-Details'));
const FacilityReports = lazy(() => import('./pages/housing/Facility-Reports'));
const Comments = lazy(() => import('./pages/housing/Comments'));
const HrHome = lazy(() => import('./pages/HrHome'));

function App(props) {
  return (
    <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
							<Route path='/' exact component={Home} />
              <Route path="/signup" exact component={SignUp} />{/* Done */}
              <Route path="/login" exact component={Login} />{/* Done */}

<GuardRouteAuth path="/personalInfo" exact>
	<PersonalInfo />
</GuardRouteAuth>
<GuardRouteAuth path="/onboardingApp" exact>
	<OnboardingApp />
</GuardRouteAuth>
<GuardRouteAuth path="/visaStatus" exact>
	<VisaStatus />
</GuardRouteAuth>
<GuardRouteAuth path="/housing" exact>
	<Housing />
</GuardRouteAuth>
<GuardRouteAuth path="/houseDetails" exact>
	<HouseDetails />
</GuardRouteAuth>
<GuardRouteAuth path="/facilityReports" exact>
	<FacilityReports />
</GuardRouteAuth>
<GuardRouteAuth path="/housing/comments" exact>
	<Comments />
</GuardRouteAuth>


							{/* <Route element={<GuardRouteHr />}>
								<Route path="/home" exact component={HrHome} />
							</Route> */}
							<GuardRouteHr exact path="/home">
								<HrHome />
							</GuardRouteHr>

          </Switch>
        </Suspense>
    </BrowserRouter>
  );
}

const Home = () => {
	return <Redirect to="/login" />
}

export default connect(null, {})(App);




								// <Route path="/personalInfo" exact component={PersonalInfo} />
								// <Route path="/onboardingApp" exact component={OnboardingApp} />
								// <Route path="/visaStatus" exact component={VisaStatus} />
								// <Route path="/housing" exact component={Housing} /> {/* Done */}
								// <Route path="/houseDetails" exact component={HouseDetails} />{/* Done */}
								// <Route path="/facilityReports" exact component={FacilityReports} />{/* Progress */}
								// <Route path="/housing/comments" exact component={Comments} />Progress

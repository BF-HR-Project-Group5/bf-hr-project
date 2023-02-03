import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Navigate, Redirect, Route, Routes } from 'react-router-dom';
import RequireAuthOrHr from './components/RequireAuthOrHr';

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
				<Routes>
					<Route
						path="/"
						exact
						element={
							<Navigate
								to="/login"
								replace
							/>
						}
					/>
					<Route
						path="/signup"
						exact
						element={<SignUp />}
					/>
					{/* Done */}
					<Route
						path="/login"
						exact
						element={<Login />}
					/>
					{/* Done */}
					<Route
						path="/personalInfo"
						exact
						element={
							<RequireAuthOrHr>
								<PersonalInfo />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/onboardingApp"
						exact
						element={
							<RequireAuthOrHr>
								<OnboardingApp />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/visaStatus"
						exact
						element={
							<RequireAuthOrHr>
								<VisaStatus />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/housing"
						exact
						element={
							<RequireAuthOrHr>
								<Housing />
							</RequireAuthOrHr>
						}
					/>
					{/* Done */}
					<Route
						path="/houseDetails"
						exact
						element={
							<RequireAuthOrHr>
								<HouseDetails />
							</RequireAuthOrHr>
						}
					/>
					{/* Done */}
					<Route
						path="/facilityReports"
						exact
						element={
							<RequireAuthOrHr>
								<FacilityReports />
							</RequireAuthOrHr>
						}
					/>
					{/* Progress */}
					<Route
						path="/housing/comments"
						exact
						element={
							<RequireAuthOrHr>
								<Comments />
							</RequireAuthOrHr>
						}
					/>
					{/* Progress */}
					<Route
						path="/home"
						exact
						element={
							<RequireAuthOrHr hrRequired={true}>
								<HrHome />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="*"
						element={<h1>404! Not Found!</h1>}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default connect(null, {})(App);

// {/* <GuardRouteAuth path="/personalInfo" exact>
// 	<PersonalInfo />
// </GuardRouteAuth>
// <GuardRouteAuth path="/onboardingApp" exact>
// 	<OnboardingApp />
// </GuardRouteAuth>
// <GuardRouteAuth path="/visaStatus" exact>
// 	<VisaStatus />
// </GuardRouteAuth>
// <GuardRouteAuth path="/housing" exact>
// 	<Housing />
// </GuardRouteAuth>
// <GuardRouteAuth path="/houseDetails" exact>
// 	<HouseDetails />
// </GuardRouteAuth>
// <GuardRouteAuth path="/facilityReports" exact>
// 	<FacilityReports />
// </GuardRouteAuth>
// <GuardRouteAuth path="/housing/comments" exact>
// 	<Comments />
// </GuardRouteAuth> */}

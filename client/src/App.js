import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Navigate, Redirect, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation/navigation';
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
const EmployeeProfiles = lazy(() => import('./pages/Employee-Profiles'));
const HrVisaStatus = lazy(() => import('./pages/Hr-Visa-Status'));
const HrVisaStatusDoc = lazy(() => import('./pages/Hr-Visa-Status-Doc'));
const HiringManagement = lazy(() => import('./pages/hiring-management/Hiring-Management'));
const OnboardingAppDetail = lazy(() => import('./pages/hiring-management/Onboarding-App-Detail'));

function App(props) {
	return (
		<BrowserRouter>
		<Navigation />
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
					<Route
						path="/login"
						exact
						element={<Login />}
					/>
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
					<Route
						path="/houseDetails"
						exact
						element={
							<RequireAuthOrHr>
								<HouseDetails />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/facilityReports"
						exact
						element={
							<RequireAuthOrHr>
								<FacilityReports />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/housing/comments"
						exact
						element={
							<RequireAuthOrHr>
								<Comments />
							</RequireAuthOrHr>
						}
					/>
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
						path="/hrVisaStatus"
						exact
						element={
							<RequireAuthOrHr hrRequired={true}>
								<HrVisaStatus />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/employeeProfiles"
						exact
						element={
							<RequireAuthOrHr hrRequired={true}>
								<EmployeeProfiles />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/hrVisaStatus/doc"
						exact
						element={
							<RequireAuthOrHr hrRequired={true}>
								<HrVisaStatusDoc />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/hiringManagement"
						exact
						element={
							<RequireAuthOrHr hrRequired={true}>
								<HiringManagement />
							</RequireAuthOrHr>
						}
					/>
					<Route
						path="/onboardingAppDetail"
						exact
						element={
							<RequireAuthOrHr hrRequired={true}>
								<OnboardingAppDetail />
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

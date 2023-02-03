import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { useHistory } from 'react-router-dom';

// const GuardedRoute = ({ component, roleRequired, auth, ...rest }) => (

// 	<Route
// 		{...rest}
// 		render={(props) =>
// 			auth.user.role === roleRequired ? <Component {...props} /> : <Redirect to="/login" />
// 		}
// 	/>
// );

// const GuardedRoute = ({component, roleRequired, auth, routeRedirect, children }) => {
// 	console.log({ roleRequired, auth, routeRedirect });
// 	return auth?.user?.role === roleRequired ? <>{component}</> : <Redirect to={routeRedirect} />;
// };

// const GuardedRoute = ({ roleRequired, auth, routeRedirect, children }) => {
// 	console.log({ roleRequired, auth, routeRedirect });
// 	return auth?.user?.role === roleRequired ? <>{children}</> : <Redirect to={routeRedirect} />;
// };

const GuardedRoute = ({
	roleRequired,
	redirectPath,
	auth,
	children,
}) => {
	console.log({roleRequired, redirectPath, auth})
	const history = useHistory();

	const isUserLoggedIn = !!auth?.user;
	const isNotRestrictedToSpecificRole = !!roleRequired;
	console.log({isUserLoggedIn, isNotRestrictedToSpecificRole});

	if (!isUserLoggedIn) {
		// need them to log in, redirect to redirectPath
		history.push(redirectPath);
		// return empty jsx so it's happy
		return <></>;
	}

	if (isNotRestrictedToSpecificRole) {
		// not restricted to role, so return the page
		return <>{children}</>;
	}

	const isNotCorrectRole = auth.user?.role !== roleRequired;
	if (isNotCorrectRole) {
		// need them to log in, redirect to redirectPath
		history.push(redirectPath);
		// return empty jsx so it's happy
		return <></>;
	}

	// if everything is OK, return the children
	return <>{children}</>;
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps)(GuardedRoute);

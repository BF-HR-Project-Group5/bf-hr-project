import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, } from 'react-router';
import {useHistory } from 'react-router-dom';

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

const GuardedRoute = ({roleRequired, redirectPath, auth, children}) => {
	const history = useHistory();
	// if auth matches, render the nested route path and component
	if (auth?.user?.role === roleRequired) return <>{children}</>;
	// else, push the redirectPath to history
	history.push(redirectPath);
	// return empty jsx so there's no error when we redirect
	return <></>;
}

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps)(GuardedRoute);

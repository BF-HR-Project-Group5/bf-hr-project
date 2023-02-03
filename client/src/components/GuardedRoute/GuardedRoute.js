import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

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

const GuardedRoute = ({ roleRequired, auth, routeRedirect, children }) => {
	console.log({ roleRequired, auth, routeRedirect });
	return auth?.user?.role === roleRequired ? <>{children}</> : <Redirect to={routeRedirect} />;
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps)(GuardedRoute);

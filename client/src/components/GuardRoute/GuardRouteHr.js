import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, } from 'react-router';
import { useHistory } from 'react-router-dom';
import Login from '../../pages/Login';

// const GuardedRoute = ({
// 	roleRequired,
// 	redirectPath,
// 	auth,
// 	children,
// }) => {
// 	console.log({roleRequired, redirectPath, auth})
// 	const history = useHistory();

// 	const isUserLoggedIn = !!auth?.user;
// 	const isNotRestrictedToSpecificRole = !!roleRequired;
// 	console.log({isUserLoggedIn, isNotRestrictedToSpecificRole});

// 	if (!isUserLoggedIn) {
// 		// need them to log in, redirect to redirectPath
// 		history.push(redirectPath);
// 		// return empty jsx so it's happy
// 		return <></>;
// 	}

// 	if (isNotRestrictedToSpecificRole) {
// 		// not restricted to role, so return the page
// 		return <>{children}</>;
// 	}

// 	const isNotCorrectRole = auth.user?.role !== roleRequired;
// 	if (isNotCorrectRole) {
// 		// need them to log in, redirect to redirectPath
// 		history.push(redirectPath);
// 		// return empty jsx so it's happy
// 		return <></>;
// 	}

// 	// if everything is OK, return the children
// 	return <>{children}</>;
// };

// const GuardedRoute = ({ roleRequired, redirectPath, auth, children }) => {
// 	console.log({ roleRequired, redirectPath, auth });
// 	const history = useHistory();
// 	// if auth matches, render the nested route path and component
// 	const isRoleRequired = roleRequired !== undefined;
// 	const isRoleRequiredAndMatches = isRoleRequired && roleRequired === auth?.user?.role;

// 	const isUserLoggedIn = !!auth?.user;
// 	const isNoRoleRequiredAndIsUserLoggedIn = !isRoleRequired && isUserLoggedIn;

// 	if (isRoleRequiredAndMatches) return <>{children}</>;
// 	if (isNoRoleRequiredAndIsUserLoggedIn) return <>{children}</>;

// 	// else, push the redirectPath to history
// 	React.useEffect(() => {
// 		history.push({ location: redirectPath });
// 	}, [])
// 	// return empty jsx so there's no error when we redirect
// 	return <></>;
// };

// const GuardRouteHr = ({ auth, children }) => {
// 	console.log('GuardRouteHr', {auth});
// 		return (auth?.user?.role === 'hr' ? <>{children}</> : <Login />)
// }


function GuardRouteHr({auth, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth?.user?.role === 'hr' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}




const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps)(GuardRouteHr);

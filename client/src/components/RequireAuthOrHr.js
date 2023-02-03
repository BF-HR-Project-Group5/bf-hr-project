import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuthOrHr({ auth, hrRequired = false, children }) {
	const location = useLocation();

	const isLoggedIn = auth?.user !== undefined;
	if (!isLoggedIn)
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);

	const isHrRequiredAndIsNotHr = hrRequired && auth?.user?.role !== 'hr';
	if (isHrRequiredAndIsNotHr)
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);

	return children;
}

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps)(RequireAuthOrHr);

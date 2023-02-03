import React from 'react'
import { connect } from 'react-redux';

function HrHome(props) {
	console.log('hrHome props.auth', props.auth);
	return (
		<div>
			<h1>HR Home page</h1>
		</div>
	)
}

const mapStateToProps = ({ auth }) => ({
    auth
});


export default connect(
    mapStateToProps,
)(HrHome);


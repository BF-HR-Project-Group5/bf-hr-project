import React from 'react'
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions/index';

function DocumentPreview(props) {
	console.log("DocumentPreview", { props });

	const linkDL = props.auth.user.profile.license.link;
	const linkWorkAuth = props.auth.user.profile.documents[0].link;
	console.log("Link", linkDL);
	console.log("Work", linkWorkAuth);
	
	return (
		<>
			{
				linkDL ? (
					<img src={linkDL} />
				)
					:
					<div id='viewer' style={{ "width": "1024px", "height": "600px", "margin": "0 auto" }}>{linkDL}</div>
			}
			{
				linkWorkAuth ? (
					<img src={linkWorkAuth} />
				)
					: 
					<div id='viewer' style={{ "width": "1024px", "height": "600px", "margin": "0 auto" }}>{linkWorkAuth}</div>
			}
		</>
	)
}

const mapStateToProps = ({ auth }) => ({
	auth
});

export default connect(
	mapStateToProps,
	{ submitLogin }
)(DocumentPreview)

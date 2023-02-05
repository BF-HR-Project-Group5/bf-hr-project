import React from 'react'
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions/index';

function DocumentPreview(props) {
	console.log("DocumentPreview", { props });

	const link = props.auth.user.profile.license.link;
	console.log("Link", link);
	let image;
	if (link.endsWith('jpg') || link.endsWith('png') || link.endsWith('jpeg') || link.endsWith('gif') || link.endsWith('svg')) {
		image = link
	}
	return (
		<>
			{
				link.endsWith('jpg') || link.endsWith('png') || link.endsWith('jpeg') || link.endsWith('gif') || link.endsWith('svg') ? (
					<img src={link} />
				)
					:
					<div id='viewer' style={{ "width": "1024px", "height": "600px", "margin": "0 auto" }}>{link}</div>
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

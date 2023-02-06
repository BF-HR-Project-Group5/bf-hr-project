import React from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function HrHome(props) {
	console.log('hrHome props.auth', props.auth);
	return (
		<div className="container-fluid p-5">
			<div className="row mt-3">
				<div className="col-12 mx-auto text-center">
					<h1 className="text-center">HR Home page</h1>
				</div>
			</div>
			<div className="row mt-3">
				<ul className="col-4 mx-auto text-center list-group">
					<li className="list-group-item"><Link to="/employeeProfiles" >Employee Profiles</Link></li>
					<li className="list-group-item"><Link to="/hrVisaStatus" >Visa Status Management</Link></li>
					<li className="list-group-item"><Link to="/hiringManagement" >Hiring Management</Link></li>
					<li className="list-group-item"><Link to="/hrHousingList" >Housing Management</Link></li>
				</ul>
			</div>
		</div>
	)
}

const mapStateToProps = ({ auth }) => ({
    auth
});


export default connect(
    mapStateToProps,
)(HrHome);


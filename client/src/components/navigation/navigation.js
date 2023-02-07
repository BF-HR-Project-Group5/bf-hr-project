import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import NavSettings from './nav-settings';
import '../../layout/nav.css';

import { HeaderWrapper, Nav, Title, Logo } from '../styled-components/header/header';

function Navigation({ auth }) {
	console.log('auth', auth);
	const [on, setOn] = useState(false);
	return (
		<>
			{auth && (
				<HeaderWrapper>
					<Nav>
						<Link to="/">
							<Title>
								<Logo src="/assets/logo.png" />
							</Title>
						</Link>
						{auth?.user?.role === 'hr' ? (
							<>
								<Link to="/home">Home</Link>
								{/* <Link to="/onboardingApp">OnboardingApp</Link> */}
								<Link to="/employeeProfiles">Employee Profiles</Link>
								<Link to="/hrVisaStatus">Visa Status Management</Link>
								<Link to="/hiringManagement">Hiring Management</Link>
								<Link to="/hrHousingList">Housing Management</Link>
							</>
						) : auth?.user?.role === 'user' ? (
							<>
								<Link to="/housing">Housing</Link>
								<Link to="/onboardingApp">Onboarding App</Link>
								<Link to="/personalInfo">Profile</Link>
								<Link to="/visaStatus">Visa Status Management</Link>
							</>
						) : null}
							<Chip
								avatar={<Avatar>{auth?.user?.username.charAt(0).toUpperCase()}</Avatar>}
								label={auth?.user?.username}
								clickable
								color="primary"
								onClick={(auth) => setOn(!on)}
							/>
							{on && (
								<NavSettings
									handleClose={() => setOn(false)}
									data={auth}
								/>
							)}
					</Nav>
				</HeaderWrapper>
			)}
		</>
	);
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(Navigation);

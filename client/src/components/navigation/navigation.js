import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import NavSettings from './nav-settings';
import '../../layout/nav.css';

import {
	HeaderWrapper,
	Nav,
	Title,
	GoogleButton,
	SignUpButton,
	Img,
	LoggedInButton,
	LoginButton,
	Logo,
	ButtonGroup,
} from '../styled-components/header/header';

function Navigation({ auth }) {
	console.log('auth', auth);
	const [on, setOn] = useState(false);
	return (
		<HeaderWrapper>
			<Nav>
				{auth?.user.role === 'hr' ? (
					<>
						<Link to="/home">Home</Link>
						<Link to="/housing">Housing</Link>
						<Link to="/onboardingApp">OnboardingApp</Link>
						<Link to="/employeeProfiles">Employee Profiles</Link>
						<Link to="/hrVisaStatus">Visa Status Management</Link>
						<Link to="/hiringManagement">Hiring Management</Link>
					</>
				) : auth?.user.role === 'user' ? (
					<>
						<Link to="/housing">Housing</Link>
						<Link to="/onboardingApp">Onboarding App</Link>
						<Link to="/personalInfo">Profile</Link>
						<Link to="/visaStatus">Visa Status Management</Link>
					</>
				) : null}
				<Link to="/">
					<Title>
						<Logo src="/assets/logo.png" />
					</Title>
				</Link>
				<>
					{/* Validate... If exists a user */}
					{auth ? (
						<>
							<Chip
								avatar={<Avatar>{auth.user.username.charAt(0).toUpperCase()}</Avatar>}
								label={auth.user.username}
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
						</>
					) : (
						<>
							<ButtonGroup>
								<LoginButton href="/login">Log in</LoginButton>
								<SignUpButton href="/signup">Sign up</SignUpButton>
							</ButtonGroup>
						</>
					)}
				</>
			</Nav>
		</HeaderWrapper>
	);
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(Navigation);

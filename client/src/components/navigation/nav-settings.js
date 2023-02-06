import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Logout } from '../styled-components/header/header-settings';
import { Link } from 'react-router-dom';
import { submitLogout } from '../../redux/actions/index';
import { connect } from 'react-redux';

function NavSettings(props) {
    console.log('props',props)
		const navigate = useNavigate();

    const handleSubmit = async(e)=>{
      e.preventDefault() 
      try {
        await props.submitLogout()
				navigate('/login');
				props.handleClose();

      } catch (err) {
        console.log(err);
      }
    } 
  return (
    <>
      <Link 
        className='dropMenu onboardingLink'
        to={{ pathname : '/onboardingApp' , state : props.data}}
				onClick={props.handleClose}
				>
        Onboarding Application
      </Link>
      <Link 
        className='dropMenu profileLink'
        to={{ pathname : '/personalInfo' , state : props.data}}
				onClick={props.handleClose}
				>
        Profile
      </Link>
      <Logout className='dropMenu' onClick={handleSubmit}>
        Logout
      </Logout>
    </>
  );
}
const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, {submitLogout})(NavSettings);


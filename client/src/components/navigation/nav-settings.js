import React from 'react';
import { Logout, Text, ProfileStyled } from '../styled-components/header/header-settings';
import { useHistory,Route,useLocation,useParams,useMatch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { submitLogout } from '../../redux/actions/index';

function NavSettings(props) {
    console.log('props',props)

    const handleSubmit = async(e)=>{
      e.preventDefault() 
      try {
        const fn = submitLogout()
        fn().then((res)=>{
          window.location.href = '/login'
        });
      } catch (err) {
        console.log(err);
      }
    } 
  return (
    <>
      <Link 
        className='onboardingLink'
        to={{ pathname : '/onboardingApp' , state : props.data}}>
        Onboarding Application
      </Link>
      <Link 
        className='profileLink'
        to={{ pathname : '/personalInfor' , state : props.data}}>
        Profile
      </Link>
      <Logout onClick={handleSubmit}>
        Logout
      </Logout>
    </>
  );
}
export default NavSettings;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import NavSettings from './nav-settings';
import '../../layout/nav.css'

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
    ButtonGroup
  } from '../styled-components/header/header';

function Navigation({ auth }) {
    console.log('auth',auth)
    const [on, setOn] = useState(false);
    return (
        <HeaderWrapper>
          <Nav>
            <Link to="/">
              <Title>
                <Logo src="/assets/logo.png"/>
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
                  {on && <NavSettings data={auth}/>}
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

import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background-color: #040404;
  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.05);
`;
export const Nav = styled.nav`
  width: 80%;
  margin: auto;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // align-items: flex-end;
  // flex-direction: row;
  @media (max-width: 769px) {
    width: 98%;
  }
`;
export const GoogleButton = styled.a`
  padding: 10px;
  cursor: pointer;
  border-radius: 50px;
  background-color: #1ed15e;
  font-weight: 600 !important;
  color: #fff;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  word-spacing: 0.1rem;
  letter-spacing: 0.05rem;
  font-weight: 800;
  transition: 0.1s ease-in;
`;

export const LoginButton = styled.a`
  width: 80px;
  display: inline;
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 50px;
  background-color: #1ed15e;
  font-weight: 600 !important;
  color: #fff;
  text-decoration: none;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  word-spacing: 0.1rem;
  letter-spacing: 0.05rem;
  font-weight: 800;
  transition: 0.1s ease-in;
`;

export const SignUpButton = styled.a`
  width: 80px;
  display: inline;
  padding: 10px;
  cursor: pointer;
  border-radius: 50px;
  background-color: rgb(24, 119, 242);
  font-weight: 600 !important;
  color: #fff;
  text-decoration: none;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  word-spacing: 0.1rem;
  letter-spacing: 0.05rem;
  font-weight: 800;
  transition: 0.1s ease-in;
`;
export const Title = styled.span`
  color: black;
  font-size: 22px;
  text-align: center;
  padding-top: 22px;
  font-weight: bolder;
`;
export const Img = styled.img`
  border-radius: 50%;
  width: 38px;
  transition: 0.2s;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
export const Logo = styled.img`
  margin-right: auto;
  height: 70px;
  padding: 10px;
`
export const LoggedInButton = styled.button`
display: inline;
align-items: center;
background-color: rgba(0,0,0,.7);
border: 0;
border-radius: 23px;
color: #fff;
cursor: pointer;
// display: -webkit-box;
// display: -ms-flexbox;
// display: flex;
gap: 8px;
height: 32px;
// justify-content: center;
padding: 2px;
position: relative;
`

export const ButtonGroup = styled.div`
width: 170px;
`

 

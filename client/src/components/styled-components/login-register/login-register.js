import styled from 'styled-components';

export const StyledSection = styled.section`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
& > h2 {
  text-align: center;
  color: darkblue;
  margin: 18px;
  &:hover {
    cursor: pointer;
  }
}
& > h5 {
  margin: 10px;
  color: rgb(0, 0, 180);
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: rgb(0, 0, 255);
  }
}
@media screen and (max-width:720px){
    background-color:blue;
  
  }
`;

export const StyledForm = styled.form`
width: 25%;
margin: 0 auto;
& p {
  color: rgb(218, 50, 54);
  font-size: 13px;
  margin: 0 0 8px 16px;
}
`;

export const StyledButton = styled.button`
background-color: darkblue;
width: 40%;
margin: 6px auto;
display: block;
&:hover {
  background-color: darkblue;
  opacity: 0.9;
}
`;

export const StyledStack = styled.div`
display: grid;
grid-template-columns: auto;
grid-gap: 12px;
margin: auto;
`;

export const StyledA = styled.a`
    color: #333;
    font-weight: normal;
`;

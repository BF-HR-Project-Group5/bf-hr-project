import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import * as yup from "yup";
import { Checkbox, TextField, Button } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions/index';
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history'

const StyledSection = styled.section`
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

const StyledForm = styled.form`
  width: 25%;
  margin: 0 auto;
  & p {
    color: rgb(218, 50, 54);
    font-size: 13px;
    margin: 0 0 8px 16px;
  }
`;

const StyledButton = styled.button`
  background-color: darkblue;
  width: 40%;
  margin: 6px auto;
  display: block;
  &:hover {
    background-color: darkblue;
    opacity: 0.9;
  }
`;

const StyledStack = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 12px;
  margin: auto;
`;

const schema = yup.object({
  userName: yup
    .string()
    .required("user name is Required")
    .test(
      "userName",
      "Min 6 and Max 18 characters required",
      (val) => val.length >= 6 && val.length <= 18
    ),
  email: yup
    .string()
    .matches(/^[\w-(.?)]+@([\w-]+\.)+[\w-]{2,4}$/g, "Enter valid email address")
    .required("Email is Required"),
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/g,
      "Min 6 and Max 12 characters atleast one letter,one number and no special character"
    ),
});

const LoginForm = (props) => {
  const [formData, setFormData] = useState(null);
  const [isCheck, setIsCheck] = useState(false);

  console.log('props',props)

  useEffect(() => {
    async function signIn() {
      if (formData) {
        //login API called
        try {
          const response = await submitLogin(formData);
          props.history.push({pathname: '/'})
        } catch (err) {
          console.log(err);
        }
      }
    }
    signIn();
  }, [formData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log('data',data)
    setIsCheck(false);
    reset();
    setFormData(data)
    // alert(JSON.stringify(data));
  };

  return (
    <StyledSection>
      <h2>Login</h2>
      <StyledForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <StyledStack>
          <TextField
            label="User Name"
            variant="outlined"
            error={!!errors.userName}
            helperText={errors.userName && errors.userName.message}
            {...register("userName")}
          />
          <TextField
            error={!!errors.email}
            label="Email"
            variant="outlined"
            helperText={errors.email && errors.email.message}
            {...register("email")}
          />
          <TextField
            type="password"
            error={!!errors.password}
            label="Password"
            variant="outlined"
            helperText={errors.password && errors.password.message}
            {...register("password")}
          />
          {errors.checkbox && <p>{errors.checkbox.message}</p>}
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </StyledStack>
      </StyledForm>
      <h5>
          <a className="signup-btn" href="/signup">Click here to signup page</a>
      </h5>
    </StyledSection>
  );
};

// export default Login;
export default connect(
  null,
  { submitLogin }
)(LoginForm);
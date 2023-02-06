import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { submitSignup } from '../redux/actions/index';
import {
	StyledSection,
	StyledForm,
	StyledStack,
	StyledA,
} from '../components/styled-components/login-register/login-register';
import { useNavigate, useParams } from 'react-router-dom';

const schema = yup.object({
	userName: yup
		.string()
		.required('user name is Required')
		.test(
			'username',
			'Min 6 and Max 18 characters required',
			(val) => val.length >= 6 && val.length <= 18
		),
	email: yup
		.string()
		.matches(/^[\w-(.?)]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Enter valid email address')
		.required('Email is Required'),
	password: yup
		.string()
		.required('Password is Required')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/g,
			'Min 6 and Max 12 characters at least one letter,one number and no special character'
		),
	confirmPassword: yup
		.string()
		.required('Confirm Password is Required')
		.oneOf([yup.ref('password'), null], "Password doesn't match"),
});

const SignUpForm = (props) => {
	const navigate = useNavigate();
	const params = useParams();
	console.log('signup', {props});
	// const { name, email, password } = props.data;
	const { submitSignup } = props;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		console.log('data', data);
		reset();
		try {
			const response = await submitSignup(data, params);
			console.log('signup onsubmit', { response });
			navigate('/login');
		} catch (err) {
			console.log(err);
		}
		// alert(JSON.stringify(data));
	};

	return (
		<StyledSection>
			<h2>Signup Page</h2>
			<StyledForm
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
			>
				<StyledStack>
					<TextField
						label="User Name"
						variant="outlined"
						error={!!errors.username}
						helperText={errors.username && errors.username.message}
						{...register('username')}
					/>
					<TextField
						error={!!errors.email}
						label="Email"
						variant="outlined"
						helperText={errors.email && errors.email.message}
						{...register('email')}
					/>
					<TextField
						type="password"
						error={!!errors.password}
						label="Password"
						variant="outlined"
						helperText={errors.password && errors.password.message}
						{...register('password')}
					/>
					<TextField
						type="password"
						error={!!errors.confirmPassword}
						label="Confirm Password"
						variant="outlined"
						helperText={errors.confirmPassword && errors.confirmPassword.message}
						{...register('confirmPassword')}
					/>
					<Button
						type="submit"
						variant="contained"
						fullWidth
					>
						Submit
					</Button>
				</StyledStack>
			</StyledForm>
			<h5>
				<StyledA href="/login">Click here to Login page</StyledA>
			</h5>
		</StyledSection>
	);
};

// export default SignUp;
export default connect(null, { submitSignup })(SignUpForm);

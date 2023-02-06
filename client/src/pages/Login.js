import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions/index';
import { useNavigate } from 'react-router-dom';
import {
	StyledSection,
	StyledForm,
	StyledStack,
	StyledA,
} from '../components/styled-components/login-register/login-register';

const schema = yup.object({
	userName: yup
		.string()
		.required('user name is Required')
		// .test(
		// 	'userName',
		// 	'Min 6 and Max 18 characters required',
		// 	(val) => val.length >= 6 && val.length <= 18
		// ),
		,
	email: yup
		.string()
		// .matches(/^[\w-(.?)]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Enter valid email address')
		.required('Email is Required'),
	password: yup
		.string()
		.required('Password is Required')
		// .matches(
		// 	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/g,
		// 	'Min 6 and Max 12 characters atleast one letter,one number and no special character'
		// ),
});

const LoginForm = (props) => {
	const navigate = useNavigate();
	const { submitLogin } = props;

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
			//login API called
			const response = await submitLogin(data);
			console.log('login form submit', {response});

			// if HR, go to HR page,
			// if (response?.user?.role === 'hr') {
			// 	navigate('/home');
			// } else {
				// if (response.user.profile.status === 'APPROVED') {
					// navigate('/hrVisaStatus');
					// navigate('/housing');
					// navigate('/HiringManagement');
					navigate('/HrHousingList');
				// } 
			// 	else {
					// navigate('/onboardingApp');
			// 	}
			// }
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<StyledSection>
			<h2>Login</h2>
			<StyledForm
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
			>
				<StyledStack>
					<TextField
						label="User Name"
						variant="outlined"
						error={!!errors.userName}
						helperText={errors.userName && errors.userName.message}
						{...register('userName')}
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
					{errors.checkbox && <p>{errors.checkbox.message}</p>}
					<Button
						type="submit"
						variant="contained"
						fullWidth
					>
						Submit
					</Button>
				</StyledStack>
			</StyledForm>
		</StyledSection>
	);
};

// export default Login;
export default connect(null, { submitLogin })(LoginForm);

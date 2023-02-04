import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { submitLogin } from '../../redux/actions/index';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import '../../layout/survey-core/defaultV2.min.css';
import { json } from './onboarding-mock';
import '../../layout/onboarding-app.css';
// import Chip from '@material-ui/core/Chip';

const buildFormData = (formData, data, parentKey) => {
	if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
		Object.keys(data).forEach((key) => {
			buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
		});
	} else {
		const value = data == null ? '' : data;

		formData.append(parentKey, value);
	}
};

const onSubmit = async (data) => {
	const formattedData = {
		ssn: data.ssn,
		dateOfBirth: data.dateOfBirth,
		gender: data.gender, // server constants need adjusted
		address: {
			line1: data.line1,
			line2: data.line2,
			city: data.city,
			state: data.state,
			zipcode: data.zip,
		},
		citizenType: data.citizenType,
		name: {
			first: data['first-name'],
			last: data['last-name'],
			middle: data['middle-name'] ?? '',
			preferred: data['preferred-name'] ?? '',
		},
		phone: {
			mobile: data['phone-mobile'],
			work: data['phone-work'],
		},
		workAuth: {
			title: data.workAuthType ?? '',
			startDate: data.workAuthStartDate,
			endDate: data.workAuthEndDate,
		},
		car: {
			make: data['car-make'],
			model: data['car-model'],
			color: data['car-color'],
		},
		license: {
			number: data.licenseNumber,
			expiration: data.licenseExpiration,
		},
		reference: {
			name: {
				first: data['ref-name-first'],
				last: data['ref-name-last'],
				middle: data['ref-name-middle'],
			},
			phone: data['ref-phone'],
			email: data['ref-email'],
			relationship: data['ref-relationship'],
		},
		emergencyContacts: data.emergencyContact.map((each) => ({
			name: {
				first: each['name-first'],
				last: each['name-last'],
				middle: each['name-middle'],
			},
			phone: each.phone,
			email: each.email,
			relationship: each.relationship,

			licenseFile: data?.licenseFile[0],
			workAuthFile: data?.workAuthFile[0],
			photoFile: data?.profilePhotoFile[0],
		})),
	};
	console.log({ formattedData });

	// build formData from the object
	const formData = new FormData();
	buildFormData(formData, formattedData);

	console.log('files:', {
		photo: formattedData?.photoFile,
		license: formattedData?.licenseFile,
		workAuth: formattedData?.workAuthFile,
	});

	// send the post request!
	const result = await axios.post(`/profile/create`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	console.log('POST form data:', { result });
};

const OnboardingApplication = (props) => {
	console.log('props', props);
	const navigate = useNavigate();
	const survey = new Model(json);
	survey.onComplete.add(async (sender, options) => {
		// console.log({data: sender.data});
		await onSubmit(sender.data);
		navigate('/personalInfo');
	});
	/* 
		ref-name-first, last, middle, phone, email, relationship
		emergencyContact[{name-first, last middle, phone, email, relationship}]

		licenseNumber,
		car-make, model, color
		licenseFile[{name: fileName, type: fileType, content: data:type;base64,...}]

		birthDate
		gender: 'Male' | 'Female' | 'Prefer not to answer'
		ssn

		is-citizen-permanent: boolean
		if true:
			citizenType: 'Green Card' | 'Citizen'
		else: 
			workAuthType: 'H1-B' | 'L2' | 'F1(CPT/OPT)' | 'H4' | 'OTHER' (input some text???)
			workAuthFile [{...}]

		phone-cell
		phone-work

		line1
		line2
		city
		state
		zip

		first-name, middle, last, preferred

		*/

	return (
		<>
			<div className="sd-title sd-container-modern__title container">
				<div className="sd-header__text">
					<h3
						className="sd-title"
						aria-label="Onboarding Application"
						role="columnheader"
					>
						<span className="sv-string-viewer">Onboarding Application</span>
					</h3>
					<h5 className="sd-description">
						<span className="sv-string-viewer">Current status: </span>
						{/* <Chip size="small" label={props.auth.user.applicationStatus} /> */}
					</h5>
				</div>
				<div className="sd-hidden"></div>
			</div>
			<Survey model={survey} />
		</>
	);
};

// export default OnboardingApplication;
const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps, { submitLogin })(OnboardingApplication);

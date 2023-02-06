import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { submitLogin } from '../../redux/actions/index';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import '../../layout/survey-core/defaultV2.min.css';
import { getDynamicSurveyJson, surveyJson } from './onboarding-mock';
import '../../layout/onboarding-app.css';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import { Paper } from '@material-ui/core';
import DocumentRow from '../../components/DocumentRow';
import '../../layout/Personal-Information.css';

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
	console.log('onSubmit:', { data });
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
		citizenType: data.citizenType ?? 'Visa',
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
			startDate: data.workAuthStartDate ?? '',
			endDate: data.workAuthEndDate ?? '',
		},
		car: {
			make: data['car-make'],
			model: data['car-model'],
			color: data['car-color'],
		},
		license: {
			number: data.licenseNumber ?? '',
			expiration: data.licenseExpiration ?? '',
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
		emergencyContacts: data.emergencyContacts.map((each) => ({
			name: {
				first: each['name-first'],
				last: each['name-last'],
				middle: each['name-middle'],
			},
			phone: each.phone,
			email: each.email,
			relationship: each.relationship,
		})),
		licenseFile: data?.licenseFile?.[0] ?? undefined,
		workAuthFile: data?.workAuthFile?.[0] ?? undefined,
		photoFile: data?.profilePhotoFile?.[0] ?? undefined,
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
	const result = await axios
		.post(`/profile/create`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		.catch((err) => console.error(err));
	console.log('POST form data:', { result });
	return result;
};

const OnboardingApplication = (props) => {
	console.log('props', props);
	const navigate = useNavigate();
	const [message, setMessage] = useState('');

	let filled = false;
	let editable = true;
	let surveyDynamic;
	if (props.auth?.user?.profile?.status === 'REJECTED') {
		// should be filled and editable
		filled = true;
	} else if (
		props.auth?.user?.profile?.status === 'APPROVED' ||
		props.auth?.user?.profile?.status === 'PENDING'
	) {
		// filled in and not editable
		// TODO: make uneditable!
		filled = true;
		editable = false;
	} else {
		// Not yet submitted, should be empty and editable
		filled = false;
		editable = true;
	}
	const json = getDynamicSurveyJson(props.auth?.user, filled, editable);
	surveyDynamic = new Model(json);
	// surveyDynamic = new Model(surveyJson);

	surveyDynamic.onComplete.add(async (sender, options) => {
		// console.log({data: sender.data});
		try {
			const result = await onSubmit(sender.data);
			console.log({ result });
			if (result.ok) navigate('/personalInfo');
			else {
				const json = await result.json();
				console.log({ json });
				setMessage(`Error submitting form: Status: ${json.statusCode}, Message: ${json.message}`);
			}
		} catch (e) {
			console.log(e);
			setMessage(`Error submitting form: ${e.message}`);
		}
	});

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
						<Chip
							size="small"
							label={props?.auth?.user?.profile?.status ?? 'NOT YET SUBMITTED'}
						/>
					</h5>
					<p
						style={
							message
								? {
										padding: '0.5rem',
										border: '1px solid #ffaaaa',
										background: '#ffeeee',
										borderRadius: '4px',
										margin: '0.5rem auto',
								  }
								: { padding: '0.5rem', borderRadius: '4px', margin: '0.5rem auto' }
						}
					>
						{message && (
							<>
								{message}
								<button
									style={{ border: 'none', background: '#00000000' }}
									onClick={() => setMessage('')}
								>
									X
								</button>
							</>
						)}
					</p>
				</div>
				<div className="sd-hidden"></div>
			</div>
			<Survey model={surveyDynamic} />
			{filled && (
				<div className="row my-5">
					<div className="title">
						<h2>Documents</h2>
					</div>
					<Paper
						variant="outlined"
						className="document-container"
					>
						<div
							style={{
								width: '100%',
								maxWidth: 360,
							}}
						>
							<List
								component="nav"
								aria-label="secondary mailbox folders"
							>
								{/* Driver License */}
								{props.auth.user?.profile?.license.link && (
									<DocumentRow
										link={props.auth.user.profile.license.link}
										user={props.auth.user}
										title="Driver's License"
									/>
								)}
								{/* Documents */}
								{props.auth.user?.profile?.documents.length > 0 &&
									props.auth.user.profile.documents.map((doc, i) => (
										<DocumentRow
											key={i}
											link={doc.link}
											user={props.auth.user}
											title={doc.type}
										/>
									))}
								{/* Profile Photo */}
								{props.auth.user?.profile?.photo && (
									<DocumentRow
										link={props.auth.user.profile.photo}
										user={props.auth.user}
										title="Profile Photo"
									/>
								)}
							</List>
						</div>
					</Paper>
				</div>
			)}
		</>
	);
};

// export default OnboardingApplication;
const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps, { submitLogin })(OnboardingApplication);

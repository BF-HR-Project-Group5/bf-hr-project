import { Paper, ButtonGroup, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../redux/actions/index';
import Editable from 'react-bootstrap-editable';
import 'bootstrap/dist/css/bootstrap.css';
import '../layout/Personal-Information.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Navigation from '../components/navigation/navigation';
import {
	dateMongoToSimple,
	dateSimpleToMongo,
	daysRemaining,
	genderNiceString,
	genderUglyString,
} from '../utils/personalInfoHelpers';
import fileDownload from '../utils/fileDownload';
import filePreview from '../utils/filePreview';
import DocumentRow from '../components/DocumentRow';

const useStyles = makeStyles((theme) => ({
	docListContainer: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const SectionTitle = ({ title, isEditing, handleSubmit, handleCancel, handleEdit }) => {
	return (
		<div className="d-flex justify-content-between">
			<div className="title">
				<h2>{title}</h2>
			</div>
			<div>
				{isEditing ? (
					<>
						<Button
							color="primary"
							variant="contained"
							onClick={handleSubmit}
							className="m-2"
						>
							Save
						</Button>
						<Button
							color="secondary"
							variant="contained"
							onClick={handleCancel}
							className="m-2"
						>
							Cancel
						</Button>
					</>
				) : (
					<Button
						variant="contained"
						onClick={handleEdit}
						className="m-2"
					>
						Edit
					</Button>
				)}
			</div>
		</div>
	);
};

const PersonalInformation = (props) => {
	const classes = useStyles();
	const { updateProfile } = props;

	const [isEditingName, setIsEditingName] = React.useState(false);
	const [oldName, setOldName] = React.useState({});
	const [name, setName] = React.useState({
		name: {
			first: props.auth.user?.name.first,
			last: props.auth.user?.name.last,
			middle: props.auth.user?.name?.middle ?? '',
			preferred: props.auth.user?.name?.preferred ?? '',
		},
		email: props.auth.user.email,
		ssn: props.auth.user?.profile?.ssn,
		dateOfBirth: props.auth.user?.profile.dateOfBirth,
		gender: genderNiceString(props.auth.user?.profile.gender),
	});
	const handleSubmitEditName = async () => {
		try {
			// turn off editing
			setIsEditingName(false);
			const data = { ...name, gender: genderUglyString(name.gender) };
			const { user, profile } = await updateProfile(data);
			// update name state
			setName((prev) => ({
				...prev,
				name: {
					...prev.name,
					...user.name,
				},
				email: user.email,
				ssn: profile.ssn,
				dateOfBirth: profile.dateOfBirth,
				gender: profile.gender,
			}));
		} catch (err) {
			console.error(err);
		}
	};
	const handleCancelEditName = () => {
		setName((prev) => ({ ...prev, ...oldName }));
		setIsEditingName(false);
	};
	const handleEditName = () => {
		setOldName((prev) => ({ ...prev, ...name }));
		setIsEditingName(true);
	};

	const [isEditingAddress, setIsEditingAddress] = React.useState(false);
	const [oldAddress, setOldAddress] = React.useState({});
	const [address, setAddress] = React.useState({
		line1: props.auth.user?.profile.address.line1,
		line2: props.auth.user?.profile.address.line2,
		city: props.auth.user?.profile.address.city,
		state: props.auth.user?.profile.address.state,
		zipcode: props.auth.user?.profile.address.zipcode,
	});
	const handleSubmitEditAddress = async () => {
		try {
			setIsEditingAddress(false);
			const data = { address };
			const { user, profile } = await updateProfile(data);
			setAddress((prev) => ({
				...prev,
				...profile.address,
			}));
		} catch (err) {
			console.error(err);
		}
	};
	const handleCancelEditAddress = () => {
		setAddress((prev) => ({ ...prev, ...oldAddress }));
		setIsEditingAddress(false);
	};
	const handleEditAddress = () => {
		setOldAddress((prev) => ({ ...prev, ...address }));
		setIsEditingAddress(true);
	};

	const [oldContact, setOldContact] = React.useState({});
	const [isEditingContact, setIsEditingContact] = React.useState(false);
	const [contact, setContact] = React.useState({
		phone: {
			mobile: props.auth.user?.profile.phone.mobile,
			work: props.auth.user?.profile.phone.work ?? 'N/A',
		},
	});
	const handleSubmitEditContact = async () => {
		try {
			setIsEditingContact(false);
			const data = { ...contact };
			const { user, profile } = await updateProfile(data);
			setContact((prev) => ({
				...prev,
				phone: {
					...profile.phone,
				},
			}));
		} catch (err) {
			console.error(err);
		}
	};
	const handleCancelEditContact = () => {
		setContact((prev) => ({ ...prev, ...oldContact }));
		setIsEditingContact(false);
	};
	const handleEditContact = () => {
		setOldContact((prev) => ({ ...prev, ...contact }));
		setIsEditingContact(true);
	};

	const [oldEmployment, setOldEmployment] = React.useState({});
	const [isEditingEmployment, setIsEditingEmployment] = React.useState(false);
	const [employment, setEmployment] = React.useState({
		workAuth: {
			title: props.auth.user?.profile?.workAuth.title,
			startDate: props.auth.user?.profile?.workAuth.startDate,
			endDate: props.auth.user?.profile?.workAuth.endDate,
		},
	});
	const handleSubmitEditEmployment = async () => {
		try {
			setIsEditingEmployment(false);
			const data = { ...employment };
			const { user, profile } = await updateProfile(data);
			setEmployment((prev) => ({
				...prev,
				workAuth: {
					...profile.workAuth,
				},
			}));
		} catch (err) {
			console.error(err);
		}
	};
	const handleCancelEditEmployment = () => {
		setEmployment((prev) => ({ ...prev, ...oldEmployment }));
		setIsEditingEmployment(false);
	};
	const handleEditEmployment = () => {
		setOldEmployment((prev) => ({ ...prev, ...employment }));
		setIsEditingEmployment(true);
	};

	const [isEditingEcontact, setIsEditingEcontact] = React.useState(false);
	const [oldEcontact, setOldEcontact] = React.useState({});
	const [econtact, setEcontact] = React.useState(
		props.auth.user?.profile?.emergencyContacts.map((c) => ({
			name: {
				first: c.name.first,
				last: c.name.last,
				middle: c.name?.middle ?? '',
			},
			phone: c.phone,
			email: c.email,
			relationship: c.relationship,
		}))
	);
	const handleSubmitEditEcontact = async () => {
		try {
			setIsEditingEcontact(false);
			const data = { emergencyContacts: econtact };
			const { user, profile } = await updateProfile(data);
			setEcontact(() => [...profile.emergencyContacts]);
		} catch (err) {
			console.error(err);
		}
	};
	const handleCancelEditEcontact = () => {
		setEcontact((prev) => ({ ...prev, ...oldEcontact }));
		setIsEditingEcontact(false);
	};
	const handleEditEcontact = () => {
		setOldEcontact((prev) => ({ ...prev, ...econtact }));
		setIsEditingEcontact(true);
	};

	return (
		<>
			<div className="container">
				<div className="row mt-3">
					<div className="col-12 mx-auto text-center">
						<h3>Welcome to Personal Information Page</h3>
						<p>
							You can view and edit all of your information on this page. If you have any question
							please contact HR.
						</p>
					</div>
				</div>
				<hr />
				<div className="content">
					<div className="row my-5">
						<SectionTitle
							title="Name"
							isEditing={isEditingName}
							handleCancel={handleCancelEditName}
							handleSubmit={handleSubmitEditName}
							handleEdit={handleEditName}
						/>

						<Paper
							variant="outlined"
							className="document-container"
						>
							<div className="col-3 mx-auto">
								<label>First name:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingName}
									editText="Edit"
									id={null}
									initialValue={name.name.first}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setName((prev) => ({ ...prev, name: { ...prev.name, first: val } }))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Last name:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingName}
									editText="Edit"
									id={null}
									initialValue={name.name.last}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setName((prev) => ({ ...prev, name: { ...prev.name, last: val } }))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Middle name:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingName}
									editText="Edit"
									id={null}
									initialValue={name.name.middle ?? ''}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setName((prev) => ({ ...prev, name: { ...prev.name, middle: val } }))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Preferred name:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingName}
									editText="Edit"
									id={null}
									initialValue={name.name.preferred ?? ''}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setName((prev) => ({ ...prev, name: { ...prev.name, preferred: val } }))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Email:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingName}
									editText="Edit"
									id={null}
									initialValue={name.email}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setName((prev) => ({ ...prev, email: val }))}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>SSN:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingName}
									editText="Edit"
									id={null}
									initialValue={'' + name.ssn}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setName((prev) => ({ ...prev, ssn: val }))}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Date of birth:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingName}
									editText="Edit"
									id={null}
									initialValue={dateMongoToSimple(name.dateOfBirth)}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setName((prev) => ({ ...prev, dateOfBirth: val }))}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="date"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Gender:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingName}
									editText="Edit"
									id={null}
									initialValue={genderNiceString(name.gender)}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setName((prev) => ({ ...prev, gender: val }))}
									onValidated={null}
									options={['Male', 'Female', 'Prefer not to answer']}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="select"
									validate={null}
								/>
							</div>
						</Paper>
					</div>
					<div className="row my-5">
						<SectionTitle
							title="Address"
							isEditing={isEditingAddress}
							handleCancel={handleCancelEditAddress}
							handleSubmit={handleSubmitEditAddress}
							handleEdit={handleEditAddress}
						/>
						<Paper
							variant="outlined"
							className="document-container"
						>
							<div className="col-3 mx-auto">
								<label>Street name:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingAddress}
									editText="Edit"
									id={null}
									initialValue={address.line1}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setAddress((prev) => ({ ...prev, line1: val }))}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Building/apt:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingAddress}
									editText="Edit"
									id={null}
									initialValue={address.line2}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setAddress((prev) => ({ ...prev, line2: val }))}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>City:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingAddress}
									editText="Edit"
									id={null}
									initialValue={address.city}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setAddress((prev) => ({ ...prev, city: val }))}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>State:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingAddress}
									editText="Edit"
									id={null}
									initialValue={address.state}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setAddress((prev) => ({ ...prev, state: val }))}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Zip:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingAddress}
									editText="Edit"
									id={null}
									initialValue={address.zipcode}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) => setAddress((prev) => ({ ...prev, zipcode: val }))}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
						</Paper>
					</div>
					<div className="row my-5">
						<SectionTitle
							title="Contact Info"
							isEditing={isEditingContact}
							handleCancel={handleCancelEditContact}
							handleSubmit={handleSubmitEditContact}
							handleEdit={handleEditContact}
						/>
						<Paper
							variant="outlined"
							className="document-container"
						>
							<div className="col-3 mx-auto">
								<label>Cell phone number:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingContact}
									editText="Edit"
									id={null}
									initialValue={'' + contact.phone.mobile}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setContact((prev) => ({ ...prev, phone: { ...prev.phone, mobile: val } }))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Work phone number:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingContact}
									editText="Edit"
									id={null}
									initialValue={'' + (contact.phone.work ?? 'N/A')}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setContact((prev) => ({ ...prev, phone: { ...prev.phone, work: val } }))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
						</Paper>
					</div>
					{props.auth?.user?.profile?.citizenType === 'VISA' && <div className="row my-5">
						<SectionTitle
							title="Employment"
							isEditing={isEditingEmployment}
							handleCancel={handleCancelEditEmployment}
							handleSubmit={handleSubmitEditEmployment}
							handleEdit={handleEditEmployment}
						/>
						<Paper
							variant="outlined"
							className="document-container"
						>
							<div className="col-3 mx-auto">
								<label>Visa title:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingEmployment}
									editText="Edit"
									id={null}
									initialValue={employment.workAuth.title ?? ''}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setEmployment((prev) => ({ workAuth: { ...prev.workAuth, title: val } }))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="textfield"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>Start date:</label>
								<Editable
									ajax={null}
									alwaysEditing={false}
									className={null}
									disabled={!isEditingEmployment}
									editText="Edit"
									id={null}
									initialValue={dateMongoToSimple(employment.workAuth.startDate) ?? ''}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setEmployment((prev) => ({
											workAuth: { ...prev.workAuth, startDate: dateSimpleToMongo(val) },
										}))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="date"
									validate={null}
								/>
							</div>
							<div className="col-3 mx-auto">
								<label>End date:</label>
								<Editable
									ajax={null}
									className={null}
									disabled={!isEditingEmployment}
									editText="Edit"
									id={null}
									initialValue={dateMongoToSimple(employment.workAuth.endDate) ?? ''}
									isValueClickable={false}
									label={null}
									mode="inline"
									onSubmit={(val) =>
										setEmployment((prev) => ({
											workAuth: { ...prev.workAuth, endDate: dateSimpleToMongo(val) },
										}))
									}
									onValidated={null}
									options={null}
									placement="top"
									renderCancelElement={null}
									renderConfirmElement={null}
									showText
									type="date"
									validate={null}
								/>
							</div>
						</Paper>
					</div>}
					<div className="row my-5">
						<SectionTitle
							title="Emergency Contacts"
							isEditing={isEditingEcontact}
							handleCancel={handleCancelEditEcontact}
							handleSubmit={handleSubmitEditEcontact}
							handleEdit={handleEditEcontact}
						/>
						{econtact.map((contact, i) => (
							<React.Fragment key={i}>
								<h5 className="ml-2">Contact #{i + 1}</h5>
								<Paper
									variant="outlined"
									className="document-container my-2"
								>
									<div className="col-3 mx-auto">
										<label>First name:</label>
										<Editable
											ajax={null}
											alwaysEditing={false}
											className={null}
											disabled={!isEditingEcontact}
											editText="Edit"
											id={null}
											initialValue={contact.name.first}
											isValueClickable={false}
											label={null}
											mode="inline"
											onSubmit={(val) => {
												const econtactBeingEdited = econtact[i];

												const econtactCopy = [...econtact];
												econtactCopy.splice(i, 1);

												econtactBeingEdited.name.first = val;

												setEcontact((prev) => [...econtactCopy, econtactBeingEdited]);
											}}
											onValidated={null}
											options={null}
											placement="top"
											renderCancelElement={null}
											renderConfirmElement={null}
											showText
											type="textfield"
											validate={null}
										/>
									</div>
									<div className="col-3 mx-auto">
										<label>Last name:</label>
										<Editable
											ajax={null}
											alwaysEditing={false}
											className={null}
											disabled={!isEditingEcontact}
											editText="Edit"
											id={null}
											initialValue={contact.name.last}
											isValueClickable={false}
											label={null}
											mode="inline"
											onSubmit={(val) => {
												const econtactBeingEdited = econtact[i];

												const econtactCopy = [...econtact];
												econtactCopy.splice(i, 1);

												econtactBeingEdited.name.last = val;

												setEcontact((prev) => [...econtactCopy, econtactBeingEdited]);
											}}
											onValidated={null}
											options={null}
											placement="top"
											renderCancelElement={null}
											renderConfirmElement={null}
											showText
											type="textfield"
											validate={null}
										/>
									</div>
									<div className="col-3 mx-auto">
										<label>Middle name:</label>
										<Editable
											ajax={null}
											alwaysEditing={false}
											className={null}
											disabled={!isEditingEcontact}
											editText="Edit"
											id={null}
											initialValue={contact.name?.middle}
											isValueClickable={false}
											label={null}
											mode="inline"
											onSubmit={(val) => {
												const econtactBeingEdited = econtact[i];

												const econtactCopy = [...econtact];
												econtactCopy.splice(i, 1);

												econtactBeingEdited.name.middle = val;

												setEcontact((prev) => [...econtactCopy, econtactBeingEdited]);
											}}
											onValidated={null}
											options={null}
											placement="top"
											renderCancelElement={null}
											renderConfirmElement={null}
											showText
											type="textfield"
											validate={null}
										/>
									</div>
									<div className="col-3 mx-auto">
										<label>Phone:</label>
										<Editable
											ajax={null}
											alwaysEditing={false}
											className={null}
											disabled={!isEditingEcontact}
											editText="Edit"
											id={null}
											initialValue={contact.phone}
											isValueClickable={false}
											label={null}
											mode="inline"
											onSubmit={(val) => {
												const econtactBeingEdited = econtact[i];

												const econtactCopy = [...econtact];
												econtactCopy.splice(i, 1);

												econtactBeingEdited.phone = val;

												setEcontact((prev) => [...econtactCopy, econtactBeingEdited]);
											}}
											onValidated={null}
											options={null}
											placement="top"
											renderCancelElement={null}
											renderConfirmElement={null}
											showText
											type="textfield"
											validate={null}
										/>
									</div>
									<div className="col-3 mx-auto">
										<label>Email:</label>
										<Editable
											ajax={null}
											alwaysEditing={false}
											className={null}
											disabled={!isEditingEcontact}
											editText="Edit"
											id={null}
											initialValue={contact.email}
											isValueClickable={false}
											label={null}
											mode="inline"
											onSubmit={(val) => {
												const econtactBeingEdited = econtact[i];

												const econtactCopy = [...econtact];
												econtactCopy.splice(i, 1);

												econtactBeingEdited.email = val;

												setEcontact((prev) => [...econtactCopy, econtactBeingEdited]);
											}}
											onValidated={null}
											options={null}
											placement="top"
											renderCancelElement={null}
											renderConfirmElement={null}
											showText
											type="textfield"
											validate={null}
										/>
									</div>
									<div className="col-3 mx-auto">
										<label>Relationship:</label>
										<Editable
											ajax={null}
											alwaysEditing={false}
											className={null}
											disabled={false}
											editText="Edit"
											id={null}
											initialValue={contact.relationship}
											isValueClickable={false}
											label={null}
											mode="inline"
											onSubmit={(val) => {
												const econtactBeingEdited = econtact[i];

												const econtactCopy = [...econtact];
												econtactCopy.splice(i, 1);

												econtactBeingEdited.relationship = val;

												setEcontact((prev) => [...econtactCopy, econtactBeingEdited]);
											}}
											onValidated={null}
											options={null}
											placement="top"
											renderCancelElement={null}
											renderConfirmElement={null}
											showText
											type="textfield"
											validate={null}
										/>
									</div>
								</Paper>
							</React.Fragment>
						))}{' '}
						{/* end contacts map */}
					</div>
					<div className="row my-5">
						<div className="title">
							<h2>Documents</h2>
						</div>
						<Paper
							variant="outlined"
							className="document-container"
						>
							<div className={classes.docListContainer}>
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
				</div>
			</div>
		</>
	);
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps, { updateProfile })(PersonalInformation);

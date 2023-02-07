import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ButtonGroup, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import fileDownload from '../utils/fileDownload';
import filePreview from '../utils/filePreview';
import { config } from '../utils/constants';
import {documentCreate} from '../redux/actions/index';
import {connect} from 'react-redux';

// add image, files, desc to formData and send to server via POST
// async function postImage({ doc }) {
//     const formData = new FormData();
//     formData.append("file", doc)

//     const result = await axios.post(
//         '/document/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } }
//     )
//     // console.log({ result })
//     return { resultDoc: result.data.document.link }
// }

const ManagedDocument = (props) => {
	// console.log({ props })
	let document = props.document;
	// console.log(document)

	const [file, setFile] = useState('');
	const [clicked, setClicked] = useState(false);
	const [message, setMessage] = useState('');
	const [key, setKey] = useState(0);

	// useEffect(() => {
	//     let timer;
	//     if (message !== '') {
	//         timer = setTimeout(() => setMessage(''), 8000) // set timer to reset message to empty after 8 secs
	//     }
	//     return () => clearTimeout(timer); // cleanup func
	// }, [message]); // watch message

	const fileSelectedDoc = (e) => {
		// console.log('e.target.files', e.target.files)
		console.log('e', e.target);
		const file = e.target.files[0];
		setFile(file);
		console.log('file', file);
	};

	const submit = async (e) => {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await props.documentCreate(formData);
			setMessage(`"${file.name}" upload successful, Waiting for HR Review`);
			console.log('documentCreate submitted:', {response});
			setKey(Math.random());
		} catch(e) {
			setMessage('Error uploading:', e);
		}

	};

	return (
		<>
			{
				// if authors exists, return the data in a table, if not return Loading...
				document ? (
					// if it does exist it should render the document.status, .type, and render Preview and Download buttons using the document.link
					<div>
						<h3 style={{margin: '2rem 0'}}>Document type: {config.nextStepsObj[props.user.profile.nextStep].doc}</h3>
						<div style={{margin: '2rem 0'}}>Status: {document.status}</div>
						{/* go to next case */}
						{/* (cond1) ? "something" : (cond2) ? "something2" : "something3" */}

						{/* {document.status == "PENDING" ? "Waiting for HR to approve" : */}
						{document.status == 'PENDING' ? (
							config.nextStepsObj[props.user.profile.nextStep].user
						) : document.status == 'APPROVED' ? (
							<>
								<ListItem button style={{margin: '2rem 0'}}>
									<ListItemText primary={document.type} />
									<ButtonGroup
										color="primary"
										aria-label="outlined primary button group"
									>
										<Button
											onClick={(e) => {
												e.preventDefault();
												let splitLink = document.link.split('.');
												const endTag = splitLink[splitLink.length - 1];
												fileDownload(
													document.link,
													`${props.user.name.last}${props.user.name.first}${props.user.profile.workAuth.title}.${endTag}`
												);
											}}
										>
											Download
										</Button>
										<Button
											onClick={(e) => {
												e.preventDefault();
												filePreview(document.link);
												setClicked(!clicked);
											}}
										>
											Preview
										</Button>
									</ButtonGroup>
								</ListItem>
								{clicked == true && (
									<iframe
										src={document.link}
										height="300%"
										width="100%"
									></iframe>
								)}
							</>
						) : document.status == 'REJECTED' ? (
							<>
								<p style={{margin: '2rem 0'}}>{document.feedback}</p>
								<br />

								<ListItem button style={{margin: '2rem 0'}}>
									<ListItemText primary={document.type} />
									<ButtonGroup
										color="primary"
										aria-label="outlined primary button group"
									>
										<Button
											onClick={(e) => {
												e.preventDefault();
												let splitLink = document.link.split('.');
												const endTag = splitLink[splitLink.length - 1];
												fileDownload(
													document.link,
													`${props.user.name.last}${props.user.name.first}${props.user.profile.workAuth.title}.${endTag}`
												);
											}}
										>
											Download
										</Button>
										<Button
											onClick={(e) => {
												e.preventDefault();
												filePreview(document.link);
											}}
										>
											Preview
										</Button>
									</ButtonGroup>
								</ListItem>
							</>
						) : (
							'Pending HR Review'
						)}
					</div>
				) : (
					<>
					<h3 style={{margin: '2rem 0'}}>Please upload your {config.optDocuments[props.user?.profile?.documents?.length] ?? 'next document.'}</h3>
						<form onSubmit={submit} style={message ? {margin: '2rem 0 4.4rem'}: {margin: '2rem 0 6.4rem'}}>
							<input
								onChange={fileSelectedDoc}
								type="file"
								name="doc"
								key={key}
							/>

							<ButtonGroup>
								<Button
									type="submit"
									name="upload"
								>
									Upload
								</Button>
							</ButtonGroup>
						</form>
						<p>{message}</p>
					</>
				)
			}
		</>
	);
};

// export default ManagedDocument;
const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
		{documentCreate}
)(ManagedDocument);


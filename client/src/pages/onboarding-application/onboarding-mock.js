export const json = {
	logo: '',
	logoFit: 'cover',
	logoPosition: 'right',
	logoHeight: '100px',
	completedHtml:
		'<div><h1>Thank you for completing your application! </h1><p>Redirecting you to your profile...</p></div>', // the "completed" page
	elements: [
		{
			type: 'panel',
			name: 'name',
			title: 'Name',
			elements: [
				{
					type: 'text',
					name: 'first-name',
					title: 'First Name',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'last-name',
					title: 'Last Name',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'middle-name',
					title: 'Middle Name',
					startWithNewLine: false,
					isRequired: false,
				},
				{
					type: 'text',
					name: 'preferred-name',
					title: 'Preferred name',
					startWithNewLine: false,
				},
			],
		},
		{
			type: 'panel',
			name: 'current-address',
			title: 'Current address',
			elements: [
				{
					type: 'text',
					name: 'line1',
					title: 'Street name and Address',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'line2',
					title: 'Building/Apt #',
					startWithNewLine: false,
					isRequired: false,
				},
				{
					type: 'text',
					name: 'city',
					title: 'City',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'state',
					title: 'State',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'zip',
					title: 'Zip',
					startWithNewLine: false,
					isRequired: true,
				},
			],
		},
		{
			type: 'panel',
			name: 'phone-number',
			title: 'Phone number',
			elements: [
				{
					type: 'text',
					name: 'phone-mobile',
					title: 'Cell phone number',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'phone-work',
					title: 'Work phone number',
					startWithNewLine: false,
				},
			],
		},
		{
			type: 'file',
			name: 'profilePhotoFile',
			title: 'Upload a profile photo',
			acceptedTypes: 'image/*',
			isRequired: false,
		},
		{
			type: 'panel',
			name: 'personal-info',
			title: 'Personal Information',
			elements: [
				{
					type: 'radiogroup',
					name: 'gender',
					title: 'Gender',
					choices: ['Male', 'Female', 'Prefer not to answer'],
					showOtherItem: false,
					otherPlaceholder: 'Please specify...',
					otherText: 'Other',
				},
				{
					type: 'text',
					name: 'dateOfBirth',
					title: 'Date of birth',
					inputType: 'date',
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ssn',
					title: 'Social Security Number',
					startWithNewLine: true,
					isRequired: true,
				},
			],
		},
		{
			type: 'radiogroup',
			name: 'is-citizen-permanent',
			title: 'Are you a citizen or permanent resident of the U.S?',
			choices: ['No', 'Yes'],
			showOtherItem: false,
			otherPlaceholder: 'Please specify...',
			otherText: 'Other',
		},
		{
			type: 'radiogroup',
			name: 'citizenType',
			visibleIf: "{is-citizen-permanent} = 'Yes'",
			title: 'Citizen or Green Card?',
			choices: ['Green Card', 'Citizen'],
			showOtherItem: false,
			otherPlaceholder: 'Please specify...',
			otherText: 'Other',
		},
		{
			type: 'panel',
			name: 'workAuthDetails',
			visibleIf: "{is-citizen-permanent} = 'No'",
			title: 'Work Authorization Information',
			elements: [
				{
					type: 'radiogroup',
					name: 'workAuthType',
					// visibleIf: "{is-citizen-permanent} = 'No'",
					title: 'What is your work authorization?',
					choices: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4'],
					showOtherItem: true,
					otherPlaceholder: 'Please specify...',
					otherText: 'Other',
				},
				{
					type: 'text',
					name: 'workAuthStartDate',
					title: 'Start Date',
					inputType: 'date',
					isRequired: true,
				},
				{
					type: 'text',
					name: 'workAuthEndDate',
					title: 'End Date',
					inputType: 'date',
					isRequired: true,
					startWithNewLine: false,
				},
			],
		},
		{
			type: 'file',
			name: 'workAuthFile',
			visibleIf: "{is-citizen-permanent} = 'No'",
			title: 'Upload your work authorization document',
			isRequired: true,
			acceptedTypes: 'application/pdf',
		},
		{
			type: 'boolean',
			name: 'have-driver-license',
			title: "Do you have a driver's license?",
		},

		{
			type: 'panel',
			name: 'car',
			title: 'Car information',
			visibleIf: '{have-driver-license} = true',
			elements: [
				{
					type: 'text',
					name: 'car-make',
					title: 'Make',
					startWithNewLine: false,
				},
				{
					type: 'text',
					name: 'car-model',
					title: 'Model',
					startWithNewLine: false,
				},
				{
					type: 'text',
					name: 'car-color',
					title: 'Color',
					startWithNewLine: false,
				},
			],
		},
		{
			type: 'panel',
			name: 'driver-license-info',
			title: 'Driver License Information',
			visibleIf: '{have-driver-license} = true',
			elements: [
				{
					type: 'text',
					name: 'licenseNumber',
					title: "Driver's license number",
					isRequired: true,
				},
				{
					type: 'text',
					name: 'licenseExpiration',
					title: 'Expiration Date',
					inputType: 'date',
					isRequired: true,
				},
			],
		},
		{
			type: 'file',
			name: 'licenseFile',
			visibleIf: '{have-driver-license} = true',
			title: 'Upload your driver license document',
			acceptedTypes: 'application/pdf',
			isRequired: true,
		},

		{
			type: 'panel',
			name: 'reference',
			title: 'Reference (who referred you to this company? There can only be 1)',
			elements: [
				{
					type: 'text',
					name: 'ref-name-first',
					title: 'First Name',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ref-name-last',
					title: 'Last Name',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ref-name-middle',
					title: 'Middle Name',
					startWithNewLine: false,
					isRequired: false,
				},
				{
					type: 'text',
					name: 'ref-phone',
					title: 'phone',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ref-email',
					title: 'email',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ref-relationship',
					title: 'relationship',
					startWithNewLine: false,
					isRequired: true,
				},
			],
		},
		{
			name: 'emergency-contact',
			title: 'Emergency contact',
			type: 'panel',
			elements: [
				{
					type: 'paneldynamic',
					name: 'emergencyContacts',
					titleLocation: 'hidden',
					defaultValue: [{}],
					templateTitle: 'Emergency contact #{panelIndex}',
					panelAddText: 'Add an emergency contact',
					templateElements: [
						{
							type: 'text',
							name: 'name-first',
							isRequired: true,
							startWithNewLine: false,
							title: 'First name',
							titleLocation: 'top',
						},
						{
							type: 'text',
							name: 'name-last',
							isRequired: true,
							startWithNewLine: false,
							title: 'Last name',
							titleLocation: 'top',
						},
						{
							type: 'text',
							name: 'name-middle',
							startWithNewLine: false,
							title: 'Middle name',
							titleLocation: 'top',
						},
						{
							type: 'text',
							name: 'phone',
							title: '10 Digit Phone number',
							isRequired: true,
							startWithNewLine: false,
							titleLocation: 'top',
							validators: [
								{
									type: 'regex',
									// "text": "Phone number must be in the following format: +0 (000) 000-00-00",
									// "regex": "\\+[0-9]{1} \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
									text: 'Please enter a 10 digit phone number',
									// regex: '(((d{3})?)|(d{3}))([s-./]?)(d{3})([s-./]?)(d{4})',
									// "regex": "^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
								},
							],
							inputType: 'tel',
							placeholder: '+0 (000) 000-0000',
						},
						{
							type: 'text',
							name: 'email',
							isRequired: true,
							startWithNewLine: false,
							title: 'Email',
							titleLocation: 'top',
						},
						{
							type: 'text',
							name: 'relationship',
							isRequired: true,
							startWithNewLine: false,
							title: 'Relationship',
							titleLocation: 'top',
						},
					],
				},
			],
		},
	],
	showProgressBar: 'top',
	progressBarType: 'questions',
	widthMode: 'static',
	width: '864px',
};

export const getJsonFromStatus = (user) => {
	// if there's a profile, we should auto-fill
	// if theres no profile or if the profile status is rejected, we allow editing the fields
	const shouldBeFilled = !!user?.profile; 
	const shouldBeEnabled = (!shouldBeFilled || user?.profile.status === 'REJECTED'); 

	console.log({user, shouldBeFilled, shouldBeEnabled});

const json = {
	logo: '',
	logoFit: 'cover',
	logoPosition: 'right',
	logoHeight: '100px',
	completedHtml:
		'<div><h1>Thank you for completing your application! </h1><p>Redirecting you to your profile...</p></div>', // the "completed" page
	elements: [
		{
			type: 'panel',
			name: 'name',
			title: 'Name',
			elements: [
				{
					type: 'text',
					name: 'first-name',
					title: 'First Name',
					startWithNewLine: false,
					isRequired: true,
					defaultValue: shouldBeFilled ? user.name.first : '',
					enabledIf: shouldBeEnabled? "" : "{first-name}='sanfgka34sw98rh3njkfqwahe'",
				},
				{
					type: 'text',
					name: 'last-name',
					title: 'Last Name',
					startWithNewLine: false,
					isRequired: true,
					defaultValue: shouldBeFilled ? user.name.last : '',
					enabledIf: shouldBeEnabled? "" : "{first-name}='sanfgka34sw98rh3njkfqwahe'",
				},
				{
					type: 'text',
					name: 'middle-name',
					title: 'Middle Name',
					startWithNewLine: false,
					isRequired: false,
					defaultValue: shouldBeFilled ? (user.name?.middle ?? '') : '',
					enabledIf: shouldBeEnabled? "" : "{first-name}='sanfgka34sw98rh3njkfqwahe'",
				},
				{
					type: 'text',
					name: 'preferred-name',
					title: 'Preferred name',
					startWithNewLine: false,
					defaultValue: shouldBeFilled ? (user.name?.preferred ?? '') : '',
					enabledIf: shouldBeEnabled? "" : "{first-name}='sanfgka34sw98rh3njkfqwahe'",
				},
			],
		},
		{
			type: 'panel',
			name: 'current-address',
			title: 'Current address',
			elements: [
				{
					type: 'text',
					name: 'line1',
					title: 'Street name and Address',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'line2',
					title: 'Building/Apt #',
					startWithNewLine: false,
					isRequired: false,
				},
				{
					type: 'text',
					name: 'city',
					title: 'City',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'state',
					title: 'State',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'zip',
					title: 'Zip',
					startWithNewLine: false,
					isRequired: true,
				},
			],
		},
		{
			type: 'panel',
			name: 'phone-number',
			title: 'Phone number',
			elements: [
				{
					type: 'text',
					name: 'phone-mobile',
					title: 'Cell phone number',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'phone-work',
					title: 'Work phone number',
					startWithNewLine: false,
				},
			],
		},
		{
			type: 'file',
			name: 'profilePhotoFile',
			title: 'Upload a profile photo',
			acceptedTypes: 'image/*',
			isRequired: false,
		},
		{
			type: 'panel',
			name: 'personal-info',
			title: 'Personal Information',
			elements: [
				{
					type: 'radiogroup',
					name: 'gender',
					title: 'Gender',
					choices: ['Male', 'Female', 'Prefer not to answer'],
					showOtherItem: false,
					otherPlaceholder: 'Please specify...',
					otherText: 'Other',
				},
				{
					type: 'text',
					name: 'dateOfBirth',
					title: 'Date of birth',
					inputType: 'date',
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ssn',
					title: 'Social Security Number',
					startWithNewLine: true,
					isRequired: true,
				},
			],
		},
		{
			type: 'radiogroup',
			name: 'is-citizen-permanent',
			title: 'Are you a citizen or permanent resident of the U.S?',
			choices: ['No', 'Yes'],
			showOtherItem: false,
			otherPlaceholder: 'Please specify...',
			otherText: 'Other',
		},
		{
			type: 'radiogroup',
			name: 'citizenType',
			visibleIf: "{is-citizen-permanent} = 'Yes'",
			title: 'Citizen or Green Card?',
			choices: ['Green Card', 'Citizen'],
			showOtherItem: false,
			otherPlaceholder: 'Please specify...',
			otherText: 'Other',
		},
		{
			type: 'panel',
			name: 'workAuthDetails',
			visibleIf: "{is-citizen-permanent} = 'No'",
			title: 'Work Authorization Information',
			elements: [
				{
					type: 'radiogroup',
					name: 'workAuthType',
					// visibleIf: "{is-citizen-permanent} = 'No'",
					title: 'What is your work authorization?',
					choices: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4'],
					showOtherItem: true,
					otherPlaceholder: 'Please specify...',
					otherText: 'Other',
				},
				{
					type: 'text',
					name: 'workAuthStartDate',
					title: 'Start Date',
					inputType: 'date',
					isRequired: true,
				},
				{
					type: 'text',
					name: 'workAuthEndDate',
					title: 'End Date',
					inputType: 'date',
					isRequired: true,
					startWithNewLine: false,
				},
			],
		},
		{
			type: 'file',
			name: 'workAuthFile',
			visibleIf: "{is-citizen-permanent} = 'No'",
			title: 'Upload your work authorization document',
			isRequired: true,
			acceptedTypes: 'application/pdf',
		},
		{
			type: 'boolean',
			name: 'have-driver-license',
			title: "Do you have a driver's license?",
		},

		{
			type: 'panel',
			name: 'car',
			title: 'Car information',
			visibleIf: '{have-driver-license} = true',
			elements: [
				{
					type: 'text',
					name: 'car-make',
					title: 'Make',
					startWithNewLine: false,
				},
				{
					type: 'text',
					name: 'car-model',
					title: 'Model',
					startWithNewLine: false,
				},
				{
					type: 'text',
					name: 'car-color',
					title: 'Color',
					startWithNewLine: false,
				},
			],
		},
		{
			type: 'panel',
			name: 'driver-license-info',
			title: 'Driver License Information',
			visibleIf: '{have-driver-license} = true',
			elements: [
				{
					type: 'text',
					name: 'licenseNumber',
					title: "Driver's license number",
					isRequired: true,
				},
				{
					type: 'text',
					name: 'licenseExpiration',
					title: 'Expiration Date',
					inputType: 'date',
					isRequired: true,
				},
			],
		},
		{
			type: 'file',
			name: 'licenseFile',
			visibleIf: '{have-driver-license} = true',
			title: 'Upload your driver license document',
			acceptedTypes: 'application/pdf',
			isRequired: true,
		},

		{
			type: 'panel',
			name: 'reference',
			title: 'Reference (who referred you to this company? There can only be 1)',
			elements: [
				{
					type: 'text',
					name: 'ref-name-first',
					title: 'First Name',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ref-name-last',
					title: 'Last Name',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ref-name-middle',
					title: 'Middle Name',
					startWithNewLine: false,
					isRequired: false,
				},
				{
					type: 'text',
					name: 'ref-phone',
					title: 'phone',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ref-email',
					title: 'email',
					startWithNewLine: false,
					isRequired: true,
				},
				{
					type: 'text',
					name: 'ref-relationship',
					title: 'relationship',
					startWithNewLine: false,
					isRequired: true,
				},
			],
		},
		{
			name: 'emergency-contact',
			title: 'Emergency contact',
			type: 'panel',
			elements: [
				{
					type: 'paneldynamic',
					name: 'emergencyContacts',
					titleLocation: 'hidden',
					defaultValue: [{}],
					templateTitle: 'Emergency contact #{panelIndex}',
					panelAddText: 'Add an emergency contact',
					templateElements: [
						{
							type: 'text',
							name: 'name-first',
							isRequired: true,
							startWithNewLine: false,
							title: 'First name',
							titleLocation: 'top',
						},
						{
							type: 'text',
							name: 'name-last',
							isRequired: true,
							startWithNewLine: false,
							title: 'Last name',
							titleLocation: 'top',
						},
						{
							type: 'text',
							name: 'name-middle',
							startWithNewLine: false,
							title: 'Middle name',
							titleLocation: 'top',
						},
						{
							type: 'text',
							name: 'phone',
							title: '10 Digit Phone number',
							isRequired: true,
							startWithNewLine: false,
							titleLocation: 'top',
							validators: [
								{
									type: 'regex',
									// "text": "Phone number must be in the following format: +0 (000) 000-00-00",
									// "regex": "\\+[0-9]{1} \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
									text: 'Please enter a 10 digit phone number',
									// regex: '(((d{3})?)|(d{3}))([s-./]?)(d{3})([s-./]?)(d{4})',
									// "regex": "^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
								},
							],
							inputType: 'tel',
							placeholder: '+0 (000) 000-0000',
						},
						{
							type: 'text',
							name: 'email',
							isRequired: true,
							startWithNewLine: false,
							title: 'Email',
							titleLocation: 'top',
						},
						{
							type: 'text',
							name: 'relationship',
							isRequired: true,
							startWithNewLine: false,
							title: 'Relationship',
							titleLocation: 'top',
						},
					],
				},
			],
		},
	],
	showProgressBar: 'top',
	progressBarType: 'questions',
	widthMode: 'static',
	width: '864px',
};
return JSON.stringify(json);
}


/* 
	first-name, middle, last, preferred

	line1
	line2
	city
	state
	zip

	phone-cell
	phone-work

	birthDate
	gender: 'Male' | 'Female' | 'Prefer not to answer'
	ssn

	is-citizen-permanent: boolean
	if true:
		citizenType: 'Green Card' | 'Citizen'
	else: 
		workAuthType: 'H1-B' | 'L2' | 'F1(CPT/OPT)' | 'H4' | 'OTHER' (input some text???)
		workAuthFile [{...}]

	licenseNumber,
	car-make, model, color
	licenseFile[{name: fileName, type: fileType, content: data:type;base64,...}]


	ref-name-first, last, middle, phone, email, relationship
	emergencyContact[{name-first, last middle, phone, email, relationship}]
	*/
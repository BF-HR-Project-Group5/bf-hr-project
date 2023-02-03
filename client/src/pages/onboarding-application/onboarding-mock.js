export const json = {
    "logo": "",
    "logoFit": "cover",
    "logoPosition": "right",
    "logoHeight": "100px",
		"completedHtml": "<div><h1>Thank you for completing your application! </h1><p>Redirecting you to your profile...</p></div>", // the "completed" page
    "elements": [{
        "type": "panel",
        "name": "name",
        "title": "Name",
        "elements": [{
          "type": "text",
          "name": "first-name",
          "title": "First Name",
          "startWithNewLine": false,
          "isRequired": true
        },{
          "type": "text",
          "name": "last-name",
          "title": "Last Name",
          "startWithNewLine": false,
          "isRequired": true
        },{
          "type": "text",
          "name": "middle-name",
          "title": "Middle Name",
          "startWithNewLine": false,
          "isRequired": false
        },{
          "type": "text",
          "name": "preferred-name",
          "title": "Preferred name",
          "startWithNewLine": false,
        }]
      },
      {
        "type": "panel",
        "name": "current-address",
        "title": "Current address",
        "elements": [{
          "type": "text",
          "name": "building",
          "title": "building/apt #",
          "startWithNewLine": false,
          "isRequired": true
        },{
          "type": "text",
          "name": "street-name",
          "title": "Street name",
          "startWithNewLine": false,
          "isRequired": true
        },{
          "type": "text",
          "name": "city",
          "title": "City",
          "startWithNewLine": false,
          "isRequired": true
        },{
          "type": "text",
          "name": "state",
          "title": "State",
          "startWithNewLine": false,
          "isRequired": true
        },{
          "type": "text",
          "name": "zip",
          "title": "Zip",
          "startWithNewLine": false,
          "isRequired": true
        }]
      },
      {
        "type": "panel",
        "name": "phone-number",
        "title": "Phone number",
        "elements": [{
          "type": "text",
          "name": "Cell-phone-number",
          "title": "Cell phone number",
          "startWithNewLine": false,
          "isRequired": true
        },{
          "type": "text",
          "name": "work-phone-number",
          "title": "Work phone number",
          "startWithNewLine": false,
        }]
      },
      {
        "type": "panel",
        "name": "car-information",
        "title": "Car information",
        "elements": [{
          "type": "text",
          "name": "car-make",
          "title": "Make",
          "startWithNewLine": false,
        },{
          "type": "text",
          "name": "car-model",
          "title": "Model",
          "startWithNewLine": false,
        },{
          "type": "text",
          "name": "car-color",
          "title": "Color",
          "startWithNewLine": false,
        }]
      },
      {
      "type": "radiogroup",
      "name": "is-citizen-permanent-1",
      "title": "Are you a citizen or permanent resident of the U.S?",
      "choices": [
        "No",
        "Yes"
      ],
      "showOtherItem": false,
      "otherPlaceholder": "Please specify...",
      "otherText": "Other"
    },{
      "type": "radiogroup",
      "name": "is-citizen-permanent-2",
      "visibleIf": "{is-citizen-permanent-1} = 'Yes'",
      "title": "Citizen or Green Card?",
      "choices": [
        "Green Card",
        "Citizen",
      ],
      "showOtherItem": false,
      "otherPlaceholder": "Please specify...",
      "otherText": "Other"
    },{
      "type": "radiogroup",
      "name": "no-citizen-permanent",
      "visibleIf": "{is-citizen-permanent-1} = 'No'",
      "title": "What is your work authorization?",
      "choices": [
        "H1-B",
        "L2",
        "F1(CPT/OPT)",
        "H4"
      ],
      "showOtherItem": true,
      "otherPlaceholder": "Please specify...",
      "otherText": "Other"
    },{
      "type": "file",
      "name": "work-authorization",
      "visibleIf": "{is-citizen-permanent-1} = 'No'",
      "title": "Upload your work authorization document",
      "isRequired": true,
      "acceptedTypes": "application/pdf"
    },{
      "type": "boolean",
      "name": "have-driver-license",
      "title": "Do you have a driver's license?"
    },{
      "type": "panel",
      "name": "driver-license-info",
      "title": "Driver License Information",
      "visibleIf": "{have-driver-license} = true",
      "elements": [{
        "type": "text",
        "name": "Driver-license-number",
        "title": "Driver's license number",
        "isRequired": true
      },{
        "type": "text",
        "name": "birthdate",
        "title": "Date of birth",
        "inputType": "date",
        "isRequired": true
      }]
    },{
      "type": "file",
      "name": "driver-license-upload",
      "visibleIf": "{have-driver-license} = true",
      "title": "Upload your driver license document",
      "acceptedTypes": "application/pdf",
      "isRequired": true,
    },
    {
      "type": "panel",
      "name": "reference",
      "title": "Reference (who referred you to this company? There can only be 1)",
      "elements": [{
        "type": "text",
        "name": "first-name",
        "title": "First Name",
        "startWithNewLine": false,
        "isRequired": true
      },{
        "type": "text",
        "name": "last-name",
        "title": "Last Name",
        "startWithNewLine": false,
        "isRequired": true
      },{
        "type": "text",
        "name": "middle-name",
        "title": "Middle Name",
        "startWithNewLine": false,
        "isRequired": false
      },{
        "type": "text",
        "name": "phone",
        "title": "phone",
        "startWithNewLine": false,
        "isRequired": true
      },{
        "type": "text",
        "name": "email",
        "title": "email",
        "startWithNewLine": false,
        "isRequired": true
      },{
        "type": "text",
        "name": "relationship",
        "title": "relationship",
        "startWithNewLine": false,
        "isRequired": true
      }]
    },{
      "name": "emergency-contact",
      "title": "Emergency contact",
      "type": "panel",
      "elements": [{
        "type": "paneldynamic",
        "name": "emergency-contact-info",
        "titleLocation": "hidden",
        "defaultValue": [
          {}
        ],
        "templateTitle": "Emergency contact #{panelIndex}",
        "panelAddText": "Add an emergency contact",
        "templateElements": [
          {
            "type": "text",
            "name": "first-name",
            "isRequired": true,
            "startWithNewLine": false,
            "title": "First name",
            "titleLocation": "top"
          },
          {
            "type": "text",
            "name": "last-name",
            "isRequired": true,
            "startWithNewLine": false,
            "title": "Last name",
            "titleLocation": "top"
          },
          {
            "type": "text",
            "name": "middle-name",
            "startWithNewLine": false,
            "title": "Middle name",
            "titleLocation": "top"
          },
          {
          "type": "text",
          "name": "phone",
          "title": "10 Digit Phone number",
          "isRequired": true,
          "startWithNewLine": false,
          "titleLocation": "top",
          "validators": [{
            "type": "regex",
            // "text": "Phone number must be in the following format: +0 (000) 000-00-00",
            // "regex": "\\+[0-9]{1} \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
						// "regex": "^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
						"text": "Please enter a 10 digit phone number",
						"regex": "((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})"
          }],
          "inputType": "tel",
          "placeholder": "+0 (000) 000-0000"
        },         
        {
          "type": "text",
          "name": "email",
          "isRequired": true,
          "startWithNewLine": false,
          "title": "Email",
          "titleLocation": "top"
        },
        {
          "type": "text",
          "name": "relationship",
          "isRequired": true,
          "startWithNewLine": false,
          "title": "Relationship",
          "titleLocation": "top"
        }]
      }]
    }],
    "showProgressBar": "top",
    "progressBarType": "questions",
    "widthMode": "static",
    "width": "864px"
  };



		// "elements": [{
    //     "type": "panel",
    //     "name": "name",
    //     "title": "Name",
    //     "elements": [{
    //       "type": "text",
    //       "name": "first-name",
    //       "title": "First Name",
    //       "startWithNewLine": false,
    //       "isRequired": true
    //     },{
    //       "type": "text",
    //       "name": "last-name",
    //       "title": "Last Name",
    //       "startWithNewLine": false,
    //       "isRequired": true
    //     },{
    //       "type": "text",
    //       "name": "middle-name",
    //       "title": "Middle Name",
    //       "startWithNewLine": false,
    //       "isRequired": false
    //     },{
    //       "type": "text",
    //       "name": "preferred-name",
    //       "title": "Preferred name",
    //       "startWithNewLine": false,
    //     }]
    //   },],


		/*
		
		notes:
			move car info into under "Do you have a license?"
			need to move DOB to somewhere else,
			need SSN
		
		
		*/

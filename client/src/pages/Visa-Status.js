import React, { useState, useEffect } from 'react';
import '../layout/Visa-Status.css';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navigation from '../components/navigation/navigation';
import ManagedDocument from '../components/ManagedDocument';
import  {refreshUser} from '../redux/actions/index';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

<<<<<<< HEAD
const VisaStatus = (props) => {
    console.log('props',props)
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const [disabled, setDisabled] = React.useState(true);

    const steps = getSteps();
  
    // const isStepOptional = (step) => {
    //   return step === 1;
    // };
  
    const handleNext = () => {
      let newSkipped = skipped;
      console.log({newSkipped})
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    // const handleBack = () => {
    //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
  
    // const handleSkip = () => {
    //   if (!isStepOptional(activeStep)) {
    //     // You probably want to guard against something like this,
    //     // it should never occur unless someone's actively trying to break something.
    //     throw new Error("You can't skip a step that isn't optional.");
    //   }
  
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   setSkipped((prevSkipped) => {
    //     const newSkipped = new Set(prevSkipped.values());
    //     newSkipped.add(activeStep);
    //     return newSkipped;
    //   });
    // };
  
    // const handleReset = () => {
    //   setActiveStep(0);
    // };

    // const stepToNext = () => {
    //   setActiveStep(activeStep+1);
    // }
  
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="container">
          {activeStep === steps.length || props.auth.user?.profile?.nextStep === 'COMPLETED' ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
            </div>
          ) : (
            <div>
              {/* {getStepContent(activeStep, props)} */}
              <Typography className={classes.instructions}></Typography>
              <ManagedDocument user={props.auth.user} document={props.auth.user?.profile?.documents[activeStep]} activeStep={activeStep}  />
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button} 
                  disabled= {props.auth.user?.profile?.documents[activeStep]?.status !== "APPROVED"}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
=======
function getSteps() {
	return ['OPT Receipt', 'OPT EAD', 'I-983', 'I-20'];
>>>>>>> master
}

function getStepContent(step, props) {
	console.log({ step });
	switch (step) {
		// mongoose keeps upload order so OPT Receipt = documents[0]
		case 0:
			return 'Please upload a copy of your OPT EAD...';
		case 1:
			return 'Please download and fill out the I-983 form';
		case 2:
			return 'Please send the I-983 along with all necessary documents to your school and upload the new I-20!';
		default:
			return 'All documents have been approved';
	}
}

const VisaStatus = (props) => {
	console.log('props', props);
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(
		Math.floor((props.auth?.user?.profile?.currentStepInt + 1) / 2)
	);
	const [skipped, setSkipped] = React.useState(new Set());

	const [disabled, setDisabled] = React.useState(true);

	const steps = getSteps();
	console.log({
		step: Math.floor((props.auth?.user?.profile?.currentStepInt + 1) / 2),
		currentStep: props.auth?.user?.profile?.currentStepInt,
		currentStepDoc:
			props.auth.user?.profile?.documents?.[
				Math.floor((props.auth?.user?.profile?.currentStepInt + 1) / 2)
			],
		userDocs: props.auth?.user?.profile?.documents,
	});

	// const isStepOptional = (step) => {
	//   return step === 1;
	// };

	const handleNext = () => {
		let newSkipped = skipped;
		console.log({ newSkipped });
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	// const handleBack = () => {
	//   setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };

	// const handleSkip = () => {
	//   if (!isStepOptional(activeStep)) {
	//     // You probably want to guard against something like this,
	//     // it should never occur unless someone's actively trying to break something.
	//     throw new Error("You can't skip a step that isn't optional.");
	//   }

	//   setActiveStep((prevActiveStep) => prevActiveStep + 1);
	//   setSkipped((prevSkipped) => {
	//     const newSkipped = new Set(prevSkipped.values());
	//     newSkipped.add(activeStep);
	//     return newSkipped;
	//   });
	// };

	// const handleReset = () => {
	//   setActiveStep(0);
	// };

	// const stepToNext = () => {
	//   setActiveStep(activeStep+1);
	// }

	useEffect(() => {
		try {
			props.refreshUser();

		} catch(e) {
			console.error('visa status loading error:', e);
		}
	}, [])

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step
							key={label}
							{...stepProps}
						>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<div className="container">
				{activeStep === steps.length || props.auth.user?.profile?.nextStep === 'COMPLETED' ? (
					<div>
						<Typography className={classes.instructions}>
							All steps completed - you&apos;re finished
						</Typography>
					</div>
				) : (
					<div>
						{/* {getStepContent(activeStep, props)} */}
						<Typography className={classes.instructions}></Typography>
						<ManagedDocument
							user={props.auth.user}
							document={props.auth.user?.profile?.documents[activeStep]}
						/>
						<div>
							<Button
								variant="contained"
								color="primary"
								onClick={handleNext}
								className={classes.button}
								disabled={props.auth.user?.profile?.documents[activeStep]?.status !== 'APPROVED'}
							>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps, {refreshUser})(VisaStatus);

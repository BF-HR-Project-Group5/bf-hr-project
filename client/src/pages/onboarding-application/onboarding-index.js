import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { submitLogin } from '../../redux/actions/index';
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "../../layout/survey-core/defaultV2.min.css";
import { json } from "./onboarding-mock";
import Chip from '@material-ui/core/Chip';
import '../../layout/onboarding-app.css'

const OnboardingApplication = (props) => {
    console.log('props',props)
    const survey = new Model(json);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    return (
        <>
            <div className="sd-title sd-container-modern__title container">
                <div className="sd-header__text">
                    <h3 className="sd-title" aria-label="Onboarding Application" role="columnheader">
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
    )
}

// export default OnboardingApplication;
const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
    { submitLogin }
)(OnboardingApplication);

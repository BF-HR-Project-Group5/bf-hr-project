import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

const OnboardingAppReview = (props) => {
    return (
        <>
            this is Onboarding-App-Review
        </>
    )
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps
)(OnboardingAppReview);
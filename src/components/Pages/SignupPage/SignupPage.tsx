import * as React from 'react';
import LandingPageContainer from '../LandingPageContainer/LandingPageContainer';
import './SignupPage.scss';
import SignupFormContainer from './SignupFormContainer';

const SignupPage = () => (
    <LandingPageContainer>
        <div className="signup-page">
            <div className="signup-page-container">
                <h1>Signup</h1>
                <SignupFormContainer/>
            </div>
        </div>
    </LandingPageContainer>
);

export default SignupPage;

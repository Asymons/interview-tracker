import * as React from 'react';
import { PasswordForgetLink } from '../PasswordForgetPage/PasswordForgetPage';
import './LoginPage.scss';
import LandingPageContainer from '../LandingPageContainer/LandingPageContainer';
import LoginFormContainer from './LoginFormContainer';
import SignupLink from '../SignupPage/SignupLink';

const LoginPage = () => (
    <LandingPageContainer>
        <div className="login-page">
            <div className="login-page-container">
                <h1>Sign In</h1>
                <LoginFormContainer/>
                <div className="login-links">
                    <SignupLink/>
                    <PasswordForgetLink/>
                </div>
            </div>
        </div>
    </LandingPageContainer>
);

export default LoginPage;

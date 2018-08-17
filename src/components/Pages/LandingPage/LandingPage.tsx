import * as React from 'react';
import withUnauthorization from '../../withUnauthorizaton';

const LandingPage = () => (
    <div className="landing-page">
        <h1>LANDING PAGE</h1>
    </div>
);

const authCondition = (authUser: any) => !authUser;

export default withUnauthorization(authCondition)(LandingPage);

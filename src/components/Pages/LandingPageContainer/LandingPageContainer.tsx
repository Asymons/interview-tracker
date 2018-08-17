import * as React from 'react';
import './LandingPageContainer.scss';
import withUnauthorization from '../../withUnauthorizaton';

interface LandingPageContainerProps {
    children?: JSX.Element;
}

const LandingPageContainer = (props: LandingPageContainerProps) => (
    <div className="landing-page-container">
        {props.children}
    </div>
);

const authCondition = (authUser: any) => !authUser;

export default withUnauthorization(authCondition)(LandingPageContainer);

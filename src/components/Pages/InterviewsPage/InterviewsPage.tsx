import * as React from 'react';
import withAuthorization from '../../withAuthorization';
import InterviewsContainer from './InterviewsContainer/InterviewsContainer';

const InterviewsPage = () => (
    <InterviewsContainer/>
);

const authCondition = (authUser: firebase.User) => !!authUser;

export default withAuthorization(authCondition)(InterviewsPage);
import * as React from 'react';
import './InterviewersPage.scss';
import InterviewersContainer from './InterviewerContainer/InterviewersContainer';
import withAuthorization from '../../withAuthorization';

interface InterviewersPageProps {
    setInfoBarContent: (jsxElement: JSX.Element) => void;
}

const InterviewersPage = (props: InterviewersPageProps) => (
    <div className="interviewers-page">
        <InterviewersContainer setInfoBarContent={props.setInfoBarContent}/>
    </div>
);

const authCondition = (authUser: any) => !!authUser;

export default withAuthorization(authCondition)(InterviewersPage);

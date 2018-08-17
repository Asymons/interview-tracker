import * as React from 'react';
import InterviewerAdd from './InterviewerAdd/InterviewerAdd';
import './InterviewersHeader.scss';
import InterviewersImportCSV from './InterviewersImportCSV/InterviewersImportCSV';
import InterviewerSearch from '../InterviewerSearch/InterviewerSearch';

interface InterviewersHeaderProps {
    handleFiles: (event: any, result: any) => void;
    searchFilter: (text: string) => void;
}

const InterviewersHeader = (props: InterviewersHeaderProps) => (
    <div className="interviewers-header">
        <InterviewerSearch searchFilter={props.searchFilter}/>
        <InterviewerAdd/>
        <InterviewersImportCSV handleFiles={props.handleFiles}/>
    </div>
);

export default InterviewersHeader;
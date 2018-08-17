import * as React from 'react';
import { default as InterviewerCard, InterviewerCardProps } from './InterviewerCard/InterviewerCard';
import { CircularProgress } from 'material-ui';
import './InterviewerList.scss';
import InterviewInfo from '../../../../../models/InterviewInfo/InterviewInfo';

interface InterviewerListProps {
    list?: InterviewerCardProps[];
    addInterview: (interviewInfo: InterviewInfo) => void;
}

const messages = {
    noInterviewTitle: {
        message: 'Sorry... no interviewers found.',
    },
    noInterviewMessage: {
        message: 'If you want to add an interviewer, either click the plus or import your csv file.',
    },
};

const InterviewerList = (props: InterviewerListProps) =>
    (
        <div className="interviewer-list">
            {

                props.list !== undefined ? (
                        props.list.map((interviewerCardProps: InterviewerCardProps, key: number) => (
                            <InterviewerCard {...interviewerCardProps} key={key} addInterview={props.addInterview}/>
                        ))
                    )
                    : <CircularProgress/>

            }

            {
                props.list !== undefined && !props.list.length ?
                    <div className="no-interviewer-found">
                        <div className="no-interviewer-title">
                            {messages.noInterviewTitle.message}
                        </div>
                        <div className="no-interviewer-message">
                            {messages.noInterviewMessage.message}
                        </div>
                    </div> : null
            }

        </div>

    );

export default InterviewerList;
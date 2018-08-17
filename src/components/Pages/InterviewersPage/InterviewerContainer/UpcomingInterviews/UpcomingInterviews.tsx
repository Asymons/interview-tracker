import * as React from 'react';
import './UpcomingInterviews.scss';
import { generateRelativeDate } from '../../../../../utility/generalUtility';
import InterviewsDayPicker from './InterviewsDayPicker/InterviewsDayPicker';
import { Link } from 'react-router-dom';
import { INTERVIEWS } from '../../../../../constants/routes';

export interface UpcomingInterviewItemProps {
    companyName: string;
    dateAndTime: string;
}

interface UpcomingInterviewsProps {
    interviews: UpcomingInterviewItemProps[];
}

const UpcomingInterviews = (props: UpcomingInterviewsProps) => (
    <div className="upcoming-interviews">
        <div className="upcoming-interviews-header">
            <span className="upcoming-interview-title">
                Upcoming
            </span>
            <Link className="link-to-interviews" to={INTERVIEWS}>
                <span className="link-to-interviews-label">
                    See all
                </span>
            </Link>
        </div>
        <div className="upcoming-interviews-list">
            {
                props.interviews.map((item: UpcomingInterviewItemProps, key: number) => (
                    <div className="upcoming-interview-item" key={key}>
                        <span className="company-name">{item.companyName}</span>
                        <span className="time-until">{generateRelativeDate(new Date(item.dateAndTime))}</span>
                    </div>
                ))
            }
        </div>
        <InterviewsDayPicker interviews={props.interviews}/>
    </div>
);

export default UpcomingInterviews;
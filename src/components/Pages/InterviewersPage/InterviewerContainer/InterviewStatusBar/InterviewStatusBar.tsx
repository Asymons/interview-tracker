import * as React from 'react';
import './InterviewStatusBar.scss';
import { UpcomingInterviewItemProps } from '../UpcomingInterviews/UpcomingInterviews';
import SummaryCard from './SummaryCard/SummaryCard';

interface InterviewStatusBarProps {
    totalInterviews: number;
    totalCurrentMonthInterviews: number;
    totalCurrentWeekInterviews: number;
    recruiterCount: number;
    upcomingInterviews: UpcomingInterviewItemProps[];
}

const InterviewStatusBar = (props: InterviewStatusBarProps) => (
    <div className="interview-status-bar">
        <SummaryCard
            totalCurrentMonthInterviews={props.totalCurrentMonthInterviews}
            totalCurrentWeekInterviews={props.totalCurrentWeekInterviews}
            totalInterviews={props.totalInterviews}
            totalRecruiters={props.recruiterCount}
        />
    </div>
);

export default InterviewStatusBar;
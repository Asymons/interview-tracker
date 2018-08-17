import * as React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { primaryColor, primaryColorLight } from '../../../../../../constants/variables';
import { white } from 'material-ui/styles/colors';
import { UpcomingInterviewItemProps } from '../UpcomingInterviews';
import './InterviewsDayPicker.scss';

type InterviewsDayPickerProps = {
  interviews: UpcomingInterviewItemProps[];
};

class InterviewsDayPicker extends React.Component<InterviewsDayPickerProps> {

    render() {
        const {interviews} = this.props;

        const interviewDateStyle = {
            highlighted: {
                border: '1px solid white',
                backgroundColor: primaryColor,
                color: white,
            },
            today: {
                color: primaryColorLight,
            }
        };

        const modifiers = {
            highlighted: interviews.map((upcomingInterviewItem: UpcomingInterviewItemProps) =>
                new Date(upcomingInterviewItem.dateAndTime)),
            today: new Date(),
        };

        return (
            <div className="interviews-day-picker">
                <DayPicker
                    modifiers={modifiers}
                    modifiersStyles={interviewDateStyle}
                    showOutsideDays={true}
                />
            </div>
        );
    }

}

export default InterviewsDayPicker;
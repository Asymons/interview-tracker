import * as React from 'react';
import { default as InterviewItem, InterviewItemProps } from './InterviewItem/InterviewItem';
import { CircularProgress } from 'material-ui';
import './InterviewsList.scss';
import InfoBar from '../../../../Shared/InfoBar/InfoBar';

interface InterviewsListProps {
    loading: boolean;
    interviewItems: InterviewItemProps[];
    error?: firebase.FirebaseError;
}

class InterviewsList extends React.Component<InterviewsListProps> {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            interviewItems: [],
        };

    }

    render() {
        const {loading, interviewItems, error} = this.props;

        const noInterviewTitle = 'Sorry... no interviews found.';

        const noInterviewMessage = 'If you want to schedule an interview,' +
            ' go to interviewers, click on an interviewer\'s options and schedule one.';

        return (
            <div className="interviews-list">
                <InfoBar/>
                <div className="interviews-list-container">
                    <div className="interviews-list-header">
                        <div className="interviews-list-title">
                            Interview Schedule
                        </div>
                    </div>
                    <div className="interviews-list-content">
                        {!loading ?
                            interviewItems.map((props: InterviewItemProps, key: number) => {
                                return (<InterviewItem {...props} key={key}/>);
                            }) :
                            <CircularProgress/>
                        }
                        {!loading && !interviewItems.length ?
                            <div className="no-interview-items">
                                <div className="no-interview-title">
                                    {noInterviewTitle}
                                </div>
                                <div className="no-interview-message">
                                    {noInterviewMessage}
                                </div>
                            </div> : null
                        }
                    </div>
                    {error && <span className="error-message">{error.message}</span>}
                </div>
            </div>
        );
    }
}

export default InterviewsList;
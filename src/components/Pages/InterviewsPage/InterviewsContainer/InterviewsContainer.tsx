import * as React from 'react';
import InterviewsCard from './InterviewsCard/InterviewsList';
import InterviewsDayPicker
    from '../../InterviewersPage/InterviewerContainer/UpcomingInterviews/InterviewsDayPicker/InterviewsDayPicker';
import { InterviewItemProps } from './InterviewsCard/InterviewItem/InterviewItem';
import { auth } from '../../../../firebase/fire';
import {
    getUserInterviewerReferenceWithCompanyId,
    getUserInterviewsReference,
    removeUserInterview
} from '../../../../firebase/db';
import DataSnapshot = firebase.database.DataSnapshot;
import { sortInterview } from '../../../../utility/generalUtility';
import { connect } from 'react-redux';
import './InterviewsContainer.scss';

type InterviewsContainerProps = {
    authUser: firebase.User;
};

type InterviewsContainerState = {
    interviewItems: InterviewItemProps[];
    error?: firebase.FirebaseError;
    loading: boolean;
};

class InterviewsContainer extends React.Component<InterviewsContainerProps, InterviewsContainerState> {

    constructor(props: InterviewsContainerProps) {
        super(props);

        this.state = {
            interviewItems: [],
            error: undefined,
            loading: false,
        };
    }

    removeItem = (id: string) => {
        const user = auth.currentUser;
        if (user) {
            removeUserInterview(this.props.authUser.uid, id);
            this.setState(prevState => {
                return {
                    interviewItems:
                        prevState.interviewItems.filter((value: InterviewItemProps) => value.id !== id)
                };
            });
        }
    }

    onSuccessUserInterviewList = (snapshot: DataSnapshot) => {
        if (snapshot) {
            const dateAndTimeKey = 'dateAndTime';
            const keys = Object.keys(snapshot.val());
            if (keys.length === 0) {
                this.setState({
                    loading: false,
                });
            }
            let finishCount = 0;
            const interviewItems: InterviewItemProps[] = [];
            for (let i = 0; i < keys.length; ++i) {
                let data: any = null;
                const key = keys[i];
                getUserInterviewerReferenceWithCompanyId(
                    this.props.authUser.uid,
                    snapshot.val()[key].companyId)
                    .once('value', (companySnapshot: DataSnapshot) => {
                        if (companySnapshot) {
                            data = {
                                ...snapshot.val()[key],
                                id: key,
                                removeItem: (id: string) => this.removeItem(id),
                                ...companySnapshot.val(),
                                dateAndTime:
                                    new Date(Number(snapshot.val()[key][dateAndTimeKey])).toString(),
                            };
                        }
                    }).then(() => {
                    ++finishCount;
                    interviewItems.push(data);
                    if (finishCount === keys.length) {
                        const filteredInterviewItems = interviewItems.filter((item: InterviewItemProps) => {
                            return new Date(item.dateAndTime) >= (new Date());
                        });
                        filteredInterviewItems.sort(sortInterview);
                        this.setState({
                            interviewItems: filteredInterviewItems,
                            loading: false,
                        });
                    }
                });
            }
        }
    }

    componentDidMount() {
        const user = auth.currentUser;
        if (user) {
            this.setState({
                loading: true,
            });
            getUserInterviewsReference(this.props.authUser.uid)
                .once('value', this.onSuccessUserInterviewList);
        }

    }

    render() {
        const {interviewItems} = this.state;

        return (
            <div className="interviews-container">
                <div className="left-elements-container">
                    <InterviewsCard {...this.state}/>
                </div>
                <div className="right-elements-container">
                    <InterviewsDayPicker interviews={interviewItems}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(InterviewsContainer);
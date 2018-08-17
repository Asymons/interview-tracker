import * as React from 'react';
import { InterviewerCardProps } from './InterviewerList/InterviewerCard/InterviewerCard';
import {
    addUserInterview, addUserInterviewer, getLatestInterviews, getUserCompanyReferenceWithCompanyId,
    getUserInterviewerReference, getUserInterviewsReference,
    removeUserInterviewer
} from '../../../../firebase/db';
import { InterviewerInfo } from './InterviewersHeader/InterviewerAdd/InterviewerAdd';
import InterviewersHeader from './InterviewersHeader/InterviewersHeader';
import InterviewerList from './InterviewerList/InterviewerList';
import { auth } from '../../../../firebase/fire';
import * as Papa from 'papaparse';
import { connect } from 'react-redux';
import './InterviewersContainer.scss';
import InterviewInfo from '../../../../models/InterviewInfo/InterviewInfo';
import InterviewStatusBar from './InterviewStatusBar/InterviewStatusBar';
import InfoBar from '../../../Shared/InfoBar/InfoBar';
import { UpcomingInterviewItemProps, default as UpcomingInterviews } from './UpcomingInterviews/UpcomingInterviews';
import DataSnapshot = firebase.database.DataSnapshot;
import { Snackbar } from 'material-ui';

interface InterviewersContainerProps {
    authUser: any;

    setInfoBarContent: (jsxElement: JSX.Element) => void;
}

interface InterviewersContainerState {
    list?: InterviewerCardProps[];
    displayedList?: InterviewerCardProps[];
    recruiterCount: number;
    totalInterviewCount: number;
    totalCurrentMonthInterviews: number;
    totalCurrentWeekInterviews: number;
    upcomingInterview: UpcomingInterviewItemProps[];
    csvError: string;
}

const UPCOMING_INTERVIEWS_LIMIT = 3;

class InterviewersContainer extends React.Component<InterviewersContainerProps, InterviewersContainerState> {

    userInterviewerReference: any;
    userInterviewsListener: any;

    constructor(props: InterviewersContainerProps) {
        super(props);

        this.state = {
            list: undefined,
            displayedList: undefined,
            totalInterviewCount: 0,
            totalCurrentMonthInterviews: 0,
            totalCurrentWeekInterviews: 0,
            recruiterCount: 0,
            upcomingInterview: [],
            csvError: '',
        };
    }

    updateInterviewerCount = (interviewCount: {
        totalInterviewCount: number,
        totalCurrentWeekInterviews: number,
        totalCurrentMonthInterviews: number
    }) => {
        this.setState({
            ...interviewCount
        });
    }

    updateRecruiterCount = (recruiterCount: number) => {
        this.setState({
            recruiterCount,
        });
    }

    componentDidMount() {
        this.userInterviewerReference = getUserInterviewerReference(this.props.authUser.uid);
        this.userInterviewerReference.on('value', (snapshot: any) => {
            if (snapshot && snapshot.val()) {
                let count = 0;
                const data: InterviewerCardProps[] = [];
                const keys = Object.keys(snapshot.val());
                this.updateRecruiterCount(keys.length);
                for (let i = 0; i < keys.length; ++i) {
                    const key = keys[i];
                    getUserCompanyReferenceWithCompanyId(this.props.authUser.uid, snapshot.val()[key].companyId)
                        .once('value')
                        .then((companySnapshot: any) => {
                            ++count;
                            data.push({
                                ...snapshot.val()[key],
                                ...companySnapshot.val(),
                                phoneNumber: snapshot.val()[key].number,
                                removeItem: (id: string) => this.removeItem(id),
                            });
                            if (count === keys.length) {
                                this.setState({
                                    list: data,
                                    displayedList: data,
                                });
                            }
                        });
                }

            } else {
                this.updateRecruiterCount(this.getRecruiterCountFromSnapshot(snapshot));
                this.setState({
                    list: [],
                    displayedList: [],
                });
            }
        });
        this.userInterviewsListener = getUserInterviewsReference(this.props.authUser.uid);
        this.userInterviewsListener.on(
            'value',
            (dataSnapshot: DataSnapshot) => {
                getLatestInterviews(
                    this.props.authUser.uid,
                    dataSnapshot,
                    (data: any) => {
                        this.setState({
                            upcomingInterview: data,
                        });
                    },
                    UPCOMING_INTERVIEWS_LIMIT);
                this.updateInterviewerCount(this.getInterviewsCountFromSnapshot(dataSnapshot));
            });
    }

    componentWillUnmount() {
        this.userInterviewsListener.off();
        this.userInterviewerReference.off();
    }

    getInterviewsCountFromSnapshot = (snapshot: DataSnapshot) => {
        if (snapshot.val()) {
            return {
                totalInterviewCount: Object.keys(snapshot.val()).length,
                totalCurrentWeekInterviews: Object.keys(snapshot.val()).filter((value: string) => {
                    const interviewDate = snapshot.val()[value].dateAndTime;
                    const sevenDaysForward = new Date();
                    sevenDaysForward.setDate(sevenDaysForward.getDate() + 8);
                    sevenDaysForward.setHours(0, 0, 0, 0);
                    return interviewDate <= sevenDaysForward.getTime() && interviewDate >= (new Date()).getTime();
                }).length,
                totalCurrentMonthInterviews: Object.keys(snapshot.val()).filter((value: string) => {
                    const interviewDate = new Date(snapshot.val()[value].dateAndTime);
                    const thisMonth = new Date();
                    return interviewDate.getMonth() === thisMonth.getMonth() &&
                        interviewDate.getFullYear() === thisMonth.getFullYear();
                }).length,
            }
        } else {
            return {
                totalInterviewCount: 0,
                totalCurrentWeekInterviews: 0,
                totalCurrentMonthInterviews: 0,
            }
        }
    }

    getRecruiterCountFromSnapshot = (snapshot: DataSnapshot) => {
        return snapshot.val() ? Object.keys(snapshot.val()).length : 0;
    };

    setCSVError = (text: string) => {
        this.setState({
            csvError: text,
        });
    }

    // PLEASE CLEAN TOMORROW IT WORKS THO.
    handleFiles = (event: any, result: any) => {
        const file: File = result[0][1] as File;
        const blob: Blob = file as Blob;
        const reader: FileReader = new FileReader();
        let fileContent = '';
        const uid = this.props.authUser.uid;

        const validColumns = {
            employeeName: '',
            role: '',
            companyName: '',
            email: '',
            number: '',
            linkedin: '',
        };

        const missingColumns = {
            employeeName: true,
            role: true,
            companyName: true,
            email: true,
            number: true,
            linkedin: true,
        };

        // need some test cases for this.. set up later
        function uploadCSV(text: string, setError: (text: string) => void) {
            const data = Papa.parse(text);
            const keys = data.data[0];
            let shouldUpload = true;
            data.data.forEach((item: any, key: number) => {
                if (key > 0) {
                    const obj = {};
                    if (item.length !== Object.keys(validColumns).length) {
                        shouldUpload = false;
                    }
                    item.forEach((interviewerItem: string, interviewerKey: number) => {
                        if (validColumns.hasOwnProperty(keys[interviewerKey]) && !interviewerItem.length) {
                            obj[keys[interviewerKey]] = interviewerItem;
                            missingColumns[keys[interviewerKey]] = false;
                        } else {
                            shouldUpload = false;
                        }
                    });
                    if (shouldUpload) {
                        addUserInterviewer(uid, obj as InterviewerInfo);
                    } else {
                        const validMissingKeys =
                            Object.keys(missingColumns).filter((value) => missingColumns[value]);
                        setError(`Columns Missing: ${validMissingKeys.join(',')}`);
                    }
                } else if (key === 0 && data.data.length === 1) {
                    setError('Missing Content');
                }
            });
        }

        reader.onload = (evt: any) => {
            if ((evt.target as any).readyState !== 2) {
                return;
            }
            if ((evt.target as any).error) {
                alert('Error while reading file');
                return;
            }

            fileContent = (evt.target as any).result.toString();
            uploadCSV(fileContent, this.setCSVError);
        };
        reader.readAsBinaryString(blob);
    }

    removeItem(id: string) {
        const user = auth.currentUser;
        if (user) {
            removeUserInterviewer(this.props.authUser.uid, id);
        }
    }

    _searchFilter = (text: string) => {
        if (this.state.list === undefined || this.state.list.length === 0) {
            return;
        }

        const filteredItems: InterviewerCardProps[] =
            this.state.list.filter((interviewerCardProps: InterviewerCardProps) => {
                return Object.keys(interviewerCardProps).reduce(
                    (acc: string, key: string) => {
                        return acc || ((interviewerCardProps[key] as string !== undefined) &&
                            (interviewerCardProps[key].toString().toLowerCase().indexOf(text.toLowerCase()) >= 0));
                    },
                    false);
            });

        this.setState({
            displayedList: filteredItems,
        });
    }

    addInterview = (interviewInfo: InterviewInfo) => {
        addUserInterview(this.props.authUser.uid, interviewInfo);
    }

    render() {

        const {
            csvError,
            totalInterviewCount,
            totalCurrentWeekInterviews,
            totalCurrentMonthInterviews,
            recruiterCount,
            upcomingInterview,
            displayedList
        } = this.state;

        return (
            <div className="interviewers-container">
                <InfoBar>
                    <InterviewersHeader searchFilter={this._searchFilter} handleFiles={this.handleFiles}/>
                </InfoBar>
                <div className="content-container">
                    <div className="left-elements">
                        <InterviewStatusBar
                            totalInterviews={totalInterviewCount}
                            totalCurrentWeekInterviews={totalCurrentWeekInterviews}
                            totalCurrentMonthInterviews={totalCurrentMonthInterviews}
                            recruiterCount={recruiterCount}
                            upcomingInterviews={upcomingInterview}
                        />
                        <div className="interview-list-title">
                            Saved Contacts
                        </div>
                        <InterviewerList list={displayedList} addInterview={this.addInterview}/>
                    </div>
                    <div className="right-elements">
                        <UpcomingInterviews interviews={upcomingInterview}/>
                    </div>
                </div>
                <Snackbar open={!!csvError.length} message={csvError}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(InterviewersContainer);
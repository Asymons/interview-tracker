import * as React from 'react';
import { addUserInterviewer } from '../../../../../../firebase/db';
import { connect } from 'react-redux';
import InterviewerDialog from './InterviewerDialog/InterviewerDialog';
import { FontIcon, RaisedButton } from 'material-ui';
import { white } from 'material-ui/styles/colors';
import './InterviewerAdd.scss';
import { primaryColor } from '../../../../../../constants/variables';

interface InterviewerAddProps {
    authUser: any;
}

export interface InterviewerInfo {
    companyName: string;
    employeeName: string;
    role: string;
    email?: string;
    number?: string;
    linkedin?: string;
}

interface InterviewerAddState {
    interviewerInfo: InterviewerInfo;
    open: boolean;
    confirmDisabled: boolean;
}

const INITIAL_INTERVIEWER_INFO = {
    interviewerInfo: {
        companyName: '',
        employeeName: '',
        role: '',
        email: '',
        number: '',
        linkedin: '',
    }
};

class InterviewerAdd extends React.Component<InterviewerAddProps, InterviewerAddState> {

    constructor(props: InterviewerAddProps) {
        super(props);

        this.state = {
            ...INITIAL_INTERVIEWER_INFO,
            open: false,
            confirmDisabled: true,
        };
    }

    toggleDialog = () => {
        this.setState(
            {
                ...INITIAL_INTERVIEWER_INFO,
                open: !this.state.open,
                confirmDisabled: true,
            });
    }

    inputChange = (event: any, id: string) => {
        const interviewerInfo: InterviewerInfo = {
            ...this.state.interviewerInfo,
            [id]: event.target.value,
        };
        const confirmDisabled =
            Object.keys(interviewerInfo).filter((cur: string) => {
                return interviewerInfo[cur].length === 0;
            }).length > 0;
        this.setState({interviewerInfo, confirmDisabled});
    }

    addInterviewer = () => {
        addUserInterviewer(this.props.authUser.uid, this.state.interviewerInfo);
        this.toggleDialog();
    }

    render() {
        return (
            <div className="interviewer-add">
                <RaisedButton
                    className="interviewer-add-button"
                    backgroundColor={primaryColor}
                    onClick={this.toggleDialog}
                    label={
                        <FontIcon color={white} className="material-icons">
                            add
                        </FontIcon>}
                    labelStyle={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />

                <InterviewerDialog
                    inputChange={this.inputChange}
                    open={this.state.open}
                    toggleDialog={this.toggleDialog}
                    addInterviewer={this.addInterviewer}
                    confirmDisabled={this.state.confirmDisabled}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(InterviewerAdd);
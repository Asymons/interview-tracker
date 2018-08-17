import * as React from 'react';
import CompanyHeader from './CompanyHeader/CompanyHeader';
import CompanyStatus from './CompanyStatus/CompanyStatus';
import CompanyNotes from './CompanyNotes/CompanyNotes';
import { connect } from 'react-redux';
import { getUserCompanyReferenceWithCompanyId, updateUserCompany } from '../../../../firebase/db';
import './CompanyContainer.scss';
import { CircularProgress } from 'material-ui';
import ApplicationStatusBar from './ApplicationStatusBar/ApplicationStatusBar';
import InfoBar from '../../../Shared/InfoBar/InfoBar';

export interface CompanyInfo {
    recruiterName: string;
    role: string;
    companyName: string;
    status: {
        easy: boolean;
        referral: boolean;
    };
    notes: string;
    appStatus: string;
}

interface CompanyContainerProps {
    authUser: any;
    routeParams: any;
}

interface CompanyContainerState {
    imgUrl?: string;
    companyInfo: CompanyInfo;
}

const INITIAL_STATE = {
    companyInfo: {
        recruiterName: '',
        role: '',
        companyName: '',
        notes: '',
        status: {
            easy: false,
            referral: false,
        },
        appStatus: 'APPLY',
    },
};

class CompanyContainer extends React.Component<CompanyContainerProps, CompanyContainerState> {

    constructor(props: any) {
        super(props);

        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        getUserCompanyReferenceWithCompanyId(this.props.authUser.uid, this.props.routeParams.params.companyId)
            .once('value', (snapshot) => {
                if (snapshot) {
                    this.setState(
                        {
                            companyInfo: {
                                appStatus: '',
                                ...snapshot.val(),
                            }
                        });
                }
            });
        // need to also get appStatus
    }

    onChangeNotes = (event: any, text: string) => {
        updateUserCompany(this.props.authUser.uid, this.props.routeParams.params.companyId, {
            notes: text
        });
        this.setState({
            companyInfo: {
                ...this.state.companyInfo,
                notes: text
            },
        });
    }

    toggleStatusChange = (propKey: string) => {
        updateUserCompany(this.props.authUser.uid, this.props.routeParams.params.companyId, {
            status: {
                ...this.state.companyInfo.status,
                [propKey]: !this.state.companyInfo.status[propKey]
            }
        });
        this.setState({
            companyInfo: {
                ...this.state.companyInfo,
                status: {
                    ...this.state.companyInfo.status,
                    [propKey]: !this.state.companyInfo.status[propKey]
                }
            },
        });
    }

    getCompanyRatings() {
        return {
            cultureAndValuesRating: '5',
            seniorLeadershipRating: '5',
            compensationAndBenefitsRating: '5',
            careerOpportunitiesRating: '5',
            workLifeBalanceRating: '5',
        };
    }

    onChangeAppStatus = (status: string) => {

        this.setState((prevState: CompanyContainerState) => ({
            companyInfo: {
                ...prevState.companyInfo,
                appStatus: status,
            },
        }));

        updateUserCompany(this.props.authUser.uid, this.props.routeParams.params.companyId, {appStatus: status});
    }

    render() {
        const {recruiterName, companyName, role} = this.state.companyInfo;

        return (
            this.state === INITIAL_STATE ?
                <CircularProgress/>
                :
                (
                    <div className="company-container">
                        <InfoBar/>
                        <ApplicationStatusBar
                            appStatus={this.state.companyInfo.appStatus}
                            onChangeAppStatus={this.onChangeAppStatus}
                        />
                        <CompanyHeader companyName={companyName} recruiterName={recruiterName} recruiterTitle={role}/>
                        <CompanyStatus status={this.state.companyInfo.status} onChange={this.toggleStatusChange}/>
                        <CompanyNotes currentText={this.state.companyInfo.notes} onChangeText={this.onChangeNotes}/>
                    </div>

                )
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    authUser: state.sessionState.authUser,
    ...ownProps,
});

export default connect(mapStateToProps)(CompanyContainer);
import * as React from 'react';
import { FontIcon, Snackbar } from 'material-ui';
import './InterviewerCard.scss';
import * as routes from '../../../../../../constants/routes';
import { Link } from 'react-router-dom';
import InterviewerCardDropdown from './InterviewerCardDropdown/InterviewerCardDropdown';
import InterviewInfo from '../../../../../../models/InterviewInfo/InterviewInfo';
import { descColor } from '../../../../../../constants/variables';
import CompanyImage from '../../../../../Shared/CompanyImage/CompanyImage';
import * as CopyToClipboard from 'react-copy-to-clipboard';

interface FooterIcon {
    iconName: string;
    desc: string;
}

export interface InterviewerCardProps {
    companyName: string;
    employeeName: string;
    role: string;
    email: string;
    phoneNumber: string;
    linkedin: string;
    companyId: string;
    appStatus: string;

    addInterview: (interviewInfo: InterviewInfo) => void;
    removeItem: (companyId: string) => void;
    onSetCompany: (companyInfo: any) => void;
}

interface InterviewerCardState {
    openPopover: boolean;
    anchorEl: any;
    openSnackbar: boolean;
}

class InterviewerCard extends React.Component<InterviewerCardProps, InterviewerCardState> {

    constructor(props: InterviewerCardProps) {
        super(props);

        this.state = {
            openPopover: false,
            anchorEl: null,
            openSnackbar: false,
        };
    }

    handleOptionsClick = (event: any) => {
        event.preventDefault();

        this.setState({
            openPopover: !this.state.openPopover,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose = () => {
        this.setState({
            openPopover: false,
            anchorEl: null,
        });
    }

    setOpenSnackbar = (open: boolean) => {
        this.setState({
            openSnackbar: open,
        });
    }

    render() {

        const {
            companyId,
            companyName,
            employeeName,
            role,
            email,
            phoneNumber,
            linkedin,
            appStatus,
        } = this.props;

        const footerInfo: FooterIcon[] = [
            {
                iconName: 'mail',
                desc: email,
            },
            {
                iconName: 'smartphone',
                desc: phoneNumber,
            },

        ];

        const appStatusIcons = {
            'APPLIED': 'trending_flat',
            'REPLIED': 'swap_horiz',
            'INTERVIEW': 'insert_invitation',
            'OFFER': 'star',
        };

        return (

            <div className="interviewer-card">
                <div className="interviewer-card-header">
                    <div className="application-status">
                        <FontIcon className="material-icons" color={descColor}>
                            {appStatusIcons[appStatus]}
                        </FontIcon>
                        <span className="application-status-desc">
                        {appStatus && appStatus.toLowerCase()}
                        </span>
                    </div>
                    <div className="options">
                        <FontIcon
                            className="material-icons options"
                            color={descColor}
                            onClick={this.handleOptionsClick}
                        >
                            more_horiz
                        </FontIcon>
                    </div>
                </div>
                <Link
                    to={routes.COMPANY + `/${companyId}`}
                    style={{textDecoration: 'none'}}
                    className="interviewer-card-link"
                >
                    <div className="interviewer-card-details">
                        <CompanyImage companyName={companyName} width={50}/>
                        <div className="company-name">{companyName}</div>
                        <div className="recruiter-name">{employeeName}</div>
                        <div className="recruiter-role">{role}</div>
                    </div>

                </Link>

                <div className="interviewer-card-contact">
                    {
                        footerInfo.map((footerIcon: FooterIcon, key: number) => {
                            return (
                                <div className="contact-item" key={key}>

                                    <CopyToClipboard text={footerIcon.desc} onCopy={() => this.setOpenSnackbar(true)}>

                                        <FontIcon
                                            className="material-icons contact-icon"
                                            color={descColor}
                                            onClick={() => {
                                                return footerIcon.iconName === 'business' ?
                                                    window.open(footerIcon.desc, '_blank') : null;
                                            }}
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {footerIcon.iconName}
                                        </FontIcon>

                                    </CopyToClipboard>
                                </div>
                            );
                        })
                    }
                    <div className="contact-item">
                        <FontIcon
                            className="fab fa-linkedin"
                            color={descColor}
                            onClick={() => {
                                window.open(linkedin, '_blank');
                            }}
                            style={{
                                cursor: 'pointer',
                            }}
                        />
                    </div>
                </div>
                <InterviewerCardDropdown
                    open={this.state.openPopover}
                    anchorEl={this.state.anchorEl}
                    companyName={this.props.companyName}
                    employeeName={this.props.employeeName}
                    companyId={this.props.companyId}
                    addInterview={this.props.addInterview}
                    removeItem={this.props.removeItem}
                    handleRequestClose={this.handleRequestClose}
                />
                <Snackbar
                    message="Copied to clipboard"
                    open={this.state.openSnackbar}
                    onRequestClose={() => {
                        this.setOpenSnackbar(false);
                    }}
                />
            </div>

        );
    }
}

export default InterviewerCard;
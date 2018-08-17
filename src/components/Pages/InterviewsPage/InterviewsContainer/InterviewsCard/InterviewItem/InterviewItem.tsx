import * as React from 'react';
import { FontIcon, Menu, MenuItem, Popover } from 'material-ui';
import './InterviewItem.scss';
import { generateDateString, generateRelativeDate, generateTime } from '../../../../../../utility/generalUtility';
import * as routes from '../../../../../../constants/routes';
import { Link } from 'react-router-dom';
import CompanyImage from '../../../../../Shared/CompanyImage/CompanyImage';
import InterviewMap from '../../../../../Shared/InterviewMap/InterviewMap';
import { descColor } from '../../../../../../constants/variables';

// TODO find better way to handle all this data.
export interface InterviewItemProps {
    id: string;
    companyId: string;
    dateAndTime: string;
    location: string;
    companyName: string;
    employeeName: string;
    lat: number;
    lng: number;
    email: string;
    number: string;
    linkedin: string;
    role: string;
    notes: string;

    removeItem: (id: string) => void;
}

interface InterviewItemState {
    open: boolean;
    anchorEl: HTMLElement | undefined;
}

class InterviewItem extends React.Component<InterviewItemProps, InterviewItemState> {

    constructor(props: InterviewItemProps) {
        super(props);

        this.state = {
            open: false,
            anchorEl: undefined,
        };
    }

    toggleOpen = (event: any) => {
        event.preventDefault();
        this.setState({
            open: !this.state.open,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        const {
            lat,
            lng,
            dateAndTime,
            employeeName,
            companyName,
            companyId,
            location,
            id,
            removeItem,
        } = this.props;

        const {anchorEl, open} = this.state;

        return (
            <div className="interview-item">

                <div className="interview-item-container">

                    <InterviewMap lat={lat} lng={lng}/>
                    <div className="options-header">
                        <FontIcon
                            className="material-icons options"
                            color={descColor}
                            onClick={this.toggleOpen}
                        >
                            more_vert
                        </FontIcon>
                    </div>

                    <Link
                        to={routes.COMPANY + `/${companyId}`}
                        style={{textDecoration: 'none'}}
                        className="interview-card-link"
                    >
                        <CompanyImage companyName={companyName} width={50}/>
                        <div className="company-name">{companyName}</div>
                        <div className="interviewer-name">{employeeName}</div>
                        <div className="date-and-time">
                            {`${generateDateString(new Date(dateAndTime))} ` +
                            `${generateTime(new Date(dateAndTime))}`}
                        </div>
                        <div className="interview-location">
                            {`${generateRelativeDate(new Date(dateAndTime))} @ ${location}`}
                        </div>

                    </Link>

                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose}
                    >
                        <Menu>
                            <MenuItem primaryText="Remove" onClick={() => removeItem(id)}/>
                        </Menu>
                    </Popover>
                </div>
            </div>
        );
    }
}

export default InterviewItem;
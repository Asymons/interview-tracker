import * as React from 'react';
import { DatePicker, Dialog, FlatButton, Menu, MenuItem, Popover, TimePicker } from 'material-ui';
import InterviewInfo from '../../../../../../../models/InterviewInfo/InterviewInfo';
import './InterviewerCardDropdown.scss';
import { grey100, white } from 'material-ui/styles/colors';
import {
    LOCATION_IQ_API_KEY,
    primaryColor,
    primaryColorLight
} from '../../../../../../../constants/variables';
import LocationInput from '../../../../../../Shared/LocationInput/LocationInput';
import apiCalendar from '../../../../../../Shared/GoogleCalendar/GoogleCalendarHelper';

interface InterviewerCardDropdownProps {
    open: boolean;
    anchorEl: any;
    companyId: string;
    companyName: string;
    employeeName: string;

    addInterview: (interviewInfo: InterviewInfo) => void;
    removeItem: (companyId: string) => void;
    handleRequestClose: () => void;
}

interface InterviewerCardDropdownState {
    openDateTimePicker: boolean;
    date: Date;
    location: string;
}

class InterviewerCardDropdown extends React.Component<InterviewerCardDropdownProps, InterviewerCardDropdownState> {

    constructor(props: InterviewerCardDropdownProps) {
        super(props);

        this.state = {
            openDateTimePicker: false,
            date: new Date(),
            location: '',
        };
    }

    toggleDateTimePicker = () => {
        this.setState({
            openDateTimePicker: !this.state.openDateTimePicker,
        });
        this.props.handleRequestClose();
    }

    onDateChange = (event: undefined, date: Date) => {
        // may need two states... one for date and one for time set. probably best
        const modifiedDate = new Date(this.state.date);
        modifiedDate.setDate(date.getDate());
        modifiedDate.setMonth(date.getMonth());
        modifiedDate.setFullYear(date.getFullYear());
        this.setState(
            {
                date: modifiedDate,
            });
    }

    onTimeChange = (event: undefined, time: Date) => {
        // if this just returns a strict time, we can extract it and set the time on the date;
        const modifiedDate = new Date(this.state.date);
        modifiedDate.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
        this.setState({
            date: modifiedDate,
        });
    }

    onLocationChange = (event: any, location: string) => {
        this.setState({
            location,
        });
    }

    addInterview = () => {
        apiCalendar.handleAuthClick();
        const {date, location} = this.state;
        const {companyName, employeeName} = this.props;
        const oneHour = new Date(date);
        oneHour.setHours(oneHour.getHours() + 1);
        const eventFromNow: object = {
            summary: `Interview at ${companyName} with ${employeeName}`,
            start: {
                dateTime: date,
            },
            end: {
                dateTime: oneHour,
            },
            description: 'Made with interviewtracker.ca',
            location,
        };

        fetch(`https://us1.locationiq.org/v1/search.php?key=${LOCATION_IQ_API_KEY}` +
            `&q=${this.state.location}&format=json`)
            .then((response: any) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Could not receive location coordinates');
            })
            .then((result: any) => {
                this.props.addInterview({
                    dateAndTime: this.state.date.getTime(),
                    location: this.state.location,
                    companyId: this.props.companyId,
                    lat: result[0].lat,
                    lng: result[0].lon,
                });
                apiCalendar.createEvent(eventFromNow);
                this.toggleDateTimePicker();
            })
            .catch((err: any) => {
                console.warn('Bad location input');
                this.props.addInterview({
                    dateAndTime: this.state.date.getTime(),
                    location: this.state.location,
                    companyId: this.props.companyId,
                    lat: 0,
                    lng: 0,
                });
                apiCalendar.createEvent(eventFromNow);
                this.toggleDateTimePicker();
            });

    }

    render() {

        const {open, anchorEl, handleRequestClose, removeItem} = this.props;
        const {openDateTimePicker, location} = this.state;

        const isAddInterviewDisabled = location.length === 0;

        return (
            <div className="interviewer-card-dropdown">
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={handleRequestClose}
                >
                    <Menu>
                        <MenuItem primaryText="Schedule Interview" onClick={this.toggleDateTimePicker}/>
                        <MenuItem primaryText="Remove" onClick={() => removeItem(this.props.companyId)}/>
                    </Menu>
                </Popover>
                <div className="interviewer-card-add-interview">

                    <Dialog
                        open={openDateTimePicker}
                        onRequestClose={this.toggleDateTimePicker}
                    >
                        <div className="interviewer-card-dialog-content">
                            <DatePicker
                                id="date-picker"
                                onChange={this.onDateChange}
                                hintText="Date"
                                firstDayOfWeek={0}
                            />
                            <TimePicker
                                id="time-picker"
                                onChange={this.onTimeChange}
                                hintText="Time"
                            />
                            <LocationInput location={location} onChangeLocation={this.onLocationChange}/>
                            <FlatButton
                                onClick={this.addInterview}
                                backgroundColor={!isAddInterviewDisabled ? primaryColor : primaryColorLight}
                                labelStyle={{
                                    color: !isAddInterviewDisabled ? white : grey100,
                                }}
                                label="Confirm"
                                disabled={isAddInterviewDisabled}
                            />
                        </div>
                    </Dialog>
                </div>

            </div>
        );
    }
}

export default InterviewerCardDropdown;
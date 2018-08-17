import * as React from 'react';
import { RaisedButton } from 'material-ui';
import apiCalendar from './GoogleCalendarHelper';

class GoogleCalendar extends React.Component {

    render() {

        const eventFromNow: object = {
            summary: "Poc Dev From Now",
            start: {
                dateTime: (new Date())
             },
            end: {
              dateTime: (new Date())
            },
            description: ''
        };

        return (
            <div className="google-calendar">
                <RaisedButton
                    className="authorize"
                    label="authorize"
                    onClick={() => apiCalendar.handleAuthClick()}
                />
                <RaisedButton
                    className="calendar"
                    label="calendar"
                    onClick={() => apiCalendar.createEvent(eventFromNow)}
                />
                <RaisedButton
                    className="sign-out"
                    label="signout"
                    onClick={apiCalendar.handleSignoutClick}
                />
            </div>
        );
    }

}

export default GoogleCalendar;
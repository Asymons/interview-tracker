import * as React from 'react';
import './ApplicationStatusBar.scss';
import { FlatButton } from 'material-ui';
import { black } from 'material-ui/styles/colors';
import { primaryColor } from '../../../../../constants/variables';

interface ApplicationStatusBarProps {
    appStatus: string;

    onChangeAppStatus: (item: string) => void;
}

const statuses = ['APPLIED', 'REPLIED', 'INTERVIEW', 'OFFER'];

class ApplicationStatusBar extends React.Component<ApplicationStatusBarProps> {

    render() {
        return (
            <div className="application-status-bar">
                {
                    statuses.map((item: string, key: number) => (
                        <div className="status-item" key={key}>
                            <FlatButton
                                labelStyle={{color: item === this.props.appStatus ? primaryColor : black}}
                                label={item}
                                onClick={() => this.props.onChangeAppStatus(item)}
                            />
                        </div>
                    ))
                }
            </div>
        );
    }

}

export default ApplicationStatusBar;
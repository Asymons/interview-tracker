import * as React from 'react';
import PasswordChangeForm from '../PasswordChangePage/PasswordChangePage';
import withAuthorization from '../../withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import './AccountPage.scss';
import InfoBar from '../../Shared/InfoBar/InfoBar';

interface AccountPageProps {
    authUser: any;
}

class AccountPage extends React.Component<AccountPageProps> {

    constructor(props: AccountPageProps) {
        super(props);
    }

    render() {
        return (
            <div className="account-page">
                <InfoBar/>
                <div className="page-content">
                    <h3>Account: {this.props.authUser.email}</h3>
                    <div className="page-content-forms">
                        <PasswordChangeForm/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    authUser: state.sessionState.authUser,
});

const authCondition = (authUser: any) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
)(AccountPage);
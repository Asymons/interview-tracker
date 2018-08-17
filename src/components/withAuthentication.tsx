import * as React from 'react';
import { auth } from '../firebase/fire';
import { connect } from 'react-redux';

interface WithAuthenticationProps {
    onSetAuthUser: any;
}

const withAuthentication = (Component: any) => {
    class WithAuthentication extends React.Component<WithAuthenticationProps> {

        componentDidMount() {
            const {onSetAuthUser} = this.props;

            auth.onAuthStateChanged((authUser: any) => {
                authUser ? onSetAuthUser(authUser) : onSetAuthUser(null);
            });
        }

        render() {
            return (
                <Component/>
            );
        }
    }

    const mapDispatchToProps = (dispatch: any) => ({
        onSetAuthUser: (authUser: any) => dispatch({type: 'AUTH_USER_SET', authUser}),
    });

    return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
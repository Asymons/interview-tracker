import * as React from 'react';
import * as routes from '../constants/routes';
import { auth } from '../firebase/fire';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

interface WithAuthorizationProps {
    history: any;
    authUser: any;

    [key: string]: any;
}

const withAuthorization = (authCondition: any, props?: any) => (Component: any) => {
    class WithAuthorization extends React.Component<WithAuthorizationProps> {

        componentDidMount() {
            const {history} = this.props;
            auth.onAuthStateChanged((authUser: any) => {
                if (!authCondition(authUser)) {
                    history.push(routes.LOGIN);
                }
            });
        }

        render() {
            const {authUser} = this.props;
            return authUser ? <Component {...this.props} {...props}/> : null;
        }
    }

    const mapStateToProps = (state: any, ownProps: any) => ({
        authUser: state.sessionState.authUser,
        ...ownProps,
    });

    return compose(
        withRouter,
        connect(mapStateToProps),
    )(WithAuthorization);
};

export default withAuthorization;
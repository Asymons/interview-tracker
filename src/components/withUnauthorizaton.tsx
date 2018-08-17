import * as React from 'react';
import * as routes from '../constants/routes';
import { auth } from '../firebase/fire';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface WithUnauthorizationProps extends RouteComponentProps<any> {
    history: any;
    authUser: any;
}

function withUnauthorization<P extends WithUnauthorizationProps>(authCondition: any) {
    return (Component: any) => {
        class WithUnauthorizaton extends React.Component<P> {

            componentDidMount() {
                auth.onAuthStateChanged((authUser: any) => {
                    if (!authCondition(authUser)) {
                        this.props.history.push(routes.INTERVIEWERS);
                    }
                });
            }

            render() {
                return !this.props.authUser ? <Component {...this.props}/> : null;
            }
        }

        const mapStateToProps = (state: any) => ({
            authUser: state.sessionState.authUser,
        });

        return compose(
            withRouter,
            connect(mapStateToProps),
        )(WithUnauthorizaton);
    };
}

export default withUnauthorization;
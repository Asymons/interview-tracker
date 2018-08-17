import * as React from 'react';
import withAuthorization from '../../withAuthorization';
import { onceGetInterviewers, onceGetUsers } from '../../../firebase/db';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import './HomePage.scss';
import InfoCard from './InfoCard/InfoCard';
import ReplyContainer from './ReplyContainer/ReplyContainer';

interface HomePageState {
    interviewers: string[];
}

class HomePage extends React.Component<any, HomePageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            interviewers: [],
        };
    }

    componentDidMount() {
        const {onSetUsers, authUser} = this.props;

        onceGetUsers().then((snapshot: any) => {
            onSetUsers(snapshot.val());
        });

        onceGetInterviewers(authUser.uid).then((snapshot: any) => {
            this.setState({
                interviewers: Object.keys(snapshot.val()) as string[],
            });
        });
    }

    render() {
        const {users} = this.props;

        return (
            <div className="home-page">
                <ReplyContainer/>
                <div className="info-cards">
                    <InfoCard title="# of Recruiters" stat={this.state.interviewers.length}/>
                    <InfoCard title="# of Users" stat={Object.keys(users).length}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    authUser: state.sessionState.authUser,
    users: state.userState.users,
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetUsers: (users: any) => dispatch({type: 'USERS_SET', users}),
});

const authCondition = (authUser: any) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps))
(HomePage);
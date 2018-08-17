import * as React from 'react';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import * as routes from '../../../constants/routes';
import { doCreateUser } from '../../../firebase/db';
import SignupForm from './SignupForm';
import * as H from 'history';
import { FormEvent } from 'react';

interface SignupFormContainerState {
    email: string;
    password: string;
    passwordConfirm: string;
    loading: boolean;
    error?: firebase.FirebaseError;
}

const INITIAL_STATE = {
    email: '',
    password: '',
    passwordConfirm: '',
    loading: false,
    error: undefined,
};

class SignupFormContainer extends React.Component<{}, SignupFormContainerState> {

    constructor(props: {}) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmitWithEnter = (event: React.KeyboardEvent<HTMLElement>, history: H.History, isDisabled: boolean) => {
        if (event.key === 'Enter' && !isDisabled) {
            this.onSubmit(history);
        }
    }

    onSubmit = (history: H.History) => {
        const {
            email,
            password
        } = this.state;

        this.toggleLoading();

        doCreateUserWithEmailAndPassword(email, password)
            .then((authUser: any) => {

                doCreateUser(authUser.uid, email)
                    .then(() => {
                        this.setState({...INITIAL_STATE});
                        history.push(routes.INTERVIEWERS);
                    })
                    .catch((error: firebase.FirebaseError) => {
                        this.toggleLoading();
                        this.setState({
                            error
                        });
                    });
            })
            .catch((error: firebase.FirebaseError) => {
                this.toggleLoading();
                this.setState({
                    error
                });
            });
    }

    toggleLoading = () => {
        this.setState(prevState => {
            return {
                loading: !prevState.loading,
                error: undefined,
            };
        });
    }

    onChangeEmail = (event: FormEvent<HTMLElement>, email: string) => {
        this.setState({
            email,
        });
    }

    onChangePassword = (event: FormEvent<HTMLElement>, password: string) => {
        this.setState({
            password,
        });
    }

    onChangePasswordConfirm = (event: FormEvent<HTMLElement>, passwordConfirm: string) => {
        this.setState({
            passwordConfirm,
        });
    }

    render() {
        return (
            <SignupForm
                {...this.state}
                onSubmit={this.onSubmit}
                onChangePassword={this.onChangePassword}
                onChangePasswordConfirm={this.onChangePasswordConfirm}
                onChangeEmail={this.onChangeEmail}
                onSubmitWithEnter={this.onSubmitWithEnter}
            />
        );
    }

}

export default SignupFormContainer;
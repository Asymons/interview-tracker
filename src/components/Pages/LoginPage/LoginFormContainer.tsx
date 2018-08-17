import * as routes from '../../../constants/routes';
import * as React from 'react';
import { doSignInWithEmailAndPassword } from '../../../firebase/auth';
import LoginForm from './LoginForm';
import * as H from 'history';
import { FormEvent } from 'react';

interface LoginFormContainerState {
    email: string;
    password: string;
    loading: boolean;
    error?: firebase.FirebaseError;
}

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: undefined,
};

class LoginFormContainer extends React.Component<{}, LoginFormContainerState> {

    constructor(props: {}) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onChangeEmail = (event: FormEvent<HTMLElement>, value: string) => {
        this.setState({
            email: value,
        });
    }

    onChangePassword = (event: FormEvent<HTMLElement>, value: string) => {
        this.setState({
            password: value,
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

    onSubmit = (history: H.History) => {
        const {
            email,
            password,
        } = this.state;

        this.toggleLoading();

        doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    ...INITIAL_STATE
                });
                this.toggleLoading();
                history.push(routes.INTERVIEWERS);
            })
            .catch((error: firebase.FirebaseError) => {
                this.toggleLoading();
                this.setState({
                    error
                });
            });
    }

    onSubmitWithEnter = (event: React.KeyboardEvent<HTMLElement>, history: H.History, isDisabled: boolean) => {
        if (event.key === 'Enter' && !isDisabled) {
            this.onSubmit(history);
        }
    }

    render() {
        return (
            <div className="login-form-container">
                <LoginForm
                    {...this.state}
                    onChangeEmail={this.onChangeEmail}
                    onChangePassword={this.onChangePassword}
                    onSubmit={this.onSubmit}
                    onSubmitWithEnter={this.onSubmitWithEnter}
                />
            </div>
        );
    }

}

export default LoginFormContainer;
import * as React from 'react';
import { doPasswordUpdate } from '../../../firebase/auth';
import { FlatButton, TextField } from 'material-ui';
import { primaryColor, primaryColorLight } from '../../../constants/variables';
import { white } from 'material-ui/styles/colors';

interface PasswordChangeFormProps {

}

interface PasswordChangeFormState {
    password: string;
    passwordConfirm: string;
    error?: firebase.FirebaseError;
}

const INITIAL_STATE = {
    password: '',
    passwordConfirm: '',
    error: undefined,
};

class PasswordChangeForm extends React.Component<PasswordChangeFormProps, PasswordChangeFormState> {
    constructor(props: any) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onChangePassword = (event: any, value: string) => {
        this.setState({
            password: value,
        });
    }

    onChangePasswordConfirm = (event: any, value: string) => {
        this.setState({
            passwordConfirm: value,
        });
    }

    onSubmit = (event: any) => {
        const {password} = this.state;
        const updatePassword = doPasswordUpdate(password);
        if (updatePassword) {
            updatePassword
                .then(() => {
                    this.setState({...INITIAL_STATE});
                })
                .catch((error: firebase.FirebaseError) => {
                    this.setState({error});
                });
        }
        event.preventDefault();
    }

    render() {
        const {
            password,
            passwordConfirm,
            error,
        } = this.state;

        const isInvalid =
            password !== passwordConfirm ||
            password === '';

        return (
            <div className="password-change">
                <TextField
                    value={password}
                    onChange={this.onChangePassword}
                    type="password"
                    hintText="New Password"
                    style={{
                        margin: 5
                    }}
                />
                <TextField
                    value={passwordConfirm}
                    onChange={this.onChangePasswordConfirm}
                    type="password"
                    hintText="Confirm New Password"
                    style={{
                        margin: 5
                    }}
                />
                <FlatButton
                    disabled={isInvalid}
                    type="submit"
                    onSubmit={this.onSubmit}
                    label="Change Password"
                    backgroundColor={isInvalid ? primaryColorLight : primaryColor}
                    style={{
                        color: white
                    }}
                />
                {error && <span className="error-message">{error.message}</span>}
            </div>
        );
    }
}

export default PasswordChangeForm;
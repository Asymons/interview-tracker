import * as React from 'react';
import { doPasswordReset } from '../../../firebase/auth';
import { Link } from 'react-router-dom';
import { FlatButton, TextField } from 'material-ui';
import { primaryColor, primaryColorLight } from '../../../constants/variables';
import { white } from 'material-ui/styles/colors';

interface PasswordForgetFormState {
    email: string;
    error?: firebase.FirebaseError;
}

const INITIAL_STATE = {
    email: '',
    error: undefined,
};

class PasswordForgetForm extends React.Component<any, PasswordForgetFormState> {

    constructor(props: any) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onChangeEmail = (event: any, value: string) => {
        this.setState({
           email: value,
        });
    }

    onSubmit = (event: any) => {
        const {email} = this.state;
        event.preventDefault();

        doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
            })
            .catch((error: firebase.FirebaseError) => {
                this.setState({error});
            });
    }

    render() {
        const {
            email,
            error,
        } = this.state;

        const isInvalid = email === '';

        return (
            <div className="password-forget-page">
                {error && <span className="error-message">{error.message}</span>}
                <TextField
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    type="text"
                    hintText="Email Address"
                    style={{
                        margin: 5
                    }}
                />
                <FlatButton
                    label="Reset Password"
                    disabled={isInvalid}
                    backgroundColor={isInvalid ? primaryColorLight : primaryColor}
                    style={{
                        color: white
                    }}
                    type="submit"
                    onClick={this.onSubmit}
                />
            </div>
        );
    }
}

const PasswordForgetPage = () => (
    <div className="password-forget">
        <h1>Password Forget</h1>
        <PasswordForgetForm/>
    </div>
);

const PasswordForgetLink = () => (
    <span className="password-forget-link">
        <Link to="/forget-password">Forgot Password?</Link>
    </span>
);

export default PasswordForgetPage;

export {
    PasswordForgetForm,
    PasswordForgetLink,
};
import * as React from 'react';
import { primaryColor, primaryColorLight } from '../../../constants/variables';
import { white } from "material-ui/styles/colors";
import { CircularProgress, FlatButton, TextField } from 'material-ui';
import { FormEvent } from 'react';
import * as H from 'history';
import { match, withRouter } from 'react-router';

interface SignupFormProps {
    // From withRouter
    history: H.History;
    match: match<any>;
    location: H.Location;

    email: string;
    password: string;
    passwordConfirm: string;
    error?: firebase.FirebaseError;
    loading: boolean;

    onChangeEmail: (event: FormEvent<HTMLElement>, email: string) => void;
    onChangePassword: (event: FormEvent<HTMLElement>, password: string) => void;
    onChangePasswordConfirm: (event: FormEvent<HTMLElement>, passwordConfirm: string) => void;
    onSubmitWithEnter: (event: React.KeyboardEvent<HTMLElement>, history: H.History, isInvalid: boolean) => void;
    onSubmit: (history: H.History) => void;

}

const SignupForm = (props: SignupFormProps) => {

    const {
        email,
        password,
        passwordConfirm,
        error,
        loading,
        onChangeEmail,
        onChangePassword,
        onChangePasswordConfirm,
        onSubmitWithEnter,
        onSubmit,
        history
    } = props;

    const isInvalid =
        password !== passwordConfirm ||
        password === '' ||
        email === '';

    return (
        <div
            className="signup-form"
            onKeyPress={(event: React.KeyboardEvent<HTMLElement>) => onSubmitWithEnter(event, history, isInvalid)}
        >
            {loading && <CircularProgress/>}
            {error && <span className="error-message">{error.message}</span>}
            <TextField
                value={email}
                onChange={onChangeEmail}
                type="text"
                hintText="Email Address"
            />
            <TextField
                value={password}
                onChange={onChangePassword}
                type="password"
                hintText="Password"
            />
            <TextField
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                type="password"
                hintText="Confirm Password"
            />
            <FlatButton
                disabled={isInvalid}
                type="submit"
                onClick={() => onSubmit(history)}
                style={{
                    color: white,
                }}
                backgroundColor={isInvalid ? primaryColorLight : primaryColor}
            >
                Sign Up
            </FlatButton>
        </div>
    );
}

export default withRouter<SignupFormProps>(SignupForm);
import { primaryColor, primaryColorLight } from '../../../constants/variables';
import * as React from 'react';
import { white } from 'material-ui/styles/colors';
import { match, withRouter } from 'react-router';
import { CircularProgress, FlatButton, TextField } from 'material-ui';
import { FormEvent } from 'react';
import * as H from 'history';

type LoginFormProps = {
    // FROM WITH ROUTER
    history: H.History;
    match: match<any>;
    location: H.Location;

    email: string;
    password: string;
    loading: boolean;
    error?: firebase.FirebaseError;

    onSubmit: (history: H.History) => void;
    onSubmitWithEnter: (event: FormEvent<HTMLElement>, history: H.History, isInvalid: boolean) => void;
    onChangeEmail: (event: FormEvent<HTMLElement>, value: string) => void;
    onChangePassword: (event: FormEvent<HTMLElement>, value: string) => void;
};

const LoginForm = (props: LoginFormProps) => {
    const isInvalid =
        props.password === '' ||
        props.email === '';

    return (
        <div
            className="login-form"
            onKeyPress={
                (event: FormEvent<HTMLElement>) =>
                    props.onSubmitWithEnter(event, props.history, isInvalid)
            }
        >
            {props.loading && <CircularProgress/>}
            {props.error && <span className="error-message">{props.error.message}</span>}
            <TextField
                value={props.email}
                onChange={props.onChangeEmail}
                type="text"
                hintText="Email Address"
            />
            <TextField
                value={props.password}
                onChange={props.onChangePassword}
                type="password"
                hintText="Password"
            />
            <FlatButton
                disabled={isInvalid}
                type="submit"
                onClick={() => props.onSubmit(props.history)}
                style={{
                    color: white,
                }}
                backgroundColor={isInvalid ? primaryColorLight : primaryColor}
            >
                Sign In
            </FlatButton>
        </div>
    );
};

export default withRouter<LoginFormProps>(LoginForm);
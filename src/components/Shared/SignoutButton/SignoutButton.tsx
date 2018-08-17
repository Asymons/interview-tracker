import * as React from 'react';
import { doSignOut } from '../../../firebase/auth';
import './SignoutButton.scss';
import { FlatButton } from 'material-ui';
import { navItemInactiveColor } from '../../../constants/variables';

interface SignoutButtonProps {
    labelStyle?: {
        [key: string]: any;
    };
}

const SignoutButton = (props: SignoutButtonProps) => (
    <div className="signout-button-container">
        <FlatButton
            className="signout-button"
            label="Sign out"
            labelStyle={props.labelStyle || {color: navItemInactiveColor, fontSize: 18}}
            onClick={doSignOut}
        />
    </div>
);

export default SignoutButton;
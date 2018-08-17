import * as React from 'react';
import * as routes from '../../../constants/routes';
import { Link } from 'react-router-dom';

const SignupLink = () => (
    <span className="signup-link">
      <Link to={routes.SIGN_UP}>Sign Up</Link>
  </span>
);

export default SignupLink;
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
import { connect } from 'react-redux';
import { FlatButton, FontIcon } from 'material-ui';
import SignoutButton from './Shared/SignoutButton/SignoutButton';
import './Navigation.scss';
import { navItemInactiveColor } from '../constants/variables';
import { white } from 'material-ui/styles/colors';
import { compose } from 'recompose';
import { withRouter } from 'react-router';

const logo = require('../assets/transparent-interview-tracker-logo.svg');

interface NavItemProps {
    to: string;
    label: string;
    icon: string;
}

const authLinks: NavItemProps[] = [
    {
        to: routes.INTERVIEWERS,
        label: 'Interviewers',
        icon: 'people',
    },
    {
        to: routes.INTERVIEWS,
        label: 'Interviews',
        icon: 'date_range',
    },
    {
        to: routes.ACCOUNT,
        label: 'Account',
        icon: 'account_circle',
    },
];

interface NavigationAuthProps {
    active: string;
}

const NavigationAuth = (props: NavigationAuthProps) => (
    <div className="nav-bar">
        <div className="nav-item-list-container">
            <div className="nav-bar-logo-container">
                <Link className="nav-item-link" to={routes.INTERVIEWERS}>
                    <img className="nav-bar-logo" src={logo}/>
                </Link>
            </div>
            <div className="nav-item-list">
                <div className="nav-divider">
                    <div className="nav-divider-item">
                        MAIN
                    </div>
                </div>
                {
                    authLinks.map((navItemProps: NavItemProps, key: number) => (
                        <NavLink
                            className="nav-item-link"
                            to={navItemProps.to}
                            key={key}
                        >
                            <FlatButton
                                icon={
                                    <FontIcon
                                        className="material-icons"
                                        color={props.active === navItemProps.to ? white : navItemInactiveColor}
                                    >
                                        {navItemProps.icon}
                                    </FontIcon>}
                                className="nav-item"
                                key={key}
                                label={navItemProps.label}
                                labelStyle={
                                    {
                                        textDecoration: 'none !important',
                                        color: props.active === navItemProps.to ? white : navItemInactiveColor,
                                    }
                                }
                            />
                        </NavLink>
                    ))
                }
            </div>
        </div>
        <SignoutButton/>
    </div>
);

interface NavigationProps {
    authUser: any;
    history: any;
}

class Navigation extends React.Component<NavigationProps> {
    
    render() {
        return (
            <div className="navigation">
                {this.props.authUser ?
                    <NavigationAuth active={this.props.history.location.pathname}/>
                    :
                    null}
            </div>
        );

    }

}

const mapStateToProps = (state: any) => ({
    authUser: state.sessionState.authUser,
});

export default compose(withRouter, connect(mapStateToProps))(Navigation);

import * as React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import withAuthentication from './withAuthentication';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import * as routes from '../constants/routes';
import { Route, Switch } from 'react-router';
import SignupPage from './Pages/SignupPage/SignupPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import AccountPage from './Pages/AccountPage/AccountPage';
import InterviewsPage from './Pages/InterviewsPage/InterviewsPage';
import InterviewersPage from './Pages/InterviewersPage/InterviewersPage';
import CompanyPage from './Pages/CompanyPage/CompanyPage';
import { primaryColor, primaryColorDark } from '../constants/variables';
import { PasswordForgetForm } from './Pages/PasswordForgetPage/PasswordForgetPage';
import GoogleCalendar from './Shared/GoogleCalendar/GoogleCalendar';

const muiTheme = getMuiTheme({
    datePicker: {
        color: primaryColorDark,
        selectColor: primaryColor,
        headerColor: primaryColor,
    },
    timePicker: {
        color: primaryColorDark,
        selectColor: primaryColor,
        headerColor: primaryColor,
        accentColor: primaryColor,
    },
    flatButton: {
        primaryTextColor: primaryColorDark,
    },
    textField: {
        focusColor: primaryColor,
    },
    toggle: {
        thumbOnColor: primaryColor,
    },
});

const App = () => (
    <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
            <div className="routes">
                <Navigation/>
                <div className="page-content">
                    <Switch>
                        <Route
                            exact={true}
                            path={routes.LANDING}
                            component={() =>
                                <LoginPage/>
                            }
                        />
                        <Route
                            exact={true}
                            path={routes.LOGIN}
                            component={() =>
                                <LoginPage/>
                            }
                        />
                        <Route
                            exact={true}
                            path={routes.SIGN_UP}
                            component={() =>
                                <SignupPage/>
                            }
                        />
                        <Route
                            exact={true}
                            path={routes.ACCOUNT}
                            component={() =>
                                <AccountPage/>
                            }
                        />
                        <Route
                            exact={true}
                            path={routes.INTERVIEWS}
                            component={() =>
                                <InterviewsPage/>
                            }
                        />
                        <Route
                            exact={true}
                            path={routes.INTERVIEWERS}
                            component={() => <InterviewersPage/>}

                        />
                        <Route
                            path={routes.COMPANY_SLUG}
                            render={(props) => {
                                return (<CompanyPage {...props}/>);
                            }}
                        />
                        <Route
                            exact={true}
                            path={routes.FORGET_PASSWORD}
                            component={() => <PasswordForgetForm/>}
                        />
                        <Route
                            exact={true}
                            path={'/test'}
                            component={() => <GoogleCalendar/>}
                        />
                    </Switch>
                </div>
            </div>
        </MuiThemeProvider>
    </Router>
);

export default withAuthentication(App);
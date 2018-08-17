import * as React from 'react';
import withAuthorization from '../../withAuthorization';
import CompanyContainer from './CompanyContainer/CompanyContainer';
import './CompanyPage.scss';

class CompanyPage extends React.Component<any> {
    render() {
        return(
            <div className="company-page">
                <CompanyContainer routeParams={this.props.match}/>
            </div>
        );
    }
}

const authCondition = (authUser: any) => !!authUser;

export default withAuthorization(authCondition)(CompanyPage);
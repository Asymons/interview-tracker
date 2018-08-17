import * as React from 'react';
import withAuthorization from '../../withAuthorization';

class AdminPage extends React.Component {
    render() {
        return(
            <div className="admin-page">
                <h1>Admin</h1>
                <p>Restricted area! Only users with the admin rule are authorized.</p>
            </div>
        );
    }
}

const authCondition = (authUser: any) => !!authUser && authUser.role === 'ADMIN';

export default withAuthorization(authCondition)(AdminPage);
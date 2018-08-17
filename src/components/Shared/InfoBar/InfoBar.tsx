import * as React from 'react';
import './InfoBar.scss';
import { connect } from 'react-redux';
import { CircularProgress, Drawer, IconButton } from 'material-ui';
import Navigation from '../../Navigation';

interface InfoBarProps {
    authUser: any;
    children?: JSX.Element;
}

interface InfoBarState {
    drawerOpen: boolean;
}

class InfoBar extends React.Component<InfoBarProps, InfoBarState> {

    constructor(props: InfoBarProps) {
        super(props);

        this.state = {
            drawerOpen: false,
        };
    }

    toggleDrawer = () => {
        this.setState(prevState => {
            return ({
                drawerOpen: !prevState.drawerOpen,
            });
        });
    }

    render() {

        return (
            this.props.authUser ?
                (
                    <div className="info-bar">
                        <Drawer open={this.state.drawerOpen} onRequestChange={this.toggleDrawer} width={200}>
                            <Navigation/>
                        </Drawer>
                        {this.state.drawerOpen && <div className="overlay" onClick={this.toggleDrawer}/>}
                        <div className="info-bar-children">
                            <div className="navigation-button">
                                <IconButton
                                    iconClassName="material-icons"
                                    onClick={this.toggleDrawer}
                                >
                                    menu
                                </IconButton>
                            </div>
                            {this.props.children}
                        </div>
                    </div>
                ) :
                <CircularProgress/>
        );
    }

}

const mapStateToProps = (state: any) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(InfoBar);
import * as React from 'react';
import ReplyCard from './ReplyCard/ReplyCard';
import './ReplyContainer.scss';

interface ReplyContainerState {
    count: number;
}

class ReplyContainer extends React.Component<any, ReplyContainerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    componentWillMount() {
        this.setState({
            count: Math.random() > 0.5 ? 1 : 0,
        });
    }

    render() {
        return (
            <div className="reply-container">
                <ReplyCard count={this.state.count}/>
            </div>
        );
    }
}

export default ReplyContainer;
import * as React from 'react';
import './ReplyCard.scss';
import { FontIcon } from 'material-ui';
import { white } from 'material-ui/styles/colors';

interface ReplyCardProps {
    count: number;
}

const ReplyCard = (props: ReplyCardProps) => (
    <div className="reply-card">
        <FontIcon className="material-icons" style={{fontSize: 50}} color={white}>
            {props.count > 0 ? 'email' : 'mood_bad'}
        </FontIcon>
        <div className="mail-message">
            {
                props.count > 0 ?
                    `${props.count} replies waiting... go check them out!`
                    :
                    'No replies yet, check again soon!'
            }
        </div>
    </div>
);

export default ReplyCard;
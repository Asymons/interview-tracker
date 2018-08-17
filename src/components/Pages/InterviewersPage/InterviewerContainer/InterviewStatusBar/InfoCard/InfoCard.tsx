import * as React from 'react';
import './InfoCard.scss';
import { FontIcon } from 'material-ui';
import { white } from 'material-ui/styles/colors';

interface InfoCardProps {
    icon: string;
    title: string;
    stat: number;
}

const InfoCard = (props: InfoCardProps) => (
    <div className="info-card">
        <FontIcon className="material-icons" color={white}>
            {props.icon}
        </FontIcon>
        <div className="info-card-title">
            {props.title}
        </div>
        <div className="info-card-stat">
            {props.stat}
        </div>
    </div>
);

export default InfoCard;
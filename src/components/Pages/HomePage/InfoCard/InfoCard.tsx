import * as React from 'react';
import './InfoCard.scss';

interface InfoCardProps {
    title: string;
    stat: number;
}

const InfoCard = (props: InfoCardProps) => (
    <div className="info-card">
        <div className="info-card-title">
            {props.title}
        </div>
        <div className="info-card-stat">
            {props.stat}
        </div>
    </div>
);

export default InfoCard;
import * as React from 'react';
import './CompanyStatistics.scss';
import { CircularProgress } from 'material-ui';

interface CompanyStatisticsProps {
    ratings: {
        cultureAndValuesRating: string;
        seniorLeadershipRating: string;
        compensationAndBenefitsRating: string;
        careerOpportunitiesRating: string;
        workLifeBalanceRating: string;
    };
}

const MAX_RATING = 5;

const propToString = (propName: string) => {
    switch (propName) {
        case 'cultureAndValuesRating':
            return 'Culture';
        case 'seniorLeadershipRating':
            return 'Managers';
        case 'compensationAndBenefitsRating':
            return 'Pay & Perks';
        case 'careerOpportunitiesRating':
            return 'Career Building';
        case 'workLifeBalanceRating':
            return 'Work/Life';
        default:
            return '';
    }
};

const CompanyStatistics = (props: CompanyStatisticsProps) => (
    <div className="company-statistics">
        {
            Object.keys(props.ratings).map((ratingKey: string, key: number) => (
                <div className="rating-container" key={key}>
                    <div className="rating-item">
                        <div className="rating-progress">
                            <CircularProgress
                                mode="determinate"
                                value={+props.ratings[ratingKey]}
                                max={MAX_RATING}
                            />
                        </div>
                        <div className="rating-number">
                            {props.ratings[ratingKey]}
                        </div>
                    </div>
                    <div className="rating-desc">
                        {propToString(Object.keys(props.ratings)[key])}
                    </div>
                </div>
            ))
        }
    </div>
);

export default CompanyStatistics;
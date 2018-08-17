import * as React from 'react';
import './SummaryCard.scss';

type SummaryCardProps = {
    totalRecruiters: number;
    totalInterviews: number;
    totalCurrentWeekInterviews: number;
    totalCurrentMonthInterviews: number;
};

type SummaryCardItem = {
    total: number;
    label: string;
    tag: string;
};

class SummaryCard extends React.Component<SummaryCardProps> {

    render() {
        const {totalRecruiters, totalInterviews, totalCurrentWeekInterviews, totalCurrentMonthInterviews} = this.props;

        const summaryCardItems: SummaryCardItem[] = [
            {
                total: totalRecruiters,
                label: 'Saved Contacts',
                tag: 'one',
            },
            {
                total: totalInterviews,
                label: 'Total Interviews',
                tag: 'two',
            },
            {
                total: totalCurrentWeekInterviews,
                label: 'Interviews in 7 days',
                tag: 'three',
            },
            {
                total: totalCurrentMonthInterviews,
                label: 'Interviews this month',
                tag: 'four',
            },
        ];

        return (
            <div className="summary-card">
                <div className="title">
                    Summary
                </div>
                {
                    summaryCardItems.map((summaryCardItem: SummaryCardItem, key: number) => {
                        return (
                            <div className={`summary-card-item-container ${summaryCardItem.tag}`} key={key}>
                                <div className="summary-card-item">
                                    <div className="total">
                                        {summaryCardItem.total}
                                    </div>
                                    <div className="label">
                                        {summaryCardItem.label}
                                    </div>
                                </div>
                            </div>

                        );
                    })
                }
            </div>
        );
    }
}

export default SummaryCard;
import * as React from 'react';
import './CompanyHeader.scss';
import CompanyImage from '../../../../Shared/CompanyImage/CompanyImage';

interface CompanyHeaderProps {
    imgUrl?: string;
    companyName: string;
    recruiterName: string;
    recruiterTitle: string;
}

const CompanyHeader = (props: CompanyHeaderProps) => (
    <div className="company-header">
        <div className="left-elements">
            <CompanyImage companyName={props.companyName} width={100}/>
        </div>
        <div className="right-elements">
            <div className="company-name">
                {props.companyName}
            </div>
            <div className="recruiter-name">
                {props.recruiterName}
            </div>
            <div className="recruiter-title">
                {props.recruiterTitle}
            </div>
        </div>
    </div>
);

export default CompanyHeader;
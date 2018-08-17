import * as React from 'react';
import { getCompanyImageSource } from '../../../utility/imageUtility';

const noData = require('../../../assets/no-data.png');

interface CompanyImageProps {
    companyName: string;
    width: number;
}

const CompanyImage = (props: CompanyImageProps) => (
    <img
        className="company-image"
        src={getCompanyImageSource(props.companyName, props.width)}
        onError={(img: any) => {
            img.target.src = noData;
            return true;
        }}
        style={{height: props.width, width: props.width}}
    />
);

export default CompanyImage;
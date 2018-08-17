import * as React from 'react';
import './CompanyStatus.scss';
import { Toggle } from 'material-ui';

interface CompanyStatusProps {
    status: {
        easy: boolean;
        referral: boolean;
    };
    onChange: (propKey: string) => void;
}

const CompanyStatus = (props: CompanyStatusProps) => (
  <div className="company-status">
      {
          Object.keys(props.status).map((statusKey: string, key: number) => (
              <div className="company-status-item" key={key}>
                  <div className="company-status-desc">
                      {statusKey}
                  </div>
                  <div className="company-status-state">
                      <Toggle toggled={props.status[statusKey]} onClick={() => props.onChange(statusKey)}/>
                  </div>
              </div>
          ))
      }
  </div>
);

export default CompanyStatus;
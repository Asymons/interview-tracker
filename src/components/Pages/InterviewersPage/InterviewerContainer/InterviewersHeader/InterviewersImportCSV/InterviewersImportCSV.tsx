import * as React from 'react';
import * as FileInput from 'react-file-reader-input';
import { FontIcon, RaisedButton } from 'material-ui';
import './InterviewersImportCSV.scss';
import { greyButtonColor } from '../../../../../../constants/variables';

interface InterviewersImportCSVProps {
    handleFiles: (e: any, results: any) => void;
}

const InterviewersImportCSV = (props: InterviewersImportCSVProps) => (
    <div className="interviewers-import-csv">
        <FileInput as="text" onChange={props.handleFiles}>
            <RaisedButton
                style={{
                    minWidth: undefined,
                }}
                label={
                    <FontIcon
                        className="material-icons"
                        color={greyButtonColor}
                        style={{
                            display: 'inline',
                            verticalAlign: 'middle',
                        }}
                    >
                        file_upload
                    </FontIcon>
                }
            />
        </FileInput>
    </div>
);

export default InterviewersImportCSV;
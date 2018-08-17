import * as React from 'react';
import './CompanyNotes.scss';
import { TextField } from 'material-ui';

interface CompanyNotesProps {
    currentText: string;

    onChangeText: (event: any, text: string) => void;
}

const CompanyNotes = (props: CompanyNotesProps) => (
    <div className="company-notes">
        <div className="company-notes-header">
            Notes
        </div>
        <div className="company-notes-content">
            <TextField
                className="company-notes-input-field"
                value={props.currentText}
                multiLine={true}
                rows={4}
                rowsMax={4}
                onChange={props.onChangeText}
                textareaStyle={{border: '1px solid rgba(0,0,0,0.5)', padding: 5, borderRadius: 2}}
                hintText="Enter notes"
                hintStyle={{top: 12, left: 0, padding: 5}}
                underlineShow={false}
                fullWidth={true}
            />
        </div>
    </div>
);

export default CompanyNotes;
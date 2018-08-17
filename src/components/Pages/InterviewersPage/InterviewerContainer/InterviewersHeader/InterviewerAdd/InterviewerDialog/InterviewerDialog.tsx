import * as React from 'react';
import { blue500, white, grey100, blue100 } from 'material-ui/styles/colors';
import { Dialog, FlatButton, TextField } from 'material-ui';
import './InterviewerDialog.scss';

interface AddInterviewerTextFieldProps {
    id: any;
    hintText: string;
}

const addOptions: AddInterviewerTextFieldProps[] = [
    {
        id: 'companyName',
        hintText: 'Company Name',
    },
    {
        id: 'employeeName',
        hintText: 'Employee Name',
    },
    {
        id: 'role',
        hintText: 'Role',
    },
    {
        id: 'email',
        hintText: 'Email',
    },
    {
        id: 'number',
        hintText: 'Phone Number',
    },
    {
        id: 'linkedin',
        hintText: 'Linkedin URL',
    },

];

interface InterviewerDialogProps {
    open: boolean;
    confirmDisabled: boolean;

    addInterviewer: () => void;
    toggleDialog: () => void;
    inputChange: (event: any, id: string) => void;
}

const InterviewerDialog = (props: InterviewerDialogProps) => {

    return (
        <Dialog onRequestClose={props.toggleDialog} open={props.open}>
            <div className="dialog-content">
                {
                    addOptions.map((addOption: AddInterviewerTextFieldProps, key: number) => (
                        <TextField
                            name={addOption.id}
                            className="input-field"
                            hintText={addOption.hintText}
                            onChange={(event) => props.inputChange(event, addOption.id)}
                            key={key}
                        />
                    ))
                }
                <FlatButton
                    className="interview-dialog-confirm"
                    onClick={props.addInterviewer}
                    backgroundColor={!props.confirmDisabled ? blue500 : blue100}
                    labelStyle={{
                        color: !props.confirmDisabled ? white : grey100,
                    }}
                    label="Confirm"
                    disabled={props.confirmDisabled}
                />
            </div>
        </Dialog>
    );
};

export default InterviewerDialog;
import { db } from './fire';
import {
    InterviewerInfo
}
    from '../components/Pages/InterviewersPage/InterviewerContainer/InterviewersHeader/InterviewerAdd/InterviewerAdd';
import { CompanyInfo } from '../components/Pages/CompanyPage/CompanyContainer/CompanyContainer';
import fire from './fire';
import InterviewInfo from '../models/InterviewInfo/InterviewInfo';
import { InterviewItemProps }
from '../components/Pages/InterviewsPage/InterviewsContainer/InterviewsCard/InterviewItem/InterviewItem';
import DataSnapshot = firebase.database.DataSnapshot;
import { sortInterview } from '../utility/generalUtility';

// User API

export const doCreateUser = (id: string, email: string) =>
    db.ref(`users/${id}`).set({
        id,
        email,
    }).then(() =>
        db.ref(`schedules/${id}`).set({
            interviews: 0,
        }).then(() => {
            db.ref(`interviewers/${id}`).set(0);
        }).then(() => {
            db.ref(`companies/${id}`).set(0);
        })
    );

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const onceGetInterviewers = (id: string) =>
    db.ref(`interviewers/${id}`).once('value');

export const onceGetInterviews = (id: string) =>
    db.ref(`schedules/${id}/interviews`).once('value');

export const getUserInterviewerReference = (id: string) =>
    db.ref(`interviewers/${id}`);

export const getUserInterviewsReference = (id: string) =>
    db.ref(`schedules/${id}/interviews`);

export const getUserInterviewerReferenceWithCompanyId = (id: string, companyId: string) =>
    db.ref(`interviewers/${id}/${companyId}`);

export const removeUserInterview = (id: string, cardId: string) => {
    fire.database().ref(`schedules/${id}/interviews`)
        .once('value', (snapshot) => {
            if (snapshot) {
                if (Object.keys(snapshot.val()).length > 1) {
                    db.ref(`schedules/${id}/interviews/${cardId}`).remove();
                } else {
                    db.ref(`schedules/${id}/interviews`).set(0);
                }
            }
        });
};

export const addUserInterview = (id: string, interviewInfo: InterviewInfo) =>
    db.ref(`schedules/${id}/interviews/`).push(interviewInfo);

export const addUserCompany =
    (id: string, companyId: string, info: CompanyInfo) => db.ref(`companies/${id}/${companyId}`).set(info);

export const getUserCompanyReferenceWithCompanyId = (id: string, companyId: string) => {
    return db.ref(`companies/${id}/${companyId}`);
};

export const getUserCompanyReference = (id: string) =>
    getUserInterviewerReference(id).once('value', (snapshot: any) => {
        if (snapshot) {
            return db.ref(`companies/${id}/${snapshot.val().companyId}`);
        }
        return Error('Company ID not found');
    });

export const removeUserCompany = (id: string, companyId: string) =>
    db.ref(`companies/${id}`).once('value', (snapshot) => {
        if (snapshot) {
            if (Object.keys(snapshot.val()).length > 1) {
                db.ref(`companies/${id}/${companyId}`).remove();
            } else {
                db.ref(`companies/${id}`).set(0);
            }
        }
    });

export const updateUserCompany = (id: string, companyId: string, updates: object) =>
    db.ref(`companies/${id}/${companyId}`).update(updates);

export const addUserInterviewer =
    (id: string, info: InterviewerInfo) => {
        const reference = db.ref(`interviewers/${id}`).push(info);
        const companyId = reference.key;
        return reference.update({
            companyId,
        }).then(() => {
            if (companyId) {
                addUserCompany(
                    id,
                    companyId,
                    {
                        companyName: info.companyName,
                        recruiterName: info.employeeName,
                        role: info.role,
                        status: {
                            easy: false,
                            referral: false,
                        },
                        notes: '',
                        appStatus: 'APPLY',
                    });
            }
        });

    };

export const updateUserInterviewer = (id: string, updates: object) =>
    db.ref(`interviewers/${id}`).update(updates);

export const removeUserInterviewer = (id: string, cardId: string) => {
    db.ref(`interviewers/${id}`).once('value', (snapshot) => {
        if (snapshot) {
            if (Object.keys(snapshot.val()).length > 1) {
                db.ref(`interviewers/${id}/${cardId}`).remove();
            } else {
                db.ref(`interviewers/${id}`).set(0);
            }
            removeUserCompany(id, snapshot.val().companyId);
        }
    });
};

export const getLatestInterviews =
    (id: string, snapshot: DataSnapshot, callback: (data: any) => void, limit?: number) => {
        if (snapshot) {
            const dateAndTimeKey = 'dateAndTime';
            const keys = Object.keys(snapshot.val());
            let finishCount = 0;
            const interviewItems: InterviewItemProps[] = [];
            for (let i = 0; i < keys.length; ++i) {
                let data: any = null;
                const key = keys[i];
                getUserInterviewerReferenceWithCompanyId(
                    id,
                    snapshot.val()[key].companyId)
                    .once('value', (companySnapshot: any) => {
                        if (companySnapshot) {
                            data = {
                                ...snapshot.val()[key],
                                id: key,
                                ...companySnapshot.val(),
                                dateAndTime:
                                    new Date(Number(snapshot.val()[key][dateAndTimeKey])).toString(),
                            };
                        }
                    }).then(() => {
                    ++finishCount;
                    interviewItems.push(data);
                    if (finishCount === keys.length) {
                        const filteredInterviewItems = interviewItems.filter((item: InterviewItemProps) => {
                            return new Date(item.dateAndTime) >= (new Date());
                        });
                        filteredInterviewItems.sort(sortInterview);
                        callback(filteredInterviewItems.slice(0, limit || filteredInterviewItems.length));
                    }
                });
            }
        }
    };

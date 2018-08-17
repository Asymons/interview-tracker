import { InterviewItemProps }
from '../components/Pages/InterviewsPage/InterviewsContainer/InterviewsCard/InterviewItem/InterviewItem';

export function generateRelativeDate(date: Date): string {
    const secInDay = 86400;
    const oldDate = new Date(date);
    oldDate.setHours(0, 0, 0, 0);
    const currentEpocDateSecond = oldDate.getTime() / 1000;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime() / 1000;
    if (currentEpocDateSecond < todayTime) {
        return '';
    } else if ((currentEpocDateSecond - secInDay) < todayTime) {
        return 'Today';
    } else if ((currentEpocDateSecond - secInDay * 2) < todayTime) {
        return 'Tomorrow';
    } else {
        return `in ${Math.floor((currentEpocDateSecond - todayTime) / secInDay)} days`;
    }
}

export function generateDateString(date: Date): string {
    const formatter = new Intl.DateTimeFormat('en-ca', {month: 'short'});
    return `${formatter.format(date)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function generateTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const filteredHours = (hours % 12) || 12;
    const filteredMinutes = minutes < 10 ? '0' + minutes : minutes;
    return filteredHours + ':' + filteredMinutes + ' ' + ampm;
}

export const sortInterview = (a: InterviewItemProps, b: InterviewItemProps) => {
    const aDate = new Date(a.dateAndTime);
    const bDate = new Date(b.dateAndTime);
    if (aDate < bDate) {
        return -1;
    }
    if (aDate === bDate) {
        return 0;
    }
    return 1;
};
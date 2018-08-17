import * as firebase from 'firebase';
import * as config from '../config';

const fire = firebase.initializeApp(config);

export const auth = fire.auth();
export const db = fire.database();

export default fire;
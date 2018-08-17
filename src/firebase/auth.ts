import { auth } from './fire';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
    auth.signOut();

// Password Reset
export const doPasswordReset = (email: string) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password: string) => {
    if (auth.currentUser) {
        return auth.currentUser.updatePassword(password);
    }
    return null;
};

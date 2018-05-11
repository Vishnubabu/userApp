import { login, logout, userDetails, readingPreference } from '../services/APIService';

export const doLogin = params => ({
    type: 'LOGIN',
    payload: login(params)
});

export const doLogout = () => ({
    type: 'LOGOUT',
    payload: logout()
});

export const loginBoxChanged = loginBox => ({
    type: 'LOGIN_BOX_CHANGED',
    loginBox
});

export const getUserDetails = () => ({
    type: 'USER_DETAILS',
    payload: userDetails()
});

export const getReadingPreference = () => ({
    type: 'READING_PREFERENCE',
    payload: readingPreference()
});

export default (state = {}, action) => {
    let permissionDenied;

    switch(action.type) {
        case 'LOGIN_BOX_CHANGED':
            return {
                ...state,
                loginBox: { ...state.loginBox, ...action.loginBox }
            };

/**************************************************/

        case 'LOGIN_FULFILLED':
            return {
                ...state,
                isLoggedIn: true
            };
        case 'LOGIN_REJECTED':
            return {
                ...state,
                loginBox: { ...state.loginBox, loginError: true }
            };

/**************************************************/

        case 'LOGOUT_FULFILLED':
            return {
                ...state,
                isLoggedIn: false,
                userDetails: null,
                readingPreference: null
            };

/**************************************************/

        case 'USER_DETAILS_FULFILLED':
            return {
                ...state,
                userDetails: action.payload,
                isLoggedIn: true
            };
        case 'USER_DETAILS_REJECTED':
            permissionDenied = action.payload === 'PERMISSION_DENIED';

            return {
                ...state,
                ...(permissionDenied && {
                    isLoggedIn: false,
                    userDetails: null,
                    readingPreference: null
                })
            };

/**************************************************/

        case 'READING_PREFERENCE_FULFILLED':
            return {
                ...state,
                readingPreference: action.payload,
                isLoggedIn: true
            };
        case 'READING_PREFERENCE_REJECTED':
            permissionDenied = action.payload === 'PERMISSION_DENIED';

            return {
                ...state,
                ...(permissionDenied && {
                    isLoggedIn: false,
                    userDetails: null,
                    readingPreference: null
                })
            };

/**************************************************/

        default:
            return state;
    }
};

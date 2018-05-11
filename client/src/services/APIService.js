import jquery from 'jquery';

const apiRoot = '/api/';

const onResponse = res => {
    if (res.status === 200) {
        return res.json();
    }

	if (res.status === 403) {
        return Promise.reject('PERMISSION_DENIED');
    }
    
    return Promise.reject('ERR: ' + res.status);
};

const commonOpt = {cache: 'no-store', credentials: 'same-origin'};

export const login = params => fetch(apiRoot + 'login', {method: 'POST', body: JSON.stringify(params),
	headers: {'content-type': 'application/json'}, ...commonOpt}).then(onResponse);

export const logout = () => fetch(apiRoot + 'logout', {method: 'POST', ...commonOpt}).then(onResponse);

export const userDetails = () => fetch(apiRoot + 'user-details?' + jquery.param({'_': Date.now()}), commonOpt).then(onResponse);

export const readingPreference = () => fetch(apiRoot + 'reading-preference?' + jquery.param({'_': Date.now()}), commonOpt).then(onResponse);

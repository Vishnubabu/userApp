const userData = require('../data/users.json');
const usermap = processData();

function processData() {
    let map = new Map();
    userData.forEach(user => {
        map.set(user.email, user);
    })
    return map;
}

module.exports = {
    getUserByEmail: email => usermap.get(email)
};

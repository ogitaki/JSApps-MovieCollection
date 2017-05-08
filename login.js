const fs = require('fs');

var login = function (req, res) {
    const username = req.body.username;
    const passwordHash = req.body.password;

    if (!(/^[a-zA-Z0-9]{3,13}$/.test(username))) {
        res.send('username');
        return;
    }

    const exists = fs.existsSync('./users/' + username + '.json');

    if (!exists) {
        res.send('User doesn\'t exist');
        return;
    }

    const user = JSON.parse(fs.readFileSync('./users/' + username + '.json'));
    const match = user.passwordHash === passwordHash;
    if (!match) {
        res.send('Wrong password');
    }

    res.send('Successfully logged in');

};

module.exports = login;
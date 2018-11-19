
const bcrypt = require('bcrypt')
User = require('./userModel');

exports.index = (req, res) => {
    User.get((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        }
    });
};

exports.register = (req, res) => {
    if (req.body.pass != req.body.cpass) {
        res.json({message: 'Passwords don\'t match.'});
    } else {
        var user = new User();
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.isFullyRegistered = 0;
        bcrypt.hash(req.body.pass, 10, (err, hash) => {
            if (err) {
                res.send(err);
            } else {
                user.pass = hash;
                user.save((err) => {
                    if (err)
                        res.send(err);
                    else
                        res.json({message: 'OK'});
                });
            }
        });
    }
};

exports.login = (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (err) {
            return res.json({message: 'Mail not found.'});
        } else if (user) {
            bcrypt.compare(req.body.pass, user.pass, (err, match) => {
                if (err) {
                    return res.send(err);
                } else if (match) {
                    return res.json({message: 'OK', data: user});
                } else {
                    return res.json({message: 'Incorrect password.'});
                }
            });
        } else {
            return res.json({message: 'Address unregistered.'});
        }
    });
};

exports.deleteAll = (req, res) => {
    User.remove({}, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                status: "OK",
                message: "Deleted all users."
            });
        }
    });
};

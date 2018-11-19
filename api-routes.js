
let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'Success',
        message: 'Matcha default response.',
    });
});

var userController = require('./userController');

router.route('/register')
    .post(userController.register);

router.route('/login')
    .post(userController.login);

router.route('/deleteAll')
    .get(userController.deleteAll);

router.route('/index')
    .get(userController.index);

module.exports = router;


let router = require('express').Router();

var userController = require('./userController');

router.route('/getAll')
    .get(userController.getAll);

router.route('/register')
    .post(userController.register);

router.route('/updateSettings')
    .post(userController.updateSettings);

router.route('/login')
    .post(userController.login);

router.route('/deleteAll')
    .get(userController.deleteAll);

router.route('/getByMail')
    .get(userController.getByMail);

router.route('/getMatches')
    .get(userController.getMatches);

// todo notifications

module.exports = router;

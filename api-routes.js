
let router = require('express').Router();

var fs = require('fs');
var userController = require('./userController');

router.route('/getAll')
	.get(userController.getAll);

router.route('/register')
	.post(userController.register);

router.route('/updateSettings')
	.post(userController.updateSettings);

router.route('/addNotif')
	.post(userController.addNotif);

router.route('/login')
	.post(userController.login);

router.route('/deleteAll')
	.get(userController.deleteAll);

router.route('/getByMail')
	.get(userController.getByMail);

router.route('/getMatches')
	.post(userController.getMatches);

router.route('/getTags')
	.get((err, res) => {
		var tagFile = fs.readFileSync('tags.json');
		var tags = JSON.parse(tagFile);
		res.json(tags);
	});
// todo notifications

module.exports = router;

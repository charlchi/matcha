
const bcrypt = require('bcrypt')
User = require('./userModel');

function parseCookies (request) {
	var list = {};
	var rc = request.headers.cookie;
	rc && rc.split(';').forEach((cookie) => {
		var parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});
	return list;
}

exports.getAll = (req, res) => {
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
						res.json({message: 'User already exists!'});
					else
						res.json({message: 'OK'});
				});
			}
		});
	}
};

exports.updateSettings = (req, res) => {
	var cookies = parseCookies(req);
	var user = {email: cookies.login};
	var values =
	{ $set:
		{
			isFullyRegistered: 1,
			age: req.body.age,
			interest: req.body.interest,
			gender: req.body.gender,
			bio: req.body.bio,
			tags: req.body.tags,
			file1: req.body.file1,
			file2: req.body.file2,
			file3: req.body.file3,
			file4: req.body.file4,
			file5: req.body.file5
		}
	};
	User.updateOne(user, values, (err, success) => {
		if (err) res.json({message: 'Error updating values.'});
		else res.json({message: 'OK'});
	});
};

exports.login = (req, res) => {
	query = {'email': req.body.email};
	User.findOne(query, (err, user) => {
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

exports.getByMail = (req, res) => {
	query = {'mail': req.body.email};
	User.findOne(query, (err, user) => {
		if (err) {
			return res.json({message: 'Mail not found.'});
		} else if (user) {
			return res.json({message: 'OK', data: user});
		} else {
			return res.json({message: 'Mail not found.'});
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

exports.getMatches = (req, res) => {
	var user = req.body.user;
	query = {
		gender: {$in: user.interest},
		email: { $ne: user.email}
		//fame: { $gte: req.body.fameMin, $lte: req.body.fameMax},
		//age: { $gte: req.body.ageMin, $lte: req.body.ageMax},
  	//tags: user.tags, // this will return all user who match even one tag in req.body.tags list
  }
  User.find(query, (err, users) => {
  	if (err){
  		res.json({
  			message: "err",
  			data: err.message
  		});
  	} else {
  		res.json({
  			message: "OK",
  			data: users
  		});
	 		//TODO remove users that are geographically incompatible
	 		//TODO remove users with less than req.body.minTags amount of tags
	 		//TODO remove blocked users
	 	}
	 });
};

exports.addNotif = (req,res) => {
	var cookies = parseCookies(req);
	var user = {email: cookies.login};
	var values =
	{ $set: // dont set, update
		{
			age: req.body.age,
		}
	};
	User.updateOne(user, values, (err, success) => {
		if (err) res.json({message: 'Error updating values.'});
		else res.json({message: 'OK'});
	});
};




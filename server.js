
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var pug = require('pug');
var app = express();
var apiRoutes = require("./api-routes");
var Logger = require('mongodb').Logger;
  Logger.setLevel('debug');
  
  // Set our own logger
  Logger.setCurrentLogger(function(msg, context) {
    console.log(msg, context);
  });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

mongoose.connect('mongodb://127.0.0.1:27017/matcha', { useNewUrlParser: true });
var db = mongoose.connection;
var port = process.env.PORT || 8080;

function parseCookies (request) {
    var list = {};
    var rc = request.headers.cookie;
    rc && rc.split(';').forEach((cookie) => {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}

app.get('/', (req, res) => {
	var cookies = parseCookies(req);
	if (cookies.login == "") {
		res.writeHead(200, {
			'Set-Cookie': 'mycookie=test',
			'Content-Type': 'text/html'
		});
		res.write(pug.renderFile('views/index.pug', {title: 'Matcha'}));
		res.end();
	} else {
		// TODO actual
		res.writeHead(200, {
			'Set-Cookie': 'mycookie=test',
			'Content-Type': 'text/html'
		});
		res.write(pug.renderFile('views/index.pug', {title: 'Matcha'}));
		res.end();
	}
});

app.get('/registration', (req, res) => {
	var cookies = parseCookies(req);
	console.log(cookies.login);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(pug.renderFile('views/settings.pug', {
		title: 'Complete Registration'
	}));
	res.end();
});

app.get('/settings', (req, res) => {
	var cookies = parseCookies(req);
	console.log(cookies.login);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(pug.renderFile('views/settings.pug', {
		title: 'Modify Profile'
	}));
	res.end();
});

app.use('/api', apiRoutes);

app.get('*', (req, res) => res.redirect('/'));

app.listen(port, function() {
    console.log(`Running on port ${port}`);
});


var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var pug = require('pug');
var app = express();
var apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

const options = {
    useNewUrlParser: true,
    autoIndex: false,
  	autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000, 
    family: 4
};
mongoose.connect('mongodb://127.0.0.1:27017/matcha', {useNewUrlParser: true}, function(err) {
    if (err)
    	console.log('err', err);
});
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
	//cookies.login = "";
	if (cookies.login == "" || cookies.login == undefined) {
		res.writeHead(200, {
			'Set-Cookie': 'test=hi',
			'Content-Type': 'text/html'
		});
		res.write(pug.renderFile('views/index.pug', {title: 'Matcha'}));
		res.end();
	} else {
		res.writeHead(200, {
			'Set-Cookie': 'mycookie=test',
			'Content-Type': 'text/html'
		});
		res.write(pug.renderFile('views/app.pug', {title: 'Matcha'}));
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

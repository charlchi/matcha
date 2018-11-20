
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var pug = require('pug');
var app = express();
var apiRoutes = require("./api-routes");
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

mongoose.connect('mongodb://127.0.0.1:27017/matcha/', { useNewUrlParser: true })
	.then(() =>{
		console.log("Good");
	})
	.catch(err => {
		console.log(err.stack);

	});
var db = mongoose.connection;

var port = process.env.PORT || 8080;


//setcookie
/*
res.writeHead(200, {
	'Set-Cookie': 'mycookie=test',
	'Content-Type': 'text/html'
});
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}*/

app.get('/', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.write(pug.renderFile('views/index.pug', {title: 'hi'}));
	res.end();
});

/*
app.get('/registration', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	console.log(cookies);
	res.write(pug.renderFile('views/settings.pug', {
		title: 'Complete Registration'
	}));
	res.end();
});

app.get('/settings', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	console.log(cookies);
	res.write(pug.renderFile('views/settings.pug', {
		title: 'Modify Settings'
	}));
	res.end();
});
*/

app.use('/api', apiRoutes);

app.get('*', (req, res) => res.redirect('/'));

app.listen(port, function () {
    console.log(`Running on port ${port}`);
});

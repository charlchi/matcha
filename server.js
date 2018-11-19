
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

mongoose.connect('mongodb://localhost/matcha', { useNewUrlParser: true });
var db = mongoose.connection;

var port = process.env.PORT || 8080;


// Send message for default URL

app.get('/', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(pug.renderFile('views/index.pug', {
  	name: 'Timothy'
	}));
	res.end();
});

app.get('/register', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(pug.renderFile('views/register.pug', {
  	name: 'Timothy'
	}));
	res.end();
});

app.use('/api', apiRoutes);

app.get('*', (req, res) => res.redirect('/'));


app.listen(port, function () {
    console.log(`Running on port ${port}`);
});
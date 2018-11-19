
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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
	fs.readFile('index.html', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
});

app.get('/register', (req, res) => {
	fs.readFile('register.html', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
});

app.use('/api', apiRoutes);

app.get('*', (req, res) => res.redirect('/'));


app.listen(port, function () {
    console.log(`Running on port ${port}`);
});
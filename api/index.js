var http = require('http');
var portfolio = require('./portfolio');

http.createServer(function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.writeHead(200, {'Content-Type': 'application/json'});
	console.log(portfolio.objectId());
	var testObj = {
		url: "http://www.google.com",
		city: "Orlando",
		state: "Florida",
		start: new Date(),
		end: new Date(),
		cake: "fuck",
		dick: 123,
		turn: "nigger"
	};

	var school = portfolio.create(testObj);

  res.end(JSON.stringify(school));
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
var db = require('./dbModule');

var createItem = function(obj, cb){
	var newSchool = new db.school();
	for(var prop in obj){
		newSchool[prop] = obj[prop];
	}
	if (typeof cb == 'function') {
		cb(newSchool);
	}
	return newSchool;
}


var portfolio = { 
	create: createItem


}

module.exports = portfolio;
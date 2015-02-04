var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/resume');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var EducationItem = mongoose.model('educationitem', new Schema({
    itemId    : ObjectId,
    url       : String,
    city      : String, 
    state     : String,
    program	  : String,
    degree	  : String,
    start	  : Date,
    end 	  : Date 
}));

var PortfolioItem = mongoose.model('portfolioitem', new Schema({
    projectId 		: ObjectId,
    url     		: String,
    imgurl      	: String,
    description		: String,  
    date      		: Date,
    projects		: Array
}));

var ProjectItem = mongoose.model('BlogPostModel', new Schema({
    projectId 	: ObjectId,
    ownerID		: ObjectId,
    title     	: String,
    description : String, 
    date      	: Date
}));


var dbModule = {
	objectId: Schema.ObjectId,
	school: EducationItem,
	portfolio: {
		item: PortfolioItem,
		project: ProjectItem
	}
}

module.exports = dbModule;
var blog_settings = require("../libs/blog.js");

exports.getBlogSettings = function(req, res){
	var result = blog_settings.getBlogSettings();
	res.send(result);
};

exports.saveBlogSettings = function(req, res){
	//var result = blog_settings.getBlogSettings();
	//res.send(result);
};
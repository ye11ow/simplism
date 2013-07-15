var fs = require("fs");

var _getBlogSettings = function() {
	blog_settings = require("../configs/blog.json");
	return blog_settings;
}

var _saveBlogSettings = function(settings) {
}

exports.getBlogSettings = _getBlogSettings;
exports.saveBlogSettings = _saveBlogSettings;
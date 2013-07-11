var BLOG = require("../configs/blog.json");

exports.index = function(req, res){
	res.render('index', { 
		title: BLOG["title"],
		tags: BLOG["tags"],
		footnote: BLOG["footnote"]
	});
};

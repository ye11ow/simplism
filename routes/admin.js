var admin = require("../libs/admin.js"),
	post_controller = require("../libs/post.js");

exports.index = function(req, res){
	res.render('admin');
};

exports.login = function(req, res){
	var result = admin.login(req.body.username, req.body.password);
	if (result != false) {
		req.session.role = result;
	}
	res.send(result);
};

exports.getPost = function(req, res){
	var datetime = req.params.datetime,
		post = post_controller.getPost(datetime);
	res.send(JSON.stringify(post));
};

exports.logout = function(req, res){
	res.render('admin');
};

exports.dashboard = function(req, res){
	var post_list = post_controller.getPostList(2013);
	res.render('dashboard', {
		post_list: post_list
	});
};
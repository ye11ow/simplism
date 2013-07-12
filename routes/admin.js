var admin = require("../libs/admin.js");

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

exports.logout = function(req, res){
	res.render('admin');
};

exports.dashboard = function(req, res){
	res.send("dashboard");
};
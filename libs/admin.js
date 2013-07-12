var fs = require("fs"),
	ADMINS = require("../configs/admin.json");

var _login = function(username, password) {
	var admins = ADMINS["admins"]
	for (admin in admins) {
		admin = admins[admin];
		if (username == admin["username"] && password == admin["password"]) return admin["role"];
	}
	return false;
};

exports.login = _login;


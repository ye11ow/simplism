var loader = require("../libs/post_loader.js");

exports.loadNext = function(req, res) {
	var created_at = req.params.created_at;
	var result = loader.loadNext(created_at);
	res.send(result);
}

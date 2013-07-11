var generator = require("../libs/post_generator.js"),
	loader = require("../libs/post_loader.js");

exports.generate = function(req, res){
	var result = generator.generate();
	var result = generator.generateIndex();
	res.send(result);
};

exports.reGenerate = function(req, res) {
	var result = generator.reGenerate();
	res.send(result);
}

exports.loadNext = function(req, res) {
	var created_at = req.params.created_at;
	var result = loader.loadNext(created_at);
	res.send(result);
}

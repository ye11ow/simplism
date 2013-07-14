var fs = require("fs"),
	marked = require("marked");

var _getPostList = function(year) {
	if (year == null) {
		year = Date().getFullYear();
	}
	var folder = "_posts/" + year;
	var post_list = new Array();
	if (fs.existsSync(folder)) {
		var file,
			files = fs.readdirSync(folder);

		for(file in files) {
			file = files[file]
			if (file.lastIndexOf("md") == file.length - 2) {
				var post_map = {
					"title": "",
					"datetime": ""
				},
					filename = file.substring(0, file.length - 2) + "json",
					META = require("../" + folder + "/" + filename);

				post_map.title = META["title"];
				post_map.datetime = file.substring(0, file.length - 3);
				post_list.push(post_map);
			}
		}
	}
	return post_list;
}

var _getPost = function(datetime) {
	var post = {
		"meta": {},
		"content": ""
	},
		year = datetime.substring(0, 4);

	post.meta = require("../_posts/" + year + "/" + datetime + ".json");
	post.content = fs.readFileSync("_posts/" + year + "/" + datetime + ".md").toString();
	
	return post;
}

var _savePost = function(datetime, meta, content) {
	var year = datetime.substring(0, 4);
}


exports.getPostList = _getPostList;
exports.getPost = _getPost;

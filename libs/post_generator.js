var fs = require("fs"),
	marked = require("marked"),
	BLOG = require("../configs/blog.json");


function convert(file) {
	if (file.lastIndexOf("md") == file.length -2) {
		var metafile = file.substring(0, file.length - 2) + "json",
			META = require("../_posts/new/" + metafile),
			created_at = "",
			folder = "";

		created_at = new Date(META["created_at"]);
		folder = created_at.getFullYear() + "-";
		if (created_at.getMonth() + 1 < 10) {
			folder += "0";
		}
		folder += (created_at.getMonth() + 1);
		
		if (!fs.existsSync("public/_posts/" + folder)) {
			fs.mkdir("public/_posts/" + folder);
		}
		if (!fs.existsSync("_posts/" + folder)) {
			fs.mkdir("_posts/" + folder);
		}

		fs.readFile("_posts/new/" + file, function(err, data){
			html = marked(data.toString());
			fs.writeFile("public/_posts/" + folder + "/" + file + ".html", html, function(err){
				console.log("_posts/new/" + file + " -> public/_posts/" + folder + "/" + file);
				fs.renameSync("_posts/new/" + file, "_posts/" + folder + "/" + file);
				fs.renameSync("_posts/new/" + metafile, "_posts/" + folder + "/" + metafile);
			});
		});
	} else {
		return false;
	}
}

var _generate = function() {
	fs.readdir("_posts/new", function(err, files){
		async.each(files, convert, function(err){
			if (!err) {
				return true;
			} else {
				return false;
			}
		});
	});
}

var _generateIndex = function() {
	var posts_html = "",
		folder,
		folders = fs.readdirSync("public/_posts");	
	//todo sort folders

	for (folder in folders) {
		folder = folders[folder];
		var file,
			files = fs.readdirSync("public/_posts/" + folder);

		//todo sort files
		for (file in files) {
			file = files[file];
			var	created_at = "",
				local_date = "",
				metafile = file.substring(0, file.length - 7) + "json",
				META = require("../_posts/" + folder + "/" + metafile);

			created_at = new Date(META["created_at"]);
			local_date = created_at.toLocaleDateString();
			local_date = local_date.substring(local_date.indexOf(",") + 1, local_date.length);

			posts_html += "<div class=\"post\">";
			posts_html += " <div class=\"post-title\">";
			posts_html += META["title"];
			posts_html += " </div><hr />";
			posts_html += " <div class=\"post-meta\">";
			posts_html += "  <span class=\"post-meta-date\"><img src=\"images\/date.png\"/ class=\"post-meta-img\">";
			posts_html += local_date;
			posts_html += "  </span>";
			posts_html += "  <span class=\"post-meta-tags\"><img src=\"images\/tags.png\"/ class=\"post-meta-img\">";
			posts_html += META["tags"];
			posts_html += "  </span>";
			posts_html += " </div>";
			
			posts_html += " <div class=\"post-body\">";
			posts_html += fs.readFileSync("public/_posts/" + folder + "/" + file);
			posts_html += " </div>";
			posts_html += "</div>";
			posts_html += "<div class=\"clear-both\"></div>";
		}
		fs.writeFile("views/posts.html", posts_html, function(err){
			if (err) {
				return false;
			} else {
				return true;
			}
		});
	}
}

var _reGenerate = function() {
	var folder,
		folders = fs.readdirSync("_posts");	
	
	for (folder in folders) {
		folder = folders[folder];
		if (folder == "new") {
			continue;
		}
		var file,
			files = fs.readdirSync("_posts/" + folder);
		
		for (file in files) {
			file = files[file];
			if (file.lastIndexOf("md") == file.length -2) {
				data = fs.readFileSync("_posts/" + folder + "/" + file);
				html = marked(data.toString());
				if (!fs.existsSync("public/_posts/" + folder)) {
					fs.mkdir("public/_posts/" + folder);
				}
				fs.writeFile("public/_posts/" + folder + "/" + file + ".html", html, function(err){
				});
			}
		}
	}
}

exports.generate = _generate;
exports.generateIndex = _generateIndex;
exports.reGenerate = _reGenerate;

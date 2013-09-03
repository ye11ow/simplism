var fs = require("fs"),
	marked = require("marked"),
	jade = require('jade'),
	BLOG = require("../configs/blog.json");


/*  
 *  public: Load next N posts (older than current date) from file system.
 *  @current: date string
 */
var _loadNext = function(current) {
	var load_count = BLOG["load_count"],
		folder = "",
		year = parseInt(current.substring(0, 4)),
		olderthan = "",
		oldest_post = "9999-12-31T08:00:00.000Z",
		response = {},
		YEAR = 3,
		html = "";

	if (year > new Date().getFullYear()) {
		year = new Date().getFullYear();
		olderthan = "9999-12-31T08_00_00.000Z.md";
	} else {
		olderthan = current + ".md";
		olderthan = olderthan.replace(/:/g, "_");
	}
	while (load_count > 0 && YEAR > 0) {
		folder = "_posts/" + year;
		if ( fs.existsSync(folder) ) {
			var file,
				i = 0,
				files = fs.readdirSync(folder),
				META,
				created_at,
				local_date,
				metafile,
				post_body = "";

			for ( i = files.length - 1;i >=0 && load_count > 0;i-- ) {
				if (files[i].lastIndexOf("md") == files[i].length - 2 && files[i] < olderthan) {
					metafile = files[i].substring(0, files[i].length - 2) + "json",
					META = require("../" + folder + "/" + metafile);

					created_at = new Date(META["created_at"]);
					local_date = created_at.toLocaleDateString();
					local_date = local_date.substring(local_date.indexOf(",") + 2, local_date.length);
					
					load_count--;
					post_body = fs.readFileSync(folder + "/" + files[i]);
					post_body = marked(post_body.toString());
					template = fs.readFileSync("views/post.jade");
					var fn = jade.compile(template);
					html += fn({
						post_title: META["title"],
						created_at: created_at.toISOString(),
						local_date: local_date,
						tags: META["tags"],
						post_body: post_body
					});
					if (created_at.toISOString() < oldest_post) {
						oldest_post = created_at.toISOString();
					}
				}
			}
		} else {
			YEAR--;
		}
		year--;
	}

	response = {
		"html": html,
		"oldest_post": oldest_post
	}
	if (load_count != 0) {
		response["endofposts"] = true;
	} else {
		response["endofposts"] = false;
	}
	return response;
}

exports.loadNext = _loadNext;


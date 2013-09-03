var endofposts = false,
	oldest_post = "9999-12-31T08:00:00.000Z",
	ajax_lock = false;
	

$(window).scroll(function () {
	var percent = parseFloat($(window).scrollTop()) / ($(document).height() - $(window).height());
	if (percent > 0.7) {
		if (!endofposts) {
			var current = $(".post").last().attr("created-at");
			loadpost(oldest_post);
		}
	}
});


function loadpost(current) {
	if (ajax_lock == true) return;
	ajax_lock = true;
	$.ajax({
		type: "GET",
		url: "ajax/posts/loadnext/" + current,
		beforeSend: function (xhr) {
			$("#loader").show();
		}
	}).done(function (data){
		$("#loader").hide();
		oldest_post = data["oldest_post"];
		if (data["endofposts"] == true) {
			endofposts = true;
		} else {
		}
		$("#content").append(data["html"]);
		ajax_lock = false;
	});
}

loadpost(oldest_post);

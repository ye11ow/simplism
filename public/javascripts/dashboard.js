var opts = {
	basePath: '../../../epiceditor'
},
	editor,
	ajax_lock = false;

function loadPost(datetime) {
	if (ajax_lock == true) return;
	ajax_lock = true;
	$.ajax({
		type: "GET",
		url: "getPost/" + datetime,
		beforeSend: function (xhr) {
			$("#loader").show();
		}
	}).done(function (data){
		data = JSON.parse(data);
		$("#post-title").val(data.meta.title);
		$("#post-tags").val(data.meta.tags);
		editor.importFile(datetime, data.content);
		ajax_lock = false;
		$("#loader").hide();
	});
}

function loadBlogSettings() {
	if (ajax_lock == true) return;
	ajax_lock = true;
	$.ajax({
		type: "GET",
		url: "../blog/settings",
		beforeSend: function (xhr) {
			$("#loader").show();
		}
	}).done(function (data){
		$("#blog-title").val(data.title);
		$("#blog-tags").val(data.tags);
		ajax_lock = false;
		$("#loader").hide();
	});
}

$(document).ready(function() {
	loadBlogSettings();
	$(".post-item").click(function(){
		loadPost($(this).attr("data-datetime"));
	});

	$("#home-nav").click(function(){
		loadBlogSettings();
		$("#post-main").hide();
		$("#post-list").hide();
		$("#home-main").show();
	});

	$("#post-nav").click(function(){
		$("#home-main").hide();
		$("#post-main").show();
		$("#post-list").show();
		editor = new EpicEditor(opts);
		editor.load();
	});
});



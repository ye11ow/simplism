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
		editor.importFile(datetime, data.content);
		ajax_lock = false;
		$("#loader").hide();
	});
}

$(document).ready(function() {
	editor = new EpicEditor(opts);
	editor.load();
	
	$(".post-item").click(function(){
		loadPost($(this).attr("data-datetime"));
	});
});



$(function () {
	//var data ='data/course.json';
	$.getJSON("data/course.json", function(json) {
		$("#course").autoSuggest(json.items, {selectedItemProp: "label", searchObjProps: "label", selectedValuesProp: "value", selectionLimit:1, asHtmlID: "courseCode"});
		$('#courseList').modal('hide');
		
		//var data=json.items[0].label;
		//alert(data);
		$.each(json.items, function(index, course) {
			$('#courses').append('<li id="' + course.value + '">'+ course.label + '</li>');
		});
	});
});

$(function() {
	$( "#courses" ).selectable();
});

function notfoundclick() {
	$("#not-found").css({"display": "none"});
}

function ok() {
	var courseName = $(".ui-selected").text();
	var courseCode = $(".ui-selected").attr("id");
	if (!courseName) {
		alert("Please select a course:\)"); 
	}
	else {
		$("#as-original-courseCode").before('<li id="select_from_window" class="as-selection-item blur"><a onclick="remove()" class="as-close">×</a>' + courseName + '</li>');
		$("#courseCode").val("");
		$("#as-values-courseCode").val(courseCode);
		$("#close").click();
		$("li input").css({"display": "none"});
	}
}

function remove() {
	$("#select_from_window").remove();
	$("#as-values-courseCode").val("");
	$("li input").css({"display": "block"});

}

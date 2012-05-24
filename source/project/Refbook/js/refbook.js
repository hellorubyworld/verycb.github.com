$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
var _url = 'data/' + $.urlParam('as_values_courseCode') + '.xml';
var tab = 1;

$.ajax({
	url: _url,
    	type: 'GET',
    	dataType: 'xml',
    	timeout: 10000,
	error: function(xml){
		alert('No books found! Please select a valid course:\)');
	},
    	success: function(xml){
		var array=[];

        	$(xml).find("loansPerGlobalID").each(function(i){
				var amount=$(this).text(); //取借阅次数
				var isbn=$(this).attr("globalID"); //取ISBN
				if (amount > 1) {
					var result=
					{
					"amount": amount,
					"isbn": isbn
					};
				
					array.push(result);
				}
		});

		array = array.sort(function(a,b){
			return b.amount - a.amount;
		});//按借阅次数降序排列
		$.each(array, function(index, book){

			//var accessKey = 'AIzaSyAw0TqMntAFfWt-dNyElOdxWL6lriv4U4E';
			var accessKey = 'AIzaSyB0pNuoZ7uQp9P1irl7BEGdxZ5hzt6msRM';
			//var accessKey = '';
			//var accessKey = '';
			//var accessKey = '';
			//var accessKey = '';
			//var accessKey = '';

			$.ajax({
				url:'https://www.googleapis.com/books/v1/volumes?q=isbn:'+book.isbn+'&maxResults=1&fields=items(selfLink,volumeInfo/title,volumeInfo/authors,volumeInfo/description,volumeInfo/averageRating,volumeInfo/imageLinks/thumbnail)&key=' + accessKey + '&callback=?',
				type: 'GET',
				dataType: 'json',
				timeout: 10000,
				error: function (data, textStatus, jqXHR) { notify(textStatus);},
				success: function(data){
					var id = '#bookdetail' + tab;
					$("ul").append("<li class=\"book\" tabindex=\"" + tab + "\"><a data-toggle=\"modal\" href=\"#bookdetail" + tab + "\" ><img src=\""+data.items[0].volumeInfo.imageLinks.thumbnail+"\"/><div class=\"detail\"><h2>"+data.items[0].volumeInfo.title+"</h2><p>"+data.items[0].volumeInfo.authors+"</p></div></li>");
					//$("#book").append('<h2>' + data.items[0].volumeInfo.title + '</h2><p>' + data.items[0].volumeInfo.authors + '</p><p>Rating: ' + data.items[0].volumeInfo.averageRating + '</p><p>' + data.items[0].volumeInfo.description + '</p>');
					$("#booksdetail").append('<div id="bookdetail' + tab + '" class="modal hide fade"><header class="modal-header"><button class="close" data-dismiss="modal">×</button><h3>Book details</h3></header><section id="book" class="modal-body"><h2>'+ data.items[0].volumeInfo.title + '</h2><p>' + data.items[0].volumeInfo.authors + '</p><p>Rating: ' + data.items[0].volumeInfo.averageRating + '</p><p>' + data.items[0].volumeInfo.description + '</p></section><footer class="modal-footer"><a href="#" class="btn" data-dismiss="modal">Close</a></footer></div>');
					$(id).css({"display":"none"});
					tab = tab + 1;
				}
			});
    		}); 
	}
});

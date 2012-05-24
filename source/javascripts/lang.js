$(function() {
	$('header a').click(function () {
		$('header a').removeClass('current');
		$(this).addClass('current');
		$('section').addClass('hidden');
		$('#intro-' + this.id).removeClass('hidden');
	});
});

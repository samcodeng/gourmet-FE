$(document).ready(function(){
	$('.menu-toggle').click(function(){
    $(this).toggleClass('switch');
	$('.menu').toggleClass('no-right');
	$("#logo").toggleClass("is-white");
	});
}); 
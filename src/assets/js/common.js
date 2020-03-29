$(function () {
	var backBtn = $('.t-page-nav');
	var NavLink = []
	NavLink.push($(".news").offset().top, $(".tool").offset().top, $(".cases").offset().top, $(".information").offset().top, $(".cooperative").offset().top);
	backBtn.find("li").on("click", function () {
		var thisIndex = $(this).index();
		console.log(thisIndex)
		$("html,body").animate({
			"scrollTop": NavLink[thisIndex] - 50
		}, 500)
	});
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > $(".banner").height()-100) {
			backBtn.addClass("t-page-navs");
		} else {
			backBtn.removeClass("t-page-navs");
		};
	});
});
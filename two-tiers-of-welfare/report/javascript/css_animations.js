initialize();
isRevealed = false;

function initialize(){
	timer = 50;
	setTimeout(function () {
		$(quote1).fadeIn(2000);
	}, timer);

	timer += 2000;
	setTimeout(function () {
		$(quote2).fadeIn(2000);
	}, timer);

	timer += 2000;
	setTimeout(function () {
		$(quote3).fadeIn(2000);
	}, timer);

	timer += 2000;
	setTimeout(function () {
		$(quote4).fadeIn(2000);
	}, timer);

	timer += 2000;
	setTimeout(function () {
		$(quote5).fadeIn(2000);
	}, timer);

	timer += 2000;
	setTimeout(function () {
		$(quote6).fadeIn(2000);
	}, timer);

	timer += 2000;
	setTimeout(function () {
		$(intro1).fadeIn(2000);
	}, timer);

	timer += 2500;
	setTimeout(function () {
		$(intro2).fadeIn(2000);
	}, timer);

	timer += 3500;
	setTimeout(function () {
		$(scroll_prompt).fadeIn(2000);
		$(section2).show();

		$(window).scroll(function() {
		   var hT = $('#ctc_chart').offset().top,
		       hH = $('#ctc_chart').outerHeight(),
		       wH = $(window).height(),
		       wS = $(this).scrollTop();
		   if (wS > (hT+hH-wH) && isRevealed === false){
		     revealText();
   			}
		});
	}, timer);
}

function revealText(){
	isRevealed = true;
	$(ctc_quote1).fadeIn(2000);

	setTimeout(function () {
		$(ctc_quote2).fadeIn(2000);
	}, 2000);
}
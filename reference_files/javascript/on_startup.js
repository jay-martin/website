/******************************************************************************************
 * This file contains the function that performs a number of calculations and CSS manipulations
 * needed to render the page.
 * ****************************************************************************************/

const ref_items = document.querySelectorAll('.ref_item');
programsHeight = 0;
var isMobile = false;

//Get all highlights
var highlights = document.getElementsByClassName("explanation_and_animation_button_container");
var highlights_mobile = document.getElementsByClassName("explanation_and_animation_button_container_mobile");

//Create universal array of highlights heights
highlights_heights = [];
highlights_heights_mobile = [];

//Loop through all highlights and set highlights heights to 0
for (var i = 0; i < highlights.length; i++) {
	highlights_heights[i] = 0;
	highlights_heights_mobile[i] = 0;
}

//Determine whether to initialize desktop or mobile page
var displayWidth = window.innerWidth;
if(displayWidth < 900){
	initialize_mobile_page();
	isMobile = true; //this is used by the functions that open the highlights when clicked
}
else{
	initialize_page();
}

function initialize_page(){
	timer = 1000;
	setTimeout(function () {
		//calculate highlights heights, as well as list of programs height, and then set to zero
		programsHeight = window.getComputedStyle(document.getElementById('programs')).height;
		document.getElementById("programs").style.height = "0px";

		for (var i = 0; i < highlights_heights.length; i++) {
			id = 'highlights_container' + (i+1).toString();
			highlights_heights[i] = window.getComputedStyle(document.getElementById(id)).height;
			document.getElementById(id).style.height = "0px";
		}

	}, timer);

	//make highlights and programs visible
	timer += 1500;
	setTimeout(function () {
		$('#highlights').css({
			'border'       : 'solid',
			'border-color' : '#adadad',
			'border-width' : '1.5px'
		});
		$('#highlights_title').css({
			'border'        : 'none',
			'border-bottom' : 'solid',
			'border-color'  : '#adadad',
			'border-width'  : '1.5px'
		});
		document.getElementById("loader_container").style.display = 'none';
		document.getElementById("highlights_content").style.visibility = 'visible';
		document.getElementById("programs").style.visibility = 'visible';
	}, timer);
}

function initialize_mobile_page(){
	timer = 1000;
	setTimeout(function () {
		/* calculate highlights heights, and then set to zero */
		for (var i = 0; i < highlights_heights.length; i++) {
			id = 'mobile_highlights_container' + (i+1).toString();
			highlights_heights_mobile[i] = window.getComputedStyle(document.getElementById(id)).height;
			document.getElementById(id).style.height = "0px";
		}

	}, timer);

	/* make highlights visible */
	timer += 1500;
	setTimeout(function () {
		$('#highlights_mobile').css({
			'border'       : 'solid',
			'border-color' : '#adadad',
			'border-width' : '1.5px'
		});
		$('#highlights_title_mobile').css({
			'border'        : 'none',
			'border-bottom' : 'solid',
			'border-color'  : '#adadad',
			'border-width'  : '1.5px'
		});
		document.getElementById("loader_container_mobile").style.display = 'none';
		document.getElementById("highlights_content_mobile").style.visibility = 'visible';
	}, timer);
}


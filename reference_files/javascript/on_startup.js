/******************************************************************************************
 * This file contains the function that performs a number of calculations and CSS manipulations
 * needed to render the page.
 * ****************************************************************************************/

//setup for page calculations
const ref_items = document.querySelectorAll('.ref_item');
programsHeight = 0;
var isMobile = false;

//Get all highlights
var highlights = document.getElementsByClassName("explanation_and_animation_button_container");
var highlights_mobile = document.getElementsByClassName("mobile_explanation_and_animation_button_container");

//Create universal array of highlights heights
highlights_heights = [];
mobile_highlights_heights = [];

//Loop through all highlights and set highlights heights to 0
for (var i = 0; i < highlights.length; i++) {
	highlights_heights[i] = 0;
	mobile_highlights_heights[i] = 0;
}

//Determine whether to initialize desktop or mobile page
//Wait until page is fully loaded
var displayWidth = window.innerWidth;
$(document).ready(function(){
	desktop_or_mobile_intialize();
});

//Handle screen resize events
var windowWidth = $(window).width();
$(window).on('resize', function() {
	if ($(this).width() !== windowWidth) {
    	windowWidth = $(this).width();
    	prepare_resize();
  	}
});

function prepare_resize(){
	// Hide highlights, show loader
	$('#loader_container').css('display', 'block');
	$('#highlights_content').css('visibility', 'hidden');
	$('#programs').css('visibility', 'hidden');

	// Adjust borders
	$('#highlights').css('border', 'none');
	$('#highlights_title').css({
		'border'        : 'solid',
		'border-color'  : '#adadad',
		'border-width'  : '1.5px'
	});

	//Expand highlights & programs
	$('.explanation_and_animation_button_container').css('height', '100%');
	$('#programs').css('height', '100%');

	//run the inititalization function
	desktop_or_mobile_intialize();
}

function desktop_or_mobile_intialize(){
	if(displayWidth < 900){
		initialize_mobile_page();
		isMobile = true; //this is used by the functions that open the highlights when clicked
	}
	else{
		initialize_page();
		isMobile = false;
	}
}

function initialize_page(){
	//calculate programs height and set to zero
	programsHeight = window.getComputedStyle(document.getElementById('programs')).height;
	document.getElementById("programs").style.height = "0px";

	//calculate the heights of each of the highlights and then set each to zero
	for (var i = 0; i < highlights_heights.length; i++) {
		id = 'highlights_container' + (i+1).toString();
		highlights_heights[i] = window.getComputedStyle(document.getElementById(id)).height;
		document.getElementById(id).style.height = "0px";
	}

	//make highlights and programs visible, set highlights & programs transition time to .5s ease
	setTimeout(function () {
		$('.explanation_and_animation_button_container').css('transition', 'height .5s ease');
		$('.programs').css('transition', 'height .5s ease');
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
		$('#loader_container').css('display', 'none');
		$('#highlights_content').css('visibility', 'visible');
		$('#programs').css('visibility', 'visible');
	}, 0);
}

function initialize_mobile_page(){
	// calculate highlights heights, and then set to zero
	for (var i = 0; i < highlights_heights.length; i++) {
		id = 'mobile_highlights_container' + (i+1).toString();
		mobile_highlights_heights[i] = window.getComputedStyle(document.getElementById(id)).height;
		document.getElementById(id).style.height = "0px";
	}

	// make highlights visible
	setTimeout(function () {
		$('.mobile_explanation_and_animation_button_container').css('transition', 'height .5s ease');
		$('#mobile_highlights').css({
			'border'       : 'solid',
			'border-color' : '#adadad',
			'border-width' : '1.5px'
		});
		$('#mobile_highlights_title').css({
			'border'        : 'none',
			'border-bottom' : 'solid',
			'border-color'  : '#adadad',
			'border-width'  : '1.5px'
		});
		$('#mobile_loader_container').css('display', 'none');
		$('#mobile_highlights_content').css('visibility', 'visible');
	}, 100);
}

/** Dark Mode **/
// Check for dark mode
/**
$(document).ready(function(){
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
	if (prefersDarkScheme.matches) {
	  $('body').addClass('dark-mode');
	} else {
	  $('body').removeClass('dark-mode');
	}
});
**/


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
var appendices = document.getElementsByClassName("appendix");

//Create universal array of highlights heights
highlights_heights = [];
mobile_highlights_heights = [];
appendix_heights = new Object();

//Loop through all highlights and set highlights heights to 0
for (var i = 0; i < highlights.length; i++) {
	highlights_heights[i] = 0;
	mobile_highlights_heights[i] = 0;
}

//Determine whether to initialize desktop or mobile page
//Wait until page is fully loaded
var displayWidth = window.innerWidth;
$(document).ready(function(){
	desktop_or_mobile_intialize(); // Kept as a separate function because the function is needed for window resize events
});

//Handle screen resize events
var windowWidth = $(window).width();
$(window).on('resize', function() {
	if ($(this).width() !== windowWidth) {
    	windowWidth = $(this).width();
    	prepare_resize();
  	}
});

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

	//calculate the heights of each of the appendices and then set each to zero
	for (var i = 0; i < appendices.length; i++) {
		appendix_id = 'appendix' + (i+1).toString();
		appendix_heights[appendix_id] = window.getComputedStyle(document.getElementById(appendix_id)).height;
		document.getElementById(appendix_id).style.height = "0px";
	}

	//make highlights and programs visible, set highlights & programs height transition time to .5s ease
	setTimeout(function () {
		// Allow smooth height transitions for programs container and highlights
		$('.explanation_and_animation_button_container, .programs, .appendix').css('transition', 'height .5s ease');

		// Adjust the borders of the highlights container
		$('.highlights').css({
			'border'        : 'solid',
		});
		$('.highlights_title').css({
			'border'        : 'none',
			'border-bottom' : 'solid',
		});

		// Remove the loader and make the content visible
		$('#loader_container').css('display', 'none');
		$('#highlights_content').css('visibility', 'visible');
		$('#programs').css('visibility', 'visible');
	}, 50);

	/*
	setTimeout(function () {
		$('.highlights').css({'transition' : 'border 1s ease'});
	}, 100);
	*/
}

function initialize_mobile_page(){
	// calculate highlights heights, and then set to zero
	for (var i = 0; i < highlights_heights.length; i++) {
		id = 'mobile_highlights_container' + (i+1).toString();
		mobile_highlights_heights[i] = window.getComputedStyle(document.getElementById(id)).height;
		document.getElementById(id).style.height = "0px";
	}

	//calculate the heights of each of the appendices and then set each to zero
	for (var i = 0; i < appendices.length; i++) {
		appendix_id = 'appendix' + (i+1).toString();
		appendix_heights[appendix_id] = window.getComputedStyle(document.getElementById(appendix_id)).height;
		document.getElementById(appendix_id).style.height = "0px";
	}

	// make highlights visible
	setTimeout(function () {
		// Allow smooth height transitions for the highlights container
		$('.mobile_explanation_and_animation_button_container').css('transition', 'height .5s ease');

		// Adjust the borders of the highlights container
		$('#mobile_highlights').css({
			'border'       : 'solid',
			'border-color' : '#adadad',
			'border-width' : '1.5px'
		});
		$('#mobile_highlights_title').css({
			'border'        : 'none',
			'border-bottom' : 'solid',
		});

		// Remove the loader and make the content visible
		$('#mobile_loader_container').css('display', 'none');
		$('#mobile_highlights_content').css('visibility', 'visible');
	}, 100);
}

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


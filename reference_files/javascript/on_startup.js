/******************************************************************************************
 * This file contains the function that performs a number of calculations and CSS manipulations
 * needed to render the page.
 * ****************************************************************************************/

// Generate reference formatting
const references = document.getElementsByClassName("tooltip");
const notes = document.getElementById("notes_list");
let ref_number = 1;
for(refs of references){
	// generate note at bottom of page
	let note_upper_link  = "<li class='note_item' id='note" + ref_number + "-bottom'><a class='refs' href='#note" + ref_number + "-inline'>^</a> ";
	let note_bottom_link = "";
	if(typeof refs.dataset.ref_name !== 'undefined'){
		note_bottom_link = "<a href='#" + refs.dataset.ref_link + "' onclick='highlight_ref(&quot;" + refs.dataset.ref_link + "&quot;)'>" + refs.dataset.ref_name + "</a></li>";
	}
	else if(typeof refs.dataset.ref_long_text !== 'undefined'){
		note_bottom_link = refs.dataset.ref_long_text + '</li>';
	}
	let full_note = note_upper_link + note_bottom_link;
	$(notes).append(full_note);

	// set attributes of in-line citation
	refs.id = "note" + ref_number + "-inline";
	let onclick_attribute = "highlight_note('note" + ref_number + "-bottom')";
	refs.firstChild.setAttribute('onclick', onclick_attribute);
	refs.firstChild.innerHTML = '<sup>[' + ref_number + ']</sup>';
	ref_number++;
}

//setup for page calculations
programsHeight = 0;
billsHeight = 0;
var isMobile = false;

//Get all highlights
var highlights = document.getElementsByClassName("explanation_and_animation_button_container");
var highlights_mobile = document.getElementsByClassName("mobile_explanation_and_animation_button_container");
var appendices = document.getElementsByClassName("appendix");

//Create universal array of highlights & appendix heights
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
	set_transition_settings(); // Transitions must be set at 0s initially or when the page is first loaded (i.e. CSS is not cached) it initially loads the wrong colors then very visibly transtions to the correct colors
});

//Handle screen resize events
//var windowWidth = $(window).width();
$(window).on('resize', function() {
	if ($(this).width() !== displayWidth) {
    	displayWidth = $(this).width();

    	if(displayWidth < 900){
    		mobile_prepare_resize();
    	}
    	else{
    		desktop_prepare_resize();
    	}
  	}
});

//Determine whether to use the desktop or mobile page initialization function
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

//Desktop page initialization function
function initialize_page(){
	//calculate programs height and set to zero
	programsHeight = window.getComputedStyle(document.getElementById('programs')).height;
	document.getElementById("programs").style.height = "0px";

	//calculate bills height and set to zero
	billsHeight = window.getComputedStyle(document.getElementById('bills')).height;
	document.getElementById("bills").style.height = "0px";

	//calculate the heights of each of the highlights and then set each to zero
	for (var i = 0; i < highlights_heights.length; i++) {
		id = 'highlights_container' + (i+1).toString();
		highlights_heights[i] = window.getComputedStyle(document.getElementById(id)).height;
		document.getElementById(id).style.height = "0px";
	}

	//calculate the heights of each of the appendices and then set each to zero, unless the appendix is already open, in which case set to new height
	for (var i = 0; i < appendices.length; i++) {
		appendix_id = 'appendix' + (i+1).toString();
		appendix_heights[appendix_id] = window.getComputedStyle(document.getElementById(appendix_id)).height;
		if(is_open[appendix_id]){
			document.getElementById(appendix_id).style.height = appendix_heights[appendix_id];
		}
		else{
			document.getElementById(appendix_id).style.height = "0px";
		}
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
		$('#highlights_content, #programs, #bills').css('visibility', 'visible');
	}, 50);
}

//Mobile page initialization function
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
		if(is_open[appendix_id]){
			document.getElementById(appendix_id).style.height = appendix_heights[appendix_id];
		}
		else{
			document.getElementById(appendix_id).style.height = "0px";
		}
	}

	// make highlights visible
	setTimeout(function () {
		// Allow smooth height transitions for the highlights container
		$('.mobile_explanation_and_animation_button_container, .appendix').css('transition', 'height .5s ease');

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

//Prepare for desktop resize: show loader, hide & expand highlights and programs, then re-initialize
function desktop_prepare_resize(){
	// Hide highlights, show loader
	$('#loader_container').css('display', 'block');
	$('#highlights_content').css('visibility', 'hidden');
	$('#programs, #bills').css('visibility', 'hidden');

	// Adjust borders
	$('#highlights').css('border', 'none');
	$('#highlights_title').css({
		'border'        : 'solid',
		'border-color'  : '#adadad',
		'border-width'  : '1.5px'
	});

	//Expand highlights, programs, and appendices
	$('.explanation_and_animation_button_container').css('height', '100%');
	$('#programs, #bills').css('height', '100%');
	for (var i = 0; i < appendices.length; i++) {
		appendix_id = 'appendix' + (i+1).toString();
		document.getElementById(appendix_id).style.height = "100%";
	}

	//run the inititalization function
	desktop_or_mobile_intialize();
}

//Prepare for mobile resize: show loader, hide & expand mobile highlights, then re-initialize
function mobile_prepare_resize(){
	//Expand highlights & appendices
	$('.mobile_explanation_and_animation_button_container').css('height', '100%');
	for (var i = 0; i < appendices.length; i++) {
		appendix_id = 'appendix' + (i+1).toString();
		document.getElementById(appendix_id).style.height = "100%";
	}

	//run the inititalization function
	desktop_or_mobile_intialize();
}

// Set transition settings for user change of light/sepia/dark mode
function set_transition_settings(){
	$('body, select, .page_color_toggler, a.sidebar_links, .other_pages a').css('transition', 'background-color 1s ease, color 1s ease');
	$('.chart, .chart_wide, .highlights').css('transition', 'border-color 1s ease');
	$('.center_explanation_box').css('transition', 'background-color 1s ease, border-color 1s ease, height 1s ease');
	$('.slider').css('transition', 'background-color 1s ease, border-color 1s ease');
	$('#logo-span1, #logo-span2').css('transition', 'fill 1s ease-out');
	$('.logo-color').css('transition', 'fill 1s ease, stroke 1s ease');

	// 15s transitions
	$('.social_icon, .st1').css('transition', 'fill .15s ease');
	$('button').css('transition', 'background-color .1s ease');
}


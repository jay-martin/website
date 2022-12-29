/******************************************************************************************
 * This file contains the functions that 
 * (1) Adjust the position of the left sidebar
 * (2) Adjust the color of the Twitter & Substack icons by author name
 * (3) Expands the mobile dropdown,
 * (4) Highlights a reference when an in-line citation from the notes section is clicked
 * (5) Expands and collapses the list of programs in the page list
 * (6) Open and close highlights
 * ****************************************************************************************/

/******************************** Left sidebar **********************************/
var fixedElement = document.querySelector('.left_side_bar');
var displayHeight = $(window).innerHeight();
var scrollThreshold = 1.075 * displayHeight;
var isExpanded = false;

// Changing the eligibility status container to position:fixed after a certain amount of scroll is only needed for desktop
if(displayWidth > 900){

  window.addEventListener('scroll', function() {

    // Check if the user has scrolled down the page by the scroll threshold
    if (window.pageYOffset >= scrollThreshold) {
      // Set the position property of the .fixed element to fixed
      fixedElement.style.position = 'fixed';
      fixedElement.style.marginTop = '10vh';
    }
    // If the user has not scrolled down the page by the scroll threshold
    else {
      // Set the position property of the fixed element to absolute
      fixedElement.style.position = 'absolute';
      fixedElement.style.marginTop = '118vh';
    }
  });
}

/******************************** Twitter & Substack Icons **********************************/
function switch_icon(id_current, id_new){
	document.getElementById(id_current).style.display = 'none';
	document.getElementById(id_new).style.display = 'inline-block';
}

function text_color(id, color){
	document.getElementById(id).style.color = color;
}

/******************************** Mobile Dropdown *********************************/
$(document).ready(function(){
	$('#navigation_bar_button').click(function(){
		$(this).toggleClass('open');
		reveal_dropdown();
	});
});

navbarClicked = false;
function reveal_dropdown(){
  if(navbarClicked === false){
  	// remove navbar bottom border
  	$('.mobile_navbar').css('border-bottom','none');

    // dropdown animation
    $('#mobile_dropdown').removeClass('collapse_dropdown');
    $('#mobile_dropdown').addClass('reveal_dropdown');

    $('#mobile_navbar').removeClass('maintain_navbar_position_up');
    $('#mobile_navbar').addClass('maintain_navbar_position_down');
    
    $('body').removeClass('push_up_page');
    $('body').addClass('push_down_page');

    //disable scroll
    document.body.classList.add("stop-scrolling");

    navbarClicked = true;
  }
  else{
    //document.getElementById('mobile_dropdown').style.display = 'none';
    $('#mobile_dropdown').removeClass('reveal_dropdown');
    $('#mobile_dropdown').addClass('collapse_dropdown');
    
    $('#mobile_navbar').removeClass('maintain_navbar_position_down');
    $('#mobile_navbar').addClass('maintain_navbar_position_up');
    
    $('body').removeClass('push_down_page');
    $('body').addClass('push_up_page');

    //enable scroll
    document.body.classList.remove("stop-scrolling");

    navbarClicked = false;
  }
}

/*************************** References Highlighting ******************************/
//Adds a yellow highlight when a reference is selected
function highlight(ref){
	ref_items.forEach(ref_items => {
	  ref_items.style.backgroundColor = 'white';
	});
	document.getElementById(ref).style.backgroundColor = 'yellow';
}

/**************************** Programs *******************************************/
//Shows the list of programs
function show_programs(){
	container = document.getElementById('programs');
	container.style.height = programsHeight;
}

//Hides the list of programs
function hide_programs(){
	container = document.getElementById('programs');
	container.style.height = '0px';
}

/*********************************** Highlights ***********************************/
function show_explanation1(){
	if(isMobile){
		container = document.getElementById('highlights_container1_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container1');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[0];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation2(){
	if(isMobile){
		container = document.getElementById('highlights_container2_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container2');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[1];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation3(){
	if(isMobile){
		container = document.getElementById('highlights_container3_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container3');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[2];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation4(){
	if(isMobile){
		container = document.getElementById('highlights_container4_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container4');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[3];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation5(){
	if(isMobile){
		container = document.getElementById('highlights_container5_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container5');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[4];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation6(){
	if(isMobile){
		container = document.getElementById('highlights_container6_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container6');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[5];
		/* This is the bottom button: the bottom border needs to be straightened out after expanding */
		document.getElementById('bottom_button').style.borderBottomRightRadius = '0px';
		document.getElementById('bottom_button').style.borderBottomLeftRadius = '0px';
	}
	else{
		container.style.height = '0px';
		/* This is the bottom button: the bottom border edges need to be smoothed out after contracting */
		document.getElementById('bottom_button').style.borderBottomRightRadius = '5px';
		document.getElementById('bottom_button').style.borderBottomLeftRadius = '5px';
	}
}

function show_explanation7(){
	if(isMobile){
		container = document.getElementById('highlights_container7_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container7');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[4];
	}
	else{
		container.style.height = '0px';
	}
}

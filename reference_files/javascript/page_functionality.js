/******************************************************************************************
 * This file contains the functions that 
 * (1) Adjust the position of the share buttons
 * (2) Expands the mobile dropdown, and
 * (3) Open and close highlights
 * ****************************************************************************************/

/********************************Share Buttons*******************************((**/
var fixedElement = document.querySelector('.share_buttons_container');
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

/********************************Mobile Dropdown*********************************/
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
    
    navbarClicked = true;

    //switch menu icon to x icon
    document.getElementById('open_icon').style.display = 'none';
    document.getElementById('close_icon').style.display = 'inline-block';

    //disable scroll
    //document.body.classList.add("stop-scrolling");
  }
  else{
    //document.getElementById('mobile_dropdown').style.display = 'none';
    $('#mobile_dropdown').removeClass('reveal_dropdown');
    $('#mobile_dropdown').addClass('collapse_dropdown');
    
    $('#mobile_navbar').removeClass('maintain_navbar_position_down');
    $('#mobile_navbar').addClass('maintain_navbar_position_up');
    
    $('body').removeClass('push_down_page');
    $('body').addClass('push_up_page');

    navbarClicked = false;

    //switch menu icon to x icon
    document.getElementById('close_icon').style.display = 'none';
    document.getElementById('open_icon').style.display = 'inline-block';

    //enable scroll
    //document.body.classList.remove("stop-scrolling");
  }
}
/***********************************Highlights***********************************/
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

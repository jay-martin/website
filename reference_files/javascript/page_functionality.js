/******************************************************************************************
 * This file contains the functions that 
 * (1) Toggles between light, sepia, and dark modes
 * (2) Adjust the position of the left sidebar
 * (3) Adjust the color of the Twitter & Substack icons by author name
 * (4) Expands the mobile dropdown,
 * (5) Highlights a reference when an in-line citation from the notes section is clicked
 * (6) Expands and collapses the list of programs in the page list
 * (7) Open and close highlights
 * (8) Open and close chart notes
 * ****************************************************************************************/

// Current page style ('light', 'sepia', or 'dark')
pageStyle = 'light';

/******************************** Page color toggle ******************************/
var isFirstToggle = true;

/** Controls toggling between light, sepia, and dark modes
 ** Animates the toggle
 * @param {string} - the current position of the toggle ('left', 'center', or 'right')
 * */
function toggle_page_color(position){
  if(isFirstToggle){
    $('#page_color_toggler').removeClass('toggle_default_position');
    isFirstToggle = false;
  }

  if(position === 'right'){
    $('#page_color_toggler').removeClass('toggle_left');
    $('#page_color_toggler').removeClass('toggle_center');
    $('#page_color_toggler').addClass('toggle_right');

    load_dark();
  }
  else if(position === 'center'){
    $('#page_color_toggler').removeClass('toggle_right');
    $('#page_color_toggler').removeClass('toggle_left');
    $('#page_color_toggler').addClass('toggle_center');

    load_sepia();
  }
  else if(position === 'left'){
    $('#page_color_toggler').removeClass('toggle_right');
    $('#page_color_toggler').removeClass('toggle_center');
    $('#page_color_toggler').addClass('toggle_left');

    load_white();
  }
}

// Loads light mode
function load_white(){
  pageStyle = 'light';

  $('body, button, select, .programs_container').css('background-color', 'white');
  $('body, button, select, a.sidebar_links, .other_pages a').css('color', 'black');
  $('.page_bottom').css('color', '#858585');
  $('.center_explanation_box').css('background-color', '#f5f3f2');

  $('.social_icon').css('transition', 'fill 1s ease-out');
  $('.social_icon').css('fill', 'black');
  $('path.st1').css('fill', '#ffffff');
  $('#twitter_bottom_svg, #substack_bottom_svg').css('fill', '#858585');
  setTimeout(function(){
    $('.social_icon').css('transition', 'fill .15s ease-out');
  }, 1000);
}

// Loads sepia mode
function load_sepia(){
  pageStyle = 'sepia';

  $('body, button, select, .programs_container').css('background-color', '#fff5e6');
  $('body, button, select, a.sidebar_links, .other_pages a').css('color', 'black');
  $('.page_bottom').css('color', '#858585');
  $('.center_explanation_box').css('background-color', '#f7f0e6');

  $('.social_icon').css('transition', 'fill 1s ease-out');
  $('.social_icon').css('fill', 'black');
  $('path.st1').css('fill', '#fff5e6');
  $('#twitter_bottom_svg, #substack_bottom_svg').css('fill', '#858585');
  setTimeout(function(){
    $('.social_icon').css('transition', 'fill .15s ease-out');
  }, 1000);

  //first: #fff1dc
  //lighter: #fff5e6
}

// Loads dark mode
function load_dark(){
  pageStyle = 'dark';

  $('body, button, select, .programs_container').css('background-color', '#242424');
  $('body, button, select, a.sidebar_links, .other_pages a, .page_bottom').css('color', '#dbdbdb');
  $('.center_explanation_box').css('background-color', '#141414');

  $('.social_icon').css('transition', 'fill 1s ease-out');
  $('.social_icon').css('fill', '#dbdbdb');
  $('path.st1').css('fill', '#000000');
  setTimeout(function(){
    $('.social_icon').css('transition', 'fill .15s ease-out');
  }, 1000);
}

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
twitterBlue = '#1D9BF0';
facebookBlue = '#1778F2';
substackOrange = '#ff6700';
redditOrange = '#FF5700'

/** Changes a social media icon its brand color
 * @param {string} - the platform ('twitter', 'substack', 'facebook', or 'reddit') the social media icon represents
 * @param {string} - the html id of the svg element to be changed
 * */
function change_social_fill_forward(platform, id){
  if(platform == 'twitter'){
    change_svg_fill(id, twitterBlue);
  }
  else if(platform == 'substack'){
   change_svg_fill(id, substackOrange);
  }
  else if(platform == 'facebook'){
    change_svg_fill(id, facebookBlue);
  }
  else if(platform == 'reddit'){
    change_svg_fill(id, redditOrange);
  }
}

/** Changes a social media icon back to its original color (black for light & sepia modes, #dbdbdb for dark mode)
 * @param {string} - the html id of the svg element to be changed
 * */
function change_social_fill_backward(id){
  if(pageStyle == 'light' || pageStyle == 'sepia'){
    change_svg_fill(id, 'black');
  }
  else if(pageStyle == 'dark'){
    change_svg_fill(id, '#dbdbdb');
  }
}

/** Changes the social media icons at the bottom of the page back to their original color (#858585 for light & sepia modes, #dbdbdb for dark mode)
 * @param {string} - the html id of the svg element to be changed
 * */
function page_bottom_change_social_fill_backward(id){
  if(pageStyle == 'light' || pageStyle == 'sepia'){
    change_svg_fill(id, '#858585');
  }
  else if(pageStyle == 'dark'){
    change_svg_fill(id, '#dbdbdb');
  }
}

/** Adjusts the fill of an svg image
 * @param {string} - the html id of the svg element to be changed
 * @param {string} - hex code of the color that the svg fill is changed to
 * */
function change_svg_fill(id, newColor){
  $(id).css('fill', newColor);
}

/** Sets the display of one element to none & another element to inline-block
 *  Intended to be used to switch out two elements that are in the same place and only one of which is shown at a time
 * @param {string} - the html id of the element to be removed
 * @param {string} - the html id of the element to be displayed
 * */
function switch_icon(idCurrent, idNew){
	document.getElementById(idCurrent).style.display = 'none';
	document.getElementById(idNew).style.display = 'inline-block';
}

/** Changes the text color of an html element
 * @param {string} - the html id of the div to be changed
 * @param {string} - hex code of the color that the text is changed to
 * */
function text_color(id, color){
	document.getElementById(id).style.color = color;
}

/******************************** Mobile Dropdown *********************************/
// Listens for when the user presses the menu icon and then triggers reveal_dropdown()
$(document).ready(function(){
	$('#navigation_bar_button').click(function(){
		$(this).toggleClass('open');
		reveal_dropdown();
	});
});

// Used to keep track of whether the dropdown is currently open or currently closes
navbarClicked = false;

// Opens and closes the dropdown menu
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
/** Adds a yellow highlight when the user clicks in inline-citation
 * @param {string} - the html id of the reference to be highlighted
 * */
function highlight_ref(ref){
	ref_items.forEach(ref_items => {
	  ref_items.style.backgroundColor = 'white';
	});
	document.getElementById(ref).style.backgroundColor = 'yellow';
}

/**************************** Programs *******************************************/
//Shows the list of programs
function show_programs(){
	document.getElementById('programs').style.height = programsHeight;
}

//Hides the list of programs
function hide_programs(){
	document.getElementById('programs').style.height = '0px';
}

/*********************************** Highlights ***********************************/
/** Opens and closes highlight boxes
 * @param {string} - the html id of the highlight to be opened/closed
 * */
function show_explanation(identifier){
	if(isMobile){ 
		heights = mobile_highlights_heights;
		highlight = document.getElementById('mobile_highlights_container' + identifier);
	}
	else{ 
		heights = highlights_heights; 
		highlight = document.getElementById('highlights_container' + identifier);
	}

	height = window.getComputedStyle(highlight).height;
	if(height === '0px'){
		highlight.style.height = heights[parseInt(identifier) - 1];
	}
	else{
		highlight.style.height = '0px';
	}
}

/*********************************** Chart Notes ***********************************/
var chartNotes = new Object(); //dictionary to keep track of which chart notes are open

/** Opens and closes the notes section below a chart
 * @param {string} - the html id of the notes section to be opened
 * */
function open_and_close_chart_notes(chartID){
  if(chartNotes[chartID] === 'open'){
    chartNotes[chartID] = 'closed';
    document.getElementById(chartID).hidden = true;
    document.getElementById(chartID + '_button').innerHTML = 'View Chart Notes';
  }
  else{
    chartNotes[chartID] = 'open';
    document.getElementById(chartID).hidden = false;
    document.getElementById(chartID + '_button').innerHTML = 'Close Chart Notes';
  }
}



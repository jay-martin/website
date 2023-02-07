/******************************************************************************************
 * This file contains the functions that 
 * (1) Toggles between light, sepia, and dark modes
 * (2) Adjust the position of the left sidebar on scroll
 * (3) Adjust the color of social media icons
 * (4) Expands the mobile dropdown
 * (5) Highlights a reference or note when a citation is clicked
 * (6) Expands and collapses the list of programs/bills in the page list
 * (7) Opens and closes the top chart highlights
 * (8) Opens and closes appendix sections
 * (9) Opens and closes chart notes
 * (10) Opens and closed center explanation box breakdowns
 * (11) Hides the inputs and outputs of charts
 * (12) Tooltip functionality
 * ****************************************************************************************/
// Current page style ('light', 'sepia', or 'dark')
pageStyle = 'light';
var is_open = new Object(); //dictionary to keep track of states of elements that open and close

/******************************** 1. Page color toggle ******************************/
/** Controls toggling between light, sepia, and dark modes
 * @param {string} - the mode the user selects ('light', 'sepia', or 'dark')
 * */
function toggle_page_color(mode){
  // buttons and social icons are by default set to transition in .15s
  $('.social_icon').css('transition', 'fill 1s ease');
  $('button, .small_button, input[type=submit].animation_button, input[type=submit].end_animation').css('transition', 'background-color 1s ease');
  $('.mobile_dropdown').css('transition', 'all 1s ease');

  if(mode === 'dark'){
    pageStyle = 'dark';
    document.body.className = 'dark-mode';

    // Page specific changes
    page_color_mode('dark');

    // Change browser default rendering to dark
    setTimeout(function(){
      document.querySelector('meta[name="color-scheme"]').setAttribute('content',  'dark');
    }, 200);
  }
  else if(mode === 'sepia'){
    pageStyle = 'sepia';
    document.body.className = 'sepia';

    // Page specific changes
    page_color_mode('sepia');

    // Change browser default rendering to light
    setTimeout(function(){
      document.querySelector('meta[name="color-scheme"]').setAttribute('content',  'light');
    }, 200);
  }
  else if(mode === 'light'){
    pageStyle = 'light';
    document.body.className = 'light-mode';

    // Page specific changes
    page_color_mode('light');

    // Change browser default rendering to light
    setTimeout(function(){
      document.querySelector('meta[name="color-scheme"]').setAttribute('content',  'light');
    }, 200);
  }

  //reset social icon transition speed
  setTimeout( function(){
    $('.social_icon').css('transition', 'fill .15s ease');
    $('button, .small_button, input[type=submit].animation_button, input[type=submit].end_animation').css('transition', 'background-color .1s ease');
    $('.mobile_dropdown').css('transition', 'all 0s');
  }, 1000);
}

function mobile_page_toggle(){
  document.body.style.marginTop = '100vh';
}

/******************************** 2. Left sidebar **********************************/
var fixedElement = document.querySelector('.left_side_bar');
var displayHeight = $(window).innerHeight();
var scrollThreshold = 1.3 * displayHeight;
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
      fixedElement.style.marginTop = '140vh';
    }
  });
}

/******************************** 3. Social Icons **********************************/
twitterBlue = '#1D9BF0';
facebookBlue = '#1778F2';
substackOrange = '#ff6700';
redditOrange = '#FF5700'

/** Changes a social media icon its brand color
 * @param {string} - the platform ('twitter', 'substack', 'facebook', or 'reddit') the social media icon represents
 * @param {string} - the html id of the svg element to be changed
 * */
function change_social_fill_forward(platform, id){
  // No color change on mobile devices and tablets
  if(displayWidth < 900){
    return;
  }

  path = id + '_path';
  if(platform == 'twitter'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('twitter-blue');
    $(path).removeClass('st1').addClass('white-fill');
  }
  else if(platform == 'substack'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('substack-orange');
  }
  else if(platform == 'facebook'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('facebook-blue');
    $(path).removeClass('st1').addClass('white-fill');
  }
  else if(platform == 'linkedin'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('linkedin-blue');
    $(path).removeClass('st1').addClass('white-fill');
  }
  else if(platform == 'reddit'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('reddit-orange');
    $(path).removeClass('st1').addClass('white-fill');
  }
}

/** Changes a social media icon back to its original color (black for light & sepia modes, #dbdbdb for dark mode)
 * @param {string} - the html id of the svg element to be changed
 * */
function change_social_fill_backward(id){
  path = id + '_path';
  $(id).removeClass('twitter-blue').removeClass('facebook-blue').removeClass('linkedin-blue').removeClass('reddit-orange').removeClass('substack-orange').addClass('social-base-color');
  $(path).removeClass('white-fill').addClass('st1');
}

/** Changes the social media icons at the bottom of the page back to their original color (#858585 for light & sepia modes, #dbdbdb for dark mode)
 * @param {string} - the html id of the svg element to be changed
 * */
function page_bottom_change_social_fill_backward(id){
  $(id).removeClass('twitter-blue').removeClass('facebook-blue').removeClass('reddit-orange').removeClass('substack-orange').addClass('social-page-bottom-base-color');
}

/** UNUSED: Adjusts the fill of an svg image
 * @param {string} - the html id of the svg element to be changed
 * @param {string} - hex code of the color that the svg fill is changed to
 * */
function change_svg_fill(id, newColor){
  $(id).css('fill', newColor);
}

/** UNUSED: Sets the display of one element to none & another element to inline-block
 *  Intended to be used to switch out two elements that are in the same place and only one of which is shown at a time
 * @param {string} - the html id of the element to be removed
 * @param {string} - the html id of the element to be displayed
 * */
function switch_icon(idCurrent, idNew){
	document.getElementById(idCurrent).style.display = 'none';
	document.getElementById(idNew).style.display = 'inline-block';
}

/** BELIEVED UNUSED (not completley sure): Changes the text color of an html element
 * @param {string} - the html id of the div to be changed
 * @param {string} - hex code of the color that the text is changed to
 * */
function text_color(id, color){
	document.getElementById(id).style.color = color;
}

/******************************** 4. Mobile Dropdown *********************************/
// Listens for when the user presses the menu icon and then triggers reveal_dropdown()
$(document).ready(function(){
	$('#navigation_bar_button').click(function(){
		$(this).toggleClass('open');
		reveal_dropdown();
	});
});

// Used to keep track of whether the dropdown is currently open or currently closes
navbarClicked = false;

// Opens and closes the dropdown menu when the open/close icon is clicked
function reveal_dropdown(){
  // Opens the dropdown menu
  if(navbarClicked === false){
    
    // dropdown reveal animation
    $('#mobile_dropdown').removeClass('collapse_dropdown');
    $('#mobile_dropdown').addClass('reveal_dropdown');

    // Maintain page position of mobile navbar
    $('#mobile_navbar').removeClass('maintain_navbar_position_up');
    $('#mobile_navbar').addClass('maintain_navbar_position_down');
    
    // Push down page with the dropdown menu animation
    $('body').removeClass('push_up_page');
    $('body').addClass('push_down_page');

    //disable scroll
    //document.body.classList.add("stop-scrolling");

    navbarClicked = true;
  }
  // Closes the dropdown menu
  else{
    // dropdown close animation
    $('#mobile_dropdown').removeClass('reveal_dropdown');
    $('#mobile_dropdown').addClass('collapse_dropdown');
    
    // Maintain page position of mobile navbar
    $('#mobile_navbar').removeClass('maintain_navbar_position_down');
    $('#mobile_navbar').addClass('maintain_navbar_position_up');
    
    // Page pulls up with the dropdown menu animation
    $('body').removeClass('push_down_page');
    $('body').addClass('push_up_page');

    //enable scroll
    //document.body.classList.remove("stop-scrolling");

    navbarClicked = false;
  }
}

// Closes the dropdown menu when a "Go To Page Section" link is clicked
function close_dropdown(){
  // Set scroll behavior to auto so that the correct portion of the page will be underneath the dropdown without any delay
  $('html').css('scroll-behavior', 'auto');

  // Change icon to open
  $('#navigation_bar_button').toggleClass('open');

  // Collapse the dropdown menu
  reveal_dropdown();

  // Reset scroll behavior to smooth
  setTimeout(function(){
    $('html').css('scroll-behavior', 'smooth');
  }, 100);
}

/*************************** 5. References/Notes Highlighting ******************************/
const ref_items = document.querySelectorAll('.ref_item');
const note_items = document.querySelectorAll('.note_item');

/** Adds a yellow highlight to a reference
 * @param {string} - the html id of the reference to be highlighted
 * */
function highlight_ref(ref){
  // Clear any references highlight
  ref_items.forEach(ref_items => {
    ref_items.classList.remove('highlighted');
  });

  // Add highlight to selected reference
  document.getElementById(ref).classList.add('highlighted');
}

/** Adds a yellow highlight to a note
 * @param {string} - the html id of the note to be highlighted
 * */
function highlight_note(note){
  // Clear any existing notes highlight
  note_items.forEach(note_items => {
    note_items.classList.remove('highlighted');
  });

  // Clear any existing references highlight
  ref_items.forEach(ref_items => {
    ref_items.classList.remove('highlighted');
  });

  // Add highlight to selected note
  document.getElementById(note).classList.add('highlighted');
}

/**************************** 6. Programs & Bills Dropdown *******************************************/
// no scroll while page is loading
$(document).ready(function(){

  //Show the list of programs
  $('#programs_title').mouseover(function(){
    document.getElementById('programs').style.height = programsHeight;
  });

  //Hide the list of programs
  $('#programs_container').mouseleave(function(){
    document.getElementById('programs').style.height = '0px';
  });

  //Shows the list of bills
  $('#bills_title').mouseover(function(){
    document.getElementById('bills').style.height = billsHeight;
  });

  //Hide the list of bills
  $('#bills_container').mouseleave(function(){
    document.getElementById('bills').style.height = '0px';
  });

  //For tablets: Show/Hide programs on click
  $('#programs_container').click(function(){
    if(document.getElementById('programs').style.height == '0px'){
      document.getElementById('programs').style.height = programsHeight;
    }
    else{
      document.getElementById('programs').style.height = '0px';
    }
  });

  //For tablets: Show/Hide bills on click
  $('#bills_container').click(function(){
    if(document.getElementById('bills').style.height == '0px'){
      document.getElementById('bills').style.height = billsHeight;
    }
    else{
      document.getElementById('bills').style.height = '0px';
    }
  });

});

/*********************************** 7. Open/Close Highlights ***********************************/
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

/*********************************** 8. Open/Close Appendix *********************/
/** Opens and closes the portions of the page
 * @param {string} - the html id of the element that is opened/closed
 * */
function open_and_close_page_portion(appendix_id){
  if(is_open[appendix_id]){
    is_open[appendix_id] = false;
    document.getElementById(appendix_id).style.height = '0px';
  }
  else{
    is_open[appendix_id] = true;
    document.getElementById(appendix_id).style.height = appendix_heights[appendix_id];
  }
}

/** Adjusts the border of the bottom appendix **/
bottom_appendix_isOpen = false;
function adjust_bottom_apendix_border(){
  if(bottom_appendix_isOpen){
    bottom_appendix_isOpen = false;

    setTimeout(function(){
      $('.appendix_button_bottom').css('border-bottom-left-radius', '3.4px');
      $('.appendix_button_bottom').css('border-bottom-right-radius', '3.4px');
    }, 350);
  }
  else{
    bottom_appendix_isOpen = true;
    $('.appendix_button_bottom').css('border-radius', '0px');
  }
}

/** Rotates icon by 180 degrees
 * @param {string} - id of icon to be rotated
 * */
var icon_isRotated = new Object();
function rotate_icon_180(id){
  if(icon_isRotated[id] == 'rotated'){
    $(id).removeClass('rotate180-forwards').addClass('rotate180-back');
    icon_isRotated[id] = 'not-rotated';
  }
  else{
    $(id).removeClass('rotate180-back').addClass('rotate180-forwards');
    icon_isRotated[id] = 'rotated';
  }
}

/*********************************** 9. Open/Close Chart Notes *********************/
/** Opens and closes the notes section below a chart
 * @param {string} - the html id of the notes section to be opened
 * */
function open_and_close_chart_notes(chartID){
  if(is_open[chartID]){
    is_open[chartID] = false;
    document.getElementById(chartID).hidden = true;
    document.getElementById(chartID + '_button').innerHTML = 'View Chart Notes';
  }
  else {
    is_open[chartID] = true;
    document.getElementById(chartID).hidden = false;
    document.getElementById(chartID + '_button').innerHTML = 'Close Chart Notes';
  }
}

/******************************** 10. Open/Close Center Box Breakdown ******************************/
/** Reveals benefits breakdown when the "show all" button is clicked
 * @param {string} - the html id of the breadkdown to be opened
 * */
function open_and_close_breakdown(listID, buttonID){
  // collapse if open
  if(is_open[listID]){
    document.getElementById(buttonID).innerHTML = 'Show all';
    document.getElementById(listID).style.display = 'none';
    is_open[listID] = false;
  }
  // open if closed
  else {
    document.getElementById(buttonID).innerHTML = 'Collapse';
    document.getElementById(listID).style.display = 'block';
    is_open[listID] = true;
  }
}

/******************************** 11. Hide chart Inputs/Outpus ******************************/
function hide_income_and_outputs(chart_name, remove_points, points){
  let is_checked        = eval(chart_name + '_hide_income_switch').checked;
  let chart             = eval(chart_name + '_chart');
  let income            = eval(chart_name + '_income').value;
  let inputs_container  = chart_name + '_inputs_container';
  let outputs_container = chart_name + '_outputs_container';

  if(is_checked){
    document.getElementById(inputs_container).style.display  = 'none';
    document.getElementById(outputs_container).style.display = 'none';
    if(remove_points){
      chart.hide(points);
      chart.xgrids([]);
    }
  }
  else {
    document.getElementById(inputs_container).style.display  = 'block';
    document.getElementById(outputs_container).style.display = 'block';
    if(remove_points){
      chart.show(points);
      chart.xgrids([ {value: income, text: 'Your Income'}]);
    }
  }
}

/******************************** 12. Tooltip onhover/onclick ******************************/
// body needs to triger a click for tooltip:onhover to disable on mobile devices
$('body').click(function(){ });

$('.tooltip').mouseover(function(){ 
  let window_width = $(window).innerWidth();
  let element_position = $(this).offset()['left'];
  let window_remaining = parseFloat(window_width) - parseFloat(element_position);
  
  if(window_remaining < 260){
    $('.tooltip .tooltiptext').css('margin-left', '-265px');
    $('.tooltip .tooltiptext').addClass('tooltip-right');
  }
  else{
    $('.tooltip .tooltiptext').css('margin-left', '-17.5px');
    $('.tooltip .tooltiptext').removeClass('tooltip-right');
  }
});



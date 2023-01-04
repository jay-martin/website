/******************************************************************************************
 * This file contains the functions that 
 * (1) Toggles between light, sepia, and dark modes
 * (2) Adjust the color of the Twitter & Substack icons
 * (3) Opens and closes the top dropdown menus
 * ****************************************************************************************/

/******************************** Page color toggle ******************************/
/** Controls toggling between light, sepia, and dark modes
 * @param {string} - the mode the user selects ('light', 'sepia', or 'dark')
 * */
function toggle_page_color(mode){
  // buttons and social icons are by default set to transition in .15s
  $('.social_icon').css('transition', 'fill 1s ease');
  $('button').css('transition', 'background-color 1s ease');

  if(mode === 'dark'){
    pageStyle = 'dark';
    document.body.className = 'dark-mode';

    // Change browser default rendering to dark
    setTimeout(function(){
      document.querySelector('meta[name="color-scheme"]').setAttribute('content',  'dark');
    }, 200);
  }
  else if(mode === 'sepia'){
    pageStyle = 'sepia';
    document.body.className = 'sepia';

    // Change browser default rendering to light
    setTimeout(function(){
      document.querySelector('meta[name="color-scheme"]').setAttribute('content',  'light');
    }, 200);
  }
  else if(mode === 'light'){
    pageStyle = 'light';
    document.body.className = 'light-mode';

    // Change browser default rendering to light
    setTimeout(function(){
      document.querySelector('meta[name="color-scheme"]').setAttribute('content',  'light');
    }, 200);
  }

  //reset social icon transition speed
  setTimeout( function(){
    $('.social_icon').css('transition', 'fill .15s ease');
    $('button').css('transition', 'background-color .1s ease');
  }, 1000);
}

/********************************Twitter & Substack Icons**********************************/
/** Changes a social media icon its brand color
 * @param {string} - the platform ('twitter', 'substack', 'facebook', or 'reddit') the social media icon represents
 * @param {string} - the html id of the svg element to be changed
 * */
function change_social_fill_forward(platform, id){
  if(platform == 'twitter'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('twitter-blue');
  }
  else if(platform == 'substack'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('substack-orange');
  }
  else if(platform == 'facebook'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('facebook-blue');
  }
  else if(platform == 'reddit'){
    $(id).removeClass('social-base-color').removeClass('social-page-bottom-base-color').addClass('reddit-orange');
  }
}

/** Changes a social media icon back to its original color (black for light & sepia modes, #dbdbdb for dark mode)
 * @param {string} - the html id of the svg element to be changed
 * */
function change_social_fill_backward(id){
  $(id).removeClass('twitter-blue').removeClass('facebook-blue').removeClass('reddit-orange').removeClass('substack-orange').addClass('social-base-color');
}

/** Changes the social media icons at the bottom of the page back to their original color (#858585 for light & sepia modes, #dbdbdb for dark mode)
 * @param {string} - the html id of the svg element to be changed
 * */
function page_bottom_change_social_fill_backward(id){
  $(id).removeClass('twitter-blue').removeClass('facebook-blue').removeClass('reddit-orange').removeClass('substack-orange').addClass('social-page-bottom-base-color');
}

// Changes the text color on an element
function text_color(id, color){
	document.getElementById(id).style.color = color;
}

/********************************Top Menu*************************************************/
var currentExpanded = '';
var closeTimeout = null;

// Controls the opening and closing of the top bar dropdown menus
function dropdown_functionality(menuID){
	if(currentExpanded == menuID && closeTimeout == null){ //Expanded and current dropdown is FULLY open, i.e. click is to close dropdown
		close_dropdown(menuID);
	}
	else if(currentExpanded == menuID){ //Current dropdown is in the process of closing (i.e. closeTimeout !== null) but user has pushed button to open the **same** dropdown again
		reveal_dropdown(menuID);
	}
	else if(currentExpanded !== ''){ //Expanded but a different dropdown is currently open, i.e. click is to switch to a different menu while the dropdown menu is open
		if(closeTimeout == null){ //dropdown is not currently in the process of closing
			switch_dropdown(menuID, currentExpanded);
		}
		else{ //dropdown is currently in the process of closing
			temp = currentExpanded; //currentExpanded gets mixed up when reveal_dropdown is called
			clearTimeout(closeTimeout); // End timeout for display none if the user clicks to reveal dropdown while the dropdown is closing
			closeTimeout = null;
			if(menuID === '#table_container_overview' || menuID === '#table_container_bills'){
				$('.table_container').css('transition', 'height .5s');
				$('.table_container').css('height', '50px');
			}
			else{
				$('.table_container').css('transition', 'height 1s');
				$('.table_container').css('height', '117.5px');
			}

			//switch to new dropdown text after height has been adjusted
			$('.table_container').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
			    $(temp).css('display', 'none');
				$(menuID).css('display', 'block');
			    $('.table_container').css('transition', 'height 1s');
			    $(this).off(e);
			 });
		}
		currentExpanded = menuID;
	}
	else{ // Not expanded, i.e. click is to expand the dropdown menu
		reveal_dropdown(menuID);
		currentExpanded = menuID;
	}
}

// Switches between dropdown menus when one is open and the user clicks a different menu
function switch_dropdown(newID, oldID){
	if( (oldID === '#table_container_overview' || oldID === '#table_container_bills') && (newID === '#table_container_problems' || newID === '#table_container_programs') ){
		$('.table_container').css('height', '117.5px');
		closeTimeout = setTimeout(function () {
			$(oldID).css('display', 'none');
			$(newID).css('display', 'block');
			closeTimeout = null;
		}, 1000);
	}
	else if( (oldID === '#table_container_problems' || oldID === '#table_container_programs') && (newID === '#table_container_overview' || newID === '#table_container_bills') ){
		$('.table_container').css('height', '50px');
		closeTimeout = setTimeout(function () {
			$(oldID).css('display', 'none');
			$(newID).css('display', 'block');
			closeTimeout = null;
		}, 1000);
	}
	else{
		$(oldID).css('display', 'none');
		$(newID).css('display', 'block');
	}
}

// Opens a dropdown menu
function reveal_dropdown(revealID){
	deviceWidth = window.innerWidth;

	clearTimeout(closeTimeout); // End timeout for display none if the user clicks to reveal dropdown while the dropdown is closing
	closeTimeout = null;
	$(revealID).css('display', 'block');

	// For some reason, the animation only moves smoothly if contained in a setTimeout
	setTimeout(function () {
		if(deviceWidth >= 700){
			if(revealID === '#table_container_overview' || revealID === '#table_container_bills'){
				$('.table_container').css('height', '50px');
			}
			else{
				$('.table_container').css('height', '117.5px');
			}
		}
		else{
			if(revealID === '#mobile_table_container_overview' || revealID === '#mobile_table_container_bills'){
				$('.table_container').css('height', '85px');
			}
			else{
				$('.table_container').css('height', '150px');
			}
		}
	}, 0);
}

// Closes a dropdown menu
function close_dropdown(menuID){
	$('.table_container').css('height', '0px');

	// Delay setting display to none until after the height transition has finished
	// Delay setting currentExpanded to '' until dropdown is fully closed; needed in case user clicks a different button while the dropdown is closing
	closeTimeout = setTimeout(function () {
		$('.table_container').css('display', 'none');
		closeTimeout = null;
		currentExpanded = '';
	}, 1000);
}
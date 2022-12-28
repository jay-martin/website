/********************************Twitter & Substack Icons**********************************/
// Used to switch between the black Twitter/Substack icon and the blue/orange Twitter/Substack icon
function switch_icon(id_current, id_new){
	document.getElementById(id_current).style.display = 'none';
	document.getElementById(id_new).style.display = 'inline-block';
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
	clearTimeout(closeTimeout); // End timeout for display none if the user clicks to reveal dropdown while the dropdown is closing
	closeTimeout = null;
	$(revealID).css('display', 'block');
	// For some reason, the animation only moves smoothly if contained in a setTimeout
	setTimeout(function () {
		if(revealID === '#table_container_overview' || revealID === '#table_container_bills'){
			$('.table_container').css('height', '50px');
		}
		else{
			$('.table_container').css('height', '117.5px');
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
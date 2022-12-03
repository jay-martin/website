/******************************************************************************************
 * This file contains the function that performs a number of calculations and css manipulations
 * needed to render the page. It also contains the function that opens and closes the
 * programs dropdown, and the function to highlight references
 * ****************************************************************************************/

const ref_items = document.querySelectorAll('.ref_item');
programsHeight = 0;

//Get all highlights
var highlights = document.getElementsByClassName("explanation_and_animation_button_container");

//Create universal array of highlights heights
highlights_heights = [];

//Loop through all highlights and set highlights heights to 0
for (var i = 0; i < highlights.length; i++) {
	highlights_heights[i] = 0;
}

initialize_page();

function initialize_page(){
	/* keep calculations a secret */
	document.getElementById("highlights_content").style.visibility = 'hidden';
	document.getElementById("programs").style.visibility = 'hidden';
	timer = 200;
	setTimeout(function () {
		/* calculate highlights heights, as well as list of programs height, and then set to zero */
		programsHeight = window.getComputedStyle(document.getElementById('programs')).height;
		document.getElementById("programs").style.height = "0px";

		for (var i = 0; i < highlights_heights.length; i++) {
			num = i+1;
			id = 'highlights_container' + num.toString();
			highlights_heights[i] = window.getComputedStyle(document.getElementById(id)).height;
			document.getElementById(id).style.height = "0px";
		}

	}, timer);

	/* make highlights visible */
	timer += 1000;
	setTimeout(function () {
		document.getElementById("highlights").style.border = 'solid';
		document.getElementById("highlights").style.borderColor = '#adadad';
		document.getElementById("highlights").style.borderWidth = '1.5px';
		document.getElementById("highlights_title").style.border = 'none';
		document.getElementById("highlights_title").style.borderBottom = 'solid';
		document.getElementById("highlights_title").style.borderColor = '#adadad';
		document.getElementById("highlights_title").style.borderWidth = '1.5px';
		document.getElementById("loader_container").style.border = 'none';
		document.getElementById("loader_container").style.display = 'none';
		document.getElementById("highlights_content").style.visibility = 'visible';
		document.getElementById("programs").style.visibility = 'visible';
	}, timer);
}

//Adds a yellow highlight when a reference is selected
function highlight(ref){
	ref_items.forEach(ref_items => {
	  ref_items.style.backgroundColor = 'white';
	});
	document.getElementById(ref).style.backgroundColor = 'yellow';
}

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
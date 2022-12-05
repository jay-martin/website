/******************************************************************************************
 * This file contains the function that performs a number of calculations and css manipulations
 * needed to render the page. It also contains the function that opens and closes the
 * programs dropdown, and the function to highlight references
 * ****************************************************************************************/

const ref_items = document.querySelectorAll('.ref_item');
programsHeight = 0;

initialize_page();

function initialize_page(){
	/* keep calculations a secret */
	document.getElementById("programs").style.visibility = 'hidden';
	timer = 200;
	setTimeout(function () {
		/* calculate programs height, and then set to zero */
		programsHeight = window.getComputedStyle(document.getElementById('programs')).height;
		document.getElementById("programs").style.height = "0px";
	}, timer);

	/* make programs visible */
	timer += 1000;
	setTimeout(function () {
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
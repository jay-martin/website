explanation1Height = 0;
explanation2Height = 0;
explanation3Height = 0;
explanation4Height = 0;

const ref_items = document.querySelectorAll('.ref_item');

initialize_page();

function initialize_page(){
	/* keep calculations a secret */
	document.getElementById("highlights_content").style.visibility = 'hidden';
	
	timer = 200;
	setTimeout(function () {
		/* calculate heights */
		explanation1Height = window.getComputedStyle(document.getElementById('highlights_container1')).height;
		explanation2Height = window.getComputedStyle(document.getElementById('highlights_container2')).height;
		explanation3Height = window.getComputedStyle(document.getElementById('highlights_container3')).height;
		explanation4Height = window.getComputedStyle(document.getElementById('highlights_container4')).height;

		document.getElementById("highlights_container1").style.height = "0px";
		document.getElementById("highlights_container2").style.height = "0px";
		document.getElementById("highlights_container3").style.height = "0px";
		document.getElementById("highlights_container4").style.height = "0px";
	}, timer);

	/* reset transition duration values */
	document.getElementById("highlights_container1").style.transitionDuration = ".5s";
	document.getElementById("highlights_container2").style.transitionDuration = ".5s";
	document.getElementById("highlights_container3").style.transitionDuration = ".5s";
	document.getElementById("highlights_container4").style.transitionDuration = ".5s";

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
	}, timer);
}

function highlight(ref){
	ref_items.forEach(ref_items => {
	  ref_items.style.backgroundColor = 'white';
	});
	document.getElementById(ref).style.backgroundColor = 'yellow';
}
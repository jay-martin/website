explanation1Height = 0;
explanation2Height = 0;
explanation3Height = 0;
explanation4Height = 0;
explanation5Height = 0;
explanation6Height = 0;

initialize_page();

function initialize_page(){
	/* keep calculations a secret */
	document.getElementById("highlights_content").style.visibility = 'hidden';
	
	/* calculate heights */
	explanation1Height = window.getComputedStyle(document.getElementById('highlights_container1')).height;
	explanation2Height = window.getComputedStyle(document.getElementById('highlights_container2')).height;
	explanation3Height = window.getComputedStyle(document.getElementById('highlights_container3')).height;
	explanation4Height = window.getComputedStyle(document.getElementById('highlights_container4')).height;
	explanation5Height = window.getComputedStyle(document.getElementById('highlights_container5')).height;
	explanation6Height = window.getComputedStyle(document.getElementById('highlights_container6')).height;

	document.getElementById("highlights_container1").style.height = "0px";
	document.getElementById("highlights_container2").style.height = "0px";
	document.getElementById("highlights_container3").style.height = "0px";
	document.getElementById("highlights_container4").style.height = "0px";
	document.getElementById("highlights_container5").style.height = "0px";
	document.getElementById("highlights_container6").style.height = "0px";

	/* reset transition duration values */
	document.getElementById("highlights_container1").style.transitionDuration = ".5s";
	document.getElementById("highlights_container2").style.transitionDuration = ".5s";
	document.getElementById("highlights_container3").style.transitionDuration = ".5s";
	document.getElementById("highlights_container4").style.transitionDuration = ".5s";
	document.getElementById("highlights_container5").style.transitionDuration = ".5s";
	document.getElementById("highlights_container6").style.transitionDuration = ".5s";

	/* make highlights visible */
	window.addEventListener("load", function() {
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
	});
	
}
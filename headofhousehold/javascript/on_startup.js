overviewHeight = 0;
poorPeopleHeight = 0;
regressiveHeight = 0;
itemizeHeight = 0;
creditHeight = 0;
mpHeight = 0;

initialize_page();

function initialize_page(){
	/* keep calculations a secret */
	document.getElementById("highlights_content").style.visibility = 'hidden';
	
	timer = 200;
	setTimeout(function () {
		/* calculate heights */
		overviewHeight = window.getComputedStyle(document.getElementById('container_overview')).height;
		poorPeopleHeight = window.getComputedStyle(document.getElementById('container_poor_people')).height;
		regressiveHeight = window.getComputedStyle(document.getElementById('container_regressive')).height;
		itemizeHeight = window.getComputedStyle(document.getElementById('container_itemized')).height;
		creditHeight = window.getComputedStyle(document.getElementById('container_credit')).height;
		mpHeight = window.getComputedStyle(document.getElementById('container_mp')).height;

		console.log("overview: " + overviewHeight);
		console.log("poor people: " + poorPeopleHeight);
		console.log("regressive: " + regressiveHeight);
		console.log("regressive: " + itemizeHeight);
		console.log("regressive: " + creditHeight);
		console.log("regressive: " + mpHeight);

		document.getElementById("container_overview").style.height = "0px";
		document.getElementById("container_poor_people").style.height = "0px";
		document.getElementById("container_regressive").style.height = "0px";
		document.getElementById("container_itemized").style.height = "0px";
		document.getElementById("container_credit").style.height = "0px";
		document.getElementById("container_mp").style.height = "0px";
	}, timer);

	/* reset transition duration values */
	document.getElementById("container_overview").style.transitionDuration = ".5s";
	document.getElementById("container_poor_people").style.transitionDuration = ".5s";
	document.getElementById("container_regressive").style.transitionDuration = ".5s";
	document.getElementById("container_itemized").style.transitionDuration = ".5s";
	document.getElementById("container_credit").style.transitionDuration = ".5s";
	document.getElementById("container_mp").style.transitionDuration = ".5s";

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
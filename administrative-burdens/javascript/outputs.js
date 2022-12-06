// Reveal the next line after the user has submitted input to the current line
function reveal_next_line(nextLine){
	document.getElementById(nextLine).style.display = 'block';
}

function reveal_next_title(nextTitle){
	document.getElementById(nextTitle).style.display = 'block';
}

// Reveal or hide the full form based on user selection of display_dropdown
function display(){
	if(display_dropdown.value === 'default'){
		document.getElementById('application_description').innerHTML = 'Answer the questions below to determine if you are eligible. A new line will appear after you have answered the current line.'
		$('.application_line').css('display', 'none');
		document.getElementById('title1').style.display = 'block';
		document.getElementById('line1a').style.display = 'block';
	}
	else{
		document.getElementById('application_description').innerHTML = 'Answer the questions below to determine if you are eligible. Your eligibility status based on current inputs is displayed in the eligibility box.'
		$('.application_line').css('display', 'block');
	}
}
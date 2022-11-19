income = 0;
itemized = 0;
axisMax = 0;
numberChildren = '';
taxCredit = '';
restoreInputHeight = '';
restoreExplanationsHeight = '';

isClicked = false;
animationOpen = false;

function initialize_animation(){
	console.log("Animation Open?: " + animationOpen);
	if(animationOpen === false){
		initialize_animation_currently_closed()
	}
	else{
		initialize_animation_already_open()
	}
}

function initialize_animation_currently_closed(){

	/* Set to true so that if a play animation button is clicked again it loads properly through the initialize_animation_already_open() function*/
	animationOpen = true;

	/* Assign current user inputs to global variables so the chart and outputs can be restored when animation is ended*/
	income = myRange_HOH.value;
	itemized = myRange_ID.value;
	numberChildren = num_children.value;
	taxCredit = tax_credit_switch.checked;
	axisMax = HOHchart.axis.max();

	/* Reset explanation text color to black */
	document.getElementById('explanation_line1').style.color = 'black';
	document.getElementById('explanation_line2').style.color = 'black';
	document.getElementById('explanation_line3').style.color = 'black';
	document.getElementById('explanation_line4').style.color = 'black';
	document.getElementById('explanation_line5').style.color = 'black';
	document.getElementById('explanation_line6').style.color = 'black';
	document.getElementById('explanation_line7').style.color = 'black';
	document.getElementById('explanation_line8').style.color = 'black';
	document.getElementById('explanation_line9').style.color = 'black';

	/* Disable play animation buttons */
	document.getElementById("basic_overview_animation_id").disabled = true;
	document.getElementById("poor_people_animation").disabled = true;
	document.getElementById("regressive_animation").disabled = true;
	document.getElementById("itemized_explanation_animation_id").disabled = true;
	document.getElementById("tax_credit_animation").disabled = true;
	document.getElementById("marriage_penalty_explanation_animation_id").disabled = true;

	/* Calculate heights of explanation box and input box */
	explanation = document.getElementById('explanation_values_id');
	user_inputs = document.getElementById('user_inputs_id');
	const explanationsHeight = window.getComputedStyle(explanation).height;
	const inputsHeight = window.getComputedStyle(user_inputs).height;
	const totalHeight = parseFloat(explanationsHeight, 10) + parseFloat(inputsHeight, 10);

	/* Save values to restore after end of animation */
	restoreExplanationsHeight = explanationsHeight;
	restoreInputHeight = inputsHeight;

	/* Immediately set inputs height & explanation height to calculated height */
	document.getElementById("user_inputs_id").style.transitionDuration = "0s";
	document.getElementById("user_inputs_id").style.height = inputsHeight;
	document.getElementById('explanation_values_id').style.transitionDuration = "0s";
	document.getElementById('explanation_values_id').style.height = explanationsHeight;

	/* Set transition durations back to 1s */
	document.getElementById("user_inputs_id").style.transitionDuration = "1s";
	document.getElementById('explanation_values_id').style.transitionDuration = "1s";

	/*make end animation button visible */
	document.getElementById('end_animation_button').style.visibility = 'visible';

	timer = 1000;
	setTimeout(function () {
		/* Collapse user inputs */
		document.getElementById("user_inputs_id").style.height = '0px';
		/* Expand explanation values */
		document.getElementById('explanation_values_id').style.height = totalHeight + 'px';
		/* Fade out zoom button */
		document.getElementById('zoom_label').style.color = 'white';
		document.getElementById('zoom_switch').style.visibility = 'hidden';
		HOHchart.xgrids([]);
		/*fade out text*/
		document.getElementById('item_or_stand').style.color = '#f5f3f2';
		document.getElementById('HOH_savings').style.color = '#f5f3f2';
	}, timer);

	timer += 1000;
	setTimeout(function () {
		document.getElementById('zoom_label').style.visibility = 'hidden';
	    /* clear text (currently it has just faded to the background color) */
		document.getElementById('item_or_stand').innerHTML = '';
		document.getElementById('HOH_savings').innerHTML = '';
	}, timer);
}

function initialize_animation_already_open(){

	console.log("In initialize_animation_already_open");

	/* Disable play animation buttons */
	document.getElementById("end_animation_button").disabled = true;
	document.getElementById("basic_overview_animation_id").disabled = true;
	document.getElementById("poor_people_animation").disabled = true;
	document.getElementById("regressive_animation").disabled = true;
	document.getElementById("itemized_explanation_animation_id").disabled = true;
	document.getElementById("tax_credit_animation").disabled = true;
	document.getElementById("marriage_penalty_explanation_animation_id").disabled = true;

	/* fade out text */
	document.getElementById('explanation_line1').style.color = '#f5f3f2';
	document.getElementById('explanation_line2').style.color = '#f5f3f2';
	document.getElementById('explanation_line3').style.color = '#f5f3f2';
	document.getElementById('explanation_line4').style.color = '#f5f3f2';
	document.getElementById('explanation_line5').style.color = '#f5f3f2';
	document.getElementById('explanation_line6').style.color = '#f5f3f2';
	document.getElementById('explanation_line7').style.color = '#f5f3f2';
	document.getElementById('explanation_line8').style.color = '#f5f3f2';
	document.getElementById('explanation_line9').style.color = '#f5f3f2';

	/* clear xgrids and ygrids*/
	HOHchart.xgrids([]);
	HOHchart.ygrids([]);

	timer = 1000;
	setTimeout(function () {
		/* eliminate text */
		document.getElementById('explanation_line1').innerHTML = '';
		document.getElementById('explanation_line2').innerHTML = '';
		document.getElementById('explanation_line3').innerHTML = '';
		document.getElementById('explanation_line4').innerHTML = '';
		document.getElementById('explanation_line5').innerHTML = '';
		document.getElementById('explanation_line6').innerHTML = '';
		document.getElementById('explanation_line7').innerHTML = '';
		document.getElementById('explanation_line8').innerHTML = '';
		document.getElementById('explanation_line9').innerHTML = '';

		/* Reset explanation text color to black */
		document.getElementById('explanation_line1').style.color = 'black';
		document.getElementById('explanation_line2').style.color = 'black';
		document.getElementById('explanation_line3').style.color = 'black';
		document.getElementById('explanation_line4').style.color = 'black';
		document.getElementById('explanation_line5').style.color = 'black';
		document.getElementById('explanation_line6').style.color = 'black';
		document.getElementById('explanation_line7').style.color = 'black';
		document.getElementById('explanation_line8').style.color = 'black';
		document.getElementById('explanation_line9').style.color = 'black';
	}, timer);

}

function end_animation(){
	isClicked = true;
	animationOpen = false;

	/* reset values */
	myRange_HOH.value = income;
	myRange_ID.value = itemized;
	num_children.value = numberChildren;
	tax_credit_switch.checked = taxCredit;

	/* fade out text */
	document.getElementById('explanation_line1').style.color = '#f5f3f2';
	document.getElementById('explanation_line2').style.color = '#f5f3f2';
	document.getElementById('explanation_line3').style.color = '#f5f3f2';
	document.getElementById('explanation_line4').style.color = '#f5f3f2';
	document.getElementById('explanation_line5').style.color = '#f5f3f2';
	document.getElementById('explanation_line6').style.color = '#f5f3f2';
	document.getElementById('explanation_line7').style.color = '#f5f3f2';
	document.getElementById('explanation_line8').style.color = '#f5f3f2';
	document.getElementById('explanation_line9').style.color = '#f5f3f2';

	timer = 1000;
	setTimeout(function () {
		/* Expand user inputs */
		document.getElementById("user_inputs_id").style.height = restoreInputHeight;
		/* Contract explanation values */
		document.getElementById('explanation_values_id').style.height = restoreExplanationsHeight;

		/* eliminate text */
		document.getElementById('explanation_line1').innerHTML = '';
		document.getElementById('explanation_line2').innerHTML = '';
		document.getElementById('explanation_line3').innerHTML = '';
		document.getElementById('explanation_line4').innerHTML = '';
		document.getElementById('explanation_line5').innerHTML = '';
		document.getElementById('explanation_line6').innerHTML = '';
		document.getElementById('explanation_line7').innerHTML = '';
		document.getElementById('explanation_line8').innerHTML = '';
		document.getElementById('explanation_line9').innerHTML = '';
	}, timer);

	timer += 1000;
	setTimeout(function () {
		/* reset chart */
		HOHchart.focus();
		modifyGraph_HOH();

		/* Print deduction and difference values */
		deductType();
		difference_hoh();
	}, timer);

	timer += 1000;
	setTimeout(function () {
		/* reset xgrid and clear ygrids*/
		HOHchart.xgrids([{value: myRange_HOH.value, text:'Your income'}]);
		HOHchart.ygrids([]);

		/* reset axis max */
		HOHchart.axis.max(axisMax);

		/* Fade output values back in */
		document.getElementById('item_or_stand').style.color = 'black';
		document.getElementById('HOH_savings').style.color = 'black';

		/* bring back zoom label */
		document.getElementById('zoom_label').style.visibility = 'visible';
		document.getElementById('zoom_label').style.color = 'black';

		/* remove End Animation Button */
		document.getElementById('end_animation_button').style.visibility = 'hidden';
	}, timer);

	timer += 1000;
	setTimeout(function () {
		/* Fade output values back in */
		document.getElementById('item_or_stand').style.color = 'black';
		document.getElementById('HOH_savings').style.color = 'black';

		/* bring back zoom button */
		document.getElementById('zoom_switch').style.visibility = 'visible';
		
	}, timer);
}

function enable_animation_buttons(){
	document.getElementById("end_animation_button").disabled = false;
	document.getElementById("basic_overview_animation_id").disabled = false;
	document.getElementById("poor_people_animation").disabled = false;
	document.getElementById("regressive_animation").disabled = false;
	document.getElementById("itemized_explanation_animation_id").disabled = false;
	document.getElementById("tax_credit_animation").disabled = false;
	document.getElementById("marriage_penalty_explanation_animation_id").disabled = false;
}
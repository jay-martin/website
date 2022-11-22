income = 0;
itemized = 0;
numberChildren = '';

axisMax = 0;
restoreInputHeight = '';
restoreExplanationsHeight = '';

animationOpen = false;

function initialize_animation(){
	/* reset revert animation button to disabled (needed if an earlier animation has already been reverted)*/
	document.getElementById('end_animation_button').disabled = true;
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
	income = user_income.value;
	numberChildren = num_children.value;
	axisMax = chart.axis.max();

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
	document.getElementById("animation1_button").disabled = true;
	document.getElementById("animation2_button").disabled = true;
	document.getElementById("animation3_button").disabled = true;

	/* Calculate heights of explanation box and input box */
	explanation = document.getElementById('center_explanations_container');
	user_inputs = document.getElementById('user_inputs');
	const explanationsHeight = window.getComputedStyle(explanation).height;
	const inputsHeight = window.getComputedStyle(user_inputs).height;
	const totalHeight = parseFloat(explanationsHeight, 10) + parseFloat(inputsHeight, 10);

	/* Save values to restore after end of animation */
	restoreExplanationsHeight = explanationsHeight;
	restoreInputHeight = inputsHeight;

	/* Immediately set inputs height & explanation height to calculated height */
	document.getElementById("user_inputs").style.transitionDuration = "0s";
	document.getElementById("user_inputs").style.height = inputsHeight;
	document.getElementById('center_explanations_container').style.transitionDuration = "0s";
	document.getElementById('center_explanations_container').style.height = explanationsHeight;

	/* Set transition durations back to 1s */
	document.getElementById("user_inputs").style.transitionDuration = "1s";
	document.getElementById('center_explanations_container').style.transitionDuration = "1s";

	/*make end animation button visible */
	document.getElementById('end_animation_button').style.visibility = 'visible';

	timer = 1000;
	setTimeout(function () {
		/* Collapse user inputs */
		document.getElementById("user_inputs").style.height = '0px';
		/* Expand explanation values */
		document.getElementById('center_explanations_container').style.height = totalHeight + 'px';
		/* Fade out zoom button */
		document.getElementById('zoom_label').style.color = 'white';
		document.getElementById('zoom_switch').style.visibility = 'hidden';
		chart.xgrids([]);
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
	/* Assign current user inputs to global variables so the chart and outputs can be restored when animation is ended*/
	income = user_income.value;
	numberChildren = num_children.value;
	axisMax = chart.axis.max();

	/* Disable play animation buttons */
	document.getElementById("end_animation_button").disabled = true;
	document.getElementById("animation1_button").disabled = true;
	document.getElementById("animation2_button").disabled = true;
	document.getElementById("animation3_button").disabled = true;

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
	chart.xgrids([]);
	chart.ygrids([]);

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
	animationOpen = false;

	/* reset values */
	user_income.value = income;
	num_children.value = numberChildren;

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
		document.getElementById("user_inputs").style.height = restoreInputHeight;
		/* Contract explanation values */
		document.getElementById('center_explanations_container').style.height = restoreExplanationsHeight;

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
		chart.focus();
		modifyGraph_HOH();

		/* Print deduction and difference values */
		deductType();
		difference_hoh();
	}, timer);

	timer += 1000;
	setTimeout(function () {
		/* reset xgrid and clear ygrids*/
		chart.xgrids([{value: user_income.value, text:'Your income'}]);
		chart.ygrids([]);

		/* reset axis max */
		chart.axis.max(axisMax);

		/* Fade output values back in */
		document.getElementById('item_or_stand').style.color = 'black';
		document.getElementById('HOH_savings').style.color = 'black';

		/* bring back zoom label */
		document.getElementById('zoom_label').style.visibility = 'visible';
		document.getElementById('zoom_label').style.color = 'black';

		/* remove End Animation Button and reset its colors */
		document.getElementById('end_animation_button').style.visibility = 'hidden';
	}, timer);

	timer += 1000;
	setTimeout(function () {
		/* bring back zoom button */
		document.getElementById('zoom_switch').style.visibility = 'visible';
		
	}, timer);
}

function enable_animation_buttons(){
	document.getElementById("end_animation_button").disabled = false;
	document.getElementById("animation1_button").disabled = false;
	document.getElementById("animation2_button").disabled = false;
	document.getElementById("animation3_button").disabled = false;
}
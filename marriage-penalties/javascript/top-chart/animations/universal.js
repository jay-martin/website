p1Income = 0;
p2Income = 0;
p1Children = '';
p2Children = '';


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
	p1Income = person1_income.value;
	p2Income = person2_income.value;
	p1Children = person1_children.value;
	p2Children = person2_children.value;
	axisMax = MPchart.axis.max();

	/*make end animation button visible */
	document.getElementById('end_animation_button').style.display = 'block';

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
	document.getElementById('explanation_line10').style.color = 'black';
	document.getElementById('explanation_line11').style.color = 'black';
	document.getElementById('explanation_line12').style.color = 'black';

	/* Disable play animation buttons */
	document.getElementById("animation1_button").disabled = true;
	document.getElementById("animation1_button_mobile").disabled = true;
	document.getElementById("animation2_button").disabled = true;
	document.getElementById("animation2_button_mobile").disabled = true;
	document.getElementById("animation3_button").disabled = true;
	document.getElementById("animation3_button_mobile").disabled = true;

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

	timer = 1000;
	setTimeout(function () {
		/* Collapse user inputs */
		document.getElementById("user_inputs").style.height = '0px';
		/* Expand explanation values */
		document.getElementById('center_explanations_container').style.height = totalHeight + 'px';

		/* Clear xgrids */
		MPchart.xgrids([]);

		/*fade out text*/
		document.getElementById('individual_values').style.color = '#f5f3f2';
		document.getElementById('married_value').style.color = '#f5f3f2';
		document.getElementById('marriage_penalty_output').style.color = '#f5f3f2';
	}, timer);

	timer += 1000;
	setTimeout(function () {
	    /* clear text (currently it has just faded to the background color) */
		document.getElementById('individual_values').innerHTML = '';
		document.getElementById('married_value').innerHTML = '';
		document.getElementById('marriage_penalty_output').innerHTML = '';
	}, timer);
}

function initialize_animation_already_open(){

	/* Assign current user inputs to global variables so the chart and outputs can be restored when animation is ended*/
	p1Income = person1_income.value;
	p2Income = person2_income.value;
	p1Children = person1_children.value;
	p2Children = person2_children.value;

	/* Disable play animation buttons */
	document.getElementById("end_animation_button").disabled = true;
	document.getElementById("animation1_button").disabled = true;
	document.getElementById("animation1_button_mobile").disabled = true;
	document.getElementById("animation2_button").disabled = true;
	document.getElementById("animation2_button_mobile").disabled = true;
	document.getElementById("animation3_button").disabled = true;
	document.getElementById("animation3_button_mobile").disabled = true;

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
	document.getElementById('explanation_line10').style.color = '#f5f3f2';
	document.getElementById('explanation_line11').style.color = '#f5f3f2';
	document.getElementById('explanation_line12').style.color = '#f5f3f2';

	/* clear xgrids and ygrids*/
	MPchart.xgrids([]);
	MPchart.ygrids([]);

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
		document.getElementById('explanation_line10').innerHTML = '';
		document.getElementById('explanation_line11').innerHTML = '';
		document.getElementById('explanation_line12').innerHTML = '';

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
		document.getElementById('explanation_line10').style.color = 'black';
		document.getElementById('explanation_line11').style.color = 'black';
		document.getElementById('explanation_line12').style.color = 'black';
	}, timer);

}

function end_animation(){
	animationOpen = false;

	/* reset values */
	person1_income.value = p1Income;
	person2_income.value = p2Income;
	person1_children.value = p1Children;
	person2_children.value = p2Children;

	/* remove regions */
	MPchart.regions.remove({classes: ['penalty']});

	/* revert x-axis */
	MPchart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];

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
	document.getElementById('explanation_line10').style.color = '#f5f3f2';
	document.getElementById('explanation_line11').style.color = '#f5f3f2';
	document.getElementById('explanation_line12').style.color = '#f5f3f2';

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
		document.getElementById('explanation_line10').innerHTML = '';
		document.getElementById('explanation_line11').innerHTML = '';
		document.getElementById('explanation_line12').innerHTML = '';

		/* show charts */
		MPchart.show();
		MPchart.focus();
	}, timer);

	timer += 1000;
	setTimeout(function () {
		modify_person1();
		modify_person2();
	}, timer);

	timer += 500;
	setTimeout(function () {
		modify_married();
	}, timer);

	timer += 500;
	setTimeout(function () {
		/* adjust y axis */
		adjust_y_axis();

		/* Print output values */
		modify_income_outputs();
	}, timer);

	timer += 1000;
	setTimeout(function () {
		/* Fade output values back in */
		document.getElementById('individual_values').style.color = 'black';
		document.getElementById('married_value').style.color = 'black';
		document.getElementById('marriage_penalty_output').style.color = 'black';

		/* remove End Animation Button and reset its colors */
		document.getElementById('end_animation_button').style.display = 'none';
	}, timer);
}

function enable_animation_buttons(){
	document.getElementById("end_animation_button").disabled = false;
	document.getElementById("animation1_button").disabled = false;
	document.getElementById("animation1_button_mobile").disabled = false;
	document.getElementById("animation2_button").disabled = false;
	document.getElementById("animation2_button_mobile").disabled = false;
	document.getElementById("animation3_button").disabled = false;
	document.getElementById("animation3_button_mobile").disabled = false;
}
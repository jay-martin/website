var isActive = {
    'eitc' : true,
    'hoh'  : false,
    'snap' : false,
    'ssi'  : false,
}

/**************** Number of Children *************************************************************************/
function top_chart_adjust_person1_children(){
	if(isActive['eitc'] && isActive['hoh']){
		multiple_policies_marriage_penalty_adjust_chart('top_chart');
	}
	else if(isActive['eitc']){
		eitc_marriage_penalty_adjust_person1_num_children('top_chart');
	}
	else if(isActive['hoh']){
		// no adjustment to chart
	}
}

function top_chart_adjust_person2_children(){
	if(isActive['eitc'] && isActive['hoh']){
		multiple_policies_marriage_penalty_adjust_chart('top_chart');
	}
	else if(isActive['eitc']){
		eitc_marriage_penalty_adjust_person2_num_children('top_chart');
	}
	else if(isActive['hoh']){
		// no adjustment to chart
	}
}

/**************** Filing Status *************************************************************************/
function top_chart_adjust_person1_filing_status(){
	if(isActive['eitc'] && isActive['hoh']){
		multiple_policies_marriage_penalty_adjust_chart('top_chart');
	}
	else if(isActive['eitc']){
		// no adjustment to chart
	}
	else if(isActive['hoh']){
		tax_adjust_person1_filing_status('top_chart');
	}
}

function top_chart_adjust_person2_filing_status(){
	if(isActive['eitc'] && isActive['hoh']){
		multiple_policies_marriage_penalty_adjust_chart('top_chart');
	}
	else if(isActive['eitc']){
		// no adjustment to chart
	}
	else if(isActive['hoh']){
		tax_adjust_person2_filing_status('top_chart');
	}
}

/**************** Income ************************************************************************************/
function top_chart_adjust_person1_income(){
	if(isActive['eitc'] && isActive['hoh']){
		multiple_policies_marriage_penalty_modify_person1_income('top_chart');
	}
	else if(isActive['eitc']){
		eitc_marriage_penalty_modify_person1_income('top_chart');;
	}
	else if(isActive['hoh']){
		tax_modify_person1_income('top_chart');
	}
}

function top_chart_adjust_person2_income(){
	if(isActive['eitc'] && isActive['hoh']){
		multiple_policies_marriage_penalty_modify_person2_income('top_chart');
	}
	else if(isActive['eitc']){
		eitc_marriage_penalty_modify_person2_income('top_chart');;
	}
	else if(isActive['hoh']){
		tax_modify_person2_income('top_chart');
	}
}

/**************** Switch Chart Type ******************************************************************************/
function top_chart_switch_chart_type(){
	if(isActive['eitc'] && isActive['hoh']){
		$('#hoh_button').removeClass('selected_button');
		isActive['hoh'] = false;
		switch_eitc_marriage_penalty_chart_type('top_chart');
	}
	else if(isActive['eitc']){
		switch_eitc_marriage_penalty_chart_type('top_chart');
	}
	else if(isActive['hoh']){
		switch_tax_chart_type('top_chart');
		tax_intuitive_adjust_married('top_chart');
	}

	if(top_chart_chart_type.value === 'values'){
		document.getElementById('policy_select_text').innerHTML = 'Select which policies to display:'
	}
	else if(top_chart_chart_type.value === 'intuitive'){
		document.getElementById('policy_select_text').innerHTML = 'Select which policy to display:'
	}
}

/**************** Change Benefit Chart ******************************************************************************/
// Highlights button and initiates the function that changes the chart
function push_benefit_button(benefit){
	let id = '#' + benefit + '_button';

	if(top_chart_chart_type.value === 'values'){
		if(isActive[benefit]){
			isActive[benefit] = false;
			$(id).removeClass('selected_button');
		}
		else {
			isActive[benefit] = true;
			$(id).addClass('selected_button');
		}
	}
	else if(top_chart_chart_type.value === 'intuitive'){
		$('.benefit_button').removeClass('selected_button');
		$(id).addClass('selected_button');
		for(program in isActive){
			isActive[program] = false;
		}
		isActive[benefit] = true;
	}

	// All benefits deselected
	if(Object.values(isActive).every((v) => v === false)){
		top_chart_chart.hide();
		multiple_policies_marriage_penalty_values_outputs('top_chart'); // output "no benefit" warning
	}
	else{
		top_chart_change_benefit();
	}
}

// Adjusts top chart according to the benefits the user has selected to display
function top_chart_change_benefit(){
	if(isActive['eitc'] && isActive['hoh']){
		$('#top_chart_num_children_inputs').css('display', 'block');
		$('#top_chart_filing_status_inputs').css('display', 'block');
		multiple_policies_marriage_penalty_values_outputs('top_chart');
	}
	else if(isActive['eitc']){
		$('#top_chart_num_children_inputs').css('display', 'block');
		$('#top_chart_filing_status_inputs').css('display', 'none');
		eitc_marriage_penalty_outputs('top_chart');
	}
	else if(isActive['hoh']){
		$('#top_chart_num_children_inputs').css('display', 'none');
		$('#top_chart_filing_status_inputs').css('display', 'block');
		tax_outputs('top_chart');
	}

	if(top_chart_chart_type.value === 'values'){
		multiple_policies_marriage_penalty_values_adjust_chart('top_chart');
		multiple_policies_marriage_penalty_values_modify_income('top_chart');
		multiple_policies_marriage_penalty_values_adjust_axes();
	}
	else if(top_chart_chart_type.value === 'intuitive'){
		multiple_policies_marriage_penalty_intuitive_switch_benefit();
	}
}

function multiple_policies_marriage_penalty_values_adjust_axes(){
	if(isActive['eitc'] && isActive['hoh']){
		top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
		top_chart_chart.axis.max({x: 70000});
	}
	else if(isActive['eitc']){
		top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
		top_chart_chart.axis.max({x: 70000});
		eitc_marriage_penalty_values_modify_income('top_chart');
	}
	else if(isActive['hoh']){
		top_chart_chart.internal.config.axis_x_tick_values = hoh_fix_tick;
		top_chart_chart.axis.max({x: 200000});
		tax_values_modify_income('top_chart');
	}
}

function multiple_policies_marriage_penalty_intuitive_switch_benefit(){
	if(isActive['eitc']){
		// income sliders
		top_chart_person1_income.max = 60000;
		top_chart_person2_income.max = 60000;

		// axis
		top_chart_chart.internal.config.axis_y_max = undefined;
		top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
		top_chart_chart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
		top_chart_chart.axis.labels({ y: 'EITC Value'});
		top_chart_chart.axis.max({x: 60000});

		// curves
		top_chart_chart.hide( ['married_tax', 'tax_bonus', 'combined_tax', 'tax_penalty',] );
		top_chart_chart.show( ['married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc',] );
		top_chart_adjust_person1_children();
		top_chart_adjust_person2_children();
		top_chart_adjust_person1_income();
		top_chart_adjust_person2_income();

	}
	else if(isActive['hoh']){
		// income sliders
		top_chart_person1_income.max = 100000;
		top_chart_person2_income.max = 100000;

		// axis
		top_chart_chart.internal.config.axis_y_max = 30000;
		top_chart_chart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000];
		top_chart_chart.internal.config.axis_x_tick_values = hoh_fix_tick;
		top_chart_chart.axis.labels({ y: 'Tax Liability'});
		top_chart_chart.axis.max({x: 200000});

		// curves
		top_chart_chart.hide( ['married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc',] );
		top_chart_chart.show( ['married_tax', 'tax_bonus', 'combined_tax', 'tax_penalty',] );
		tax_intuitive_adjust_married('top_chart');
		top_chart_adjust_person1_filing_status();
		top_chart_adjust_person2_filing_status();
		top_chart_adjust_person1_income();
		top_chart_adjust_person2_income();
	}
}


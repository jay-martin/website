function set_benefit_type(benefit_type_input){
	let inputs_container    = benefit_type_input.parentElement.parentElement.parentElement;
	let benefit_value_label = inputs_container.children[0];
	
	let benefit_type = benefit_type_input.value;
	if(benefit_type == 'tax-credit'){

	}
	else if(benefit_type == 'direct-spending'){

	}
}

function update_byop_simple(input){
	// format: x_vals = [0, refundability threshold, end of phase in, end of plateau, end of phase out, 1,000,000]

	// html elements
	let policy_container       = input.parentElement.parentElement.parentElement.parentElement;
	let credit_value_container = policy_container.children[1].children[0];
	let phase_in_container     = policy_container.children[1].children[1];
	let phase_out_container    = policy_container.children[1].children[2];

	// credit value
	let credit_value = parseInt(credit_value_container.children[2].children[0].value);

	// phase-in
	let is_refundable = phase_in_container.children[0].children[0].checked;
	if(is_refundable){
		is_phased_in = phase_in_container.children[1].children[0].checked;
		if(is_phased_in){
			refundablity_threshold = parseInt(phase_in_container.children[3].children[0].value);
			phase_in_rate          = parseInt(phase_in_container.children[5].children[0].value) / 100;
			x_vals = [0, refundablity_threshold, credit_value / phase_in_rate + refundablity_threshold];
			y_vals = [0, 0,                      credit_value];
		}
		else{
			x_vals = [0,            0,            0];
			y_vals = [credit_value, credit_value, credit_value];
		}
	}
	else {
		// TODO: nonrefundable
		return;
	}
	
	// phase-out
	let is_phased_out = phase_out_container.children[0].children[0].checked;
	if(is_phased_out){
		phase_out_income = parseInt(phase_out_container.children[2].children[0].value);
		phase_out_rate   = parseInt(phase_out_container.children[4].children[0].value) / 100;
		
		x_vals.push(phase_out_income);
		y_vals.push(credit_value);
		x_vals.push( credit_value / phase_out_rate + phase_out_income);
		y_vals.push(0);
	}
	else{
		x_vals.push(1000000);
		y_vals.push(credit_value);
		x_vals.push(1000000);
		y_vals.push(credit_value);
	}

	// endpoint
	x_vals.push(1000000);
	y_vals.push(0);

	// update policies data object
	let policy_key = policy_container.getAttribute('policy-key');
	policies[policy_key]['x'] = x_vals;
	policies[policy_key]['y'] = y_vals;	

	// update charts
	update_charts();
}

function remove_phase_in_inputs(checkbox){
	let is_phased_in = checkbox.checked;
	let refundable_container = checkbox.parentElement.parentElement;
	let refundablity_threshold_container = refundable_container.children[3];
	let phase_in_rate_container = refundable_container.children[5];

	if(is_phased_in){
		$(refundablity_threshold_container).css('visibility','visible');
		$(phase_in_rate_container).css('visibility','visible');
	}
	else{
		$(refundablity_threshold_container).css('visibility','hidden');
		$(phase_in_rate_container).css('visibility','hidden');
	}
}

function remove_phase_out_inputs(checkbox){
	let is_phased_out = checkbox.checked;
	let phase_out_container = checkbox.parentElement.parentElement;
	let phase_out_income_container = phase_out_container.children[2];
	let phase_out_rate_container = phase_out_container.children[4];

	if(is_phased_out){
		$(phase_out_income_container).css('visibility','visible');
		$(phase_out_rate_container).css('visibility','visible');
	}
	else{
		$(phase_out_income_container).css('visibility','hidden');
		$(phase_out_rate_container).css('visibility','hidden');
	}
}

/* 
function update_byop_simple_tax_credit_refundable_phased_in(policy_container, credit_value_container, phase_in_container, phase_out_container){
	let policy_key = policy_container.getAttribute('policy-key');

	// input values
	let credit_value           = parseInt(credit_value_container.children[2].children[0].value);
	let refundablity_threshold = parseInt(phase_in_container.children[3].children[0].value);
	let phase_in_rate          = parseInt(phase_in_container.children[5].children[0].value) / 100;
	let phase_out_income       = parseInt(phase_out_container.children[2].children[0].value);
	let phase_out_rate         = parseInt(phase_out_container.children[4].children[0].value) / 100;

	let x_vals = [0, refundablity_threshold];
	let y_vals = [0, 0];

	// end of phase-in
	x_vals.push(credit_value / phase_in_rate + refundablity_threshold);
	y_vals.push(credit_value);

	// end of plateau
	x_vals.push(phase_out_income);
	y_vals.push(credit_value);

	// end of phase-out
	x_vals.push( credit_value / phase_out_rate + phase_out_income);
	y_vals.push(0);

	// endpoint
	x_vals.push(1000000);
	y_vals.push(0);

	// update policies data object
	policies[policy_key]['x'] = x_vals;
	policies[policy_key]['y'] = y_vals;
}
*/

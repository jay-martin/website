function reformed_eitc_value_at_income(income, filing_status, num_children){
	// Phase-in x-value and max benefit
	let phase_in = 0, max_benefit = 0;
	if(filing_status === 'married'){
		phase_in    = 20000;
		max_benefit = 6330;
	}
	else{
		phase_in    = 10000;
		max_benefit = 3165;
	}

	// End of Plateau
	let max_snap_value = reformed_snap_value_at_income(0, filing_status, num_children);
	let plateau_end    = max_snap_value / .24;

	// Phase-out x-value
	let phase_out = 0;
	if(filing_status === 'married'){phase_out = plateau_end + 25000;}
	else{phase_out = plateau_end + 12500;}

	// calculate eitc value
	if(income < phase_in){
		return .3165 * income;
	}
	else if(income <= plateau_end){
		return max_benefit;
	}
	else if(income < phase_out){
		return max_benefit - .2532 * (income - plateau_end);
	}
	else{
		return 0;
	}
}

function reformed_ctc_value_at_income(income, num_children){
	if(num_children == 'none'){
		return 0;
	}
	else if(num_children == 'one'){
		return 3000;
	}
	else if(num_children == 'two'){
		return 6000;
	}
	else if(num_children == 'three'){
		return 9000;
	}
}

function reformed_snap_value_at_income(income, filing_status, num_children){
	let household_size = integer_household_size(filing_status, num_children);
	let max_benefit    = household_size * 3000;
	let end_value      = max_benefit / .24;

	if(income < end_value){
		return max_benefit - (.24 * income);
	}
	else{
		return 0;
	}
}
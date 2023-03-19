var wide_chart_height = 260;

/********************************* EITC ******************************************************************************************************************/
function build_reformed_eitc(chart_name, filing_status, num_children){
	let xy_pairs = get_reformed_eitc_values(filing_status, num_children);

	//format
	xy_pairs['x_vals'].unshift('x_eitc');
	xy_pairs['y_vals'].unshift('eitc');

	//load
	chart_name.load({ columns: [xy_pairs['x_vals'], xy_pairs['y_vals']] });
}

function get_reformed_eitc_values(filing_status, num_children){
	/*********************** EITC: Married ****************************************/
	// Married No Child EITC
	const married_none_child_eitc_x_vals = [0, 20000, 25000, 50000];
	const married_none_child_eitc_y_vals = [0, 6330,  6330,  0];

	// Married One Child EITC
	const married_one_child_eitc_x_vals = [0, 20000, 37500, 62500];
	const married_one_child_eitc_y_vals = [0, 6330,  6330,  0];

	// Married Two Child EITC
	const married_two_child_eitc_x_vals = [0, 20000, 50000, 75000];
	const married_two_child_eitc_y_vals = [0, 6330,  6330,  0];

	// Married Three Child EITC
	const married_three_child_eitc_x_vals = [0, 20000, 62500, 87500];
	const married_three_child_eitc_y_vals = [0, 6330,  6330,  0];

	/*********************** EITC: Single & HOH ************************************/
	// Single No Child EITC
	const single_none_child_eitc_x_vals = [0, 10000, 12500, 25000];
	const single_none_child_eitc_y_vals = [0, 3165,  3165,  0];

	// Single One Child EITC
	const single_one_child_eitc_x_vals = [0, 10000, 25000, 37500];
	const single_one_child_eitc_y_vals = [0, 3165,  3165,  0];

	// Single Two Child EITC
	const single_two_child_eitc_x_vals = [0, 10000, 37500, 50000];
	const single_two_child_eitc_y_vals = [0, 3165,  3165,  0];

	// Single Three Child EITC
	const single_three_child_eitc_x_vals = [0, 10000, 50000, 62500];
	const single_three_child_eitc_y_vals = [0, 3165,  3165,  0];

	/*********************** Return ***************************************/
	// select eitc values
	if(filing_status == 'hoh'){
		filing_status = 'single';
	}

	return {
		x_vals : eval(filing_status + '_' + num_children + '_child_eitc_x_vals'),
		y_vals : eval(filing_status + '_' + num_children + '_child_eitc_y_vals'),
	}
}

/********************************* SNAP ******************************************************************************************************************/
function build_reformed_snap(chart_name, filing_status, num_children){
	let xy_pairs = get_reformed_snap_values(filing_status, num_children);

	//format
	xy_pairs['x_vals'].unshift('x_snap');
	xy_pairs['y_vals'].unshift('snap');

	//load
	chart_name.load({ columns: [xy_pairs['x_vals'], xy_pairs['y_vals']] });
}

function get_reformed_snap_values(filing_status, num_children){
	// SNAP Household Size: One
	const one_snap_x_vals  = [0,    12500];
	const one_snap_y_vals  = [3000, 0];

	// SNAP Household Size: Two
	const two_snap_x_vals  = [0,    25000];
	const two_snap_y_vals  = [6000, 0];

	// SNAP Household Size: Three
	const three_snap_x_vals  = [0,    37500];
	const three_snap_y_vals  = [9000, 0];

	// SNAP Household Size: Four
	const four_snap_x_vals  = [0,     50000];
	const four_snap_y_vals  = [12000, 0];

	// SNAP Household Size: Five
	const five_snap_x_vals  = [0,     62500];
	const five_snap_y_vals  = [15000, 0];

	/*********************** Return ***************************************/
	let household_size = calculate_household_size(filing_status, num_children);

	return {
		x_vals : eval(household_size + '_snap_x_vals'),
		y_vals : eval(household_size + '_snap_y_vals'),
	}
}

/********************************* CTC ******************************************************************************************************************/
function build_reformed_ctc(chart_name, num_children){
	let xy_pairs = get_reformed_ctc_values(num_children);

	//format
	xy_pairs['x_vals'].unshift('x_ctc');
	xy_pairs['y_vals'].unshift('ctc');

	chart_name.load({ columns: [xy_pairs['x_vals'], xy_pairs['y_vals']] });
}

function get_reformed_ctc_values(num_children){
	// No Child
	const none_child_x_vals = [0];
	const none_child_y_vals = [0];

	// One Child
	const one_child_x_vals = [0,    100000];
	const one_child_y_vals = [3000, 3000];

	// Two Child
	const two_child_x_vals = [0,    100000];
	const two_child_y_vals = [6000, 6000];

	// Three Child
	const three_child_x_vals = [0,    100000];
	const three_child_y_vals = [9000, 9000];

	return {
		x_vals : eval(num_children + '_child_x_vals'),
		y_vals : eval(num_children + '_child_y_vals'),
	}
}

/********************************* Xgrid and y-axis ******************************************************************************************************************/
function build_reformed_snap_eitc_xgrid(chart_name, filing_status, num_children){
	// x-grid values
	const one_xgrid   = 12500;
	const two_xgrid   = 25000;
	const three_xgrid = 37500;
	const four_xgrid  = 50000;
	const five_xgrid  = 62500;

	// load to chart
	let household_size = calculate_household_size(filing_status, num_children);
	let xgrid_value = eval(household_size + '_xgrid');
	chart_name.xgrids([{value: xgrid_value, class: 'dashed'}]);
}

function fit_y_axis_to_reformed_snap(chart_name, filing_status, num_children){
	// y-axis maxes
	const one_y_max   = 4000;
	const two_y_max   = 7000;
	const three_y_max = 9000;
	const four_y_max  = 12000;
	const five_y_max  = 15000;

	// adjust y-axis max
	let household_size = calculate_household_size(filing_status, num_children);
	let y_axis_max = eval(household_size + '_y_max');
	chart_name.axis.max({y: y_axis_max});
}

/********************************* Sum Benefits ******************************************************************************************************************/
function build_summed_reformed_benefits(chart_name, filing_status, num_children, include_eitc, include_ctc, include_snap){
	let xy_pairs = get_summed_reformed_benefit_values(include_eitc, include_ctc, include_snap, filing_status, num_children);

	// format
	xy_pairs['x_vals'].unshift('x_total');
	xy_pairs['y_vals'].unshift('total_benefit');

	// load
	chart_name.load({ columns: [xy_pairs['x_vals'], xy_pairs['y_vals']] });
}

function get_summed_reformed_benefit_values(include_eitc, include_ctc, include_snap, filing_status, num_children){
	let x_values = [];
	if(include_eitc == true){
		x_values = x_values.concat(get_reformed_eitc_values(filing_status, num_children)['x_vals']);
	}
	if(include_ctc == true){
		x_values = x_values.concat(get_reformed_ctc_values(num_children)['x_vals']);
	}
	if(include_snap == true){
		x_values = x_values.concat(get_reformed_snap_values(filing_status, num_children)['x_vals']);
	}

	// remove duplicates and sort
	let set = new Set(x_values);
	x_values = Array.from(set).sort(function(a,b){return a-b;});

	// y values
	let y_values = [];
	let new_y_val = 0;
	for(income of x_values){
		new_y_val = 0;
		if(include_eitc){
			new_y_val += reformed_eitc_value_at_income(income, filing_status, num_children);
		}
		if(include_ctc){
			new_y_val += reformed_ctc_value_at_income(income, num_children);
		}
		if(include_snap){
			new_y_val += reformed_snap_value_at_income(income, filing_status, num_children);
		}
		y_values.push(new_y_val);
	}

	return {
		x_vals : x_values,
		y_vals : y_values,
	}
}

function reformed_eitc_value_at_income(income, filing_status, num_children){
	// Phase-in x-value and max benefit
	let phase_in = 0, max_benefit = 0;
	if(filing_status === 'married'){
		phase_in    = 20000;
		max_benefit = 6330;
	}
	else{
		phase_in    = 10000;
		max_benefit = 3135;
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

function integer_household_size(filing_status, num_children){
    if(filing_status === 'married'){
        if(num_children == 'none'){ return 2;}
        else if(num_children == 'one'){ return 3;}
        else if(num_children == 'two'){ return 4;}
        else if(num_children == 'three'){return 5;}
    }
    else{
        if(num_children == 'none'){return 1;}
        else if(num_children == 'one'){return 2;}
        else if(num_children == 'two'){return 3;}
        else if(num_children == 'three'){return 4;}
    }
}

function integer_num_children(num_children){
    if(num_children == 'none'){ return 0;}
    else if(num_children == 'one'){ return 1;}
    else if(num_children == 'two'){ return 2;}
    else if(num_children == 'three'){return 3;}
}



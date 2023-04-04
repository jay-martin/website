/*************************************** Universal **************************************************/
function update_chart_names(policy_key, name){
	benefits_chart.internal.config.data_names[policy_key] = name;
}

function update_charts(){
	// filing status and num children
	let filingStatus = filing_status.value;
	let numChildren  = num_children.value;
	let partnerNumChildren = 'one';

	update_benefits_chart(filingStatus, numChildren);
	update_summed_benefits_chart(filingStatus, numChildren);
	update_marginal_tax_chart(filingStatus, numChildren);
	update_marriage_penalties_chart(numChildren, partnerNumChildren, 30000);
}

function remove_curve(policy_key){
	let filingStatus = filing_status.value;
	let numChildren  = num_children.value;

	// update charts that don't need to unload a curve
	update_summed_benefits_chart(filingStatus, numChildren);
	update_marginal_tax_chart(filingStatus, numChildren);
	update_marriage_penalties_chart(numChildren, 'one', 30000);

	// unload from benefits chart
	remove_curve_from_benefits_chart(policy_key);
}

/*************************************** Benefits Chart **********************************************/
function update_benefits_chart(filingStatus, numChildren){
	let chart_values = [];

	let x_vals = [], y_vals = [];
	for(key in policies){
		x_vals = policies[key][filingStatus][numChildren]['x'].slice();
		y_vals = policies[key][filingStatus][numChildren]['y'].slice();

		//format
		x_vals.unshift('x' + key);
		y_vals.unshift(key);

		// push to chart_values
		chart_values.push(x_vals);
		chart_values.push(y_vals);
	}

	benefits_chart.load({ columns: chart_values });
}

function remove_curve_from_benefits_chart(data_id){
	benefits_chart.unload({ ids: [data_id]});
}

/*************************************** Summed Benefits Chart *****************************************/
function update_summed_benefits_chart(filingStatus, numChildren){
	let xy_vals = get_summed_benefits_values(filingStatus, numChildren);
	let x_vals  = xy_vals['x'];
	let y_vals  = xy_vals['y'];

	// format
	x_vals.unshift('x_summed_benefits');
	y_vals.unshift('summed_benefits');

	// load to chart
	summed_benefits_chart.load({ columns: [x_vals, y_vals] });
}

function get_summed_benefits_values(filingStatus, numChildren){
	// create x_vals
	let x_vals = [];
	for(key in policies){
		for(income_val of policies[key][filingStatus][numChildren]['x']){
			x_vals.push(income_val);
		}
	}
	// remove duplicates and sort
	x_val_set = new Set(x_vals);
	x_vals = Array.from(x_val_set).sort(function(a,b){return a-b;});

	// create y_vals
	let y_vals = [];
	let current_y_val = 0;
	for(x_val of x_vals){
		current_y_val = 0;
		for(key in policies){
			indices = find_indices(policies[key][filingStatus][numChildren]['x'], x_val);
			x0 = policies[key][filingStatus][numChildren]['x'][indices['x0']];
			y0 = policies[key][filingStatus][numChildren]['y'][indices['x0']];
			x1 = policies[key][filingStatus][numChildren]['x'][indices['x1']];
			y1 = policies[key][filingStatus][numChildren]['y'][indices['x1']];
			if(x1 !== x0){
				value = y0 + ( (y1 - y0) / (x1 - x0) ) * (x_val - x0);
			}
			else{
				value = y0;
			}

			current_y_val += value;
		}
		y_vals.push(current_y_val);
	}

	return {'x' : x_vals, 'y' : y_vals};
}

function find_indices(x_vals_array, x_val){
	let index = 0;
	while(x_vals_array[index] <= x_val){
		index++;
	}

	if(index > x_vals_array.length - 1){
		return {
			'x0' : index-1, 
			'x1' : index-1,
		}
	}
	else{
		return {
			'x0' : index-1, 
			'x1' : index,
		}
	}
}

/*************************************** Marginal Tax Chart *****************************************/
function update_marginal_tax_chart(filingStatus, numChildren){
	let summed_xy_vals = get_summed_benefits_values(filingStatus, numChildren);
	let summed_x_vals  = summed_xy_vals['x'];
	let summed_y_vals  = summed_xy_vals['y'];

	let income_vals = [], marginal_tax_vals = [];
	let marginal_tax_index = 0, i = 0;
	while(i < summed_x_vals.length-1){
		slope = -100 * (summed_y_vals[i+1] - summed_y_vals[i]) / (summed_x_vals[i+1] - summed_x_vals[i]);

		income_vals.push(summed_x_vals[i], summed_x_vals[i+1] - 1);
		marginal_tax_vals.push(slope, slope);

		i++;
	}

	// format
	income_vals.unshift('x_marginal_tax');
	marginal_tax_vals.unshift('marginal_tax');

	// load to chart
	marginal_tax_chart.load({ columns: [income_vals, marginal_tax_vals] });
}

/*************************************** Marriage Penalties Chart *****************************************/
function update_marriage_penalties_chart(numChildren, partnerNumChildren, partnerIncome){
	// get person1 and married benefits
	let person1_summed_benefits = get_summed_benefits_values('single', numChildren);
	let summed_children         = sum_children(numChildren, partnerNumChildren);
	let married_summed_benefits = get_summed_benefits_values('married', summed_children);

	// calculate person2 benefit value
	let person2_summed_benefits = get_summed_benefits_values('single', partnerNumChildren);
	let person2_object          = create_dictionary_from_two_arrays(person2_summed_benefits['x'], person2_summed_benefits['y']);
	let person2_benefit         = get_benefit_at_income(person2_object, partnerIncome);

	// create x-y values object for each household type
	let household_benefit_values = {
		'person1' : create_dictionary_from_two_arrays(person1_summed_benefits['x'], person1_summed_benefits['y']),
		'married' : create_dictionary_from_two_arrays(married_summed_benefits['x'], married_summed_benefits['y']),
	}

	// add +partnerIncome values to married
	let married_vals_object = create_dictionary_from_two_arrays(married_summed_benefits['x'], married_summed_benefits['y']);
	for(income of married_summed_benefits['x']){
		income_int = parseInt(income);
		if(income_int - partnerIncome > 0){
			household_benefit_values['married'][income_int - partnerIncome] = get_benefit_at_income(married_vals_object, income_int);
		}
		delete household_benefit_values['married'][income];
	}
	household_benefit_values['married'][0] = get_benefit_at_income(married_vals_object, partnerIncome);
	household_benefit_values['married'][1000000] = get_benefit_at_income(married_vals_object, 1000000-partnerIncome);

	// add x-values so that each household type has the same x values listed
	for(name in household_benefit_values){
		current_household_values = household_benefit_values[name];
		for(check_name in household_benefit_values){
			check_against_household_values = household_benefit_values[check_name];
			for(x in check_against_household_values){
				if(!(x in current_household_values)){
					current_household_values[x] = get_benefit_at_income(current_household_values, x);
				}
			}
		}
	}

	// calculate marriage penalties and store (x,y) pairs (x=income, y=marriage penalty) in respective x_val and y_val arrays
	let y_vals = [];
	let x_vals = Object.keys(household_benefit_values['person1']).sort(function(a,b){return a-b;});
	for (let i = 0; i < x_vals.length; i++) {
		y_vals[i] = household_benefit_values['married'][x_vals[i]] - household_benefit_values['person1'][x_vals[i]] - person2_benefit;
		x_vals[i] = parseFloat(x_vals[i]);
	}

	// load values to chart
	generic_marriage_penalty_values_chart_builder(marriage_penalty_chart, x_vals, y_vals, 1000000);
}

function create_dictionary_from_two_arrays(x_vals_array, y_vals_array){
	let new_object = {};
	for (let i = 0; i < x_vals_array.length; i++) {
		new_object[x_vals_array[i]] = y_vals_array[i];
	}
	return new_object;
}

function get_benefit_at_income(benefit, income){
	if(income in benefit){
		return benefit[income];
	}

	let nearest_x_vals = find_nearest_x_vals_in_object(benefit, income);
	let x0 = nearest_x_vals[0];
	let y0 = benefit[x0];
	let x1 = nearest_x_vals[1];
	let y1 = benefit[x1];
	let slope = (y1 - y0) / (x1 - x0);
	return y0 + slope * (income - x0);
}

function find_nearest_x_vals_in_object(xy_val_object, x_val){
	if(x_val in xy_val_object){
		return x_val;
	}

	let nearest_smaller_number = 0, nearest_larger_number = 1000000;
	for(key in xy_val_object){
		float_key = parseFloat(key);
		if(float_key < x_val && float_key > nearest_smaller_number){
			nearest_smaller_number = float_key;
		}
		if(float_key > x_val && float_key < nearest_larger_number){
			nearest_larger_number = float_key;
		}
	}
	return [nearest_smaller_number, nearest_larger_number];
}


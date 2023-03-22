/*************************************** Universal **************************************************/
function update_chart_names(policy_key, name){
	benefits_chart.internal.config.data_names[policy_key] = name;
}

function update_charts(){
	update_benefits_chart();
	update_summed_benefits_chart();
}

function remove_curve(policy_key){
	// update charts that don't need to unload a curve
	update_summed_benefits_chart();

	// unload from benefits chart
	remove_curve_from_benefits_chart(policy_key);
}

/*************************************** Benefits Chart **********************************************/
function update_benefits_chart(){
	let chart_values = [];

	let x_vals = [], y_vals = [];
	for(key in policies){
		x_vals = policies[key]['x'].slice();
		y_vals = policies[key]['y'].slice();

		//format
		x_vals.unshift('x' + key);
		y_vals.unshift(key);

		//push to chart_values
		chart_values.push(x_vals);
		chart_values.push(y_vals);
	}

	benefits_chart.load({ columns: chart_values });
}

function remove_curve_from_benefits_chart(data_id){
	benefits_chart.unload({ ids: [data_id]});
}

/*************************************** Summed Benefits Chart *****************************************/
function update_summed_benefits_chart(){
	// create x_vals
	let x_vals = [];
	for(key in policies){
		for(income_val of policies[key]['x']){
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
			indices = find_indices(policies[key]['x'], x_val);
			x0 = policies[key]['x'][indices['x0']];
			y0 = policies[key]['y'][indices['x0']];
			x1 = policies[key]['x'][indices['x1']];
			y1 = policies[key]['y'][indices['x1']];
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

	// format
	x_vals.unshift('x_summed_benefits');
	y_vals.unshift('summed_benefits');

	// load to chart
	summed_benefits_chart.load({ columns: [x_vals, y_vals] });
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


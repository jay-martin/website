/************************* Switch chart ***************************************/
function switch_eitc_marriage_penalty_chart_type(chart_name){
	let chart      = eval(chart_name + '_chart');
	let chart_type = eval(chart_name + '_chart_type').value;

	let person1_income_element = eval(chart_name + '_person1_income');
	let person2_income_element = eval(chart_name + '_person2_income');

	// Outputs
	eitc_marriage_penalty_outputs(chart_name);

	if(chart_type === 'intuitive'){
		// Adjust income sliders
		person1_income_element.max = '60000';
		person2_income_element.max = '60000';

		// legend
		chart.legend.show(['person1', 'person2', 'person2_dashed', 'married']);
		chart.legend.hide(['values']);

		//axis
		chart.axis.labels({y: 'EITC Value'});
		
		// curves
		chart.hide(['values', 'values_point']);
		chart.show(['person1', 'person2', 'person2_dashed', 'married', 'married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc', 'point1', 'point2', 'point_married']);
		eitc_marriage_penalty_intuitive_modify_income(chart_name);
		eitc_marriage_penalty_intuitive_adjust_married(chart_name);
		eitc_marriage_penalty_intuitive_adjust_person1(chart_name);
		eitc_marriage_penalty_intuitive_adjust_person2(chart_name);

	}
	else if(chart_type === 'values'){
		// Adjust income sliders
		person1_income_element.max = '70000';
		person2_income_element.max = '70000';

		// y & x grids
		chart.ygrids([ {value: 0,} ]);
		chart.xgrids([ {value: person1_income_element.value, text: 'Your Income'} ]);

		// axis
		chart.internal.config.axis_y_max = undefined;
		chart.internal.config.axis_x_max = 70000;
		chart.internal.config.axis_y_tick_values = [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
		chart.internal.config.axis_y_padding = 10;
		chart.axis.labels({y: 'Marriage Penalty/Bonus'});

		// legend
		chart.legend.hide(['person1', 'person2', 'person2_dashed', 'married']);
		chart.legend.show(['values']);

		// curves
		chart.hide(['person1', 'person2', 'person2_dashed', 'married', 'married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc', 'point1', 'point2', 'point_married']);
		chart.show(['values', 'values_point']);
		eitc_marriage_penalty_values_modify_income(chart_name);
		eitc_marriage_penalty_values_adjust_chart(chart_name);
	}
}

/************************* Filing status adjustments **************************/
function eitc_marriage_penalty_adjust_person1_num_children(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;
	
	eitc_marriage_penalty_outputs(chart_name);
	if(chart_type === 'intuitive'){
		eitc_marriage_penalty_intuitive_adjust_person1(chart_name);
		eitc_marriage_penalty_intuitive_adjust_married(chart_name);
		eitc_marriage_penalty_intuitive_modify_income(chart_name);
	}
	else if(chart_type === 'values'){
		eitc_marriage_penalty_values_adjust_chart(chart_name);
		eitc_marriage_penalty_values_modify_income(chart_name);
	}
}

function eitc_marriage_penalty_adjust_person2_num_children(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	eitc_marriage_penalty_outputs(chart_name);
	if(chart_type === 'intuitive'){
		eitc_marriage_penalty_intuitive_adjust_person2(chart_name);
		eitc_marriage_penalty_intuitive_adjust_married(chart_name);
		eitc_marriage_penalty_intuitive_modify_income(chart_name);
	}
	else if(chart_type === 'values'){
		eitc_marriage_penalty_values_adjust_chart(chart_name);
		eitc_marriage_penalty_values_modify_income(chart_name);
	}
}

/************************* Income adjustments *********************************/
function eitc_marriage_penalty_modify_person1_income(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	eitc_marriage_penalty_outputs(chart_name);
	if(chart_type === 'intuitive'){
		eitc_marriage_penalty_intuitive_modify_income(chart_name);
	}
	else if(chart_type === 'values'){
		eitc_marriage_penalty_values_modify_income(chart_name);
	}
}

function eitc_marriage_penalty_modify_person2_income(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	eitc_marriage_penalty_outputs(chart_name);
	if(chart_type === 'intuitive'){
		eitc_marriage_penalty_intuitive_modify_income(chart_name);
	}
	else if(chart_type === 'values'){
		eitc_marriage_penalty_values_adjust_chart(chart_name);
		eitc_marriage_penalty_values_modify_income(chart_name);
	}
}

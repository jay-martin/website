const tax_marriage_penalty_values_data_names = ['values_point', 'y_red1', 'y_red2', 'y_red3', 'y_red4', 'y_green1', 'y_green2', 'y_green3', 'y_green4'];
const eitc_intuitive_data_names              = ['person1', 'person2', 'person2_dashed', 'married', 'married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc', 'point1', 'point2', 'point_married'];

/************************* Switch chart ***************************************/
function switch_eitc_marriage_penalty_chart_type(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	// Outputs
	eitc_marriage_penalty_outputs(chart_name);

	if(chart_type === 'intuitive'){
		switch_eitc_marriage_penalty_chart_type_to_intuitive(chart_name);
	}
	else if(chart_type === 'values'){
		switch_eitc_marriage_penalty_chart_type_to_values(chart_name);
	}
}

function switch_eitc_marriage_penalty_chart_type_to_intuitive(chart_name){
	let chart = eval(chart_name + '_chart');
	let person1_income_element = eval(chart_name + '_person1_income');
	let person2_income_element = eval(chart_name + '_person2_income');

	// Adjust income sliders
	person1_income_element.max = '60000';
	person2_income_element.max = '60000';

	// legend
	chart.legend.show(['person1', 'person2', 'person2_dashed', 'married']);
	chart.legend.hide(['y_red1', 'y_green1']);

	//axis
	chart.axis.labels({y: 'EITC Value'});
	
	// curves
	chart.hide(tax_marriage_penalty_values_data_names);
	chart.show(eitc_intuitive_data_names);
	eitc_marriage_penalty_intuitive_modify_income(chart_name);
	eitc_marriage_penalty_intuitive_adjust_married(chart_name);
	eitc_marriage_penalty_intuitive_adjust_person1(chart_name);
	eitc_marriage_penalty_intuitive_adjust_person2(chart_name);
}

function switch_eitc_marriage_penalty_chart_type_to_values(chart_name){
	let chart = eval(chart_name + '_chart');
	let person1_income_element = eval(chart_name + '_person1_income');
	let person2_income_element = eval(chart_name + '_person2_income');

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
	chart.legend.show(['y_red1', 'y_green1']);

	// curves
	chart.hide(eitc_intuitive_data_names);
	// values chart builder runs chart.show() on proper curves, but not on values_point
	chart.show(['values_point']);
	eitc_marriage_penalty_values_modify_income(chart_name);
	eitc_marriage_penalty_values_adjust_chart(chart_name);
}

/************************* Number of children adjustments **************************/
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

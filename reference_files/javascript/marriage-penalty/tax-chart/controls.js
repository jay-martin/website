const eitc_marriage_penalty_values_data_names = ['values_point', 'y_red1', 'y_red2', 'y_red3', 'y_red4', 'y_green1', 'y_green2', 'y_green3', 'y_green4'];
const tax_intuitive_data_name                 = ['person1', 'person2', 'person2_dashed', 'married', 'combined_tax', 'tax_penalty', 'married_tax', 'tax_bonus', 'point1', 'point2', 'point_married'];

/************************* Switch chart ***************************************/
function switch_tax_chart_type(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	// Outputs
	tax_outputs(chart_name);

	if(chart_type === 'intuitive'){
		switch_tax_chart_type_to_intuitive(chart_name);
	}
	else if(chart_type === 'values'){
		switch_tax_chart_type_to_values(chart_name);
	}
}

function switch_tax_chart_type_to_values(chart_name){
	let chart = eval(chart_name + '_chart');
	let person1_income_element = eval(chart_name + '_person1_income');
	let person2_income_element = eval(chart_name + '_person2_income');

	// Adjust income sliders
	person1_income_element.max = '200000';
	person2_income_element.max = '200000';

	// axis
	chart.internal.config.axis_y_max = undefined;
	chart.internal.config.axis_y_tick_values = [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
	chart.internal.config.axis_y_padding = 10;
	chart.axis.labels({y: 'Marriage Penalty/Bonus'});

	// legend
	chart.legend.hide(['person1', 'person2', 'person2_dashed', 'married']);
	chart.legend.show(['y_red1', 'y_green1']);

	// y & x grids
	chart.ygrids([ {value: 0,} ]);
	chart.xgrids([ {value: person1_income_element.value, text: 'Your Income'} ]);

	// curves
	chart.hide(tax_intuitive_data_name);
	chart.show(['values_point']);
	tax_values_adjust_chart(chart_name);
	tax_values_modify_income(chart_name);
}

function switch_tax_chart_type_to_intuitive(chart_name){
	let chart      = eval(chart_name + '_chart');
	let person1_income_element = eval(chart_name + '_person1_income');
	let person2_income_element = eval(chart_name + '_person2_income');

	// Adjust income sliders
	person1_income_element.max = '100000';
	person2_income_element.max = '100000';

	// axis
	chart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000];
	chart.internal.config.axis_y_max = 30000;
	chart.axis.labels({y: 'Tax Liability'});

	// legend
	chart.legend.show(['person1', 'person2', 'person2_dashed', 'married']);
	chart.legend.hide(['y_red1', 'y_green1']);

	// curves
	chart.hide(eitc_marriage_penalty_values_data_names);
	chart.show(tax_intuitive_data_name);
	tax_intuitive_adjust_person1(chart_name);
	tax_intuitive_adjust_person2(chart_name);
	tax_intuitive_modify_income(chart_name);
}

/************************* Filing status adjustments **************************/
function tax_adjust_person1_filing_status(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	tax_outputs(chart_name);
	tax_modify_person1_income(chart_name);
	if(chart_type === 'intuitive'){
		tax_intuitive_adjust_person1(chart_name);
		tax_intuitive_modify_income(chart_name);
	}
	else if(chart_type === 'values'){
		tax_values_adjust_chart(chart_name);
		tax_values_modify_income(chart_name);
	}
}

function tax_adjust_person2_filing_status(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	tax_outputs(chart_name);
	tax_modify_person2_income(chart_name);
	if(chart_type === 'intuitive'){
		tax_intuitive_adjust_person2(chart_name);
		tax_intuitive_modify_income(chart_name);
	}
	else if(chart_type === 'values'){
		tax_values_adjust_chart(chart_name);
		tax_values_modify_income(chart_name);
	}
}

/************************* Income adjustments *********************************/
function tax_modify_person1_income(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	tax_outputs(chart_name);
	if(chart_type === 'intuitive'){
		tax_intuitive_modify_income(chart_name);
	}
	else if(chart_type === 'values'){
		tax_values_modify_income(chart_name);
	}
}

function tax_modify_person2_income(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	tax_outputs(chart_name);
	if(chart_type === 'intuitive'){
		tax_intuitive_modify_income(chart_name);
	}
	else if(chart_type === 'values'){
		tax_values_adjust_chart(chart_name);
		tax_values_modify_income(chart_name);
	}
}
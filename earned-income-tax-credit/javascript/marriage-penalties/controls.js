/************************* Switch chart ***************************************/
function switch_marriage_penalty_chart_type(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		// Adjust income sliders
		mp_person1_income.max = '60000';
		mp_person2_income.max = '60000';

		// Outputs
		document.getElementById('mp_married_value').style.display = 'block';
		document.getElementById('mp_marriage_penalty').style.display = 'block';
		marriage_penalty_intuitive_outputs();

		// legend
		MPchart.legend.show(['person1', 'person2', 'person2_dashed', 'married']);
		MPchart.legend.hide(['values']);

		//axis
		MPchart.axis.labels({y: 'EITC Value'});
		
		// curves
		MPchart.hide(['values', 'values_point']);
		MPchart.show(['person1', 'person2', 'person2_dashed', 'married', 'married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married']);
		marriage_penalty_intuitive_modify_income();
		marriage_penalty_intuitive_adjust_person1();
		marriage_penalty_intuitive_adjust_person2();

	}
	else if(marriage_penalty_chart_type.value === 'values'){
		// Adjust income sliders
		mp_person1_income.max = '70000';
		mp_person2_income.max = '70000';

		// Outputs
		marriage_penalty_values_outputs();
		document.getElementById('mp_married_value').style.display = 'none';
		document.getElementById('mp_marriage_penalty').style.display = 'none';

		// y & x grids
		MPchart.ygrids([ {value: 0,} ]);
		MPchart.xgrids([ {value: mp_person1_income.value, text: 'Your Income'} ]);

		// axis
		MPchart.internal.config.axis_y_max = undefined;
		MPchart.internal.config.axis_x_max = 70000;
		MPchart.internal.config.axis_y_tick_values = [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
		MPchart.internal.config.axis_y_padding = 10;
		MPchart.axis.labels({y: 'Marriage Penalty/Bonus'});

		// legend
		MPchart.legend.hide(['person1', 'person2', 'person2_dashed', 'married']);
		MPchart.legend.show(['values']);

		// curves
		MPchart.hide(['person1', 'person2', 'person2_dashed', 'married', 'married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married']);
		MPchart.show(['values', 'values_point']);
		marriage_penalties_values_modify_income();
		marriage_penalties_values_adjust_chart();
	}
}

/************************* Filing status adjustments **************************/
function marriage_penalty_adjust_person1_num_children(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_adjust_person1();
		marriage_penalty_intuitive_adjust_married();
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_adjust_chart();
		marriage_penalties_values_modify_income();
	}
}

function marriage_penalty_adjust_person2_num_children(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_adjust_person2();
		marriage_penalty_intuitive_adjust_married();
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_adjust_chart();
		marriage_penalties_values_modify_income();
	}
}

/************************* Income adjustments *********************************/
function marriage_penalty_modify_person1_income(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_modify_income();
	}
}

function marriage_penalty_modify_person2_income(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_adjust_chart();
		marriage_penalties_values_modify_income();
	}
}

/************************* Outputs *********************************/
function marriage_penalty_outputs(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_outputs();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalty_values_outputs();
	}
}
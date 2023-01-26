/************************* Switch chart ***************************************/
function switch_marriage_penalty_chart_type(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		// Chart
		// axis
		marriagePenaltyChart.internal.config.axis_y_max = 30000;
		marriagePenaltyChart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000];
		// legend
		marriagePenaltyChart.legend.show(['person1', 'person2', 'person2_dashed', 'married']);
		marriagePenaltyChart.legend.hide(['values']);
		// curves
		marriagePenaltyChart.hide(['values', 'values_point']);
		marriagePenaltyChart.show(['person1', 'person2', 'person2_dashed', 'married', 'combined_tax', 'penalty', 'married_tax', 'bonus', 'point1', 'point2', 'point_married']);
		marriage_penalty_intuitive_adjust_person1();
		marriage_penalty_intuitive_adjust_person2();
		marriage_penalty_intuitive_modify_income();

		// Outputs
		document.getElementById('marriage_penalty_married').style.display = 'block';
		document.getElementById('marriage_penalty_bonus').style.display = 'block';
		marriage_penalty_intuitive_outputs();

		// Income Sliders
		marriage_penalty_person1_income.max = '100000';
		marriage_penalty_person2_income.max = '100000';

	}
	else if(marriage_penalty_chart_type.value === 'values'){
		/******** Chart ********/
		// axis
		marriagePenaltyChart.internal.config.axis_y_max = undefined;
		marriagePenaltyChart.internal.config.axis_y_tick_values = [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
		marriagePenaltyChart.internal.config.axis_y_padding = 10;
		marriagePenaltyChart.axis.labels({y: 'Marriage Penalty/Bonus'});
		// y-grids
		marriagePenaltyChart.ygrids([ {value: 0,} ]);
		// legend
		marriagePenaltyChart.legend.hide(['person1', 'person2', 'person2_dashed', 'married']);
		marriagePenaltyChart.legend.show(['values']);
		// curves
		marriagePenaltyChart.hide(['person1', 'person2', 'person2_dashed', 'married', 'combined_tax', 'penalty', 'married_tax', 'bonus', 'point1', 'point2', 'point_married']);
		marriagePenaltyChart.show(['values', 'values_point']);
		marriage_penalties_values_adjust_chart();
		marriage_penalties_values_modify_income();

		// Outputs
		document.getElementById('marriage_penalty_married').style.display = 'none';
		document.getElementById('marriage_penalty_bonus').style.display = 'none';
		marriage_penalty_values_outputs();

		// Income Sliders
		marriage_penalty_person1_income.max = '200000';
		marriage_penalty_person2_income.max = '200000';
	}
}

/************************* Filing status adjustments **************************/
function marriage_penalty_adjust_person1_filing_status(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_adjust_person1();
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_adjust_chart();
		marriage_penalties_values_modify_income();
	}
}

function marriage_penalty_adjust_person2_filing_status(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_adjust_person2();
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
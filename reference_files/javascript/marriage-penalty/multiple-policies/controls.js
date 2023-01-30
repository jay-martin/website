/************************* Filing Status/Number of Chldren Adjustments **************************/
function multiple_policies_marriage_penalty_adjust_chart(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;
	
	multiple_policies_marriage_penalty_values_outputs(chart_name);
	multiple_policies_marriage_penalty_values_adjust_chart(chart_name);
	multiple_policies_marriage_penalty_values_modify_income(chart_name);
}

/************************* Income adjustments *********************************/
function multiple_policies_marriage_penalty_modify_person1_income(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	multiple_policies_marriage_penalty_values_outputs(chart_name);
	multiple_policies_marriage_penalty_values_modify_income(chart_name);
}

function multiple_policies_marriage_penalty_modify_person2_income(chart_name){
	let chart_type = eval(chart_name + '_chart_type').value;

	multiple_policies_marriage_penalty_values_outputs(chart_name);
	multiple_policies_marriage_penalty_values_adjust_chart(chart_name);
	multiple_policies_marriage_penalty_values_modify_income(chart_name);
}

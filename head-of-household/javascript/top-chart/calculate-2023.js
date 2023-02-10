/******************************************************************************************
 * This file contains the functions performing calculations necessary for creating the HOH chart
 * as well as determining the outputs
 * ****************************************************************************************/

/** Returns the difference in tax liability between a single filer and a head of household at a given income & itemized deductions value
 * @param {integer} - income
 * @param {integer} - value of itemized deductions
 * @return {float} - tax difference
 * */
function hoh_tax_difference_2023(income, itemDeduct){
	single_deduction = single_deduction_2023(itemDeduct);
	hoh_deduction = hoh_deduction_2023(itemDeduct);

	return single_tax_liability_2023_with_deduction_value(income, single_deduction) - hoh_tax_liability_2023_with_deduction_value(income, hoh_deduction);
}

/** Returns an array of two arrays containing: (1) the x-values for c3.js; (2) the difference in tax liability between single & hoh filing statuses
 * @param {integer} - value of itemized deductions
 * @return {array of two arrays of floats} - first array contains x-values, second contains difference in tax liability between single & hoh filing statuses
 * */
function hoh_chart_values_2023(itemDeduct){
	// Calculate combined tax bracket values
	combined_brackets = combined_brackets_2023(single_adjusted_brackets_2023(itemDeduct), hoh_adjusted_brackets_2023(itemDeduct));

	// Determine deduction value (standard deduction versus itemized deductions)
	single_deduction = single_deduction_2023(itemDeduct);
	hoh_deduction = hoh_deduction_2023(itemDeduct);

	// Calculate the difference in taxes between single and hoh
	tax_difference = [];
	for(income of combined_brackets){
		tax_difference.push(hoh_tax_difference_2023(income, itemDeduct));
	}

	return [combined_brackets, tax_difference];
}

function hoh_chart_values_2023_with_cdcc(itemDeduct){
	//single_zero_value = 31329.17; // occurs during 12% tax bracket
	//hoh_zero_value = 38508.33; // occurs during 12% tax bracket

}

function hoh_chart_values_2023_with_nonrefundable_ctc(itemDeduct, numChildren){
	//single_zero_value = 31329.17; // occurs during 12% tax bracket
	//hoh_zero_value = 38508.33; // occurs during 12% tax bracket

}

/** Returns effective single tax bracket values when adjusted for a given itemized deductions value
 * @param {integer} - monetary value of itemized deductions
 * @return {array of integers} - income values for adjusted tax brackets
 * */
function single_adjusted_brackets_2023(itemDeduct){

	// Determine whether the standard deduction or itemized deductions will be used
	deduction = single_deduction_2023(itemDeduct);

	// Calculate new bracket values
	baseline_brackets = [0, 11000, 44725, 95375, 182100, 231250, 578125];
	new_brackets = [0, 0,  0,  0,   0,  0,  0];
	for (var i = 0; i < new_brackets.length; i++) {
		new_brackets[i] = baseline_brackets[i] + deduction;
	}
	return new_brackets;
}

/** Returns effective hoh tax bracket values when adjusted for a given itemized deductions value
 * @param {integer} - monetary value of itemized deductions
 * @return {array of integers} - income values for adjusted tax brackets
 * */
function hoh_adjusted_brackets_2023(itemDeduct){

	// Determine whether the standard deduction or itemized deductions will be used
	deduction = hoh_deduction_2023(itemDeduct);

	// Calculate new bracket values
	baseline_brackets = [0, 15700, 59850, 95350, 182100, 231250, 578100];
	new_brackets = [0, 0,  0,  0,   0,  0,  0];
	for (var i = 0; i < new_brackets.length; i++) {
		new_brackets[i] = baseline_brackets[i] + deduction;
	}
	return new_brackets;
}

/** Returns either the standard deduction or the itemized deduction depending upon which a single taxpayer would use
 * @param {integer} - monetary value of itemized deductions
 * @return {integer} - larger of the single standard deduction and param itemDeduct
 * */
function single_deduction_2023(itemDeduct){
	itemized = parseInt(itemDeduct.replace(/,/g, ''), 10);
	if(itemized <= 13850){
		return 13850;
	}
	else{
		return itemized;
	}
}

/** Returns either the standard deduction or the itemized deduction depending upon which a head of household would use
 * @param {integer} - monetary value of itemized deductions
 * @return {integer} - larger of the HOH standard deduction and param itemDeduct
 * */
function hoh_deduction_2023(itemDeduct){
	itemized = parseInt(itemDeduct.replace(/,/g, ''), 10);
	if(itemized <= 20800){
		return 20800;
	}
	else{
		return itemized;
	}
}

/** Merges the adjusted single and hoh tax bracket arrays
 * @param {array of integers} - adjusted single tax bracket values
 * @param {array of integers} - adjusted hoh tax bracket values
 * @return {sorted array of integers} - merged single & hoh tax bracket values
 * */
function combined_brackets_2023(single_tax_brackets, hoh_tax_brackets){
	// Combine arrays and eliminate any repeated values
	brackSet = new Set(single_tax_brackets.concat(hoh_tax_brackets));

	// Sort in ascending order
	combined_brackets = Array.from(brackSet).sort(function(a,b){return a-b;});

	// Add $0 and $620,000
	combined_brackets.unshift(0);
	combined_brackets.push(620000);

	return combined_brackets;
}

/** Returns 2023 HOH tax liability at a given income for a particular deduction amount
 * @param {integer} - income
 * @param {integer} - value of deductions
 * @return {float} - tax liability
 * */
function hoh_tax_liability_2023_with_deduction_value(income, deductionValue){
	hoh_bracket_reference_values = [0, 15700, 59850, 95350, 182100, 231250, 578100];
	
	adjusted_hoh_bracket_values = [];
	for (var i = 0; i < hoh_bracket_reference_values.length; i++) {
		adjusted_hoh_bracket_values.push(hoh_bracket_reference_values[i] + deductionValue);
	}

	if(income <= adjusted_hoh_bracket_values[0]){
		return 0;
	}
	else if(income <= adjusted_hoh_bracket_values[1]){
		return .1 * (income - adjusted_hoh_bracket_values[0]);
	}
	else if(income <= adjusted_hoh_bracket_values[2]){
		return .12 * (income - adjusted_hoh_bracket_values[1]) + 1570;
	}
	else if(income <= adjusted_hoh_bracket_values[3]){
		return .22 * (income - adjusted_hoh_bracket_values[2]) + 6868;
	}
	else if(income <= adjusted_hoh_bracket_values[4]){
		return .24 * (income - adjusted_hoh_bracket_values[3]) + 14678;
	}
	else if(income <= adjusted_hoh_bracket_values[5]){
		return .32 * (income - adjusted_hoh_bracket_values[4]) + 35498;
	}
	else if(income <= adjusted_hoh_bracket_values[6]){
		return .35 * (income - adjusted_hoh_bracket_values[5]) + 51226;
	}
	else{
		return .37 * (income - adjusted_hoh_bracket_values[6]) + 172623.5;
	}
}

/** Returns 2023 single filer tax liability at a given income for a particular deduction amount
 * @param {integer} - income
 * @param {integer} - value of deductions
 * @return {float} - tax liability
 * */
function single_tax_liability_2023_with_deduction_value(income, deductionValue){
	single_bracket_reference_values = [0, 11000, 44725, 95375, 182100, 231250, 578125];
	
	adjusted_single_bracket_values = [];
	for (var i = 0; i < single_bracket_reference_values.length; i++) {
		adjusted_single_bracket_values.push(single_bracket_reference_values[i] + deductionValue);
	}

	if(income <= adjusted_single_bracket_values[0]){
		return 0;
	}
	else if(income <= adjusted_single_bracket_values[1]){
		return .1 * (income - adjusted_single_bracket_values[0]);
	}
	else if(income <= adjusted_single_bracket_values[2]){
		return .12 * (income - adjusted_single_bracket_values[1]) + 1100;
	}
	else if(income <= adjusted_single_bracket_values[3]){
		return .22 * (income - adjusted_single_bracket_values[2]) + 5147;
	}
	else if(income <= adjusted_single_bracket_values[4]){
		return .24 * (income - adjusted_single_bracket_values[3]) + 16290;
	}
	else if(income <= adjusted_single_bracket_values[5]){
		return .32 * (income - adjusted_single_bracket_values[4]) + 37104;
	}
	else if(income <= adjusted_single_bracket_values[6]){
		return .35 * (income - adjusted_single_bracket_values[5]) + 52832;
	}
	else{
		return .37 * (income - adjusted_single_bracket_values[6]) + 174238.25;
	}
}

/** Returns tax liability of a head of household after the NON-refundable portion of the CTC has been applied
 * @param {integer} - income
 * @param {integer} - value of deductions
 * @param {string} - string representing an integer ('none', 'one', 'two', 'three')
 * @return {integer} - tax owed
 * */
/*
hoh_tax_liability_2023_with_nonrefundable_ctc(income, deductionValue, numChildren){
	num_children_integer = num_children_formatting(numChildren);
	base_tax = hoh_tax_liability_2023_with_deduction_value(income, deductionValue) - (2000 * num_children_integer);
	if(base_tax <= 0){
		return 0;
	}
	else{
		return base_tax;
	}
}
*/

/** Returns tax liability of a single filer after the NON-refundable portion of the CTC has been applied
 * @param {integer} - income
 * @param {integer} - value of deductions
 * @param {string} - string representing an integer ('none', 'one', 'two', 'three')
 * @return {integer} - tax owed
 * */
/*
single_tax_liability_2023_with_nonrefundable_ctc(income, deductionValue, numChildren){
	num_children_integer = num_children_formatting(numChildren);
	base_tax = single_tax_liability_2023_with_deduction_value(income, deductionValue) - (2000 * num_children_integer);
	if(base_tax <= 0){
		return 0;
	}
	else{
		return base_tax;
	}
}
*/

/** Converts string representing an integer into an integer
 * @param {string} - string representing an integer ('none', 'one', 'two', 'three')
 * @return {integer}
 * */
function num_children_formatting(num_children_string){
    numChildren = 1;
    if(num_children_string === 'two'){
        numChildren = 2;
    }
    else if(num_children_string === 'three'){
        numChildren = 3;
    }
    else if(num_children_string === 'four'){
        numChildren = 4;
    }
    else if(num_children_string === 'five'){
        numChildren = 5;
    }
    return numChildren;
}




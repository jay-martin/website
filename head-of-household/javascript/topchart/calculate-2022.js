/******************************************************************************************
 * This file contains the functions performing calculations necessary for creating the HOH chart
 * as well as determining the outputs
 * ****************************************************************************************/

/** Returns the difference in tax between a single filer and a head of household at a given income, value of itemized deductions, and number of children
 * @param {integer} - income
 * @param {integer} - monetary value of itemized deductions
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - tax difference
 * */
function hoh_tax_difference_2022(income, itemDeduct, numChildren){
	single_deduction = single_deduction_2023(itemDeduct);
	hoh_deduction = hoh_deduction_2023(itemDeduct);

    return single_tax_liability_2022_with_deduction_value(income, single_deduction) - hoh_tax_liability_2022_with_deduction_value(income, hoh_deduction);
}

/** Returns an array of two arrays containing the x-values c3.js will need to render the chart and the tax difference at each of those values
 * @param {integer} - monetary value of itemized deductions
 * @return {array of two arrays of floats} - 
 * */
function hoh_chart_values_2022(itemDeduct){
	// Calculate combined tax bracket values
	combined_brackets   = combined_brackets_2022(single_tax_brackets, hoh_tax_brackets);

	// Determine deduction value (standard deduction versus itemized deductions)
	single_deduction = single_deduction_2022(itemDeduct);
	hoh_deduction = hoh_deduction_2022(itemDeduct);

	// Calculate the difference in taxes between single and hoh
	tax_difference = [];
	for (var i = 0; i < combined_brackets.length; i++) {
		tax_difference.push(single_tax_liability_2022_with_deduction_value(single_deduction) - hoh_tax_liability_2022_with_deduction_value(hoh_deduction));
	}

	return [combined_brackets, tax_difference];
}

/** Returns effective single tax bracket values when adjusted for a given itemized deductions value
 * @param {integer} - monetary value of itemized deductions
 * @return {array of integers} - income values for adjusted tax brackets
 * */
function single_adjusted_brackets_2022(itemDeduct){
	
	// Determine whether the standard deduction or itemized deductions will be used
	deduction = single_deduction_2022(itemDeduct);

	// Calculate new bracket values
	baseline_brackets = [0, 10275, 41775, 89075, 170050, 215950, 539900];
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
function hoh_adjusted_brackets_2022(itemDeduct){

	// Determine whether the standard deduction or itemized deductions will be used
	deduction = hoh_deduction_2022(itemDeduct);

	// Calculate new bracket values
	baseline_brackets = [0, 14650, 55900, 89050, 170050, 215950, 539900];
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
function single_deduction_2022(itemDeduct){
	itemized = parseInt(itemDeduct.replace(/,/g, ''), 10);
	if(itemized <= 12950){
		return 12950;
	}
	else{
		return itemized;
	}
}

/** Returns either the standard deduction or the itemized deduction depending upon which a head of household would use
 * @param {integer} - monetary value of itemized deductions
 * @return {integer} - larger of the HOH standard deduction and param itemDeduct
 * */
function hoh_deduction_2022(itemDeduct){
	itemized = parseInt(itemDeduct.replace(/,/g, ''), 10);
	if(itemized <= 19400){
		return 19400;
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
function combined_brackets_2022(single_tax_brackets, hoh_tax_brackets){
	// Combine arrays and eliminate any repeated values
	brackSet = new Set(single_tax_brackets.concat(hoh_tax_brackets));

	// Sort in ascending order
	combined_brackets = Array.from(brackSet).sort(function(a,b){return a-b;});

	// Add $0 and $600,000
	combined_brackets.unshift(0);
	combined_brackets.push(600000);

	return combined_brackets;
}

/** Returns 2022 HOH tax liability at a given income for a particular deduction amount
 * @param {integer} - income
 * @param {integer} - value of deductions
 * @return {float} - tax liability
 * */
function hoh_tax_liability_2022_with_deduction_value(income, deductionValue){
	hoh_bracket_reference_values = [0, 14650, 55900, 89050, 170050, 215950, 539900];
	
	adjusted_hoh_bracket_values = [];
	for (var i = 0; i < hoh__bracket_reference_values.length; i++) {
		adjusted_hoh_bracket_values.push(hoh__bracket_reference_values[i] + deductionValue);
	}

	if(income <= adjusted_hoh_bracket_values[0]){
		return 0;
	}
	else if(income <= adjusted_hoh_bracket_values[1]){
		return .1 * (income - adjusted_hoh_bracket_values[0]);
	}
	else if(income <= adjusted_hoh_bracket_values[2]){
		return .12 * (income - adjusted_hoh_bracket_values[1]) + 1465;
	}
	else if(income <= adjusted_hoh_bracket_values[3]){
		return .22 * (income - adjusted_hoh_bracket_values[2]) + 6415;
	}
	else if(income <= adjusted_hoh_bracket_values[4]){
		return .24 * (income - adjusted_hoh_bracket_values[3]) + 13708;
	}
	else if(income <= adjusted_hoh_bracket_values[5]){
		return .32 * (income - adjusted_hoh_bracket_values[4]) + 33148;
	}
	else if(income <= adjusted_hoh_bracket_values[6]){
		return .35 * (income - adjusted_hoh_bracket_values[5]) + 47836;
	}
	else{
		return .37 * (income - adjusted_hoh_bracket_values[6]) + 161218.5;
	}
}

/** Returns 2023 single filer tax liability at a given income for a particular deduction amount
 * @param {integer} - income
 * @param {integer} - value of deductions
 * @return {float} - tax liability
 * */
function single_tax_liability_2022_with_deduction_value(income, deductionValue){
	single_bracket_reference_values = [0, 10275, 41775, 89075, 170050, 215950, 539900];

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
		return .12 * (income - adjusted_single_bracket_values[1]) + 1027.5;
	}
	else if(income <= adjusted_single_bracket_values[3]){
		return .22 * (income - adjusted_single_bracket_values[2]) + 4807.5;
	}
	else if(income <= adjusted_single_bracket_values[4]){
		return .24 * (income - adjusted_single_bracket_values[3]) + 15213.5;
	}
	else if(income <= adjusted_single_bracket_values[5]){
		return .32 * (income - adjusted_single_bracket_values[4]) + 34647.5;
	}
	else if(income <= adjusted_single_bracket_values[6]){
		return .35 * (income - adjusted_single_bracket_values[5]) + 49335.5;
	}
	else{
		return .37 * (income - adjusted_single_bracket_values[6]) + 162718;
	}
}

/** Returns an array of two arrays containing the x-values c3.js will need to render the chart and the tax difference at each of those values WHEN INCLUDING THE CTC
 * @param {integer} - monetary value of itemized deductions
 * @return {array of two arrays of floats} - 
 * */
function tax_difference_with_ctc(itemDeduct, numChildren){
	/* Calculate reference tax bracket values */
	single_tax_brackets = single_adjusted_brackets_2022(itemDeduct);
	hoh_tax_brackets    = hoh_adjusted_brackets_2022(itemDeduct);
	combined_brackets   = combined_brackets_2022(single_tax_brackets, hoh_tax_brackets);

	/* Modify combined_brackets to include effects of the CTC */
	combined_brackets = brackets_after_ctc(combined_brackets, numChildren);

	/* Calculate taxes owed at reference values */
	single_taxes = single_taxes_2022(single_tax_brackets, combined_brackets);
	hoh_taxes = hoh_taxes_2022(hoh_tax_brackets, combined_brackets);

	/* Apply CTC to tax owed */
	single_taxes = taxes_after_ctc(single_taxes, numChildren);
	hoh_taxes = taxes_after_ctc(hoh_taxes, numChildren);

	/* Calculate the difference in taxes between single and hoh */
	taxDif = [];
	for (var i = 0; i < single_taxes.length; i++) {
		taxDif.push(single_taxes[i] - hoh_taxes[i]);
	}

	return [combined_brackets, taxDif];
}

function brackets_after_ctc(combined_brackets_2022, numChildren){
	nonRefund = 600 * numChildren;
	refund = 1400 * numChildren;

	/*Calculate income after standard deduction that single filers end paying $0 */
	additionalSingle = 0;
	newValueSingle = 0;
	if(nonRefund > 1027.5){
		additionalSingle = (nonRefund - 1027.5) / .12;
		newValueSingle = 23225 + additionalSingle;
	}
	else{
		additionalSingle = nonRefund / .1;
		newValueSingle = 12950 + additionalSingle;
	}
	/*Calculate income after standard deduction that hoh filers end paying $0 */
	additionalHOH = 0;
	newValueHOH = 0;
	if(nonRefund > 1465){
		additionalHOH = (nonRefund - 1465) / .12 + 14650;
		newValueHOH = 34050 + additionalHOH;
	}
	else{
		additionalHOH = nonRefund / .1;
		newValueHOH = 19400 + additionalHOH;
	}

	/* add new zero tax values into combined_brackets_2022 array */
	combined_brackets_2022.push(newValueSingle);
	combined_brackets_2022.push(newValueHOH);

	/* sort new arrays */
	combined_brackets_2022.sort(function(a,b){return a-b;});

	return combined_brackets_2022;
}

function taxes_after_ctc(taxes, numChildren){
	for (var i = 0; i < taxes.length; i++) {
		/* Apply nonrefundable portion of CTC */
		taxes[i] = taxes[i] - 600 * numChildren;
		
		/* Set to zero if nonrefundable portion is greater than taxes owed */
		if(taxes[i] < 0){
			taxes[i] = 0;
		}

		/* Apply refundable portion of CTC */
		taxes[i] = taxes[i] - 1400 * numChildren;
	}
	return taxes;
}
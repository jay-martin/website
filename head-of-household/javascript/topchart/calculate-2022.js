/******************************************************************************************
 * This file contains the functions performing calculations necessary for creating the HOH chart
 * as well as determining the outputs
 * ****************************************************************************************/

/** Returns the difference in tax between a single filer and a head of household at a given income, value of itemized deductions, and number of children
 * @param {integer} - income
 * @paragm {integer} - monetary value of itemized deductions
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - tax difference
 * */
function tax_difference_at_income_2022(income, itemDeduct, numChildren){
	if(tax_credit_switch.checked){
		taxDif = tax_difference_with_ctc(itemDeduct, numChildren);
	}
	else{
		taxDif = hoh_chart_values_2022(itemDeduct);
	}

    i=0;
    while(income > taxDif[0][i]){
        i++;
    }

    user_dif = 0;
    if(i === 0){
        user_dif = 0
    }
    else if(taxDif[1][i] != taxDif[1][i-1]){
        factor = (income - taxDif[0][i-1]) / (taxDif[0][i] - taxDif[0][i-1]);
        user_dif = (taxDif[1][i] - taxDif[1][i-1]) * factor + taxDif[1][i-1];
    }
    else{
        user_dif = taxDif[1][i];
    }
    return user_dif;
}

/** Returns an array of two arrays containing the x-values c3.js will need to render the chart and the tax difference at each of those values
 * @paragm {integer} - monetary value of itemized deductions
 * @return {array of two arrays of floats} - 
 * */
function hoh_chart_values_2022(itemDeduct){
	/* Calculate reference tax bracket values */
	single_tax_brackets = single_adjusted_brackets_2022(itemDeduct);
	hoh_tax_brackets    = hoh_adjusted_brackets_2022(itemDeduct);
	combined_brackets   = combined_brackets_2022(single_tax_brackets, hoh_tax_brackets);

	/* Calculate tax owed at reference tax bracket values */
	single_taxes = single_taxes_2022(single_tax_brackets, combined_brackets);
	hoh_taxes = hoh_taxes_2022(hoh_tax_brackets, combined_brackets);

	/* Calculate the difference in taxes between single and hoh */
	taxDif = [];
	for (var i = 0; i < single_taxes.length; i++) {
		taxDif.push(single_taxes[i] - hoh_taxes[i]);
	}

	return [combined_brackets, taxDif];
}

/** Returns an array of two arrays containing the x-values c3.js will need to render the chart and the tax difference at each of those values WHEN INCLUDING THE CTC
 * @paragm {integer} - monetary value of itemized deductions
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

/** Returns effective single tax bracket values when adjusted for a given itemized deductions value
 * @paragm {integer} - monetary value of itemized deductions
 * @return {array of integers} - income values for adjusted tax brackets
 * */
function single_adjusted_brackets_2022(itemDeduct){
	deduction = single_deduction_2022(itemDeduct);
	baseline_brackets = [0, 10275, 41775, 89075, 170050, 215950, 539900];
	new_brackets = [0, 0,  0,  0,   0,  0,  0];
	for (var i = 0; i < new_brackets.length; i++) {
		new_brackets[i] = baseline_brackets[i] + deduction;
	}
	return new_brackets;
}

/** Returns effective hoh tax bracket values when adjusted for a given itemized deductions value
 * @paragm {integer} - monetary value of itemized deductions
 * @return {array of integers} - income values for adjusted tax brackets
 * */
function hoh_adjusted_brackets_2022(itemDeduct){
	deduction = hoh_deduction_2022(itemDeduct);
	baseline_brackets = [0, 14650, 55900, 89050, 170050, 215950, 539900];
	new_brackets = [0, 0,  0,  0,   0,  0,  0];
	for (var i = 0; i < new_brackets.length; i++) {
		new_brackets[i] = baseline_brackets[i] + deduction;
	}
	return new_brackets;
}

/** Returns either the standard deduction or the itemized deduction depending upon which a single taxpayer would use
 * @paragm {integer} - monetary value of itemized deductions
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
 * @paragm {integer} - monetary value of itemized deductions
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
 * @paragm {array of integers} - adjusted single tax bracket values
 * @paragm {array of integers} - adjusted hoh tax bracket values
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

/** Calculates the taxes owed for single filers at specified income values, which have been adjusted for the itemized deduction value
 * @paragm {array of integers} - adjusted single tax bracket values
 * @paragm {array of integers} - merged adjusted & hoh tax bracket values
 * @return {array of floats} - tax owed at the incomes specified in the combined tax bracket array
 * */
function single_taxes_2022(single_brackets, combined_brackets){
	single_tax_reference_values = [0, 1027.5, 4807.5, 15213.5, 34647.5, 49335.5, 162718];
	tax_rates = [0, .1, .12, .22, .24, .32, .35, .37];
	single_taxes = [];
	j = 0;
	for (var i = 0; i < combined_brackets.length; i++) {
		if(combined_brackets[i] <= single_brackets[j]){
			if(j === 0){
				single_taxes.push(0);
			}
			else{
				amt = tax_rates[j] * (combined_brackets[i] - single_brackets[j-1]) + single_tax_reference_values[j-1];
				single_taxes.push(amt);
			}
		}
		else if(combined_brackets[i]===600000){
			single_taxes.push(single_taxes[single_taxes.length - 1]);
		}
		else{
			j++;
			amt = tax_rates[j] * (combined_brackets[i] - single_brackets[j-1]) + single_tax_reference_values[j-1];
			single_taxes.push(amt);
		}
	}
	return single_taxes;
}

/** Calculates the taxes owed for heads of households at specified income values, which have been adjusted for the itemized deduction value
 * @paragm {array of integers} - adjusted HOH tax bracket values
 * @paragm {array of integers} - merged adjusted & hoh tax bracket values
 * @return {array of floats} - tax owed at the incomes specified in the combined tax bracket array
 * */
function hoh_taxes_2022(hoh_brackets, combined_brackets){
	hoh_tax_reference_values = [0, 1465, 6415, 13708, 33148, 47836, 161218.5];
	tax_rates = [0, .1, .12, .22, .24, .32, .35, .37];
	hoh_taxes = [];
	j = 0;
	for (var i = 0; i < combined_brackets.length; i++) {
		if(combined_brackets[i] <= hoh_brackets[j]){
			if(j === 0){
				hoh_taxes.push(0);
			}
			else{
				amt = tax_rates[j] * (combined_brackets[i] - hoh_brackets[j-1]) + hoh_tax_reference_values[j-1];
				hoh_taxes.push(amt);
			}
		}
		else if(combined_brackets[i]===600000){
			hoh_taxes.push(hoh_taxes[hoh_taxes.length - 1]);
		}
		else{
			j++;
			amt = tax_rates[j] * (combined_brackets[i] - hoh_brackets[j-1]) + hoh_tax_reference_values[j-1];
			hoh_taxes.push(amt);
		}
	}
	return hoh_taxes;
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

/** Converts string representing an integer into an integer
 * @paragm {string} - string representing an integer ('none', 'one', 'two', 'three')
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
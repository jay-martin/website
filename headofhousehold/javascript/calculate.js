/** Returns the difference in tax between a single filer and a head of household at a given income, value of itemized deductions, and number of children
 * @param {integer} - income
 * @paragm {integer} - monetary value of itemized deductions
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - tax difference
 * */
function taxDifferenceatIncomeValue(income, itemDeduct, numChildren){
	taxDif = taxDifference(itemDeduct, numChildren);

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
function taxDifference(itemDeduct){
	/* Calculate reference tax bracket values */
	single_tax_brackets = singleNewBrackets(itemDeduct);
	hoh_tax_brackets    = hohNewBrackets(itemDeduct);
	combined_brackets   = combinedBrackets(single_tax_brackets, hoh_tax_brackets);

	/* Calculate tax owed at reference tax bracket values */
	single_taxes = singleTaxes(single_tax_brackets, combined_brackets);
	hoh_taxes = hohTaxes(hoh_tax_brackets, combined_brackets);

	/* Calculate the difference in taxes between single and hoh */
	tax_difference = [];
	for (var i = 0; i < single_taxes.length; i++) {
		tax_difference.push(single_taxes[i] - hoh_taxes[i]);
	}

	return [combined_brackets, tax_difference];
}

/** Returns an array of two arrays containing the x-values c3.js will need to render the chart and the tax difference at each of those values WHEN INCLUDING THE CTC
 * @paragm {integer} - monetary value of itemized deductions
 * @return {array of two arrays of floats} - 
 * */
function tax_difference_with_ctc(itemDeduct, numChildren){
	/* Calculate reference tax bracket values */
	single_tax_brackets = singleNewBrackets(itemDeduct);
	hoh_tax_brackets    = hohNewBrackets(itemDeduct);
	combined_brackets   = combinedBrackets(single_tax_brackets, hoh_tax_brackets);

	/* Modify combined_brackets to include effects of the CTC */
	combined_brackets = brackets_after_ctc(combined_brackets, numChildren);

	/* Calculate taxes owed at reference values */
	single_taxes = singleTaxes(single_tax_brackets, combined_brackets);
	hoh_taxes = hohTaxes(hoh_tax_brackets, combined_brackets);

	/* Apply CTC to tax owed */
	single_taxes = taxes_after_ctc(single_taxes, numChildren);
	hoh_taxes = taxes_after_ctc(hoh_taxes, numChildren);

	/* Calculate the difference in taxes between single and hoh */
	tax_difference = [];
	for (var i = 0; i < single_taxes.length; i++) {
		tax_difference.push(single_taxes[i] - hoh_taxes[i]);
	}

	console.log("Combined brackets:" + combined_brackets);
	console.log("Tax dif: " + tax_difference);

	return [combined_brackets, tax_difference];
}

/* Calculates new effective single tax brackets given the deduction value */
function singleNewBrackets(itemDeduct){
	deduction = single_deduction(itemDeduct);
	baseline_brackets = [0, 10275, 41775, 89075, 170050, 215950, 539900];
	new_brackets = [0, 0,  0,  0,   0,  0,  0];
	for (var i = 0; i < new_brackets.length; i++) {
		new_brackets[i] = baseline_brackets[i] + deduction;
	}
	return new_brackets;
}

/* Calculates new effective hoh tax brackets given the deduction value */
function hohNewBrackets(itemDeduct){
	deduction = hoh_deduction(itemDeduct);
	baseline_brackets = [0, 14650, 55900, 89050, 170050, 215950, 539900];
	new_brackets = [0, 0,  0,  0,   0,  0,  0];
	for (var i = 0; i < new_brackets.length; i++) {
		new_brackets[i] = baseline_brackets[i] + deduction;
	}
	return new_brackets;
}

/* Determines whether a single filer would itemize or use the standard deduction */
function single_deduction(itemDeduct){
	itemized = parseInt(itemDeduct.replace(/,/g, ''), 10);
	if(itemized <= 12950){
		return 12950;
	}
	else{
		return itemized;
	}
}

/* Determines whether a head of household would itemize or use the standard deduction */
function hoh_deduction(itemDeduct){
	itemized = parseInt(itemDeduct.replace(/,/g, ''), 10);
	if(itemized <= 19400){
		return 19400;
	}
	else{
		return itemized;
	}
}

/* Merge the single and hoh tax bracket arrays */
function combinedBrackets(single_tax_brackets, hoh_tax_brackets){
	brackSet = new Set(single_tax_brackets.concat(hoh_tax_brackets));
	combined_brackets = Array.from(brackSet).sort(function(a,b){return a-b;});
	combined_brackets.unshift(0);
	combined_brackets.push(600000);

	return combined_brackets;
}

/* Calculates the taxes owed for single filers given the tax brackets for a specific deduction amount */
function singleTaxes(single_brackets, combined_brackets){
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

/* Calculates the taxes owed for heads of households given the tax brackets for a specific deduction amount */
function hohTaxes(hoh_brackets, combined_brackets){
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

function brackets_after_ctc(combinedBrackets, numChildren){
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

	/* add new zero tax values into combinedBrackets array */
	combinedBrackets.push(newValueSingle);
	combinedBrackets.push(newValueHOH);

	/* sort new arrays */
	combinedBrackets.sort(function(a,b){return a-b;});

	return combinedBrackets;
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
function taxDifferenceatIncomeValue(income, itemDeduct){
	taxDif = taxDifference(itemDeduct);

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

/* Calculates the tax difference between a single filer and hoh at a particular deduction amount */
function taxDifference(itemDeduct){
	single_tax_brackets = singleNewBrackets(itemDeduct);
	hoh_tax_brackets    = hohNewBrackets(itemDeduct);
	combined_brackets = combinedBrackets(single_tax_brackets, hoh_tax_brackets);

	single_taxes = singleTaxes(single_tax_brackets, combined_brackets);
	hoh_taxes = hohTaxes(hoh_tax_brackets, combined_brackets);

	tax_difference = [];
	for (var i = 0; i < single_taxes.length; i++) {
		tax_difference.push(single_taxes[i] - hoh_taxes[i]);
	}
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
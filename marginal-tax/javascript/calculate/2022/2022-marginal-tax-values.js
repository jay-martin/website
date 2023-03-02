/******************************************************************************************
 * This file contains the functions returning the marginal tax rates for each benefit, as
 * well as the function determining pertinent x-values that c3.js needs to render the EMTR chart
 * ****************************************************************************************/

/** Returns the EMTR values of each benefit, as well as the sum of the EMTRs, at a given income
 * @param {integer} - income
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @return {array of floats} - array containing the EMTR's of each benefit, as well as the sum of all benefit values 
 * */
function marginal_tax_rates_at_income_2022(income, num_children, filing_status){
	let householdSize = household_size(filing_status, num_children);

	let personal_income_tax = marginal_tax_of_2022_income_tax_at_income(income, filing_status);
	let fica  = marginal_tax_of_2022_fica_at_income(income);
	let eitc  = marginal_tax_of_2022_eitc_at_income(income, filing_status, num_children);
	let ctc   = marginal_tax_of_2022_ctc_at_income(income, filing_status, num_children);
	let snap  = marginal_tax_of_2022_snap_at_income(income, householdSize);
	let ssi   = marginal_tax_of_2022_ssi_at_income(income, filing_status);
	let ptc   = marginal_tax_of_2022_ptc_at_income(income, filing_status, num_children);
	let ca_income = marginal_tax_of_2022_california_income_tax(income, filing_status);
	let ca_eitc = marginal_tax_of_2022_california_eitc(income, num_children);
	let ca_yctc = marginal_tax_of_2022_california_yctc(income);
	let total = personal_income_tax + fica + eitc + ctc + snap + ptc + ssi + ca_income + ca_eitc + ca_yctc;

	return {
		'personal_income_tax' : personal_income_tax,
		'fica'  : fica,
		'eitc'  : eitc,
		'ctc'   : ctc,
		'snap'  : snap,
		'ssi'   : ssi,
		'ptc'   : ptc,
		'ca_income_tax' : ca_income,
		'ca_eitc' : ca_eitc,
		'ca_yctc' : ca_yctc,
		'total' : total,
	}
}

/** Returns the personal income tax rate at a given income
 * @param {integer} - income
 * @param {string} - string representing filing status of the user ('married', 'hoh', 'single')
 * @return {integer} - personal income tax marginal tax rate
 * */
function marginal_tax_of_2022_income_tax_at_income(income){
	const single = [12950, 23225, 54725,  102025, 183000, 228900, 552850];
	const hoh =    [19400, 34050, 75300,  108450, 189450, 235350, 559300];
	const married= [25900, 46400, 109450, 204050, 366000, 457800, 673750];

	if(isActive['income_tax'] == false){
		return 0;
	}

	if(filingstatus.value === 'single'){brack = single;}
	else if(filingstatus.value === 'hoh'){brack = hoh;}
	else{brack = married;}

	if     (income < brack[0]){ return 0;  }
	else if(income < brack[1]){ return 10; }
	else if(income < brack[2]){ return 12; }
	else if(income < brack[3]){ return 22; }
	else if(income < brack[4]){ return 24; }
	else if(income < brack[5]){ return 32; }
	else if(income < brack[6]){ return 35; }
	else                      { return 37; }
}

/** Returns the fica income tax rate at a given income
 * @param {integer} - income
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2022_fica_at_income(income){
	if(isActive['fica'] === false){
		return 0;
	}

	if(income < 147000){
		return 7.65;
	}
	else if(income >= 147000 && income <200000){
		return 1.45;
	}
	else {
		return 2.35;
	}
}

/** Returns the effective marginal tax rate of the EITC at a given income, for a given filing status and number of children
 * @param {integer} - income
 * @param {string} - string representing filing status of the user ('married', 'hoh', 'single')
 * @param {string} - string representing number of children ('none', 'one', 'two', 'three')
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2022_eitc_at_income(income, filing_status, numChildren){
	if(isActive['eitc']){
		if(filing_status === 'married'){
			if(numChildren ==="three"){
				if(income < 15410){return -45;}
				else if(income < 26262){return 0;}
				else if(income < 59187){return 21.06;}
				else{return 0;}
			}
			else if(numChildren ==="two"){
				if(income < 15290){return -40;}
				else if(income < 26262){return 0;}
				else if(income < 55529){return 21.06;}
				else{return 0;}
			}
			else if(numChildren ==="one"){
				if(income < 10979){return -34;}
				else if(income < 26262){return 0;}
				else if(income < 49622){return 15.98;}
				else{return 0;}
			}
			else{
				if(income < 7320){return -7.65;}
				else if(income < 15290){return 0;}
				else if(income < 22610){return 7.65;}
				else{return 0;}
			}
		}
		else{
			if(numChildren ==="three"){
				if(income < 15410){return -45;}
				else if(income < 20131){return 0;}
				else if(income < 53057){return 21.06;}
				else{return 0;}
			}
			else if(numChildren ==="two"){
				if(income < 15290){return -40;}
				else if(income < 20131){return 0;}
				else if(income < 49399){return 21.06;}
				else{return 0;}
			}
			else if(numChildren ==="one"){
				if(income < 10979){return -34;}
				else if(income < 20131){return 0;}
				else if(income < 43492){return 15.98;}
				else{return 0;}
			}
			else{
				if(income < 7320){return -7.65;}
				else if(income < 9160){return 0;}
				else if(income < 16480){return 7.65;}
				else{return 0;}
			}
		}
	}
	return 0;
}

/** Returns the effective marginal tax rate of the CTC at a given income, for a given filing status and number of children
 * @param {integer} - income
 * @param {string} - string representing filing status of the user ('married', 'hoh', 'single')
 * @param {string} - string representing number of children ('none', 'one', 'two', 'three')
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2022_ctc_at_income(income, filing_status, numChildren){
	if(isActive['ctc'] === false || numChildren === 'none' || income < 2500){
		return 0;
	}

	if(filing_status === 'married'){
		if(numChildren ==="three"){
			if(income < 25900){return -15;}
			else if(income < 32500){return -25;}
			else if(income < 40900){return -10;}
			else if(income < 400000){return 0;}
			else if(income < 520000){return 5;}
			else{return 0;}
		}
		else if(numChildren ==="two"){
			if(income < 22500){return -15;}
			else if(income < 25900){return 0;}
			else if(income < 35900){return -10;}
			else if(income < 400000){return 0;}
			else if(income < 480000){return 5;}
			else{return 0;}
		}
		else if(numChildren ==="one"){
			if(income < 12500){return -15;}
			else if(income < 25900){return 0;}
			else if(income < 30900){return -10;}
			else if(income < 400000){return 0;}
			else if(income < 440000){return 5;}
			else{return 0;}
		}
	}
	else if(filing_status === 'hoh'){
		if(numChildren ==="three"){
			if(income < 19400){return -15;}
			else if(income < 32500){return -25;}
			else if(income < 34050){return -10;}
			else if(income < 34342){return -12;}
			else if(income < 200000){return 0;}
			else if(income < 320000){return 5;}
			else{return 0;}
		}
		else if(numChildren ==="two"){
			if(income < 19400){return -15;}
			else if(income < 22500){return -25;}
			else if(income < 29400){return -10;}
			else if(income < 200000){return 0;}
			else if(income < 280000){return 5;}
			else{return 0;}
		}
		else if(numChildren ==="one"){
			if(income < 12500){return -15;}
			else if(income < 19400){return 0;}
			else if(income < 24400){return -10;}
			else if(income < 200000){return 0;}
			else if(income < 240000){return 5;}
			else{return 0;}
		}
	}
	else if(filing_status === 'single'){
		if(numChildren ==="three"){
			if(income < 12950){return -15;}
			else if(income < 23225){return -25;}
			else if(income < 30129){return -27;}
			else if(income < 200000){return 0;}
			else if(income < 320000){return 5;}
			else{return 0;}
		}
		else if(numChildren ==="two"){
			if(income < 12950){return -15;}
			else if(income < 22500){return -25;}
			else if(income < 22667){return -10;}
			else if(income < 200000){return 0;}
			else if(income < 280000){return 5;}
			else{return 0;}
		}
		else if(numChildren ==="one"){
			if(income < 12500){return -15;}
			else if(income < 12950){return 0;}
			else if(income < 17950){return -10;}
			else if(income < 200000){return 0;}
			else if(income < 240000){return 5;}
			else{return 0;}
		}
	}
}

/** Returns the effective marginal tax rate of SNAP at a given income and household size
 * @param {integer} - income
 * @param {integer} - number of people (adults+children) in the household 
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2022_snap_at_income(income, householdSize){
	if(isActive['snap']){
		if(householdSize == 5){
			if(income < 2760){return 0;}
			else if(income >= 2760  && income < 34452){return 24;}
			else if(income == 34452){return 241392;} 
			else{return 0;}
		}
		else if(householdSize == 4){
			if(income < 2760){return 0;}
			else if(income >= 2760  && income < 34452){return 24;}
			else if(income == 34452){return 241392;} 
			else{return 0;}
		}
		else if(householdSize == 3){
			if(income < 2655){return  0;}
			else if(income >= 2655  && income < 28548){return 24;}
			else if(income == 28548){return 168168;} 
			else{return 0;}
		}
		else if(householdSize == 2){
			if(income < 2655){return 0;}
			else if(income >= 2655  && income < 22656){return 24;}
			else if(income == 22656){return 70776}
			else{return 0;}
		}
		else{
			if(income < 2655){return 0;}
			else if(income >= 2655  && income < 15155){return 24;}
			else{return 0;}
		}
	}
	// snap not active
	return 0;
}

/** Returns the effective marginal tax rate of SSI at a given income
 * @param {integer} - income
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2022_ssi_at_income(income, filing_status){
	if(isActive['ssi'] == false){
		return 0;
	}

	if(filing_status === 'married'){
		if(income >= 780 && income < 31044){
			return 50;
		}
		else {
			return 0;
		}
	}
	else{
		if(income >= 780 && income < 20964){
			return 50;
		}
		else{
			return 0;
		}
	}
}

/** Returns the effective marginal tax rate of the premium tax credits at a given income, for a given number of children
 * @param {integer} - income
 * @param {string} - string representing filing status of the user ('married', 'hoh', 'single')
 * @param {string} - string representing number of children ('none', 'one', 'two', 'three')
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2022_ptc_at_income(income, filing_status, numChildren){
	if(isActive['ptc'] == false){
		return 0;
	}

	if(filing_status === 'married'){
		if(numChildren === "none"){
			if(income < 27465){return 0;}  //150% of two-person household FPL ($18,310)
			else if(income < 54930){return 100 * (.06 / (54930-27465)) * (2*income - 27464);}  //300% of two-person household FPL
			else if(income < 73240){return 100 * (.025 / (73240-54930)) * (2*income - 54929); } //400% of two-person household FPL
			else if(income < 148541){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "one"){
			if(income < 34545){return 0;}  /* 150% of two-person household FPL ($18,310) */
			else if(income < 69090){return 100 * (.06 / (69090-34545)) * (2*income - 34544);}  /* 150–300% of two-person household FPL ($18,310) */
			else if(income < 92120){return 100 * (.025 / (92120-69090)) * (2*income - 69089); } /* 300–400% of two-person household FPL ($18,310) */
			else if(income < 192282){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "two"){
			if(income < 41626){return 0;}  /* 150% of two-person household FPL ($18,310) */
			else if(income < 83250){return 100 * (.06 / (83250-41625)) * (2*income - 41624);}  /* 150–300% of two-person household FPL ($18,310) */
			else if(income < 111000){return 100 * (.025 / (111000-83250)) * (2*income - 83249); } /* 300–400% of two-person household FPL ($18,310) */
			else if(income < 236188){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "three"){
			if(income < 48705){return 0;}  /* 150% of two-person household FPL ($18,310) */
			else if(income < 97410){return 100 * (.06 / (83250-41625)) * (2*income - 41624);}  /* 150–300% of two-person household FPL ($18,310) */
			else if(income < 129880){return 100 * (.025 / (111000-83250)) * (2*income - 83249); } /* 300–400% of two-person household FPL ($18,310) */
			else if(income < 279953){return 8.5;}
			else{return 0;}
		}
	}
	// single & hoh
	else{
		if(numChildren === "none"){
			if(income < 20385){return 0;}  /* 150% of two-person household FPL ($13,590) */
			else if(income < 40770){return 100 * (.06 / (40770-20385)) * (2*income - 20384);}  /* 150–300% of two-person household FPL  */
			else if(income < 54360){return 100 * (.025 / (54360-40770) * (2*income - 40769) + .06); } /* 300–400% of two-person household FPL */
			else if(income < 74259){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "one"){
			if(income < 27465){return 0;}  /* 150% of two-person household FPL ($18,310) */
			else if(income < 54930){return 100 * (.06 / (54930-27465)) * (2*income - 27464);}  /* 150–300% of two-person household FPL ($18,310) */
			else if(income < 73240){return 100 * (.025 / (73240-54930) * (2*income - 54929) + .06); } /* 300–400% of two-person household FPL ($18,310) */
			else if(income < 118024){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "two"){
			if(income < 34545){return 0;}  /* 150% of two-person household FPL ($23,030) */
			else if(income < 69090){return 100 * (.06 / (69090-34545)) * (2*income - 34544);}  /* 150–300% of two-person household FPL */
			else if(income < 92120){return 100 * (.025 / (92120-69090) * (2*income - 69089) +.06); } /* 300–400% of two-person household FPL */
			else if(income < 161929){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "three"){
			if(income < 41626){return 0;}  /* 150% of two-person household FPL ($27,750) */
			else if(income < 83250){return 100 * (.06 / (83250-41625)) * (2*income - 41624);}  /* 150–300% of two-person household FPL */
			else if(income < 111000){return 100 * (.025 / (111000-83250) * (2*income - 83249) + .06); } /* 300–400% of two-person household FPL */
			else if(income < 205694){return 8.5;}
			else{return 0;}
		}
	}	
}

/**************************** California **********************************************************************************************************************************************************/
function marginal_tax_of_2022_california_income_tax(income, filing_status){
	const single_bracket_values  = [5202,  15302, 29145, 42991, 57658, 71498, 343842, 411467, 682478];
	const hoh_bracket_values     = [10404, 30617, 58292, 72135, 86802, 100645, 470952, 563063, 931500];
	const married_bracket_values = [10404, 30603, 58289, 85981, 115315, 142995, 687683, 823133, 1364955];

	if(isActive['ca_income_tax'] == false){
		return 0;
	}

	let bracket_values = eval(filing_status + '_bracket_values');

	if(income < bracket_values[0]){
		return 0;
	}
	else if(income < bracket_values[1]){
		return 1;
	}
	else if(income < bracket_values[2]){
		return 2;
	}
	else if(income < bracket_values[3]){
		return 4;
	}
	else if(income < bracket_values[4]){
		return 6;
	}
	else if(income < bracket_values[5]){
		return 8;
	}
	else if(income < bracket_values[6]){
		return 9.3;
	}
	else if(income < bracket_values[7]){
		return 10.3;
	}
	else if(income < bracket_values[8]){
		return 11.3;
	}
	else{
		return 12.3;
	}
}

function marginal_tax_of_2022_california_eitc(income, num_children){
	if(isActive['ca_eitc'] == false || income >= 30000){
		return 0;
	}

	if(num_children === 'none'){
		if(income < 4229){
			return -6.5;
		}
		else if(income < 5337){
			return 6.5;
		}
		else if(income < 30000){
			return .8;
		}
	}
	else if(num_children === 'one'){
		if(income < 6378){
			return -28.9;
		}
		else if(income < 10984){
			return 28.9;
		}
		else if(income < 30000){
			return 2.7;
		}
	}
	else if(num_children === 'two'){
		if(income < 8932){
			return -34;
		}
		else if(income < 16359){
			return 34;
		}
		else if(income < 30000){
			return 3.75;
		}
	}
	else if(num_children === 'three'){
		if(income < 8933){
			return -38.25;
		}
		else if(income < 16528){
			return 38.25;
		}
		else if(income < 30000){
			return 3.8;
		}
	}
}

function marginal_tax_of_2022_california_yctc(income){
	if(isActive['ca_yctc'] == false){
		return 0;
	}

	if(income < 25000){
		return 0;
	}
	else if(income < 30000){
		return 21.66;
	}
	else{
		return 0;
	}
}




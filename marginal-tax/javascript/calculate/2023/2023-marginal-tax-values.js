/** Returns the EMTR values of each benefit, as well as the sum of the EMTRs, at a given income
 * @param {integer} - income
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @return {dictionary} - dictionary matching name of program to the marginal tax rate it produces at the given income
 * */
function marginal_tax_rates_at_income_2023(income, num_children, filing_status){
	let householdSize = household_size(filing_status, num_children);

	let personal_income_tax = marginal_tax_of_2023_income_tax_at_income(income, filing_status);
	let fica  = marginal_tax_of_2023_fica_at_income(income);
	let eitc  = marginal_tax_of_2023_eitc_at_income(income, filing_status, num_children);
	let ctc   = marginal_tax_of_2023_ctc_at_income(income, filing_status, num_children);
	let snap  = marginal_tax_of_2023_snap_at_income(income, householdSize);
	let ssi   = marginal_tax_of_2023_ssi_at_income(income, filing_status);
	let ptc   = marginal_tax_of_2023_ptc_at_income(income, filing_status, num_children);
	let total = personal_income_tax + fica + eitc + ctc + snap + ptc + ssi;

	return {
		'personal_income_tax' : personal_income_tax,
		'fica'  : fica,
		'eitc'  : eitc,
		'ctc'   : ctc,
		'snap'  : snap,
		'ssi'   : ssi,
		'ptc'   : ptc,
		'total' : total,
	}
}

/** Returns the 2023 personal income tax rate at a given income
 * @param {integer}  - income
 * @param {string}   - string representing filing status of the user ('married', 'hoh', 'single')
 * @return {integer} - personal income tax marginal tax rate
 * */
function marginal_tax_of_2023_income_tax_at_income(income, filing_status){
	const single  = [13850, 24850, 58575,  109225, 195950, 245100, 591975];
	const hoh     = [20800, 36500, 80650,  116150, 202900, 252050, 598900];
	const married = [27700, 49700, 117150, 218450, 391900, 490200, 721450];

	if(isActive['income_tax'] == false){
		return 0;
	}

	if(filing_status === 'single'){brackets = single;}
	else if(filing_status === 'hoh'){brackets = hoh;}
	else{brackets = married;}

	if     (income < brackets[0]){ return 0;  }
	else if(income < brackets[1]){ return 10; }
	else if(income < brackets[2]){ return 12; }
	else if(income < brackets[3]){ return 22; }
	else if(income < brackets[4]){ return 24; }
	else if(income < brackets[5]){ return 32; }
	else if(income < brackets[6]){ return 35; }
	else                         { return 37; }
}

/** Returns the 2023 fica income tax rate at a given income
 * @param {integer} - income
 * @param {string} - string representing filing status of the user ('married', 'hoh', 'single')
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2023_fica_at_income(income, filing_status){
	if(isActive['fica'] === false){
		return 0;
	}

	if(income < 160200){
		return 7.65;
	}
	else if(income < 200000){
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
function marginal_tax_of_2023_eitc_at_income(income, filing_status, num_children){
	if(isActive['eitc'] == false){
		return 0;
	}

	if(filing_status === 'married'){
		if(num_children ==="three"){
			if(income < 16510){return -45;}
			else if(income < 28120){return 0;}
			else if(income < 63398){return 21.06;}
			else{return 0;}
		}
		else if(num_children ==="two"){
			if(income < 16510){return -40;}
			else if(income < 28120){return 0;}
			else if(income < 59478){return 21.06;}
			else{return 0;}
		}
		else if(num_children ==="one"){
			if(income < 11750){return -34;}
			else if(income < 28120){return 0;}
			else if(income < 53120){return 15.98;}
			else{return 0;}
		}
		else{
			if(income < 7840){return -7.65;}
			else if(income < 16370){return 0;}
			else if(income < 24210){return 7.65;}
			else{return 0;}
		}
	}
	else {
		if(num_children ==="three"){
			if(income < 16510){return -45;}
			else if(income < 21560){return 0;}
			else if(income < 56838){return 21.06;}
			else{return 0;}
		}
		else if(num_children ==="two"){
			if(income < 16510){return -40;}
			else if(income < 21560){return 0;}
			else if(income < 52918){return 21.06;}
			else{return 0;}
		}
		else if(num_children ==="one"){
			if(income < 11750){return -34;}
			else if(income < 21560){return 0;}
			else if(income < 46560){return 15.98;}
			else{return 0;}
		}
		else{
			if(income < 7840){return -7.65;}
			else if(income < 9800){return 0;}
			else if(income < 17640){return 7.65;}
			else{return 0;}
		}
	}
}

/** Returns the effective marginal tax rate of the 2023 CTC at a given income, for a given filing status and number of children
 * @param {integer} - income
 * @param {string} - string representing filing status of the user ('married', 'hoh', 'single')
 * @param {string} - string representing number of children ('none', 'one', 'two', 'three')
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2023_ctc_at_income(income, filing_status, num_children){
	if(isActive['ctc'] == false){
		return 0;
	}

	if(filing_status === 'single'){
		if(num_children ==="three"){
			if(income < 2500){return 0;}
			else if(income < 13850){return -15;}
			else if(income < 24850){return -25;}
			else if(income < 30581){return -27;}
			else if(income < 200000){return 0;}
			else if(income < 320000){return 5;}
			else{return 0;}
		}
		else if(num_children ==="two"){
			if(income < 2500){return 0;}
			else if(income < 13850){return -15;}
			else if(income < 23040){return -25;}
			else if(income < 200000){return 0;}
			else if(income < 280000){return 5;}
			else{return 0;}
		}
		else if(num_children ==="one"){
			if(income < 2500){return 0;}
			else if(income < 13167){return -15;}
			else if(income < 13850){return 0;}
			else if(income < 17850){return -10;}
			else if(income < 200000){return 0;}
			else if(income < 240000){return 5;}
			else{return 0;}
		}
		else {
			return 0;
		}
	}
	else if(filing_status === 'hoh'){
		if(num_children ==="three"){
			if(income < 2500){return 0;}
			else if(income < 20800){return -15;}
			else if(income < 33820){return -25;}
			else if(income < 200000){return 0;}
			else if(income < 320000){return 5;}
			else{return 0;}
		}
		else if(num_children ==="two"){
			if(income < 2500){return 0;}
			else if(income < 20800){return -15;}
			else if(income < 23833){return -25;}
			else if(income < 28800){return -12;}
			else if(income < 200000){return 0;}
			else if(income < 280000){return 5;}
			else{return 0;}
		}
		else if(num_children ==="one"){
			if(income < 2500){return 0;}
			else if(income < 13167){return -15;}
			else if(income < 20800){return 0;}
			else if(income < 24800){return -10;}
			else if(income < 200000){return 0;}
			else if(income < 240000){return 5;}
			else{return 0;}
		}
		else {
			return 0;
		}
	}
	else if(filing_status === 'married'){
		if(num_children ==="three"){
			if(income < 2500){return 0;}
			else if(income < 27700){return -15;}
			else if(income < 34500){return -25;}
			else if(income < 39700){return -10;}
			else if(income < 400000){return 0;}
			else if(income < 520000){return 5;}
			else{return 0;}
		}
		else if(num_children ==="two"){
			if(income < 2500){return 0;}
			else if(income < 23833){return -15;}
			else if(income < 27700){return  0;}
			else if(income < 35700){return -10;}
			else if(income < 400000){return 0;}
			else if(income < 480000){return 5;}
			else{return 0;}
		}
		else if(num_children ==="one"){
			if(income < 2500){return 0;}
			else if(income < 13167){return -15;}
			else if(income < 27700){return 0;}
			else if(income < 31700){return -10;}
			else if(income < 400000){return 0;}
			else if(income < 440000){return 5;}
			else{return 0;}
		}
		else {
			return 0;
		}
	}
}

/** Returns the effective marginal tax rate of 2023 SNAP at a given income and household size
 * @param {integer} - income
 * @param {integer} - number of people (adults+children) in the household 
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2023_snap_at_income(income, household_size){
	if(isActive['snap'] == false){
		return 0;
	}

	if(household_size == 5){
		if(income < 3375){return 0;}
		else if(income < 42216){return 24;}
		else if(income == 42216){return 407000;} 
		else{return 0;}
	}
	else if(household_size == 4){
		if(income < 2895){return 0;}
		else if(income < 36083){return 24;}
		else if(income == 36083){return 330300;} 
		else{return 0;}
	}
	else if(household_size == 3){
		if(income < 2895){return  0;}
		else if(income < 29939){return 24;}
		else if(income == 29939){return 238900;} 
		else{return 0;}
	}
	else if(household_size == 2){
		if(income < 2895){return 0;}
		else if(income < 23808){return 24;}
		else if(income == 23808){return 117300}
		else{return 0;}
	}
	else{
		if(income < 2895){return 0;}
		else if(income < 16945){return 24;}
		else{return 0;}
	}
}

/** Returns the effective marginal tax rate of SSI at a given income
 * @param {integer} - income
 * @return {float} - effective marginal tax rate
 * */
function marginal_tax_of_2023_ssi_at_income(income, filing_status){
	if(isActive['ssi'] == false){
		return 0;
	}

	if(filing_status === 'married'){
		if(income >= 780 && income < 33684){
			return 50;
		}
		else {
			return 0;
		}
	}
	else {
		if(income >= 780 && income < 22715){
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
function marginal_tax_of_2023_ptc_at_income(income, filing_status, numChildren){
	if(isActive['ptc'] == false){
		return 0;
	}

	if(filing_status === 'married'){
		if(numChildren === "none"){
			if(income < 29580){return 0;}  /* 150% of two-person household FPL ($19,720) */
			else if(income < 59160){return 100 * (.06 / (59160-29580) * (2*income - 29580 + 1));}  /* 150–300% of two-person household FPL */
			else if(income < 78880){return 100 * (.025 / (78880-59160) * (2*income - 59160 + 1) + .06); } /* 300–400% of two-person household FPL */
			else if(income < 148541){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "one"){
			if(income < 37290){return 0;}  /* 150% of three-person household FPL ($24,860) */
			else if(income < 74580){return 100 * (.06 / (74580-37290) * (2*income - 37290 + 1));}  /* 150–300% of three-person household FPL */
			else if(income < 99440){return 100 * (.025 / (99440-74580) * (2*income - 74580 + 1) + .06); } /* 300–400% of thee-person household FPL */
			else if(income < 192282){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "two"){
			if(income < 45000){return 0;}  /* 150% of four-person household FPL ($30,000) */
			else if(income < 90000){return 100 * (.06 / (90000-45000) * (2*income - 45000 + 1));}  /* 150–300% of four-person household FPL */
			else if(income < 120000){return 100 * (.025 / (120000-90000) * (2*income - 90000 + 1) + .06); } /* 300–400% of four-person household FPL */
			else if(income < 236188){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "three"){
			if(income < 52710){return 0;}  /* 150% of five-person household FPL ($35,140) */
			else if(income < 105420){return 100 * (.06 / (105420-52710) * (2*income - 52710));}  /* 150–300% of five-person household FPL  */
			else if(income < 140560){return 100 * (.025 / (140560-105420) * (2*income - 105420) + .06); } /* 300–400% of five-person household FPL  */
			else if(income < 279953){return 8.5;}
			else{return 0;}
		}
	}
	else {
		if(numChildren === "none"){
			if(income < 22275){return 0;}  /* 150% of one-person household FPL ($14,850) */
			else if(income < 44550){return 100 * (.06 / (44550-22275) * (2*income - 22275 + 1));}  /* 150–300% of one-person household FPL  */
			else if(income < 59400){return 100 * (.025 / (59400-44550) * (2*income - 44550 + 1) + .06); } /* 300–400% of one-person household FPL */
			else if(income < 74259){return 8.5;}
			else{return 0;}
		}
		if(numChildren === "one"){
			if(income < 29580){return 0;}  /* 150% of two-person household FPL ($19,720) */
			else if(income < 59160){return 100 * (.06 / (59160-29580) * (2*income - 29580 + 1));}  /* 150–300% of two-person household FPL */
			else if(income < 78880){return 100 * (.025 / (78880-59160) * (2*income - 59160 + 1) + .06); } /* 300–400% of two-person household FPL */
			else if(income < 118024){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "two"){
			if(income < 37290){return 0;}  /* 150% of three-person household FPL ($24,860) */
			else if(income < 74580){return 100 * (.06 / (74580-37290) * (2*income - 37290 + 1));}  /* 150–300% of three-person household FPL */
			else if(income < 99440){return 100 * (.025 / (99440-74580) * (2*income - 74580 + 1) + .06); } /* 300–400% of thee-person household FPL */
			else if(income < 161929){return 8.5;}
			else{return 0;}
		}
		else if(numChildren === "three"){
			if(income < 45000){return 0;}  /* 150% of four-person household FPL ($30,000) */
			else if(income < 90000){return 100 * (.06 / (90000-45000) * (2*income - 45000 + 1));}  /* 150–300% of four-person household FPL */
			else if(income < 120000){return 100 * (.025 / (120000-90000) * (2*income - 90000) + .06); } /* 300–400% of four-person household FPL */
			else if(income < 205694){return 8.5;}
			else{return 0;}
		}
	}	
}


/******************************************************************************************
 * This file contains the functions returning the marginal tax rates for each benefit, as
 * well as the function determining pertinent x-values that c3.js needs to render the EMTR chart
 * ****************************************************************************************/

/** Returns the EMTR values of each benefit, as well as the sum of the EMTRs **
 * @param {integer} - income
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @return {array of floats} - array containing the benefit values for each benefit, as well as the sum of all benefit values 
 * */
function tax_and_transfer_at_income_marginal(income, numChildren, filingStatus){
	householdSize = household_size(filingStatus, numChildren);

	personalVal = personal_at_income_marginal(income);
	ficaVal = fica_at_income_marginal(income);
	eitcVal = eitc_at_income_marginal(income, numChildren);
	ctcVal = ctc_at_income_marginal(income, numChildren);
	snapVal = snap_at_income_marginal(income, householdSize);
	ptcVal = ptc_at_income_marginal(income, numChildren);
	ssiVal = ssi_at_income_marginal(income);
	totalVal = personalVal + ficaVal + eitcVal + ctcVal + snapVal + ptcVal + ssiVal;

	return [personalVal, ficaVal, eitcVal, ctcVal, snapVal, ptcVal, totalVal];
}

/* Returns the EMTR at a particular income 
Inputs: 
	income: integer of gross income 
	numChildren: string denoting the number of children)
Output: float */
function slope_at_point(income, numChildren){
	householdSize = household_size('single', numChildren);
	return (personal_at_income_marginal(income) + fica_at_income_marginal(income) + eitc_at_income_marginal(income, numChildren) + ctc_at_income_marginal(income, numChildren) + snap_at_income_marginal(income, householdSize) + ptc_at_income_marginal(income, numChildren) + ssi_at_income_marginal(income)) / 100;
}

/* Returns the x-values needed for c3.js to render the EMTR chart 
Inputs: None, determines values by referencing html inputs
Output: Sorted array of integers */
function get_x_values_marginal(){
	numChildren = num_children.value;

	xVals = [];
	if(personal_income_tax_isActive === true){
		tax_bracket_xvals = [12949, 12950, 23224, 23225, 54724, 54725, 102024, 102025, 182999, 183000, 228899, 228900, 552849, 552850];
		xVals = xVals.concat(tax_bracket_xvals);
	}
	if(fica_isActive === true){
		fica_xvals = [146999, 147000, 199999, 200000];
		xVals = xVals.concat(fica_xvals);
	}
	if(eitc_isActive === true){
		if(numChildren === 'none'){
			xVals = xVals.concat([7319, 7320, 9159, 9160, 16479, 16480]);
		}
		else if(numChildren === 'one'){
			xVals = xVals.concat([10978, 10979, 20130, 20131, 43491, 43492]);
		}
		else if(numChildren === 'two'){
			xVals = xVals.concat([15289, 15290, 20130, 20131, 49398, 49399]);
		}
		else if(numChildren === 'three'){
			xVals = xVals.concat([15409, 15410, 20130, 20131, 53056, 53057]);
		}
	}
	if(ctc_isActive === true){
		if(numChildren === 'none'){
			xVals = xVals.concat([]);
		}
		else if(numChildren === 'one'){
			xVals = xVals.concat([2499, 2500, 11832, 11833, 12949, 12950, 18949, 18950, 199999, 200000, 239999, 240000 ]);
		}
		else if(numChildren === 'two'){
			xVals = xVals.concat([2499, 2500, 12949, 12950, 21166, 21167, 23224, 23225, 24657, 24658, 199999, 200000, 279999, 280000]);
		}
		else if(numChildren === 'three'){
			xVals = xVals.concat([2499, 2500, 12949, 12950, 23224, 23225, 30128, 30129, 199999, 200000, 319999, 320000]);
		}
	}
	if(snap_isActive === true){
		if(numChildren === 'none'){
			xVals = xVals.concat([2654, 2655, 15154, 15155]);
		}
		else if(numChildren === 'one'){
			xVals = xVals.concat([2654, 2655, 22655, 22656, 22657]);
		}
		else if(numChildren === 'two'){
			xVals = xVals.concat([2654, 2655, 28547, 28548, 28549]);
		}
		else if(numChildren === 'three'){
			xVals = xVals.concat([2759, 2760, 34451, 34452, 34453]);
		}
	}
	if(ptc_isActive === true){
		if(numChildren === 'none'){
			xVals = xVals.concat([20384, 20385, 40769, 40770, 54359, 54360, 74258, 74259]);
		}
		else if(numChildren === 'one'){
			xVals = xVals.concat([27464, 27465, 54929, 54930, 73239, 73240, 118023, 118024]);
		}
		else if(numChildren === 'two'){
			xVals = xVals.concat([34544, 34545, 69089, 69090, 92119, 92120, 161928, 161929]);
		}
		else if(numChildren === 'three'){
			xVals = xVals.concat([41624, 41625, 83249, 83250, 110999, 111000, 205693, 205694]);
		}
	}
	if(ssi_isActive === true){
		xVals = xVals.concat([779, 780, 20963, 20964]);
	}

	/* add 0 and 600,000 */
	xVals.push(0);
	xVals.push(600000);

	/* sort xVals */
	brackSet = new Set(xVals);
	xVals = Array.from(brackSet).sort(function(a,b){return a-b;});

	return xVals;
}

/* Returns the personal income tax marginal tax rate for a given income 
Inputs: 
	income: integer of gross income 
Output: integer */
function personal_at_income_marginal(income){
	single = [12950, 23225, 54725,  102025, 183000, 228900, 552850];
	hoh =    [19400, 34050, 75300,  108450, 189450, 235350, 559300];
	married= [25900, 46400, 109450, 204050, 366000, 457800, 673750];

	if(filingstatus.value === 'single'){brack = single;}
	else if(filingstatus.value === 'hoh'){brack = hoh;}
	else{brack = married;}

	if(personal_income_tax_isActive === true){
		if(income < brack[0]){
			return 0;
		}
		else if(income >= brack[0] && income < brack[1]){
			return 10;
		}
		else if(income >= brack[1] && income < brack[2]){
			return 12;
		}
		else if(income >= brack[2] && income < brack[3]){
			return 22;
		}
		else if(income >= brack[3] && income < brack[4]){
			return 24;
		}
		else if(income >= brack[4] && income < brack[5]){
			return 32;
		}
		else if(income >= brack[5] && income < brack[6]){
			return 35;
		}
		else{
			return 37;
		}
	}
	return 0;
}

/* Return the marginal tax rate of FICA payroll taxes for a given income
Inputs: 
	income: integer of gross income 
Output: float */
function fica_at_income_marginal(income){
	if(fica_isActive === true){
		if(income < 147000){
			return 7.65;
		}
		else if(income >= 147000 && income <200000){
			return 1.45;
		}
		else{
			return 2.35;
		}
	}
	return 0;
}

/* Returns EITC EMTR for the inputed income and filing status
Inputs: 
	income: integer of gross income 
	numChildren: string denoting the number of children)
Output: integer */
function eitc_at_income_marginal(income, numChildren){
	if(eitc_isActive === true){
		if(filingstatus.value === 'married'){
			if(numChildren ==="three"){
				if(income < 15410){return -45;}
				else if(income >= 15410 && income < 26262){return 0;}
				else if(income >= 26262 && income < 59187){return 21.06;}
				else{return 0;}
			}
			else if(numChildren ==="two"){
				if(income < 15290){return -40;}
				else if(income >= 15290 && income < 26262){return 0;}
				else if(income >= 26262 && income < 55529){return 21.06;}
				else{return 0;}
			}
			else if(numChildren ==="one"){
				if(income < 10979){return -34;}
				else if(income >= 10979 && income < 26262){return 0;}
				else if(income >= 26262 && income < 49622){return 15.98;}
				else{return 0;}
			}
			else{
				if(income < 7320){return -7.65;}
				else if(income >= 7320 && income < 15290){return 0;}
				else if(income >= 15290 && income < 22610){return 7.65;}
				else{return 0;}
			}
		}
		else{
			if(numChildren ==="three"){
				if(income < 15410){return -45;}
				else if(income >= 15410 && income < 20131){return 0;}
				else if(income >= 20131 && income < 53057){return 21.06;}
				else{return 0;}
			}
			else if(numChildren ==="two"){
				if(income < 15290){return -40;}
				else if(income >= 15290 && income < 20131){return 0;}
				else if(income >= 20131 && income < 49399){return 21.06;}
				else{return 0;}
			}
			else if(numChildren ==="one"){
				if(income < 10979){return -34;}
				else if(income >= 10979 && income < 20131){return 0;}
				else if(income >= 20131 && income < 43492){return 15.98;}
				else{return 0;}
			}
			else{
				if(income < 7320){return -7.65;}
				else if(income >= 7320 && income < 9160){return 0;}
				else if(income >= 9160 && income < 16480){return 7.65;}
				else{return 0;}
			}
		}
	}
	return 0;
}

/* Returns the EITC EMTR for the inputed income and filing status
Inputs: 
	income: integer of gross income 
	numChildren: string denoting the number of children)
Output: integer */
function ctc_at_income_marginal(income, numChildren){
	if(ctc_isActive === true){
		if(numChildren ==="three"){
			if(income < 2500){return 0;}
			else if(income >= 2500 && income < 12950){return -15;}
			else if(income >= 12950 && income < 23225){return -25;}
			else if(income >= 23225 && income < 30129){return -27;}
			else if(income >= 30129 && income < 200000){return 0;}
			else if(income >= 200000 && income < 320000){return 5;}
			else{return 0;}
		}
		else if(numChildren ==="two"){
			if(income < 2500){return 0;}
			else if(income >= 2500 && income < 12950){return -15;}
			else if(income >= 12950 && income < 21167){return -25;}
			else if(income >= 21167 && income < 23225){return -10;}
			else if(income >= 23225 && income < 24658){return -12;}
			else if(income >= 24658 && income < 200000){return 0;}
			else if(income >= 200000 && income < 280000){return 5;}
			else{return 0;}
		}
		else if(numChildren ==="one"){
			if(income < 2500){return 0;}
			else if(income >= 2500 && income < 11833){return -15;}
			else if(income >= 11833 && income < 12950){return 0;}
			else if(income >= 12950 && income < 18950){return -10;}
			else if(income >= 18950 && income < 200000){return 0;}
			else if(income >= 200000 && income < 240000){return 5;}
			else{return 0;}
		}
		else{
			return 0;
		}
	}
	return 0;
}

/* Returns SNAP's EMTR for a given income and household size 
Inputs: 
	income: integer of gross income 
	householdSize: integer of the number of people in the household (number of adults+number of children)
Output: integer */
function snap_at_income_marginal(income, householdSize){
	if(snap_isActive === true){
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
	return 0;
}

/* Returns the EMTR of the premium tax credit for a given income and number of children
Inputs: 
	income: integer of gross income 
	numChildren: string denoting the number of children
Output: float */
function ptc_at_income_marginal(income, numChildren){
	if(ptc_isActive === true){
		/* married */
		if(filingstatus.value === 'married'){
			if(numChildren === "none"){
				if(income < 27465){return 0;}  /* 150% of two-person household FPL ($18,310) */
				else if(income >= 27456 && income < 54930){return 100 * (.06 / (54930-27465)) * (2*income - 27464);}  /* 150–300% of two-person household FPL ($18,310) */
				else if(income >= 54930 && income < 73240){return 100 * (.025 / (73240-54930)) * (2*income - 54929); } /* 300–400% of two-person household FPL ($18,310) */
				else if(income >= 73240 && income < 148541){return 8.5;}
				else{return 0;}
			}
			else if(numChildren === "one"){
				if(income < 34545){return 0;}  /* 150% of two-person household FPL ($18,310) */
				else if(income >= 34545 && income < 69090){return 100 * (.06 / (69090-34545)) * (2*income - 34544);}  /* 150–300% of two-person household FPL ($18,310) */
				else if(income >= 69090 && income < 92120){return 100 * (.025 / (92120-69090)) * (2*income - 69089); } /* 300–400% of two-person household FPL ($18,310) */
				else if(income >= 92120 && income < 192282){return 8.5;}
				else{return 0;}
			}
			else if(numChildren === "two"){
				if(income < 41626){return 0;}  /* 150% of two-person household FPL ($18,310) */
				else if(income >= 41625 && income < 83250){return 100 * (.06 / (83250-41625)) * (2*income - 41624);}  /* 150–300% of two-person household FPL ($18,310) */
				else if(income >= 83250 && income < 111000){return 100 * (.025 / (111000-83250)) * (2*income - 83249); } /* 300–400% of two-person household FPL ($18,310) */
				else if(income >= 111000 && income < 236188){return 8.5;}
				else{return 0;}
			}
			else if(numChildren === "three"){
				if(income < 48705){return 0;}  /* 150% of two-person household FPL ($18,310) */
				else if(income >= 48705 && income < 97410){return 100 * (.06 / (83250-41625)) * (2*income - 41624);}  /* 150–300% of two-person household FPL ($18,310) */
				else if(income >= 97410 && income < 129880){return 100 * (.025 / (111000-83250)) * (2*income - 83249); } /* 300–400% of two-person household FPL ($18,310) */
				else if(income >= 129880 && income < 279953){return 8.5;}
				else{return 0;}
			}
		}
		/* single & hoh */
		else{
			if(numChildren === "none"){
				if(income < 20385){return 0;}  /* 150% of two-person household FPL ($13,590) */
				else if(income >= 20385 && income < 40770){return 100 * (.06 / (40770-20385)) * (2*income - 20384);}  /* 150–300% of two-person household FPL  */
				else if(income >= 40770 && income < 54360){return 100 * (.025 / (54360-40770) * (2*income - 40769) + .06); } /* 300–400% of two-person household FPL */
				else if(income >= 54360 && income < 74259){return 8.5;}
				else{return 0;}
			}
			else if(numChildren === "one"){
				if(income < 27465){return 0;}  /* 150% of two-person household FPL ($18,310) */
				else if(income >= 27456 && income < 54930){return 100 * (.06 / (54930-27465)) * (2*income - 27464);}  /* 150–300% of two-person household FPL ($18,310) */
				else if(income >= 54930 && income < 73240){return 100 * (.025 / (73240-54930) * (2*income - 54929) + .06); } /* 300–400% of two-person household FPL ($18,310) */
				else if(income >= 73240 && income < 118024){return 8.5;}
				else{return 0;}
			}
			else if(numChildren === "two"){
				if(income < 34545){return 0;}  /* 150% of two-person household FPL ($23,030) */
				else if(income >= 34545 && income < 69090){return 100 * (.06 / (69090-34545)) * (2*income - 34544);}  /* 150–300% of two-person household FPL */
				else if(income >= 69090 && income < 92120){return 100 * (.025 / (92120-69090) * (2*income - 69089) +.06); } /* 300–400% of two-person household FPL */
				else if(income >= 92120 && income < 161929){return 8.5;}
				else{return 0;}
			}
			else if(numChildren === "three"){
				if(income < 41626){return 0;}  /* 150% of two-person household FPL ($27,750) */
				else if(income >= 41625 && income < 83250){return 100 * (.06 / (83250-41625)) * (2*income - 41624);}  /* 150–300% of two-person household FPL */
				else if(income >= 83250 && income < 111000){return 100 * (.025 / (111000-83250) * (2*income - 83249) + .06); } /* 300–400% of two-person household FPL */
				else if(income >= 111000 && income < 205694){return 8.5;}
				else{return 0;}
			}
		}	
	}
	/* value needed for calculations when ptc is not active */
	return 0;
}

/* PROBLEM: SSI affects SNAP */
/* Returns the EMTR of SSI at a given income
Inputs: 
	income: integer of gross income 
Output: integer */
function ssi_at_income_marginal(income){
	if(ssi_isActive === true){
		if(income >= 780 && income < 20964){
			return 50;
		}
		else{
			return 0;
		}
	}
	/* value needed for calculations when ssi is not active */
	return 0;
}

/* Returns the number of people in a household given the number of adults (determined from marital status) and the number of children
Inputs: 
	filinStatus: string denoting whether the user is single, married or a head of household
	numChildren: string denoting the number of children)
Output: integer */
function household_size(filingStatus, numChildrenString){
	/* Calculate the number of adults */
	if(filingStatus === 'married'){
		numberAdults = 2;
	}
	else{
		numberAdults = 1;
	}

	/* calculate the number of children */
	if(numChildrenString === 'none'){
		numberChildren = 0;
	}
	else if(numChildrenString === 'one'){
		numberChildren = 1;
	}
	else if(numChildrenString === 'two'){
		numberChildren = 2;
	}
	else{
		numberChildren = 3;
	}
	return numberAdults + numberChildren;
}


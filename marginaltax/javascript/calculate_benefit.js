/******************************************************************************************
 * This file contains the functions returning the benefit values for each benefit, as
 * well as the function determining pertinent x-values that c3.js needs to render the EI chart
 * ****************************************************************************************/

/* Returns the benefit values of each benefit, as well as the sum of the benefits
Inputs: 
	income: integer of gross income 
	numChildren: string denoting the number of children)
Output: array of integers
Note: Disabled benefits return a value of 0 */
function tax_and_transfer_at_income(income, numChildren){
	householdSize = household_size('single', numChildren);

	personalVal = personal_tax_at_income(income);
	ficaVal = fica_tax_at_income(income);
	eitcVal = eitc_benefit_at_income(income, numChildren);
	ctcVal = ctc_benefit_at_income(income, numChildren);
	snapVal = snap_benefit_at_income(income, householdSize);
	ptcVal = ptc_benefit_at_income(income, numChildren);
	ssiVal = ssi_benefit_at_income(income);
	totalVal = eitcVal + ctcVal + snapVal + ptcVal + ssiVal - personalVal - ficaVal;

	return [personalVal, ficaVal, eitcVal, ctcVal, snapVal, totalVal];
}

/* Returns the x-values needed for c3.js to render the EI chart 
Inputs: None, determines values by referencing html inputs
Output: Sorted array of integers */
function get_x_values_effective_income(){
	numChildren = num_children.value;

	xVals = [];
	if(personal_income_tax_isActive === true){
		tax_bracket_xvals = [12950, 23225, 54725, 102025, 183000, 228900, 552850];
		xVals = xVals.concat(tax_bracket_xvals);
	}
	if(fica_isActive === true){
		fica_xvals = [147000, 200000];
		xVals = xVals.concat(fica_xvals);
	}
	if(eitc_isActive === true){
		if(numChildren === 'none'){
			xVals = xVals.concat([7320, 9160, 16480]);
		}
		else if(numChildren === 'one'){
			xVals = xVals.concat([10979, 20131, 43492]);
		}
		else if(numChildren === 'two'){
			xVals = xVals.concat([15290, 20131, 49399]);
		}
		else if(numChildren === 'three'){
			xVals = xVals.concat([15410, 20131, 53057]);
		}
	}
	if(ctc_isActive === true){
		if(numChildren === 'none'){
			xVals = xVals.concat([]);
		}
		else if(numChildren === 'one'){
			xVals = xVals.concat([2500, 11833, 12950,18950, 200000, 240000 ]);
		}
		else if(numChildren === 'two'){
			xVals = xVals.concat([2500, 12950, 21167, 23225, 24658, 200000, 280000]);
		}
		else if(numChildren === 'three'){
			xVals = xVals.concat([2500, 12950, 23225, 30129, 200000, 320000]);
		}
	}
	if(snap_isActive === true){
		if(numChildren === 'none'){
			xVals = xVals.concat([2655, 15155]); /*contains one less because calculated SNAP benefit reaches 0 before the eligbility cutoff, whereas with households >1 the benefit is positive at the eligibility cutoff, and so needs a sudden dropoff for the benefit cliff */
		}
		else if(numChildren === 'one'){
			xVals = xVals.concat([2655, 22656, 22657]);
		}
		else if(numChildren === 'two'){
			xVals = xVals.concat([2655, 28548, 28849]);
		}
		else if(numChildren === 'three'){
			xVals = xVals.concat([2760, 34452, 34453]);
		}
	}
	if(ptc_isActive === true){
		if(numChildren === 'none'){
			xVals = xVals.concat([20385, 40770, 54360, 74259]);
		}
		else if(numChildren === 'one'){
			xVals = xVals.concat([27465, 54930, 73240, 118024]);
		}
		else if(numChildren === 'two'){
			xVals = xVals.concat([34545, 69090, 92120, 161929]);
		}
		else if(numChildren === 'three'){
			xVals = xVals.concat([41626, 83250, 111000, 205694]);
		}
	}
	if(ssi_isActive === true){
		xVals = xVals.concat([780, 20964]);
	}

	/* add 0 */
	xVals.push(0);

	/* sort xVals */
	brackSet = new Set(xVals);
	xVals = Array.from(brackSet).sort(function(a,b){return a-b;});

	return xVals;
}

/* Returns the personal income tax liability for a given income 
Inputs: 
	income: integer of gross income 
Output: float */
function personal_tax_at_income(income){
	if(personal_income_tax_isActive === true){
		if(income <= 12950){
			return 0;
		}
		else if(income > 12950 && income <= 23225){
			return .1 * (income - 12950);
		}
		else if(income > 23225 && income <= 54725){
			return .12 * (income - 23225) + 1027.5;
		}
		else if(income > 54725 && income <= 102025){
			return .22 * (income - 54725) + 4807.5;
		}
		else if(income > 102025 && income <= 183000){
			return .24 * (income - 102025) + 15213.5;
		}
		else if(income > 183000 && income <= 228900){
			return .32 * (income - 183000) + 34647.5;
		}
		else if(income > 228900 && income <= 552850){
			return .35 * (income - 228900) + 49335.5;
		}
		else{
			return .37 * (income - 552850) + 162718;
		}
	}
	return 0;
}

/* Returns the FICA tax liability for a given income 
Inputs: 
	income: integer of gross income 
Output: float */
function fica_tax_at_income(income){
	if(fica_isActive === true){
		if(income <= 147000){
			return .0765 * income;
		}
		else if(income > 147000 && income <= 200000){
			return 11245.5 + .0145 * (income - 147000);
		}
		else{
			return 12014 + .0235 * (income - 200000);
		}
	}
	return 0;
}

/* Returns EITC benefit value for a given income and number of children
Inputs: 
	income: integer of gross income 
	numChildren: string representing the number of children
Output: float */
function eitc_benefit_at_income(income, numChildren){
	if(eitc_isActive === true){
		benefit = 0;
		if(numChildren ==="three"){
			if(income < 15410){benefit = .45 * income;}
			else if(income >= 15410 && income <= 20131){benefit = 6935;}
			else if(income >20131 && income <53057){benefit = 11173.8 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren ==="two"){
			if(income < 15290){benefit = .4 * income;}
			else if(income >= 15290 && income <= 20131){benefit = 6164;}
			else if(income >20131 && income <49399){benefit = 10403.4 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren ==="one"){
			if(income < 10979){benefit = .34 * income;}
			else if(income >= 10979 && income <= 20131){benefit = 3733;}
			else if(income >20131 && income <43492){benefit = 6950 - income*.1598;}
			else{benefit = 0;}
		}
		else{
			if(income < 7320){benefit = .0765 * income;}
			else if(income >= 7320 && income <= 9160){benefit = 560;}
			else if(income >9160 && income <16480){benefit = 1260.7 - income*.0765;}
			else{benefit = 0;}
		}
		return benefit;
	}
	return 0;
}

/* Returns CTC benefit value for given income and number of children
Inputs: 
	income: integer of gross income 
	numChildren: string representing the number of children
Output: float */
function ctc_benefit_at_income(income, numChildren){
	if(ctc_isActive === true){
		benefit = 0;
		if(numChildren === 'none'){
			benefit = 0;
		}
		else if(numChildren === 'one'){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 11833){
				benefit = .15 * (income-2500);
			}
			else if(income > 11833 && income <= 12950){
				benefit = 1400;
			}
			else if(income >12950 && income < 18950){
				benefit = 1400 + .1 * (income - 12950);
			}
			else if(income >= 18950 && income <= 200000){
				benefit = 2000;
			}
			else{
				benefit = 2000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 'two'){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 12950){
				benefit = .15 * (income-2500);
			}
			else if(income > 12950 && income <= 21167){
				benefit = 1567.5 + .25 * (income - 12950);
			}
			else if(income >21167 && income < 23225){
				benefit = 3622 + .1 * (income - 21167);
			}
			else if(income >= 23225 && income < 24658){
				benefit = 3828 + .12 * (income - 23225);
			}
			else if(income >= 24658 && income <= 200000){
				benefit = 4000;
			}
			else{
				benefit = 4000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 'three'){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 12950){
				benefit = .15 * (income-2500);
			}
			else if(income > 12950 && income <= 23225){
				benefit = .25 * (income-12950) + 1567.5;
			}
			else if(income > 23225 && income <= 30129){
				benefit = .27 * (income - 23225) + 4136;
			}
			else if(income > 30129 && income <= 200000){
				benefit = 6000;
			}
			else{
				benefit = 6000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 'four'){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 12950){
				benefit = .15 * (income-2500);
			}
			else if(income > 12950 && income <= 23225){
				benefit = .25 * (income-12950) + 1567.5;
			}
			else if(income > 23225 && income <= 37536){
				benefit = .27 * (income - 23225) + 4136;
			}
			else if(income > 37536 && income <= 200000){
				benefit = 8000;
			}
			else{
				benefit = 8000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		return benefit;
	}
	return 0;
}

/* PROBLEM: Currently calculates using number of children when these values are for ~household size~. So they work fine for single but not for married */
/* Returns SNAP benefit value at a given income and household size
Inputs: 
	income: integer of gross income 
	householdSize: string representing the number of people in the household (number of adults+number of children)
Output: float */
function snap_benefit_at_income(income, householdSize){
	if(snap_isActive === true){
		if(householdSize == 4){
			if(income <= 2760){return 10020;}
			else if(income > 2760  && income <= 34452){return 10020 - .24 * (income - 2760);}
			else{return 0;}
		}
		else if(householdSize == 3){
			if(income <= 2655){return  7896;}
			else if(income > 2655  && income <= 28548){return 7896 - .24 * (income - 2655);}
			else{return 0;}
		}
		else if(householdSize == 2){
			if(income <= 2655){return 5508;}
			else if(income > 2655  && income <= 22656){return 5508 - .24 * (income - 2655);}
			else{return 0;}
		}
		else{
			if(income <= 2655){return 3000;}
			if(income > 2655 && income < 15155){return 3000 - .24 * (income - 2655);}
			else{return 0;}
		}
	}
	return 0;
}

/* Returns Medicaid/PTC benefit values at a given income and number of children
Inputs: 
	income: integer of gross income 
	numChildren: string representing the number of children in the household
Output: float */
function ptc_benefit_at_income(income, numChildren){
	if(ptc_isActive === true){
		if(numChildren === "none"){
			if(income <= 20385){return 6312;}  /* 150% of one-person household FPL ($13,590) */
			else if(income > 20385 && income <= 40770){return 6312 - ( .06  * income * income / (40770-20385) + income * (-1 *  (20385 * .06  / (40770-20385) ) ) );}  /* 150–300% of one-person household FPL */
			else if(income > 40770 && income <= 54360){return 6312 - ( .025 * income * income / (54360-40770) + income * (.06 - (40770 * .025 / (54360-40770) ) ) ); } /* 300–400% of one-person household FPL */
			else if(income > 54360 && income <  74259){return 6312 - .085 * income;} /* 400+% of one-person household FPL ($18,310) up to full premium income */
			else{return 0;}
		}
		else if(numChildren === "one"){
			if(income <= 27465){return 10032;}  /* 150% of two-person household FPL ($18,310) */
			else if(income > 27456 && income <= 54930){return 10032 - ( .06  * income * income / (54930-27465) + income * (-1 *  (27465 * .06  / (54930-27465) ) ) );}  /* 150–300% of two-person household FPL  */
			else if(income > 54930 && income <= 73240){return 10032 - ( .025 * income * income / (73240-54930) + income * (.06 - (54930 * .025 / (73240-54930) ) ) );} /* 300–400% of two-person household FPL */
			else if(income > 73240 && income < 118024){return 10032 - .085 * income;} /* 400+% of one-person household FPL ($18,310) up to full premium income */
			else{return 0;}
		}
		else if(numChildren === "two"){
			if(income <= 34545){return 13764;}  /* 150% of two-person household FPL ($23,030) */
			else if(income > 34545 && income <= 69090){return 13764 - ( .06  * income * income / (69090-34545) + income * (-1 *  (34545 * .06  / (69090-34545) ) ) );}  /* 150–300% of three-person household FPL */
			else if(income > 69090 && income <= 92120){return 13764 - ( .025 * income * income / (92129-69090) + income * (.06 - (69090 * .025 / (92129-69090) ) ) ); } /* 300–400% of three-person household FPL */
			else if(income > 92120 && income < 161929){return 13764 - .085 * income;} /* 400+% of one-person household FPL ($18,310) up to full premium income */
			else{return 0;}
		}
		else if(numChildren === "three"){
			if(income <= 41626){return 17484;}  /* 150% of two-person household FPL ($27,750) */
			else if(income > 41625 && income <= 83250){return 17484 - ( .06  * income * income / (83250-41626) + income * (-1 *  (41626 * .06  / (83250-41626) ) ) );}  /* 150–300% of four-person household FPL */
			else if(income > 83250 && income <= 111000){return 17484 - ( .025 * income * income / (111000-83250) + income * (.06 - (83250 * .025 / (111000-83250) ) ) ); } /* 300–400% of four-person household FPL */
			else if(income > 111000 && income < 205694){return 17484 - .085 * income;} /* 400+% of one-person household FPL ($18,310) up to full premium income */
			else{return 0;}
		}
	}
	return 0;
}

/* Returns SSI benefit value at a given income
Inputs: 
	income: integer of gross income 
Output: float */
function ssi_benefit_at_income(income){
	if(ssi_isActive === true){
		if(income <= 780){
			return 10092;
		}
		else if(income > 780 && income < 20964){
			return 10092 - .5 * (income - 780);
		}
		else{
			return 0;
		}
	}
	return 0;
}


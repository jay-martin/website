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

	/* add 0 and 600,000 */
	xVals.push(0);
	xVals.push(600000);

	/* sort xVals */
	brackSet = new Set(xVals);
	xVals = Array.from(brackSet).sort(function(a,b){return a-b;});

	return xVals;
}

function tax_and_transfer_at_income(income, numChildren){
	personalVal = personal_tax_at_income(income);
	ficaVal = fica_tax_at_income(income);
	eitcVal = eitc_benefit_at_income(income, numChildren);
	ctcVal = ctc_benefit_at_income(income, numChildren);
	snapVal = snap_benefit_at_income(income, numChildren);
	totalVal = eitcVal + ctcVal + snapVal - personalVal - ficaVal;

	return [personalVal, ficaVal, eitcVal, ctcVal, snapVal, totalVal];
}

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

/* Calculates EITC tax rate for the inputed income and filing status*/
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

/* Calculates EITC tax rate for the inputed income and filing status*/
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

/* Calculates SNAP benefit */
/* PROBLEM: Currently calculates using number of children when these values are for ~household size~. So they work fine for single but not for married */
function snap_benefit_at_income(income, numChildren){
	if(snap_isActive === true){
		if(numChildren ==="three"){
			if(income <= 2760){return 10020;}
			else if(income > 2760  && income <= 34452){return 10020 - .24 * (income - 2760);}
			else{return 0;}
		}
		else if(numChildren ==="two"){
			if(income <= 2655){return  7896;}
			else if(income > 2655  && income <= 28548){return 7896 - .24 * (income - 2655);}
			else{return 0;}
		}
		else if(numChildren ==="one"){
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


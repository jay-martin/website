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

	/* add 0 and 600,000 */
	xVals.push(0);
	xVals.push(600000);

	/* sort xVals */
	brackSet = new Set(xVals);
	xVals = Array.from(brackSet).sort(function(a,b){return a-b;});

	return xVals;
}

function slope_at_point(income, numChildren){
	return (personal_at_income_marginal(income) + fica_at_income_marginal(income) + eitc_at_income_marginal(income, numChildren) + ctc_at_income_marginal(income, numChildren) + snap_at_income_marginal(income, numChildren)) / 100;
}

function tax_and_transfer_at_income_marginal(income, numChildren){
	personalVal = personal_at_income_marginal(income);
	ficaVal = fica_at_income_marginal(income);
	eitcVal = eitc_at_income_marginal(income, numChildren);
	ctcVal = ctc_at_income_marginal(income, numChildren);
	snapVal = snap_at_income_marginal(income, numChildren);
	totalVal = personalVal + ficaVal + eitcVal + ctcVal + snapVal;

	return [personalVal, ficaVal, eitcVal, ctcVal, snapVal, totalVal];
}

function personal_at_income_marginal(income){
	if(personal_income_tax_isActive === true){
		if(income < 12950){
			return 0;
		}
		else if(income >= 12950 && income < 23225){
			return 10;
		}
		else if(income >= 23225 && income < 54725){
			return 12;
		}
		else if(income >= 54725 && income < 102025){
			return 22;
		}
		else if(income >= 102025 && income < 183000){
			return 24;
		}
		else if(income >= 183000 && income < 228900){
			return 32;
		}
		else if(income >= 228900 && income < 552850){
			return 35;
		}
		else{
			return 37;
		}
	}
	return 0;
}

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

/* Calculates EITC tax rate for the inputed income and filing status*/
function eitc_at_income_marginal(income, numChildren){
	if(eitc_isActive === true){
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
	return 0;
}

/* Calculates EITC tax rate for the inputed income and filing status*/
function ctc_at_income_marginal(income, numChildren){
	if(ctc_isActive === true){
		if(numChildren ==="three"){
			if(income < 2500){return 0;}
			else if(income >= 2500 && income < 12950){return -15;}
			else if(income >= 12950 && income < 23225){return 25;}
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

/* Calculates SNAP benefit */
/* PROBLEM: Currently calculates using number of children when these values are for ~household size~. So they work fine for single but not for married */
function snap_at_income_marginal(income, numChildren){
	if(snap_isActive === true){
		if(numChildren ==="three"){
			if(income < 2760){return 0;}
			else if(income >= 2760  && income < 34452){return 24;}
			else if(income == 34452){return 241392;} 
			else{return 0;}
		}
		else if(numChildren ==="two"){
			if(income < 2655){return  0;}
			else if(income >= 2655  && income < 28548){return 24;}
			else if(income == 28548){return 168168;} 
			else{return 0;}
		}
		else if(numChildren ==="one"){
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


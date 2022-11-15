/* Calculates the difference between the FSA child benefit and the CTC given user inputs */
function child_benefit_difference(income, filingStatus, numYoung, numOld, fsaOneorTwo){
	if(fsaOneorTwo==='one'){
		fsaBenefit = fsa1_child_benefit_value(income, filingStatus, numYoung, numOld);
	}
	else{
		fsaBenefit = fsa2_child_benefit_value(income, filingStatus, numYoung, numOld);
	}
	ctc = ctc_value(income, filingStatus, numYoung, numOld);
	return [fsaBenefit, ctc, fsaBenefit-ctc];
}

/* Calculates the FSA 1.0 child benefit given income, filing status and number of children*/
function fsa1_child_benefit_value(income, filingStatus, numYoung, numOld){
	maxBenefit = 3000 * numOld + 4200 *  numYoung;
	benefit = 0;
	if(filingStatus==="married"){
		if(income <= 400000){
			benefit = maxBenefit;
		}
		else{
			benefit = maxBenefit - ((income-400000) * .05);
			if(benefit < 0){benefit = 0;}
		}
	}
	else if(filingStatus==="hoh" || filingStatus==="single"){
		if(income <= 200000){
			benefit = maxBenefit;
		}
		else{
			benefit = maxBenefit - ((income-200000) * .05);
			if(benefit < 0){benefit = 0;}
		}
	}
	return benefit;
}

/* Calculates the FSA 2.0 child benefit given income, filing status and number of children*/
function fsa2_child_benefit_value(income, filingStatus, numYoung, numOld){
	maxBenefit = 3000 * numOld + 4200 *  numYoung;
	benefit = 0;
	if(filingStatus==="married"){
		if(income <= 10000){
			benefit = (income / 10000) * maxBenefit;
		}
		else if(income > 10000 && income < 400000){
			benefit = maxBenefit;
		}
		else{
			benefit = maxBenefit - ((income-400000) * .05);
			if(benefit < 0){benefit = 0;}
		}
	}
	else if(filingStatus==="hoh" || filingStatus==="single"){
		if(income <= 10000){
			benefit = (income / 10000) * maxBenefit;
		}
		else if(income > 10000 && income < 200000){
			benefit = maxBenefit;
		}
		else{
			benefit = maxBenefit - ((income-200000) * .05);
			if(benefit < 0){benefit = 0;}
		}
	}
	return benefit;
}

/* Calculates the CTC given income, filing status and number of children*/
function ctc_value(income, filingStatus, numYoung, numOld){
	numChildren = numOld + numYoung;
	maxBenefit = 2000 * numChildren;
	
	benefit = 0;
	if(filingStatus==="married"){
		if(numChildren === 0){
			benefit = 0;
		}
		else if(numChildren === 1){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 11833){
				benefit = .15 * (income-2500);
			}
			else if(income > 11833 && income <= 25900){
				benefit = 1400;
			}
			else if(income >25900 && income < 31900){
				benefit = 1400 + .1 * (income - 25900);
			}
			else if(income >= 31900 && income <= 400000){
				benefit = 2000;
			}
			else{
				benefit = 2000 - ((income-400000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 2){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 21167){
				benefit = .15 * (income-2500);
			}
			else if(income > 21167 && income <= 25900){
				benefit = 2800;
			}
			else if(income >25900 && income < 37900){
				benefit = 2800 + .1 * (income - 25900);
			}
			else if(income >= 37900 && income <= 400000){
				benefit = 4000;
			}
			else{
				benefit = 4000 - ((income-400000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 3){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 25900){
				benefit = .15 * (income-2500);
			}
			else if(income > 25900 && income <= 30500){
				benefit = .25 * (income-25900) + 3510;
			}
			else if(income > 30500 && income <= 43900){
				benefit = .1 * (income - 30500) + 4660;
			}
			else if(income > 43900 && income <= 400000){
				benefit = 6000;
			}
			else{
				benefit = 6000 - ((income-400000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 4){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 25900){
				benefit = .15 * (income-2500);
			}
			else if(income > 25900 && income <= 39833){
				benefit = .25 * (income-25900) + 3510;
			}
			else if(income > 39833 && income <= 46450){
				benefit = .1 * (income - 39833) + 6993;
			}
			else if(income > 46450 && income <= 49325){
				benefit = .12 * (income - 46450) + 7655;
			}
			else if (income > 49325 && income <= 400000){
				benefit = 8000;
			}
			else{
				benefit = 8000 - ((income-400000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
	}
	else if(filingStatus==="hoh"){
		if(numChildren === 0){
			benefit = 0;
		}
		else if(numChildren === 1){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 11833){
				benefit = .15 * (income-2500);
			}
			else if(income > 11833 && income <= 19400){
				benefit = 1400;
			}
			else if(income >19400 && income < 25400){
				benefit = 1400 + .1 * (income - 19400);
			}
			else if(income >= 25400 && income <= 200000){
				benefit = 2000;
			}
			else{
				benefit = 2000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 2){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 19400){
				benefit = .15 * (income-2500);
			}
			else if(income > 19400 && income <= 21167){
				benefit = 2535 + .25 * (income - 19400);
			}
			else if(income >21167 && income < 31397){
				benefit = 2977 + .1 * (income - 21167);
			}
			else if(income >= 21167 && income <= 200000){
				benefit = 4000;
			}
			else{
				benefit = 4000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 3){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 19400){
				benefit = .15 * (income-2500);
			}
			else if(income > 19400 && income <= 30500){
				benefit = .25 * (income-19400) + 2535;
			}
			else if(income > 30500 && income <= 34050){
				benefit = .1 * (income - 30500) + 5310;
			}
			else if(income > 34050 && income <= 36842){
				benefit = .12 * (income - 34050) + 5665;
			}
			else if(income > 36842 && income <= 200000){
				benefit = 6000;
			}
			else{
				benefit = 6000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
		else if(numChildren === 4){
			if(income <= 2500){
				benefit = 0;
			}
			else if(income > 2500 && income <= 19400){
				benefit = .15 * (income-2500);
			}
			else if(income > 19400 && income <= 34050){
				benefit = .25 * (income-19400) + 2535;
			}
			else if(income > 34050 && income <= 39833){
				benefit = .27 * (income - 34050) + 6197.5;
			}
			else if(income > 39833 && income <= 41841){
				benefit = .12 * (income - 39833) + 7759;
			}
			else if (income > 41841 && income <= 200000){
				benefit = 8000;
			}
			else{
				benefit = 8000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
	}
	else if(filingStatus==="single"){
		if(numChildren === 0){
			benefit = 0;
		}
		else if(numChildren === 1){
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
		else if(numChildren === 2){
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
		else if(numChildren === 3){
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
		else if(numChildren === 4){
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
	}

	return benefit;
}

function num_young(numYoung){
	young = 0;
	if(numYoung === "none"){
		young = 0;
	}
	else if(numYoung === "one"){
		young = 1;
	}
	if(numYoung === "two"){
		young = 2;
	}
	return young;
}

function num_old(numOld){
	old = 0;
	if(numOld === "none"){
		old = 0;
	}
	else if(numOld === "one"){
		old = 1;
	}
	if(numOld === "two"){
		old = 2;
	}
	return old;
}
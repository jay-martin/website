/******************************************************************************************
 * This file contains the functions returning the benefit values for each benefit, as
 * well as the function determining pertinent x-values that c3.js needs to render the EMTR chart
 * ****************************************************************************************/

function max_benefit_eitc(numChildren){
	if(numChildren === 'none'){
		return 560;
	}
	else if(numChildren === 'one'){
		return 3733;
	}
	else if(numChildren === 'two'){
		return 6164;
	}
	else if(numChildren === 'three'){
		return 6935;
	}
}

function max_benefit_ctc(numChildren){
	if(numChildren === 'none'){
		return 0;
	}
	else if(numChildren === 'one'){
		return 2000;
	}
	else if(numChildren === 'two'){
		return 4000;
	}
	else if(numChildren === 'three'){
		return 6000;
	}
}

/* Returns the value the eitc would be if it did not include a phase-in*/
function non_exclude_eitc_value(income, filingStatus, numChildren){
	benefit = 0
	if(filingStatus==="married"){
		if(numChildren === 'three'){
			if(income <= 26262){benefit = 6935;}
			else if(income > 26262 && income < 59187){benefit = 12464.78 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'two'){
			if(income <= 26262){benefit = 6164;}
			else if(income > 26262 && income < 55529){benefit = 6164 - .2106 * (income - 26262);}
			else{benefit = 0;}
		}
		else if(numChildren === 'one'){
			if(income <= 26262){benefit = 3733;}
			else if(income >26262 && income <49622){benefit = 7939.6 - income*.1598;}
			else{benefit = 0;}
		}
		else{
			if(income <= 15290){benefit = 560;}
			else if(income >15290 && income <22610){benefit = 1730 - income*.0765;}
			else{benefit = 0;}
		}
	}
	if(filingStatus==="single" || filingStatus==="hoh"){
		if(numChildren === 'three'){
			if(income <= 20131){benefit = 6935;}
			else if(income >20131 && income <53057){benefit = 11173.8 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'two'){
			if(income <= 20131){benefit = 6164;}
			else if(income >20131 && income < 49399){benefit =  6164 - .2106 * (income - 20131);}
			else{benefit = 0;}
		}
		else if(numChildren === 'one'){
			if(income <= 20131){benefit = 3733;}
			else if(income >20131 && income < 43492){benefit = 6950 - income*.1598;}
			else{benefit = 0;}
		}
		else{
			if(income <= 9160){benefit = 560;}
			else if(income >9160 && income <16480){benefit = 1260.7 - income*.0765;}
			else{benefit = 0;}
		}
	}
	return benefit;
}

/* Determines if the maximum benefit has already been reached */
/* Returns true if yes */
/* Needed for phaseout region, when max benefit > benefit */
function above_max(income, filingStatus, numChildren){
	if(filingStatus === 'married'){
		if(numChildren === 'none'){
			if(income >= 7320){
				return true;
			}
		}
		else if(numChildren === 'one'){
			if(income >= 26262){
				return true;
			}
		}
		else if(numChildren === 'two'){
			if(income >= 26262){
				return true;
			}
		}
		else if(numChildren === 'three'){
			if(income >= 30500){
				return true;
			}
		}
	}
	else if(filingStatus === 'hoh'){
		if(numChildren === 'none'){
			if(income >= 7320){
				return true;
			}
		}
		else if(numChildren === 'one'){
			if(income >= 20131){
				return true;
			}
		}
		else if(numChildren === 'two'){
			if(income >= 21167){
				return true;
			}
		}
		else if(numChildren === 'three'){
			if(income >= 30500){
				return true;
			}
		}
	}
	else if(filingStatus === 'single'){
		if(numChildren === 'none'){
			if(income >= 7320){
				return true;
			}
		}
		else if(numChildren === 'one'){
			if(income >= 18950){
				return true;
			}
		}
		else if(numChildren === 'two'){
			if(income >= 21167){
				return true;
			}
		}
		else if(numChildren === 'three'){
			if(income >= 30129){
				return true;
			}
		}
	}
	return false;
}

/* Returns the tax difference between a head of household & single filer at input: income */
function hoh_value(income){
	return single_tax(income) - hoh_tax(income);
}

/* Returns the tax a single filer would owe at input: income */
/* Note: only includes first three brackets since chart only shows lower incomes */
/* Note: calculated using standard deduction; does not include itemized deductions functionality*/
function single_tax(income){
	if(income <= 12950){
		return 0;
	}
	else if(income > 12950 && income <= 23225){
		return .1 * (income - 12950);
	}
	else if(income > 23225 && income <= 54725){
		return .12 * (income - 23225) + 1027.5;
	}
	else{
		return .22 * (income - 54725) + 4807.5;
	}
}

/* Returns the tax a head of household would owe at input: income */
/* Note: only includes first three brackets since chart only shows lower incomes */
/* Note: calculated using standard deduction; does not include itemized deductions functionality*/
function hoh_tax(income){
	if(income <= 19400){
		return 0;
	}
	else if(income > 19400 && income <= 34050){
		return .1 * (income - 19400);
	}
	else if(income > 34050 && income <= 75300){
		return .12 * (income - 34050) + 1465;
	}
	else{
		return .22 * (income - 75300) + 6415;
	}
}

/* Returns the EITC benefit given inputs: income, filing status and number of children*/
function eitc_value(income, filingStatus, numChildren){
	benefit = 0
	if(filingStatus==="married"){
		if(numChildren === 'three'){
			if(income < 15410){benefit = .45 * income;}
			else if(income >= 15410 && income <= 26262){benefit = 6935;}
			else if(income >26262 && income <59187){benefit = 12464.78 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'two'){
			if(income < 15290){benefit = .4 * income;}
			else if(income >= 15290 && income <= 26262){benefit = 6164;}
			else if(income >26262 && income <55529){benefit = 11694.4 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'one'){
			if(income < 10979){benefit = .34 * income;}
			else if(income >= 10979 && income <= 26262){benefit = 3733;}
			else if(income >26262 && income <49622){benefit = 7939.6 - income*.1598;}
			else{benefit = 0;}
		}
		else{
			if(income < 7320){benefit = .0765 * income;}
			else if(income >= 7320 && income <= 15290){benefit = 560;}
			else if(income >15290 && income <22610){benefit = 1730 - income*.0765;}
			else{benefit = 0;}
		}
	}
	if(filingStatus==="single" || filingStatus==="hoh"){
		if(numChildren === 'three'){
			if(income < 15410){benefit = .45 * income;}
			else if(income >= 15410 && income <= 20131){benefit = 6935;}
			else if(income >20131 && income <53057){benefit = 11173.8 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'two'){
			if(income < 15290){benefit = .4 * income;}
			else if(income >= 15290 && income <= 20131){benefit = 6164;}
			else if(income >20131 && income <49399){benefit = 10403.4 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'one'){
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
	}
	return benefit;
}

/* Returns the CTC benefit given inputs: income, filing status and number of children*/
function ctc_value(income, filingStatus, numChildren){
	benefit = 0;
	if(filingStatus==="married"){
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
		else if(numChildren === 'two'){
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
		else if(numChildren === 'three'){
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
		else if(numChildren === 'four'){
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
		else if(numChildren === 'two'){
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
		else if(numChildren === 'three'){
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
			else if(income > 34050 && income < 36842){
				benefit = .12 * (income - 34050) + 5665;
			}
			else if(income >= 36842 && income <= 200000){
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
			else if(income > 2500 && income <= 19400){
				benefit = .15 * (income-2500);
			}
			else if(income > 19400 && income <= 34050){
				benefit = .25 * (income-19400) + 2535;
			}
			else if(income > 34050 && income <= 39833){
				benefit = .27 * (income - 34050) + 6197.5;
			}
			else if(income > 39833 && income < 41841){
				benefit = .12 * (income - 39833) + 7759;
			}
			else if (income >= 41841 && income <= 200000){
				benefit = 8000;
			}
			else{
				benefit = 8000 - ((income-200000) * .05);
				if(benefit < 0){benefit = 0;}
			}
		}
	}
	else if(filingStatus==="single"){
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
			else if(income > 23225 && income < 30129){
				benefit = .27 * (income - 23225) + 4136;
			}
			else if(income >= 30129 && income <= 200000){
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
			else if(income > 23225 && income < 37536){
				benefit = .27 * (income - 23225) + 4136;
			}
			else if(income >= 37536 && income <= 200000){
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

function all_reference_values(filingStatus, numChildren){
    eitcReferenceValues = eitc_reference_value(filingStatus, numChildren);
    ctcReferenceValues = ctc_reference_values(filingStatus, numChildren);
    hohReferenceValues = hoh_reference_values();

    if(filingStatus === 'hoh'){
    	fullArray = eitcReferenceValues.concat(ctcReferenceValues).concat(hohReferenceValues);
    }
    else{
    	fullArray = eitcReferenceValues.concat(ctcReferenceValues);
    }

    refSet = new Set(fullArray); /* prevents duplicate values */
    combined_brackets = Array.from(refSet).sort(function(a,b){return a-b;});

    return combined_brackets;
}

function hoh_reference_values(){
	return [0, 12950, 19400, 23225, 34050, 54725, 75300];
}

function eitc_reference_value(filingStatus, numChildren){
    referenceValues = [];

    if(filingStatus==="married"){
        if(numChildren === 'three') {
            referenceValues = [0, 15410, 26262, 59187];
        }
        if(numChildren === 'two') {
            referenceValues = [0, 15290, 26262, 55529];
        }
        if(numChildren === 'one'){
            referenceValues = [0, 10979, 26262, 49622];
        }
        if(numChildren === 'none') {
            referenceValues = [0, 7320, 15290, 22610];
        }
    }
    else if(filingStatus==="hoh" || filingStatus==="single"){
        if(numChildren === 'three') {
            referenceValues = [0, 15410, 20131, 53057];
        }
        if(numChildren === 'two') {
            referenceValues = [0, 15290, 20131, 49399];
        }
        if(numChildren === 'one'){
            referenceValues = [0, 10979, 20131, 43492];
        }
        if(numChildren === 'none') {
            referenceValues = [0, 7320,  9160, 16480];
        }
    }
    return referenceValues;
}

function ctc_reference_values(filingStatus, numChildren){
    referenceValues = [];
    if (filingStatus==="married"){
        if(numChildren === 'none') {
                referenceValues = [];
        }
        if(numChildren === 'one') {
                referenceValues = [0, 2500, 11833, 25900, 31900, 400000, 440000];
        }
        if(numChildren === 'two'){
                referenceValues = [0, 2500, 21167, 25900, 37900, 400000, 480000];
        }
        if(numChildren === 'three'){
                referenceValues = [0, 2500, 25900, 30500, 43900, 400000, 520000];
        }
    }
    else if (filingStatus==="hoh"){
        if(numChildren === 'none') {
                referenceValues = [];
        }
        if(numChildren === 'one') {
                referenceValues = [0, 2500, 11833, 19400, 25400, 200000, 240000];
        }
        if(numChildren === 'two'){
                referenceValues = [0, 2500, 19400, 21167, 31397, 200000, 280000];
        }
        if(numChildren === 'three'){
                referenceValues= [0, 2500, 19400, 30500, 34050, 36842, 200000, 320000];
        }
    }
    else if (filingStatus==="single"){
        if(numChildren === 'none') {
                referenceValues = [];
        }
        if(numChildren === 'one') {
                referenceValues = [0, 2500, 11833, 12950, 18950, 200000, 240000];
        }
        if(numChildren === 'two'){
                referenceValues = [0, 2500, 12950, 21167, 23225, 24658,  200000, 280000];
        }
        if(numChildren === 'three'){
                referenceValues= [0, 2500, 12950, 23225, 30129, 200000, 320000];
        }
    }
    return referenceValues;
}  
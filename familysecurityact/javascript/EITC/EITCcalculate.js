/* Calculates the FSA EITC benefit for the inputed income and filing status*/
function fsa_eitc_calculate(income, filingStatus, numChildren){
	benefit = 0
	if(filingStatus==="married"){
		if(numChildren > 0){
			if(income < 18000){benefit = .1667 * income;}
			else if(income >= 18000 && income <= 33000){benefit = 3000;}
			else if(income >33000 && income <54000){benefit = 7715.7 - income*.1429;}
			else{benefit = 0;}
		}
		else{
			if(income < 16000){benefit = .125 * income;}
			else if(income >= 16000 && income <= 20000){benefit = 2000;}
			else if(income >20000 && income <34000){benefit = 4858 - income*.1429;}
			else{benefit = 0;}
		}
	}
	if(filingStatus==="single" || filingStatus==="hoh"){
		if(numChildren > 0){
			if(income < 12000){benefit = .1667 * income;}
			else if(income >= 12000 && income <= 23000){benefit = 2000;}
			else if(income >23000 && income <37000){benefit = 5286.7 - income*.1429;}
			else{benefit = 0;}
		}
		else{
			if(income < 8000){benefit = .125 * income;}
			else if(income >= 8000 && income <= 10000){benefit = 1000;}
			else if(income >10000 && income <17000){benefit = 2429 - income*.1429;}
			else{benefit = 0;}
		}
	}
	return benefit;
}

/* Calculates the existing EITC benefit for the inputed income and filing status*/
function existingEITC(income, filingStatus, numChildren){
	benefit = 0
	if(filingStatus==="married"){
		if(numChildren >= 3){
			if(income < 15410){benefit = .45 * income;}
			else if(income >= 15410 && income <= 26262){benefit = 6935;}
			else if(income >26262 && income <59187){benefit = 12464.78 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren ===2){
			if(income < 15290){benefit = .4 * income;}
			else if(income >= 15290 && income <= 26262){benefit = 6164;}
			else if(income >26262 && income <55529){benefit = 11694.4 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren ===1){
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
		if(numChildren >= 3){
			if(income < 15410){benefit = .45 * income;}
			else if(income >= 15410 && income <= 20131){benefit = 6935;}
			else if(income >20131 && income <53057){benefit = 11173.8 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren ===2){
			if(income < 15290){benefit = .4 * income;}
			else if(income >= 15290 && income <= 20131){benefit = 6164;}
			else if(income >20131 && income <49399){benefit = 10403.4 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren ===1){
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

function num_children_eitc(numChildrenString){
	numChildren = 0;
	if(numChildrenString === "none"){
		numChildren = 0;
	}
	else if(numChildrenString === "one"){
		numChildren = 1;
	}
	else if(numChildrenString === "two"){
		numChildren = 2;
	}
	else if(numChildrenString === "three"){
		numChildren = 3;
	}
	return numChildren;
}
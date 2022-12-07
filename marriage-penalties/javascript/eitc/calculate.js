/** Returns the sum of the incomes of person 1 and person 2
 * @return {integer}
 * */
function combined_income_marriage_penalty(){
    return parseInt(person1_income.value, 10) + parseInt(person2_income.value,10);
}

/** Returns the sum of the children between person 1 and person 2
 * @return {integer}
 * */
function numChildren(){
    if (person1_children.value==='none' && person2_children.value==='none'){return 0;}
    if ((person1_children.value==='one' && person2_children.value==='none') || (person1_children.value==='none' && person2_children.value==='one')){return 1;}
    if ((person1_children.value==='none' && person2_children.value==='two') || (person1_children.value==='one' && person2_children.value==='one') || (person1_children.value==='two' && person2_children.value==='none')){return 2;}
    if ((person1_children.value==='none' && person2_children.value==='three') || (person1_children.value==='one' && person2_children.value==='two') || (person1_children.value==='two' && person2_children.value==='one') || (person1_children.value==='three' && person2_children.value==='none')){return 3;}
    if ((person1_children.value==='one' && person2_children.value==='three') || (person1_children.value==='two' && person2_children.value==='two') || (person1_children.value==='one '&& person2_children.value==='three')){return 4;}
    if ((person1_children.value==='two' && person2_children.value==='three') || (person1_children.value==='three' && person2_children.value==='two')){return 5;}
    if ((person1_children.value==='three' && person2_children.value==='three')){return 6;}
}

/** Returns the value of the EITC at a given income for a given filing status and number of children
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {integer} - income
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - value of EITC
 * */
function EITC_benefit(filingStatus, income, numChildren){
	benefit = 0
	if(filingStatus==="married"){
		if(numChildren ==="three"){
			if(income < 15410){benefit = .45 * income;}
			else if(income >= 15410 && income <= 26262){benefit = 6935;}
			else if(income >26262 && income <59187){benefit = 12464.78 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren ==="two"){
			if(income < 15290){benefit = .4 * income;}
			else if(income >= 15290 && income <= 26262){benefit = 6164;}
			else if(income >26262 && income <55529){benefit = 11694.4 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren ==="one"){
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
	}
	return benefit;
}

/** Returns the marriage penalty for a given combined income
 * @param {integer} - the sum of the incomes of person 1 and person 2
 * @return {float} - the difference between the sum of the two individual EITC's and the married EITC at their combined income
 * */
function value_marriage_penalty(combined_income){
	combined_children = numChildren();
	numberChildren = 'none';
	if(combined_children === 1){numberChildren='one';}
	else if(combined_children === 2){numberChildren='two';}
	else if (combined_children >2){numberChildren='three';}

	person1 = EITC_benefit('single', person1_income.value, person1_children.value);
	person2 = EITC_benefit('single', person2_income.value, person2_children.value);
	combined = EITC_benefit('married', combined_income, numberChildren);

	return person1 + person2 - combined;

}
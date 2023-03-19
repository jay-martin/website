
/********************** Base Tax Liability (w/ Standard Deduction) ************************************************/

/** Returns 2023 tax liability at a given income for a particular filing status
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {integer} - income
 * @return {float} - tax liability
 * */
function tax_liability_2023(filingStatus, income){
	if(filingStatus === 'single'){
		if(income <= 13850){
			return 0;
		}
		else if(income > 13850 && income <= 24850){
			return .1 * (income - 13850);
		}
		else if(income > 24850 && income <= 58575){
			return .12 * (income - 24850) + 1100;
		}
		else if(income > 58575 && income <= 109225){
			return .22 * (income - 58575) + 5147;
		}
		else if(income > 109225 && income <= 195950){
			return .24 * (income - 109225) + 16290;
		}
		else if(income > 195950 && income <= 245100){
			return .32 * (income - 195950) + 37104;
		}
		else if(income > 245100 && income <= 591975){
			return .35 * (income - 245100) + 52832;
		}
		else{
			return .37 * (income - 591975) + 174238.25;
		}
	}
	else if(filingStatus === 'hoh'){
		if(income <= 20800){
			return 0;
		}
		else if(income > 20800 && income <= 36500){
			return .1 * (income - 20800);
		}
		else if(income > 36500 && income <= 80650){
			return .12 * (income - 36500) + 1570;
		}
		else if(income > 80650 && income <= 116150){
			return .22 * (income - 80650) + 6868;
		}
		else if(income > 116150 && income <= 202900){
			return .24 * (income - 116150) + 14678;
		}
		else if(income > 202900 && income <= 252050){
			return .32 * (income - 202900) + 35498;
		}
		else if(income > 252050 && income <= 598900){
			return .35 * (income - 252050) + 51226;
		}
		else{
			return .37 * (income - 598900) + 172623.5;
		}
	}
	else if(filingStatus === 'married'){
		if(income <= 27700){
			return 0;
		}
		else if(income > 27700 && income <= 49700){
			return .1 * (income - 27700);
		}
		else if(income > 49700 && income <= 117150){
			return .12 * (income - 49700) + 2200;
		}
		else if(income > 117150 && income <= 218450){
			return .22 * (income - 117150) + 10294;
		}
		else if(income > 218450 && income <= 391900){
			return .24 * (income - 218450) + 32580;
		}
		else if(income > 391900 && income <= 490200){
			return .32 * (income - 391900) + 74208;
		}
		else if(income > 490200 && income <= 721450){
			return .35 * (income - 490200) + 105664;
		}
		else{
			return .37 * (income - 721450) + 186601.5;
		}
	}
}

/** Returns 2022 tax liability at a given income for a particular filing status
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {integer} - income
 * @return {float} - tax liability
 * */
function tax_liability_2022(filingStatus, income){
	if(filingStatus === 'single'){
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
	else if(filingStatus === 'hoh'){
		if(income <= 19400){
			return 0;
		}
		else if(income > 19400 && income <= 34050){
			return .1 * (income - 19400);
		}
		else if(income > 34050 && income <= 75300){
			return .12 * (income - 34050) + 1465;
		}
		else if(income > 75300 && income <= 108450){
			return .22 * (income - 75300) + 6415;
		}
		else if(income > 108450 && income <= 189450){
			return .24 * (income - 108450) + 13708;
		}
		else if(income > 189450 && income <= 235350){
			return .32 * (income - 189450) + 33148;
		}
		else if(income > 235350 && income <= 559300){
			return .35 * (income - 235350) + 47836;
		}
		else{
			return .37 * (income - 559300) + 161218.5;
		}
	}
	else if(filingStatus === 'married'){
		if(income <= 25900){
			return 0;
		}
		else if(income > 25900 && income <= 46400){
			return .1 * (income - 25900);
		}
		else if(income > 46400 && income <= 109450){
			return .12 * (income - 46400) + 2050;
		}
		else if(income > 109450 && income <= 204050){
			return .22 * (income - 109450) + 9616;
		}
		else if(income > 204050 && income <= 366000){
			return .24 * (income - 204050) + 30428;
		}
		else if(income > 366000 && income <= 457800){
			return .32 * (income - 366000) + 69296;
		}
		else if(income > 457800 && income <= 673750){
			return .35 * (income - 457800) + 98672;
		}
		else{
			return .37 * (income - 673750) + 174254.5;
		}
	}
}

/** Returns 2023 HOH tax liability at a given income for a particular deduction amount
 * @param {integer} - income
 * @param {integer} - value of deductions
 * @return {float} - tax liability
 * */
function hoh_tax_liability_2023_with_deduction_value(income, deductionValue){
	hoh__bracket_reference_values = [0, 15700, 59850, 95350, 182100, 231250, 578100];
	adjusted_hoh_bracket_values = [];
	for (var i = 0; i < hoh__bracket_reference_values.length; i++) {
		adjusted_hoh_bracket_values.push(hoh__bracket_reference_values[i] + deductionValue);
	}

	if(income <= adjusted_hoh_bracket_values[0]){
		return 0;
	}
	else if(income <= adjusted_hoh_bracket_values[1]){
		return .1 * (income - adjusted_hoh_bracket_values[0]);
	}
	else if(income <= adjusted_hoh_bracket_values[2]){
		return .12 * (income - adjusted_hoh_bracket_values[1]) + 1570;
	}
	else if(income <= adjusted_hoh_bracket_values[3]){
		return .22 * (income - adjusted_hoh_bracket_values[2]) + 6868;
	}
	else if(income <= adjusted_hoh_bracket_values[4]){
		return .24 * (income - adjusted_hoh_bracket_values[3]) + 14678;
	}
	else if(income <= adjusted_hoh_bracket_values[5]){
		return .32 * (income - adjusted_hoh_bracket_values[4]) + 35498;
	}
	else if(income <= adjusted_hoh_bracket_values[6]){
		return .35 * (income - adjusted_hoh_bracket_values[5]) + 51226;
	}
	else{
		return .37 * (income - adjusted_hoh_bracket_values[6]) + 172623.5;
	}
}

/** Returns 2023 single filer tax liability at a given income for a particular deduction amount
 * @param {integer} - income
 * @param {integer} - value of deductions
 * @return {float} - tax liability
 * */
function single_tax_liability_2023_with_deduction_value(income, deductionValue){
	single_bracket_reference_values = [0, 11000, 44725, 95375, 182100, 231250, 578125];
	adjusted_single_bracket_values = [];
	for (var i = 0; i < single_bracket_reference_values.length; i++) {
		adjusted_single_bracket_values.push(single_bracket_reference_values[i] + deductionValue);
	}

	if(income <= adjusted_single_bracket_values[0]){
		return 0;
	}
	else if(income <= adjusted_single_bracket_values[1]){
		return .1 * (income - adjusted_single_bracket_values[0]);
	}
	else if(income <= adjusted_single_bracket_values[2]){
		return .12 * (income - adjusted_single_bracket_values[1]) + 1100;
	}
	else if(income <= adjusted_single_bracket_values[3]){
		return .22 * (income - adjusted_single_bracket_values[2]) + 5147;
	}
	else if(income <= adjusted_single_bracket_values[4]){
		return .24 * (income - adjusted_single_bracket_values[3]) + 16290;
	}
	else if(income <= adjusted_single_bracket_values[5]){
		return .32 * (income - adjusted_single_bracket_values[4]) + 37104;
	}
	else if(income <= adjusted_single_bracket_values[6]){
		return .35 * (income - adjusted_single_bracket_values[5]) + 52832;
	}
	else{
		return .37 * (income - adjusted_single_bracket_values[6]) + 174238.25;
	}
}

/********************** EITC ****************************************************************************************************/

/** Returns the value of the 2023 EITC at a given income for a given filing status and number of children
 * @param {integer} - income
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - value of EITC
 * */
function eitc_value_2023(income, filingStatus, numChildren){
	benefit = 0
	if(filingStatus==="married"){
		if(numChildren === 'three'){
			if(income < 16510){benefit = .45 * income;}
			else if(income >= 16510 && income <= 28120){benefit = 7430;}
			else if(income >  28120 && income <  63398){benefit = 7430 - .2106 * (income - 28120);}
			else{benefit = 0;}
		}
		else if(numChildren === 'two'){
			if(income < 16510){benefit = .4 * income;}
			else if(income >= 16510 && income <= 28120){benefit = 6604;}
			else if(income >  28120 && income <  59478){benefit = 6604 - .2106 * (income - 28120);}
			else{benefit = 0;}
		}
		else if(numChildren === 'one'){
			if(income < 11750){benefit = .34 * income;}
			else if(income >= 11750 && income <= 28120){benefit = 3995;}
			else if(income >  28120 && income <  53120){benefit = 3995 - .1598 * (income - 28120);}
			else{benefit = 0;}
		}
		else{
			if(income < 7840){benefit = .0765 * income;}
			else if(income >= 7840  && income <= 16370){benefit = 600;}
			else if(income >  16370 && income <  24210){benefit = 600 - .0765 * (income - 16370);}
			else{benefit = 0;}
		}
	}
	if(filingStatus === "single" || filingStatus === "hoh"){
		if(numChildren === 'three'){
			if(income < 16510){benefit = .45 * income;}
			else if(income >= 16510 && income <= 21560){benefit = 7430;}
			else if(income >  21560 && income <  56838){benefit = 7430 - .2106 * (income - 21560);}
			else{benefit = 0;}
		}
		else if(numChildren === 'two'){
			if(income < 16510){benefit = .4 * income;}
			else if(income >= 16510 && income <= 21560){benefit = 6604;}
			else if(income >  21560 && income <  52918){benefit = 6604 - .2106 * (income - 21560);}
			else{benefit = 0;}
		}
		else if(numChildren === 'one'){
			if(income < 11750){benefit = .34 * income;}
			else if(income >= 11750 && income <= 21560){benefit = 3995;}
			else if(income >  21560 && income <  46560){benefit = 3995 - .1598 * (income - 21560);}
			else{benefit = 0;}
		}
		else {
			if(income < 7840){benefit = .0765 * income;}
			else if(income >= 7840 && income <= 9800 ){benefit = 600;}
			else if(income >  9800 && income <  17640){benefit = 600 - .0765 * (income - 9800);}
			else{benefit = 0;}
		}
	}
	return benefit;
}

/** Returns the value of the 2022 EITC at a given income for a given filing status and number of children
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {integer} - income
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - value of EITC
 * */
function eitc_value_2022(income, filingStatus, numChildren){
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

/********************** CTC ****************************************************************************************************/
/** Returns the value of the 2023 CTC at a given income for a given filing status and number of children
 * @param {integer} - income
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - value of CTC
 * */
function ctc_value_2023(income, filingStatus, numChildren){
	// Return 0 conditions
	if(numChildren === 'none' || income <= 2500){
		return 0;
	}

	if(filingStatus === 'single'){
		if(numChildren === 'one'){
			if(income < 13167){ return .15 * (income - 2500);}
			else if(income <= 13850){ return 1600;}
			else if(income < 17850){ return 1600 + .1 * (income - 13850);}
			else if(income <= 200000){ return 2000;}
			else if(income < 240000){ return 2000 - .05 * (income - 200000);}
			else{return 0;}
		}
		else if(numChildren === 'two'){
			if(income <= 13850){ return .15 * (income - 2500);}
			else if(income < 23040){ return 1702.5 + .25 * (income - 13850);}
			else if(income <= 200000){ return 4000;}
			else if(income < 280000){ return 4000 - .05 * (income - 200000);}
			else{return 0;}
		}
		else if(numChildren === 'three'){
			if(income <= 13850){ return .15 * (income - 2500);}
			else if(income <= 24850){ return 1702.5 + .25 * (income - 13850);}
			else if(income < 30581){ return 4452.5 + .27 * (income - 24850);}
			else if(income <= 200000){ return 6000;}
			else if(income < 3200000){ return 6000 - .05 * (income - 200000);}
			else{return 0;}
		}
		else if(numChildren === 'four'){
			if(income <= 13850){ return .15 * (income - 2500);}
			else if(income <= 24850){return .25 * (income - 13850) + 1702.5;}
			else if(income < 37989){return .27 * (income - 24850) + 4452.5;}
			else if(income <= 200000){return 8000;}
			else if(income < 360000){return 8000 - .05 * (income - 200000);}
			else{return 0;}
		}
	}
	else if(filingStatus === 'hoh'){
		if(numChildren === 'one'){
			if(income < 13167){ return .15 * (income - 2500);}
			else if(income <= 20800){ return 1600;}
			else if(income < 24800){return 1600 + .1 * (income - 20800);}
			else if(income <= 200000){return 2000;}
			else if(income < 240000){return 2000 - .05 * (income - 200000);}
			else{return 0;}
		}
		else if(numChildren === 'two'){
			if(income <= 20800){ return .15 * (income - 2500);}
			else if(income <= 23833){return 2745 + .25 * (income - 20800);}
			else if(income < 28800){return 3503.25 + .1 * (income - 23833);}
			else if(income <= 200000){return 4000;}
			else if(income < 280000){return 4000 - .05 * (income - 200000);}
			else{return 0;}
		}
		else if(numChildren === 'three'){
			if(income <= 20800){ return .15 * (income - 2500);}
			else if(income < 33820){return 2745 + .25 * (income - 20800);}
			else if(income <= 200000){return 6000;}
			else if(income < 280000){return 6000 - .05 * (income - 200000);}
			else{return 0;}
		}
		else if(numChildren === 'four'){
			if(income <= 20800){ return .15 * (income - 2500);}
			else if(income <= 36500){ return .25 * (income - 20800) + 2745;}
			else if(income < 41426){ return .27 * (income - 36500) + 6670;}
			else if(income <= 200000){return 8000;}
			else if(income < 360000){ return 8000 - .05 * (income - 200000);}
			else{return 0;}
		}
	}
	else if(filingStatus === 'married'){
		if(numChildren === 'one'){
			if(income < 13167){ return .15 * (income - 2500);}
			else if(income <= 27700){ return 1600;}
			else if(income < 31700){return 1600 + .1 * (income - 27700);}
			else if(income <= 400000){return 2000;}
			else if(income < 440000){return 2000 - .05 * (income - 400000);}
			else{return 0;}
		}
		else if(numChildren === 'two'){
			if(income < 23833){ return .15 * (income - 2500);}
			else if(income <= 27700){ return 3200;}
			else if(income < 35700){return 3200 + .1 * (income - 27700);}
			else if(income <= 400000){return 4000;}
			else if(income < 480000){return 4000 - .05 * (income - 400000);}
			else{return 0;}
		}
		else if(numChildren === 'three'){
			if(income <= 27700){ return .15 * (income - 2500);}
			else if(income <= 34500){ return 3780 + .25 * (income - 27700);}
			else if(income < 39700){return 5480 + .1 * (income - 34500);}
			else if(income <= 400000){return 6000;}
			else if(income < 520000){return 6000 - .05 * (income - 400000);}
			else{return 0;}
		}
		else if(numChildren === 'four'){
			if(income <= 27700){ return .15 * (income - 2500);}
			else if(income <  44580){ return .25 * (income - 27700) + 3780;}
			else if(income <= 400000){ return 8000;}
			else if(income < 5600000){ return 8000 - .05 * (income - 200000);}
			else{return 0;}
		}
	}
}

/********************** SNAP ****************************************************************************************************/
/** Returns the value of the 2023 CTC at a given income for a given filing status and number of children
 * @param {integer} - income
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - value of CTC
 * */
function snap_value_2023(income, filing_status, num_children){
	let household_size = calculate_household_size(filing_status, num_children);	

	if(household_size == 'one'){
		if(income < 2895){
			return 3372;
		}
		else if(income < 16945){
			return 3372 - .3 * (.8 * income - 2316);
		}
		else{
			return 0;
		}
	}
	else if(household_size == 'two'){
		if(income < 2895){
			return 6192;
		}
		else if(income <= 23808){
			return 6192 - .3 * (.8 * income - 2316);
		}
		else{
			return 0;
		}
	}
	else if(household_size == 'three'){
		if(income < 2895){
			return 8880;
		}
		else if(income <= 29940){
			return 8880 - .3 * (.8 * income - 2316);
		}
		else{
			return 0;
		}
	}
	else if(household_size == 'four'){
		if(income < 2895){
			return 11268;
		}
		else if(income <= 36084){
			return 11268 - .3 * (.8 * income - 2316);
		}
		else{
			return 0;
		}
	}
	else if(household_size == 'five'){
		if(income < 2895){
			return 13392;
		}
		else if(income <= 42216){
			return 13392 - .3 * (.8 * income - 2316);
		}
		else{
			return 0;
		}
	}
}

/********************** Household Size & Sum Children ****************************************************************************************************/
function calculate_household_size(filing_status, num_children){
    if(filing_status === 'married'){
        if(num_children == 'none'){ return 'two';}
        else if(num_children == 'one'){ return 'three';}
        else if(num_children == 'two'){ return 'four';}
        else if(num_children == 'three'){return 'five';}
    }
    else{
        if(num_children == 'none'){return 'one';}
        else if(num_children == 'one'){return 'two';}
        else if(num_children == 'two'){return 'three';}
        else if(num_children == 'three'){return 'four';}
    }
}

/** Returns a string representing the number of children for the purposes of calculating the married EITC
 * When the number of children is three or greater, 'three' is returned. This is because their is only one EITC curve for families with more three or more children.
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {integer} - income
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {string} - number of children
 * */
function sum_children(person1Children, person2Children){
	if(person1Children === 'none' && person2Children === 'none'){
		return 'none';
	}
	else if( (person1Children === 'one' && person2Children === 'none') || (person1Children === 'none' && person2Children === 'one')){
		return 'one';
	}
	else if( (person1Children === 'two' && person2Children === 'none') || (person1Children === 'none' && person2Children === 'two') || (person1Children === 'one' && person2Children === 'one')){
		return 'two';
	}
	else{
		return 'three';
	}
}
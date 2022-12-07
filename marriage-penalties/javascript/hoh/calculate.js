/** Returns the tax liability at a given income for a particular filing status
 * @param {string} - string representing the filing status ('married', 'hoh', 'single')
 * @param {integer} - income
 * @return {float} - tax liability
 * */
function tax_liability(filingStatus, income){
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
			return .22 * (income - 54725) + 6415;
		}
		else if(income > 108450 && income <= 189450){
			return .24 * (income - 102025) + 13708;
		}
		else if(income > 189450 && income <= 235350){
			return .32 * (income - 183000) + 33148;
		}
		else if(income > 235350 && income <= 559300){
			return .35 * (income - 228900) + 47836;
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


/** Returns the marriage penalty for a given combined income
 * @param {integer} - the sum of the incomes of person 1 and person 2
 * @return {float} - the difference between the sum of the two individual tax liabilities and the married tax liability at their combined income
 * */
function hoh_value_marriage_penalty(){
	person1Income = person1_income.value;
	person2Income = person2_income.value
	combinedIncome = person1Income + person2Income;

	person1 = tax_liability('hoh', person1Income);
	person2 = tax_liability('hoh', person2Income);
	married = tax_liability('married', combinedIncome);

	return married - person1 - person2;
}
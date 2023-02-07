/** Returns the number of people in a household given the number of adults (determined from marital status) and the number of children
 * @param {string} - string representing filing status of the user ('married', 'hoh', 'single')
 * @param {string} - string representing number of children ('none', 'one', 'two', 'three')
 * @return {integer} - number of people in the household
 * */
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

/** Returns the EMTR of all benefits of a particular point
 * @param {integer} - income
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {float} - effective marginal tax rate
 * */
function slope_at_point(income, numChildren){
	householdSize = household_size('single', numChildren);
	return (personal_at_income_marginal(income) + fica_at_income_marginal(income) + eitc_at_income_marginal(income, numChildren) + ctc_at_income_marginal(income, numChildren) + snap_at_income_marginal(income, householdSize) + ptc_at_income_marginal(income, numChildren) + ssi_at_income_marginal(income)) / 100;
}
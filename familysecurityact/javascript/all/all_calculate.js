/*Problem: ChildBenefitcalculate takes integers as input for number of children while EITCcalculate takes strings as input for number of children*/
/*Note that the select HTML object can only use strings as option id values*/

function all_benefits(income, filingStatus, numYoung, numOld, itemDeduct){
	fsa = fsa_total_benefit(income, filingStatus, numYoung, numOld);
	current = current_total_benefit(income, filingStatus, numYoung, numOld, itemDeduct)
	difference = fsa-current;

	return [fsa, current, difference];
}

/* Calculates FSA benefits */
function fsa_total_benefit(income, filingStatus, numYoung, numOld){
	return fsa_child_benefit_value(income, filingStatus, numYoung, numOld) + fsaEITC(income, filingStatus, numYoung+numOld);
}

/* Calculates existing benefits */
function current_total_benefit(income, filingStatus, numYoung, numOld, itemDeduct){
	numChildren = numYoung+numOld;

	eitc = existingEITC(income, filingStatus, numChildren);
	ctc = ctc_value(income, filingStatus, numYoung, numOld);
	console.log("EITC: " + eitc);
	console.log("CTC: " + ctc);

	/*
	if(filingStatus === "hoh"){
		return ctc_value(income, filingStatus, numChildren) + existingEITC(income, filingStatus, numChildren) + taxDifferenceatIncomeValue(income, itemDeduct);
	}
	else{
		return ctc_value(income, filingStatus, numChildren) + existingEITC(income, filingStatus, numChildren);
	}
	*/

	return ctc+eitc;
}
function both_outputs(){
	combined_children = num_children();
    numberChildren = 'none';
    if(combined_children === 1){numberChildren='one';}
    else if(combined_children === 2){numberChildren='two';}
    else if (combined_children >2){numberChildren='three';}

    person1Income = person1_income.value;
	person2Income = person2_income.value;
	combinedIncome = parseInt(person1Income) + parseInt(person2Income);
	person2FilingStatus = person2_filing_status.value;

    //Calculate EITC values
    combinedIncome = combined_income_marriage_penalty();
    person1EITC = EITC_benefit('single', person1Income, person1_children.value);
    person2EITC = EITC_benefit('single', person2Income, person2_children.value);
    combinedEITC = person1EITC + person2EITC;
    marriedEITC = EITC_benefit('married', combinedIncome, numberChildren);

    //Calculate baseline tax liabilities
	person1Tax = tax_liability('hoh', person1Income);
	if(person2FilingStatus === 'single'){ person2Tax = tax_liability('single', person2Income); }
	else{ person2Tax = tax_liability('hoh', person2Income);}
	combinedTax = person1Tax + person2Tax;
	marriedTax = tax_liability('married', combinedIncome);

	//Calculate tax liability after EITC
	person1Total = person1Tax - person1EITC;
	person2Total = person2Tax - person2EITC;
	combintedTotal = person1Total + person2Total;
	marriedTotal = marriedTax - marriedEITC;

	//Output values to screen
	document.getElementById('individual_eitc_values').innerHTML = 'Your pre-credit tax liability is <b>$' + person1Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>. Your EITC is worth <b>$' + person1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, so your after credits you owe <b>$' + person1Total.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes. Your partner has a pre-credit tax liability of <b>$' + person2Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>. Their EITC is worth <b>$' + person2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, so after credits they owe <b>$' + person2Total.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes. Therefore, the two of you pay a combined total of <b>$' + combintedTotal.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes.';
	document.getElementById('married_eitc_value').innerHTML = 'With a combined income of $' + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ', if you married your pre-credit tax liability would be <b>$' + marriedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>. Your EITC would be worth <b>$' + marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, so after credits you would owe <b>$' + marriedTotal.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes.';

	/* Print marriage penalty to screen */
    penalty = marriedTotal - combintedTotal;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>bonus</em> of <b>$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else{
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>penalty</em> of <b>$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
}
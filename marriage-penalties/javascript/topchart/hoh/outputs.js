// Output to screen taxes owed and marriage penalty
function hoh_outputs(){
	person1Income = person1_income.value;
	person2Income = person2_income.value;
	combinedIncome = parseInt(person1Income) + parseInt(person2Income);
	person2FilingStatus = person2_filing_status.value;

	//Calculate tax liabilities
	person1Tax = tax_liability('hoh', person1Income);
	if(person2FilingStatus === 'single'){ person2Tax = tax_liability('single', person2Income); }
	else{ person2Tax = tax_liability('hoh', person2Income);}
	combinedTax = person1Tax + person2Tax;
	marriedTax = tax_liability('married', combinedIncome);

	/* Print updated data to screen*/
    document.getElementById('individual_eitc_values').innerHTML = 'You owe <b>$' + person1Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in income tax and your partner owes <b>$" + person2Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined tax liability of <b>$" + combinedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('married_eitc_value').innerHTML = "With a combined income of $" + combinedIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would owe <b>$" + marriedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"</b> in income tax.";

    /* Print marriage penalty to screen */
    penalty = marriedTax - person1Tax - person2Tax;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>bonus</em> of <b>$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else{
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>penalty</em> of <b>$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
}
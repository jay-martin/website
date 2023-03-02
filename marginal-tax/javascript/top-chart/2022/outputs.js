/******************************************************************************************
 * This file contains the functions that outputs to the screen the EMTR
 * as well as the function that reveal the highlights when clicked
 * ****************************************************************************************/

// Outputs to screen the marginal tax rate
function top_chart_outputs_2022(){
	let income = user_income.value;
	let filing_status = filingstatus.value;
    let numChildren = num_children.value;
    let householdSize = household_size('single', numChildren);

    let marginal_tax_rates = marginal_tax_rates_at_income_2022(income, numChildren, filing_status);
    let personal = marginal_tax_rates['personal_income_tax'];
    let fica     = marginal_tax_rates['fica'];
    let eitc     = marginal_tax_rates['eitc'];
    let ctc      = marginal_tax_rates['ctc'];
    let snap     = marginal_tax_rates['snap'];
    let ssi      = marginal_tax_rates['ssi'];
    let ptc      = marginal_tax_rates['ptc'];
    let ca_income = marginal_tax_rates['ca_income_tax'];
    let ca_eitc  = marginal_tax_rates['ca_eitc'];
    let ca_yctc  = marginal_tax_rates['ca_yctc'];

    let taxLiability = personal + fica + ca_income;
    let benefitLoss = eitc + ctc + snap + ptc + ssi + ca_eitc + ca_yctc;
    let taxRate = taxLiability + benefitLoss;

    // format taxRate that there is a decimal if values are not a whole number, but no decimal if it is a whole number
    if(taxRate.toFixed(2) - Math.floor(taxRate) !== 0){
    	taxRate_formatted = taxRate.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else{
    	taxRate_formatted = taxRate.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    document.getElementById('marginal_tax_rate').innerHTML = 'On an additonal dollar of income, you face an effective marginal tax rate of <b>' + taxRate_formatted + '%</b>.';

    // Format taxLiability
    if(taxLiability.toFixed(2) - Math.floor(taxLiability) !== 0){
    	taxLiability_formatted = taxLiability.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else{taxLiability_formatted = taxLiability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}

    // Conditionals for taxes
    if( (isActive['income_tax'] && isActive['fica']) || (isActive['ca_income_tax'] && isActive['fica']) ){
    	document.getElementById('tax_liability').innerHTML = '<b>' + taxLiability_formatted + '¢</b> in income and payroll tax.';
    }
    else if(isActive['income_tax'] || isActive['ca_income_tax']){
    	document.getElementById('tax_liability').innerHTML = '<b>' + taxLiability_formatted + '¢</b> in income tax.';
    }
    else if(isActive['fica']){
    	document.getElementById('tax_liability').innerHTML = '<b>' + taxLiability_formatted + '¢</b> in payroll tax.';
    }
    else{
    	document.getElementById('tax_liability').innerHTML = 'You have not selected any taxes.'
    }

    // Format benefitLoss
    if(benefitLoss.toFixed(2) - Math.floor(benefitLoss) !== 0){benefitLoss_formatted = benefitLoss.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
    else{benefitLoss_formatted = benefitLoss.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}

    // Conditionals for benefits
    numBenefitsActive = isActive['eitc'] + isActive['ctc'] + isActive['snap'] + isActive['ptc'] + isActive['ssi'] + isActive['ca_eitc'] + isActive['ca_yctc'];
    if(numBenefitsActive == 0){
    	document.getElementById('benefit_loss_text').innerHTML = 'You have not selected any benefits.'
    	document.getElementById('benefits_breakdown_button').style.display = 'none';
    	
    	// The below is needed to reset the benefits breakdown after a user first selects several benefit and then unselects all of them 
    	is_open['benefits_breakdown'] = 'open';
    	open_and_close_breakdown('benefits_breakdown', 'benefits_breakdown_button');

    }
    else{
		document.getElementById('benefits_breakdown_button').style.display = 'inline-block';

    	if(benefitLoss >= 0){
    		document.getElementById('benefit_loss_text').innerHTML = '<b>' + benefitLoss_formatted + '¢</b> of lost benefits.';
    	}
    	else {
    		benefitLoss = benefitLoss * -1;
    		if(benefitLoss.toFixed(2) - Math.floor(benefitLoss) !== 0){benefitLoss_formatted = benefitLoss.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		    else{benefitLoss_formatted = benefitLoss.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
    		document.getElementById('benefit_loss_text').innerHTML = '<b>' + benefitLoss_formatted + '¢</b> of increased benefits.';
    	}
    }

    // function that determines which benefits to display in the benefits breakdown
    benefits_breakdown(eitc, ctc, snap, ptc, ssi, ca_eitc, ca_yctc);

    // Output a no benefits selected warning when all benefits are deselected
	if(Object.values(isActive).every((v) => v === false)){
		document.getElementById('marginal_tax_rate').innerHTML = 'No Benefits Selected';
	}
}

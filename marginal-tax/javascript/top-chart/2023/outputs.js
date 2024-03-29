/******************************************************************************************
 * This file contains the functions that outputs to the screen the EMTR
 * as well as the function that reveal the highlights when clicked
 * ****************************************************************************************/

// Default values
document.getElementById('marginal_tax_rate').innerHTML = 'On an additional dollar of income, you face an effective marginal tax rate of <b>12%</b>.';
document.getElementById('tax_liability').innerHTML = '<b>12¢</b> in income tax.';
document.getElementById('benefit_loss_text').innerHTML = 'You have not selected any benefits.';

// Outputs to screen the marginal tax rate
function top_chart_outputs_2023(){
	let income        = user_income.value;
	let filing_status = filingstatus.value;
    let numChildren   = num_children.value;
    let householdSize = household_size('single', numChildren);

    let marginal_tax_rates = marginal_tax_rates_at_income_2023(income, numChildren, filing_status);
    let personal = marginal_tax_rates['personal_income_tax'];
    let fica     = marginal_tax_rates['fica'];
    let eitc     = marginal_tax_rates['eitc'];
    let ctc      = marginal_tax_rates['ctc'];
    let snap     = marginal_tax_rates['snap'];
    let ssi      = marginal_tax_rates['ssi'];
    let ptc      = marginal_tax_rates['ptc'];

    let taxLiability = personal + fica;
    let benefitLoss = eitc + ctc + snap + ptc + ssi;
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
    if(isActive['income_tax'] && isActive['fica']){
    	document.getElementById('tax_liability').innerHTML = '<b>' + taxLiability_formatted + '¢</b> in income and payroll tax.';
    }
    else if(isActive['income_tax']){
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
    numBenefitsActive = isActive['eitc'] + isActive['ctc'] + isActive['snap'] + isActive['ptc'] + isActive['ssi'];
    if(numBenefitsActive == 0){
    	document.getElementById('benefit_loss_text').innerHTML = 'You have not selected any benefits.'
    	document.getElementById('benefits_breakdown_button').style.display = 'none';
    	
    	// The below is needed to reset the benefits breakdown after a user first selects several benefit and then unselects all of them 
    	is_open['benefits_breakdown'] = true;
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
    benefits_breakdown(eitc, ctc, snap, ptc, ssi);

    // Output a no benefits selected warning when all benefits are deselected
	if(Object.values(isActive).every((v) => v === false)){
		document.getElementById('marginal_tax_rate').innerHTML = 'No Benefits Selected';
	}
}

function benefits_breakdown(eitc, ctc, snap, ptc, ssi, ca_eitc, ca_yctc){
	if(isActive['eitc']){
		document.getElementById('eitc_marginal').style.display = 'list-item';
		if(eitc >=0 ){
			if(eitc.toFixed(2) - Math.floor(eitc) !== 0){ eitc_formatted = eitc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
			else{eitc_formatted = eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
			document.getElementById('eitc_marginal').innerHTML = '<b>EITC:</b> ' + eitc_formatted + '¢ credit reduction';
		}
		else{
			eitc = eitc * -1;
			if(eitc.toFixed(2) - Math.floor(eitc) !== 0){ eitc_formatted = eitc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
			else{eitc_formatted = eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
			document.getElementById('eitc_marginal').innerHTML = '<b>EITC:</b> ' + eitc_formatted + '¢ credit increase';
		}
	}
	else{
		document.getElementById('eitc_marginal').style.display = 'none';
	}

	if(isActive['ctc']){
		document.getElementById('ctc_marginal').style.display = 'list-item';
		if(ctc >=0 ){
			if(ctc.toFixed(2) - Math.floor(ctc) !== 0){ ctc_formatted = ctc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
			else{ctc_formatted = ctc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
			document.getElementById('ctc_marginal').innerHTML = '<b>CTC:</b> ' + ctc_formatted + '¢ credit reduction';
		}
		else{
			ctc = ctc * -1;
			if(ctc.toFixed(2) - Math.floor(ctc) !== 0){ ctc_formatted = ctc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
			else{ctc_formatted = ctc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
			document.getElementById('ctc_marginal').innerHTML = '<b>CTC:</b> ' + ctc_formatted + '¢ credit increase';
		}
	}
	else{
		document.getElementById('ctc_marginal').style.display = 'none';
	}

	if(isActive['snap']){
		if(snap.toFixed(2) - Math.floor(snap) !== 0){ snap_formatted = snap.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
		else{snap_formatted = snap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		document.getElementById('snap_marginal').innerHTML = '<b>SNAP:</b> ' + snap_formatted + '¢ benefit loss';
		document.getElementById('snap_marginal').style.display = 'list-item';
	}
	else{
		document.getElementById('snap_marginal').style.display = 'none';
	}

	if(isActive['ptc']){
		if(ptc.toFixed(2) - Math.floor(ptc) !== 0){ ptc_formatted = ptc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
		else{ptc_formatted = ptc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		document.getElementById('ptc_marginal').innerHTML = '<b>Premium Tax Credits: </b>' + ptc_formatted + '¢ credit reduction';
		document.getElementById('ptc_marginal').style.display = 'list-item';
	}
	else{
		document.getElementById('ptc_marginal').style.display = 'none';
	}

	if(isActive['ssi']){
		if(ssi.toFixed(2) - Math.floor(ssi) !== 0){ ssi_formatted = ssi.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
		else{ssi_formatted = ssi.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		document.getElementById('ssi_marginal').innerHTML = '<b>SSI:</b> ' + ssi_formatted + '¢ benefit loss';
		document.getElementById('ssi_marginal').style.display = 'list-item';
	}
	else{
		document.getElementById('ssi_marginal').style.display = 'none';
	}

	if(isActive['ca_eitc']){
		if(ca_eitc.toFixed(2) - Math.floor(ca_eitc) !== 0){ ca_eitc_formatted = ca_eitc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
		else{ca_eitc_formatted = ca_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		document.getElementById('ca_eitc_marginal').innerHTML = '<b>CalEITC:</b> ' + ca_eitc_formatted + '¢ benefit loss';
		document.getElementById('ca_eitc_marginal').style.display = 'list-item';
	}
	else{
		document.getElementById('ca_eitc_marginal').style.display = 'none';
	}

	if(isActive['ca_yctc']){
		if(ca_yctc.toFixed(2) - Math.floor(ca_yctc) !== 0){ ca_yctc_formatted = ca_yctc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
		else{ca_yctc_formatted = ca_yctc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		document.getElementById('ca_yctc_marginal').innerHTML = '<b>California Young Child Tax Credit:</b> ' + ca_yctc_formatted + '¢ benefit loss';
		document.getElementById('ca_yctc_marginal').style.display = 'list-item';
	}
	else{
		document.getElementById('ca_yctc_marginal').style.display = 'none';
	}
}

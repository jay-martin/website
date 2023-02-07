/******************************************************************************************
 * This file contains the functions that outputs to the screen the EMTR
 * as well as the function that reveal the highlights when clicked
 * ****************************************************************************************/

// Default values
document.getElementById('marginal_tax_rate').innerHTML = 'On an additional dollar of income, you face an effective marginal tax rate of <b>12%</b>.';
document.getElementById('tax_liability').innerHTML = '<b>12¢</b> in income tax.';
document.getElementById('benefit_loss_text').innerHTML = 'You have not selected any benefits.';

// Outputs to screen the marginal tax rate
function top_chart_outputs(){
	let income = user_income.value;
    let numChildren = num_children.value;
    let householdSize = household_size('single', numChildren);

    let personal = personal_at_income_marginal(income);
    let fica = fica_at_income_marginal(income);
    let eitc = eitc_at_income_marginal(income, numChildren);
    let ctc = ctc_at_income_marginal(income, numChildren);
    let snap = snap_at_income_marginal(income, householdSize);
    let ptc = ptc_at_income_marginal(income, numChildren);
    let ssi = ssi_at_income_marginal(income);

    let taxLiability = personal + fica;
    let benefitLoss = eitc + ctc + snap + ptc + ssi;
    let taxRate = taxLiability + benefitLoss;

    // Default is for the rounding disclaimer not to be displayed. If any output requires decimal places, the rounding disclaimer will be triggered
    //document.getElementById('rounding_disclaimer').style.display = 'none';

    // format taxRate that there is a decimal if values are not a whole number, but no decimal if it is a whole number
    if(taxRate.toFixed(2) - Math.floor(taxRate) !== 0){
    	taxRate_formatted = taxRate.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    	//document.getElementById('rounding_disclaimer').style.display = 'block';
    }
    else{
    	taxRate_formatted = taxRate.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    document.getElementById('marginal_tax_rate').innerHTML = 'On an additonal dollar of income, you face an effective marginal tax rate of <b>' + taxRate_formatted + '%</b>.';

    // Format taxLiability
    if(taxLiability.toFixed(2) - Math.floor(taxLiability) !== 0){
    	taxLiability_formatted = taxLiability.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    	//document.getElementById('rounding_disclaimer').style.display = 'block';
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
    	breakdown_states['benefits_breakdown'] = 'open';
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
}

function benefits_breakdown(eitc, ctc, snap, ptc, ssi){
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
}

/******************************************************************************************
 * This file contains the functions that outputs to the screen the EMTR
 * as well as the function that reveal the highlights when clicked
 * ****************************************************************************************/

/*Default values */
document.getElementById('marginal_tax_rate').innerHTML = 'On an additional dollar of income, you face an effective marginal tax rate of <b>12%</b>.';
document.getElementById('tax_liability').innerHTML = '<b>12¢</b> in income tax.';
document.getElementById('benefit_loss_text').innerHTML = 'You have not selected any benefits.';

/* Outputs to screen the marginal tax rate*/
function output1(){
	income = user_income.value;
    numChildren = num_children.value;
    householdSize = household_size('single', numChildren);

    personal = personal_at_income_marginal(income);
    fica = fica_at_income_marginal(income);
    eitc = eitc_at_income_marginal(income, numChildren);
    ctc = ctc_at_income_marginal(income, numChildren);
    snap = snap_at_income_marginal(income, householdSize);
    ptc = ptc_at_income_marginal(income, numChildren);
    ssi = ssi_at_income_marginal(income);

    taxLiability = personal + fica;
    benefitLoss = eitc + ctc + snap + ptc + ssi;
    taxRate = taxLiability + benefitLoss;

    /* Default is for the rounding disclaimer not to be displayed. If any output requires decimal places, the rounding disclaimer will be triggered */
    document.getElementById('rounding_disclaimer').style.display = 'none';

    /*format taxRate that there is a decimal if values are not a whole number, but no decimal if it is a whole number */
    if(taxRate.toFixed(2) - Math.floor(taxRate) !== 0){
    	taxRate_formatted = taxRate.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    	document.getElementById('rounding_disclaimer').style.display = 'block';
    }
    else{
    	taxRate_formatted = taxRate.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    document.getElementById('marginal_tax_rate').innerHTML = 'On an additonal dollar of income, you face an effective marginal tax rate of <b>' + taxRate_formatted + '%</b>.';

    /* Format taxLiability */
    if(taxLiability.toFixed(2) - Math.floor(taxLiability) !== 0){
    	taxLiability_formatted = taxLiability.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    	document.getElementById('rounding_disclaimer').style.display = 'block';
    }
    else{taxLiability_formatted = taxLiability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}

    /* Conditionals for taxes */
    if(personal_income_tax_isActive === true && fica_isActive === true){
    	document.getElementById('tax_liability').innerHTML = '<b>' + taxLiability_formatted + '¢</b> in income and payroll tax.';
    }
    else if(personal_income_tax_isActive === true){
    	document.getElementById('tax_liability').innerHTML = '<b>' + taxLiability_formatted + '¢</b> in income tax.';
    }
    else if(fica_isActive === true){
    	document.getElementById('tax_liability').innerHTML = '<b>' + taxLiability_formatted + '¢</b> in payroll tax.';
    }
    else{
    	document.getElementById('tax_liability').innerHTML = 'You have not selected any taxes.'
    }

    /* Format benefitLoss */
    if(benefitLoss.toFixed(2) - Math.floor(benefitLoss) !== 0){benefitLoss_formatted = benefitLoss.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
    else{benefitLoss_formatted = benefitLoss.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}

    /* Conditionals for benefits */
    numBenefitsActive = eitc_isActive + ctc_isActive + snap_isActive + ptc_isActive + ssi_isActive;
    if(numBenefitsActive == 0){
    	document.getElementById('benefit_loss_text').innerHTML = 'You have not selected any benefits.'
    	document.getElementById('show_all_button').style.display = 'none';
    }
    else if(numBenefitsActive == 1){
    	document.getElementById('show_all_button').style.display = 'none';
    	if(benefitLoss >= 0){
    		document.getElementById('benefit_loss_text').innerHTML = '<b>' + benefitLoss_formatted + '¢</b> of lost benefits.';
    	}
    	else{
    		benefitLoss = benefitLoss * -1;
    		if(benefitLoss.toFixed(2) - Math.floor(benefitLoss) !== 0){
    			benefitLoss_formatted = benefitLoss.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    			document.getElementById('rounding_disclaimer').style.display = 'block';
    		}
		    else{benefitLoss_formatted = benefitLoss.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
    		document.getElementById('benefit_loss_text').innerHTML = '<b>' + benefitLoss_formatted + '¢</b> of increased benefits.';
    	}
    }
    else{
    	document.getElementById('show_all_button').style.display = 'inline-block';
    	if(benefitLoss >= 0){
    		document.getElementById('benefit_loss_text').innerHTML = '<b>' + benefitLoss_formatted + '¢</b> of lost benefits.';
    	}
    	else{
    		benefitLoss = benefitLoss * -1;
    		if(benefitLoss.toFixed(2) - Math.floor(benefitLoss) !== 0){benefitLoss_formatted = benefitLoss.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		    else{benefitLoss_formatted = benefitLoss.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
    		document.getElementById('benefit_loss_text').innerHTML = '<b>' + benefitLoss_formatted + '¢</b> of increased benefits.';
    	}
    }

    /* Function that determines which benefits to display in the benefits breakdown */
    benefits_breakdown(eitc, ctc, snap, ptc, ssi);
}

function benefits_breakdown(eitc, ctc, snap, ptc, ssi){
	if(eitc_isActive){
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

	if(ctc_isActive){
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

	if(snap_isActive){
		if(snap.toFixed(2) - Math.floor(snap) !== 0){ snap_formatted = snap.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
		else{snap_formatted = snap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		document.getElementById('snap_marginal').innerHTML = '<b>SNAP:</b> ' + snap_formatted + '¢ benefit loss';
		document.getElementById('snap_marginal').style.display = 'list-item';
	}
	else{
		document.getElementById('snap_marginal').style.display = 'none';
	}

	if(ptc_isActive){
		if(ptc.toFixed(2) - Math.floor(ptc) !== 0){ ptc_formatted = ptc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
		else{ptc_formatted = ptc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		document.getElementById('ptc_marginal').innerHTML = '<b>Premium Tax Credits: </b>' + ptc_formatted + '¢ credit reduction';
		document.getElementById('ptc_marginal').style.display = 'list-item';
	}
	else{
		document.getElementById('ptc_marginal').style.display = 'none';
	}

	if(ssi_isActive){
		if(ssi.toFixed(2) - Math.floor(ssi) !== 0){ ssi_formatted = ssi.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
		else{ssi_formatted = ssi.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}
		document.getElementById('ssi_marginal').innerHTML = '<b>SSI:</b> ' + ssi_formatted + '¢ benefit loss';
		document.getElementById('ssi_marginal').style.display = 'list-item';
	}
	else{
		document.getElementById('ssi_marginal').style.display = 'none';
	}
}

/* Reveals benefits breakdown when the "show all" button is clicked */
show_benefits_isClicked = false;
function show_benefits_breakdown(){
	if(show_benefits_isClicked === false){
	document.getElementById('show_all_button').innerHTML = 'Collapse';
		document.getElementById('benefits_breakdown').style.display = 'block';
		show_benefits_isClicked = true;
	}
	else{
		document.getElementById('show_all_button').innerHTML = 'Show all';
		document.getElementById('benefits_breakdown').style.display = 'none';
		show_benefits_isClicked = false;
	}
}

/*
Function for poor people animation
*/
function show_explanation1(){
	container = document.getElementById('highlights_container1');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = explanation1Height;
	}
	else{
		container.style.height = '0px';
	}
}

/*
Function for poor people animation
*/
function show_explanation2(){
	container = document.getElementById('highlights_container2');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = explanation2Height;
	}
	else{
		container.style.height = '0px';
	}
}

/*
Function for marriage penalties animation
*/
function show_explanation3(){
	container = document.getElementById('highlights_container3');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = explanation3Height;
	}
	else{
		container.style.height = '0px';
	}
}

/*
Function for disclaimer
*/
function show_explanation4(){
	container = document.getElementById('highlights_container4');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = explanation4Height;
		/* This is the bottom button: the bottom border needs to be straightened out after expanding */
		document.getElementById('bottom_button').style.borderBottomRightRadius = '0px';
		document.getElementById('bottom_button').style.borderBottomLeftRadius = '0px';

	}
	else{
		container.style.height = '0px';
		/* This is the bottom button: the bottom border edges need to be smoothed out after contracting */
		document.getElementById('bottom_button').style.borderBottomRightRadius = '5px';
		document.getElementById('bottom_button').style.borderBottomLeftRadius = '5px';
	}
}

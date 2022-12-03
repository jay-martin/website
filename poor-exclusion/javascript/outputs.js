/******************************************************************************************
 * This file contains the functions that outputs to the screen the benefit exclusion
 * as well as the function that reveal the highlights when clicked
 * ****************************************************************************************/

/*Default values */
document.getElementById('output_line1').innerHTML = 'You are excluded from <b>$1,208</b> in benefits.';

/* Outputs to screen the difference between max benefits and the benefits at the income the user has selected*/
function output1(){
	income = user_income.value;
    numChildren = num_children.value;
    filingStatus = filingstatus.value;

	if(benefit_selector.value === 'all'){
		output_all(income, filingStatus, numChildren);
	}
	else if(benefit_selector.value === 'eitc'){
		output_eitc(income, filingStatus, numChildren);
	}
	else{
		output_ctc(income, filingStatus, numChildren);
	}
}

/* Outputs for all benefits chart */
function output_all(income, filingStatus, numChildren){
	fullBenefit = non_exclude_eitc_value(income, filingStatus, numChildren) + max_benefit_ctc(numChildren);
    eitc = eitc_value(income, filingStatus, numChildren);
    ctc = ctc_value(income, filingStatus, numChildren);
    difference = fullBenefit - eitc - ctc;
    if(filingStatus === 'hoh'){
    	difference -= hoh_value(income);
    }

    if(difference < 0){difference = difference * -1};

	difference_formatted = difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('output_line1').innerHTML = "You are excluded from <b>$" + difference_formatted + "</b> in benefits.";
}

/* Outputs for eitc benefits chart */
function output_eitc(income, filingStatus, numChildren){
    maxBenefit = max_benefit_eitc(numChildren);
    eitc = eitc_value(income, filingStatus, numChildren);
    differece = maxBenefit - eitc;

    if(above_max(income, filingStatus, numChildren) === true){
    	document.getElementById('output_line1').innerHTML = "You are excluded from <b>$0</b> in benefits.";
    }
    else{
    	difference_formatted = differece.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	    document.getElementById('output_line1').innerHTML = "You are excluded from <b>$" + difference_formatted + "</b> in benefits because you are too poor.";
    }
}

/* Outputs for ctc benefits chart */
function output_ctc(income, filingStatus, numChildren){
    maxBenefit = max_benefit_ctc(numChildren);
    ctc = ctc_value(income, filingStatus, numChildren);
    differece = maxBenefit - ctc;

    if(above_max(income, filingStatus, numChildren) === true){
    	document.getElementById('output_line1').innerHTML = "You are excluded from <b>$0</b> in benefits.";
    }
    else{
    	difference_formatted = differece.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	    document.getElementById('output_line1').innerHTML = "You are excluded from <b>$" + difference_formatted + "</b> in benefits because you are too poor.";
    }
}

function adjust_enabled(){
	if(num_children.value === 'none'){
		document.getElementById('hoh_status_option').disabled = true;
		document.getElementById('hoh_status_option').disabled = true;
	}
	else{
		document.getElementById('hoh_status_option').disabled = false;
	}
}

function show_explanation1(){
	container = document.getElementById('highlights_container1');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = highlights_heights[0];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation2(){
	container = document.getElementById('highlights_container2');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = highlights_heights[1];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation3(){
	container = document.getElementById('highlights_container3');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = highlights_heights[2];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation4(){
	container = document.getElementById('highlights_container4');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = highlights_heights[3];
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

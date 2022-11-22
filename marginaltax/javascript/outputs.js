/*Default values */
document.getElementById('marginal_tax_rate').innerHTML = 'You face an effective marginal tax rate of <b>24%</b> on an additional dollar of income.';

/* Outputs to screen the marginal tax rate*/
function output1(){
	income = user_income.value;
    numChildren = num_children.value;
    console.log('snap: ' + snap_at_income_marginal(income, numChildren));

    taxRate = personal_at_income_marginal(income) + fica_at_income_marginal(income) + eitc_at_income_marginal(income, numChildren) + ctc_at_income_marginal(income, numChildren) + snap_at_income_marginal(income, numChildren);

    document.getElementById('marginal_tax_rate').innerHTML = 'You face an effective marginal tax rate of <b>' + taxRate.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '%</b> on an additional dollar of income.';
}

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

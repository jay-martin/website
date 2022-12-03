/*Default values */
document.getElementById('output_line1').innerHTML = 'Generic output';

/* Outputs to screen the marginal tax rate*/
function output1(){
	income = user_income.value;
    numChildren = num_children.value;
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
		container.style.height = highlights_heights[3];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation4(){
	container = document.getElementById('highlights_container4');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = highlights_heights[4];
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

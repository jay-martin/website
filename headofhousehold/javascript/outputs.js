/*Default values */
document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + 862 + '</b> compared to filing as single.';
document.getElementById('item_or_stand').innerHTML = 'You would use the <em>standard deduction</em> as both a single filer and a head of household.';

/* Calculates tax savings from the head of household status*/
function difference_hoh(){
	if(tax_credit_switch.checked === false){
        numChildren = 0;
    }
    else{
        numChildren = 1;
        if(num_children.value === 'two'){
            numChildren = 2;
        }
        else if(num_children.value === 'three'){
            numChildren = 3;
        }
        else if(num_children.value === 'four'){
            numChildren = 4;
        }
        else if(num_children.value === 'five'){
            numChildren = 5;
        }
    }
    user_dif = taxDifferenceatIncomeValue(myRange_HOH.value, myRange_ID.value, numChildren);
    document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + user_dif.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> compared to filing as single.';
}

/* Writes to page whether user would itemize or use the standard deduction */
function deductType(){
    single_deduct = single_deduction(myRange_ID.value);
    hoh_deduct = hoh_deduction(myRange_ID.value);

    if(single_deduct===12950 && hoh_deduct===19400){
        document.getElementById('item_or_stand').innerHTML = 'You would use the <em>standard deduction</em> as both a single filer and a head of household.';
    }
    else if(single_deduct>12950 && hoh_deduct===19400){
        document.getElementById('item_or_stand').innerHTML = 'You would use the <em>standard deduction</em> as a head of household but would <em>itemize</em> as a single filer.';
    }
    else{
        document.getElementById('item_or_stand').innerHTML = 'You would <em>itemize</em> your deductions as both a single filer and head of household.';
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

/*
Function for poor people animation
*/
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
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation5(){
	container = document.getElementById('highlights_container5');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = highlights_heights[4];
	}
	else{
		container.style.height = '0px';
	}
}

/*
Function for marriage penalties animation
*/
function show_explanation6(){
	container = document.getElementById('highlights_container6');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = highlights_heights[5];
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
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

function show_basic_overview(){
	container = document.getElementById('container_overview');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = overviewHeight;
	}
	else{
		container.style.height = '0px';
	}
}

function show_poor_people_explanation(){
	container = document.getElementById('container_poor_people');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = poorPeopleHeight;
	}
	else{
		container.style.height = '0px';
	}
}

function show_regressive_explanation(){
	container = document.getElementById('container_regressive');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = regressiveHeight;
	}
	else{
		container.style.height = '0px';
	}
}

function show_itemized_explanation(){
	container = document.getElementById('container_itemized');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = itemizeHeight;
	}
	else{
		container.style.height = '0px';
	}
}

function show_tax_credit_explanation(){
	container = document.getElementById('container_credit');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = creditHeight;
	}
	else{
		container.style.height = '0px';
	}
}

function show_mp_explanation(){
	container = document.getElementById('container_mp');
	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = mpHeight;
	}
	else{
		container.style.height = '0px';
	}
}

/*
function show_basic_overview(){
	if(hoh_explanation.hidden === true){
		hoh_explanation.hidden = false;
		basic_overview_animation_id.hidden = false;
	}
	else{
		hoh_explanation.hidden = true;
		basic_overview_animation_id.hidden = true;
	}
}

function show_poor_people_explanation(){
	if(poor_people_explanation.hidden === true){
		poor_people_explanation.hidden = false;
		poor_people_animation.hidden = false;
	}
	else{
		poor_people_explanation.hidden = true;
		poor_people_animation.hidden = true;
	}
}

function show_regressive_explanation(){
	console.log("IN SHOW REGRESSIVE");
	if(regressive_explanation.hidden === true){
		console.log("IN UNHIDE EXPLANATION");
		regressive_explanation.hidden = false;
		regressive_animation.hidden = false;
	}
	else{
		console.log("IN HIDE EXPLANATION");
		regressive_explanation.hidden = true;
		regressive_animation.hidden = true;
	}
}

function show_itemized_explanation(){
	if(itemized_explanation.hidden === true){
		itemized_explanation.hidden = false;
		itemized_explanation_animation_id.hidden = false;
	}
	else{
		itemized_explanation.hidden = true;
		itemized_explanation_animation_id.hidden = true;
	}
}

function show_tax_credit_explanation(){
	if(tax_credit_explanation.hidden === true){
		tax_credit_explanation.hidden = false;
		tax_credit_animation.hidden = false;
	}
	else{
		tax_credit_explanation.hidden = true;
		tax_credit_animation.hidden = true;
	}
}

function show_mp_explanation(){
	if(marriage_penalty_explanation.hidden === true){
		marriage_penalty_explanation.hidden = false;
		marriage_penalty_explanation_animation_id.hidden = false;
	}
	else{
		marriage_penalty_explanation.hidden = true;
		marriage_penalty_explanation_animation_id.hidden = true;
	}
}
*/
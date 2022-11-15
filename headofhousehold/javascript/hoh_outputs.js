/*Default values */
document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + 862 + '</b>.';
document.getElementById('item_or_stand').innerHTML = 'You would use the <em>standard deduction</em> as both a single filer and head of household.';

/* Calculates tax savings from the head of household status*/
function difference_hoh(){
    user_dif = taxDifferenceatIncomeValue(myRange_HOH.value, myRange_ID.value);
    document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + user_dif.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
}

/* Writes to page whether user would itemize or use the standard deduction */
function deductType(){
    single_deduct = single_deduction(myRange_ID.value);
    hoh_deduct = hoh_deduction(myRange_ID.value);

    if(single_deduct===12950 && hoh_deduct===19400){
        document.getElementById('item_or_stand').innerHTML = 'You would use the <em>standard deduction</em> as both a single filer and head of household.';
    }
    else if(single_deduct>12950 && hoh_deduct===19400){
        document.getElementById('item_or_stand').innerHTML = 'You would use the <em>standard deduction</em> as a head of household but would <em>itemize</em> as a single filer.';
    }
    else{
        document.getElementById('item_or_stand').innerHTML = 'You would <em>itemize</em> your deductions as both a single filer and head of household.';
    }
}

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
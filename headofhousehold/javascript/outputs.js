/******************************************************************************************
 * This file contains the functions that outputs to the screen HOH values
 * ****************************************************************************************/

/*Default values */
document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + 862 + '</b> compared to filing as single.';
document.getElementById('item_or_stand').innerHTML = 'You would use the <em>standard deduction</em> as both a single filer and a head of household.';

/* Calculates tax savings from the head of household status*/
function difference_hoh(){
    numChildren = num_children_formatting(num_children.value);
    user_dif = tax_difference_at_income(user_income.value, itemized_deductions.value, numChildren);
    document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + user_dif.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> compared to filing as single.';
}

/* Writes to page whether user would itemize or use the standard deduction */
function deductType(){
    single_deduct = single_deduction(itemized_deductions.value);
    hoh_deduct = hoh_deduction(itemized_deductions.value);

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
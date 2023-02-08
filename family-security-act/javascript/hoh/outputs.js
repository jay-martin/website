/*Default values */
document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$862</b>.';
document.getElementById('item_or_stand').innerHTML = 'You would use the standard deduction as both a single filer and head of household.';

/* Calculates tax savings from the head of household status*/
function difference_hoh(){
    user_dif = taxDifferenceatIncomeValue(myRange_HOH.value, myRange_ID.value);
    document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + user_dif.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
}

/* Writes to page whether user would itemize or use the standard deduction */
function deductType(){
    single_deduct = single_deduction();
    hoh_deduct    = hoh_deduction();

    if(single_deduct===12950 && hoh_deduct===19400){
        document.getElementById('item_or_stand').innerHTML = 'You would use the standard deduction as both a single filer and head of household.';
    }
    else if(single_deduct>12950 && hoh_deduct===19400){
        document.getElementById('item_or_stand').innerHTML = 'You would use the standard deduction as a head of household but would itemize as a single filer.';
    }
    else{
        document.getElementById('item_or_stand').innerHTML = 'You would itemize your deductions as both a single filer and head of household.';
    }
}
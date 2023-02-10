/******************************************************************************************
 * This file contains the functions that outputs to the screen HOH values
 * ****************************************************************************************/

// Default outputs
document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + 862 + '</b> compared to filing as single.';
document.getElementById('item_or_stand').innerHTML = 'You would use the <b>standard deduction</b> as both a single filer and a head of household.';

function top_chart_outputs(){
    // HOH value output
    tax_difference = hoh_tax_difference_2023(user_income.value, itemized_deductions.value);
    document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you <b>$' + tax_difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> compared to filing as single.';

    // Deduction output
    single_deduct = single_deduction_2023(itemized_deductions.value);
    hoh_deduct = hoh_deduction_2023(itemized_deductions.value);

    if(single_deduct===13850 && hoh_deduct===20800){
        document.getElementById('item_or_stand').innerHTML = 'You would use the <b>standard deduction</b> as both a single filer and a head of household.';
    }
    else if(single_deduct>13850 && hoh_deduct===20800){
        document.getElementById('item_or_stand').innerHTML = 'You would use the <b>standard deduction</b> as a head of household but would <b>itemize</b> as a single filer.';
    }
    else{
        document.getElementById('item_or_stand').innerHTML = 'You would <b>itemize</b> your deductions as both a single filer and head of household.';
    }
}
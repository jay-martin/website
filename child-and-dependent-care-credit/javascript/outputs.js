/******************* Top Chart ************************************************************************************************************************************************/
/* Outputs CDCC Values to the top chart */
function top_chart_outputs(){
    income = user_income.value;
    filingStatus = filing_status.value;
    numChildren = num_children.value;

    credit_amount = cdcc_amount_2023(income, filingStatus, numChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('credit_amount').innerHTML = 'You can subtract up to <b>$' + credit_amount + '</b> from your taxes';
}

/******************* Complexity Chart ************************************************************************************************************************************************/
/* Outputs CDCC Values to the complexity chart */
function complexity_chart_outputs(){
    income = complexity_income.value;
    filingStatus = complexity_filing_status.value;
    numChildren = complexity_num_children.value;

    credit_amount = cdcc_amount_2023(income, filingStatus, numChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    credit_rate = (cdcc_rate(income) * 100).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    document.getElementById('complexity_credit_amount').innerHTML = 'You can subtract up to <b>$' + credit_amount + '</b> from your taxes';
    document.getElementById('complexity_credit_rate').innerHTML = 'The credit rate at your income is: <b>' + credit_rate + '%</b>';
}

/******************* Marriage Penalties Chart ************************************************************************************************************************************************/
/* Outputs for the marriage penalties chart */
// Defaults
document.getElementById('mp_individual_credit_amounts').innerHTML = 'As individuals, you personally could subtract up to <b>$900</b> from your <b>$1,118</b> tax liability and your partner could subtract up to <b>$900</b> from their tax liability of <b>$1,118</b>, for a minimum <b>$436</b> combined tax owed.';
document.getElementById('mp_married_credit_amount').innerHTML = 'As a married couple, you could subtract up to <b>$1,200</b> from your joint tax liability of <b>$2,236</b>, for a minimum <b>$1,036</b> tax owed.';
document.getElementById('mp_marriage_penalty').innerHTML = 'Your taxes could <b><p class="inline red">increase</p></b> by <b><p class="inline red">$600</p></b> as a result of getting married.';

function mp_chart_outputs(){
    // Inputs
    person1_income = mp_person1_income.value;
    person1_filing_status = mp_person1_filing_status.value;
    person1_num_children = mp_person1_num_children.value;
    person2_income = mp_person2_income.value;
    person2_filing_status = mp_person2_filing_status.value;
    person2_num_children = mp_person2_num_children.value;

    // Combined Income & Children
    combined_income = parseInt(person1_income) + parseInt(person2_income);
    combined_children = 'two'; // FIX: Current input options they always fall into the 2+ children category

    // Tax liabilities
    person1_tax_liability = tax_liability_2023(person1_filing_status, person1_income);
    person2_tax_liability = tax_liability_2023(person2_filing_status, person2_income);
    married_tax_liability = tax_liability_2023('married', combined_income);

    // CDCC credit values
    person1_cdcc = cdcc_amount_2023(person1_income, person1_filing_status, person1_num_children);
    person2_cdcc = cdcc_amount_2023(person2_income, person2_filing_status, person2_num_children);
    married_cdcc = cdcc_amount_2023(combined_income, 'married', combined_children);

    // After credit tax liabilities
    person1_after_credit_tax = person1_tax_liability - person1_cdcc;
    person2_after_credit_tax = person2_tax_liability - person2_cdcc;
    combined_minimum_tax = person1_after_credit_tax + person2_after_credit_tax;
    married_after_credit_tax = married_tax_liability - married_cdcc;

    // Difference in tax liability
    tax_difference = married_after_credit_tax - combined_minimum_tax;
    
    document.getElementById('mp_individual_credit_amounts').innerHTML = 'As individuals, you personally could subtract up to <b>$' + person1_cdcc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> from your <b>$' + person1_tax_liability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> tax liability and your partner could subtract up to <b>$' + person2_cdcc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> from their tax liability of <b>$' + person2_tax_liability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a minimum <b>$' + combined_minimum_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> combined tax owed.';
    document.getElementById('mp_married_credit_amount').innerHTML = 'As a married couple, you could subtract up to <b>$' + married_cdcc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> from your joint tax liability of <b>$' + married_tax_liability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a minimum <b>$' + married_after_credit_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> tax owed.'
    if(tax_difference.toFixed(0) == 0){
        document.getElementById('mp_marriage_penalty').innerHTML = 'Your taxes would <b>not change</b>.'
    }
    else if(tax_difference > 0){
        document.getElementById('mp_marriage_penalty').innerHTML = 'Your taxes could <b><p class="inline red">increase</p></b> by <b><p class="inline red">$' + tax_difference.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</p></b> as a result of getting married.';
    }
    else{
        tax_difference = tax_difference * -1;
        document.getElementById('mp_marriage_penalty').innerHTML = 'Your taxes could <b><p class="inline green">decrease</p></b> by <b><p class="inline green">$' + tax_difference.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</p></b> as a result of getting married.';
    }
}

function mp_chart_caution(){
    if(mp_person1_filing_status.value === 'hoh' || mp_person2_filing_status.value === 'hoh'){
        document.getElementById('mp_chart_caution_output').style.display = 'block';
    }
    else{
        document.getElementById('mp_chart_caution_output').style.display = 'none';
    }
}

/******************* Should CDCC Be a Tax Credit? Chart ************************************************************************************************************************************************/
function tax_credit_outputs(){
    // Inputs
    credit_rate  = tax_credit_credit_rate.value / 100;
    income_share = tax_credit_income_share.value / 100;
    one_child_credit_max = tax_credit_credit_maximum.value;
    two_child_credit_max = 2 * tax_credit_credit_maximum.value;

    // Required income
    one_child_income = one_child_credit_max / (credit_rate * income_share);
    two_child_income = two_child_credit_max / (credit_rate * income_share);

    //Output to screen
    document.getElementById('tax_credit_one_child_families_output').innerHTML = 'Families with one child need an income of <b>$' + one_child_income.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> to receive the full child care credit.';
    document.getElementById('tax_credit_two_child_families_output').innerHTML = 'Families with two or more children need an income of <b>$' + two_child_income.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> to receive the full child care credit.';
}



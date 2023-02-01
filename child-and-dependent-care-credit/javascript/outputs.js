/******************* Top Chart ************************************************************************************************************************************************/
function top_chart_outputs(){
    let income        = top_income.value;
    let filing_status = top_filing_status.value;
    let num_children  = top_num_children.value;

    let tax_liability = tax_liability_2023(filing_status, income);
    let credit_amount = cdcc_amount_2023(income, filing_status, num_children);
    let credit_rate   = (cdcc_rate(income) * 100).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let credit_max    = 3000;
    if(num_children === 'two'){
        credit_max = 6000;
    }
    let credit_max_times_rate = cdcc_rate(income) * credit_max;
    
    document.getElementById('top_credit_rate').innerHTML   = 'The credit rate at your income is <b>' + credit_rate + '%</b>, meaning you are eligible to subtract up to <b>$' + credit_max_times_rate.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> from your taxes.';
    if(tax_liability < credit_max_times_rate){
        document.getElementById('top_credit_amount').innerHTML = 'With your tax liability of $' + tax_liability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ', you are only able to subtract up to <b>$' + credit_amount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> from your taxes.';
    }
    else{
        document.getElementById('top_credit_amount').innerHTML = 'With your tax liability of $' + tax_liability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ', you are able to subtract up to the full <b>$' + credit_amount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' from your taxes.';
    }
}

/******************* Marriage Penalties Chart ************************************************************************************************************************************************/
/* Outputs for the marriage penalties chart */
// Defaults
document.getElementById('mp_individual_credit_amounts').innerHTML = "With your partner's income fixed at <b>$25,000</b>, filing as single they can subtract up to <b>$900</b> from their tax liability of <b>$1,118</b> (<b>$218</b> tax after max CDCC). With your income of <b>$30,000</b>, filing as single you could subtract up to <b>$810</b> from your tax liability of <b>$1,718</b> (<b>$908</b> tax after max CDCC). Thus, your family has a minimum <b>$1,126</b> combined tax owed.";
document.getElementById('mp_married_credit_amount').innerHTML     = 'As a married couple, you could subtract up to <b>$1,200</b> from your joint tax liability of <b>$2,836</b>, for a minimum <b>$1,636</b> tax owed.';
document.getElementById('mp_marriage_penalty').innerHTML          = 'Thus, your taxes could <b><p class="inline red">increase</p></b> by <b><p class="inline red">$510</p></b> as a result of getting married.';

function mp_chart_outputs(){
    // Inputs
    let person1_income = mp_person1_income.value;
    let person1_filing_status = mp_person1_filing_status.value;
    let person1_num_children = mp_person1_num_children.value;
    let person2_income = mp_person2_income.value;
    let person2_filing_status = mp_person2_filing_status.value;
    let person2_num_children = mp_person2_num_children.value;

    // Combined Income & Children
    let combined_income = parseInt(person1_income) + parseInt(person2_income);
    let combined_children = 'two'; // FIX: Current input options they always fall into the 2+ children category

    // Tax liabilities
    let person1_tax_liability = tax_liability_2023(person1_filing_status, person1_income);
    let person2_tax_liability = tax_liability_2023(person2_filing_status, person2_income);
    let married_tax_liability = tax_liability_2023('married', combined_income);

    // CDCC credit values
    let person1_cdcc = cdcc_amount_2023(person1_income, person1_filing_status, person1_num_children);
    let person2_cdcc = cdcc_amount_2023(person2_income, person2_filing_status, person2_num_children);
    let married_cdcc = cdcc_amount_2023(combined_income, 'married', combined_children);

    // After credit tax liabilities
    let person1_after_credit_tax = person1_tax_liability - person1_cdcc;
    let person2_after_credit_tax = person2_tax_liability - person2_cdcc;
    let combined_minimum_tax = person1_after_credit_tax + person2_after_credit_tax;
    let married_after_credit_tax = married_tax_liability - married_cdcc;

    // Difference in tax liability
    let tax_difference = married_after_credit_tax - combined_minimum_tax;
    
    document.getElementById('mp_individual_credit_amounts').innerHTML = "With your partner's income fixed at <b>$" + person2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, filing as single they can subtract up to <b>$" + person2_cdcc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> from their tax liability of <b>$" + person2_tax_liability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> (<b>" + person2_after_credit_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> tax after max CDCC). With your income of <b>$" + person1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you could subtract up to <b>$" + person1_cdcc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> from your tax liability of <b>$' + person1_tax_liability.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> (<b>$" + person1_after_credit_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  "</b> tax after max CDCC). Thus, your family has a minimum <b>$" + combined_minimum_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> combined tax owed.';
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
    let credit_rate  = tax_credit_credit_rate.value / 100;
    let income_share = tax_credit_income_share.value / 100;
    let one_child_credit_max = tax_credit_credit_maximum.value;
    let two_child_credit_max = 2 * tax_credit_credit_maximum.value;

    // Required income
    let one_child_income = one_child_credit_max / (credit_rate * income_share);
    let two_child_income = two_child_credit_max / (credit_rate * income_share);

    //Output to screen
    document.getElementById('tax_credit_one_child_families_output').innerHTML = 'Families with one child need an income of <b>$' + one_child_income.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> to receive the full child care credit.';
    document.getElementById('tax_credit_two_child_families_output').innerHTML = 'Families with two or more children need an income of <b>$' + two_child_income.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> to receive the full child care credit.';
}



/****************************** Intuitive Chart *********************************/
// Constants
const show_all_button_text = "<button class='show_all_button' id='marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;marriage_penalty_breakdown&quot;, &quot;marriage_penalty_breakdown_button&quot;);'>Show all</button>";
const collapse_button_text = "<button class='show_all_button' id='marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;marriage_penalty_breakdown&quot;, &quot;marriage_penalty_breakdown_button&quot;);'>Collapse</button>";

// Default values
document.getElementById('marriage_penalty_individual').innerHTML       = "You owe <b>$6,790</b> in taxes and your partner owes <b>$2,918</b>, for a combined tax liability of <b>$9,708</b>.";
document.getElementById('marriage_penalty_married').innerHTML          = "With a combined income of $120,000, if you married you would owe <b>$10,921</b> in taxes.";
document.getElementById('marriage_penalty_explanation_line').innerHTML = "Your family thus owes <b>$1,213 <em>more</em></b> in taxes.";
document.getElementById('marriage_penalty_bonus').innerHTML            = "You face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,213</p></b>" +  show_all_button_text;

function marriage_penalty_outputs(){
    let p1_income = marriage_penalty_person1_income.value;
    let p2_income = marriage_penalty_person2_income.value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    // Tax liabilities
    let p1_filing_status = marriage_penalty_person1_filing_status.value;
    let p2_filing_status = marriage_penalty_person2_filing_status.value;

    // Tax liability values
    let p1_tax = tax_liability_2023(p1_filing_status, p1_income);
    let p2_tax = tax_liability_2023(p2_filing_status, p2_income);
    let combined_tax = p1_tax + p2_tax;
    let married_tax = tax_liability_2023('married', combined_income);

    // Outputs
    document.getElementById('marriage_penalty_individual').innerHTML = "You owe <b>$" + p1_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes and your partner owes <b>$" + p2_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined tax liability of <b>$" + combined_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('marriage_penalty_married').innerHTML    = "With a combined income of $" + combined_income.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would owe <b>$" + married_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes.";

    let penalty = married_tax - combined_tax;
    if(penalty.toFixed(0) > 0){
        document.getElementById('marriage_penalty_explanation_line').innerHTML = "Your family thus owes <b>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " <em>more</em></b> in taxes."
    }
    else if(penalty.toFixed(0) == 0){
        document.getElementById('marriage_penalty_explanation_line').innerHTML = "Your family's taxes thus remain unchanged."
    }
    else {
        penalty = penalty * -1;
        document.getElementById('marriage_penalty_explanation_line').innerHTML = "Your family thus owes <b>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " <em>less</em></b> in taxes."
    }

    // chart type-specific outputs
    if(marriage_penalty_chart_type.value === 'intuitive'){
        document.getElementById('marriage_penalty_bonus').innerHTML = marriage_penalty_intuitive_outputs(penalty);
    }
    else if(marriage_penalty_chart_type.value === 'values'){
        document.getElementById('marriage_penalty_bonus').innerHTML = marriage_penalty_values_outputs(penalty, p1_income, p2_income);
    }
}

/****************************** Intuitive Chart *******************************************************************************/
function marriage_penalty_intuitive_outputs(penalty){
    if(penalty.toFixed(0) > 0){
        penalty_text = "You face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else if(penalty.toFixed(0) == 0){
        penalty_text = "Your family's taxes would <b>not change</b>";
    }
    else{
        penalty = penalty * -1;
        penalty_text = "You face a <b><p class='inline green'>marriage bonuse</p></b> of <b><p class='inline green'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    return marriage_penalty_append_button(penalty_text);
}

/****************************** Values Chart *******************************************************************************/
function marriage_penalty_values_outputs(penalty, p1_income, p2_income){
    if(penalty.toFixed(0) > 0){
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else if(penalty.toFixed(0) == 0){
        penalty_text = "Your family's taxes would <b>not change</b>";
    }
    else {
        penalty = penalty * -1;
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    return marriage_penalty_append_button(penalty_text);
}

/****************************** Append Button *******************************************************************************/
function marriage_penalty_append_button(penalty_text){
    if(breakdown_states['mp_breakdown'] === 'open'){
        return penalty_text + collapse_button_text;
    }
    else {
        return penalty_text + show_all_button_text;
    }
}


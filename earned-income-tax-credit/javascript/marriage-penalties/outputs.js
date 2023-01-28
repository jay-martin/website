// Constants
const show_all_button_text = "<button class='show_all_button' id='mp_breakdown_button' onclick='open_and_close_breakdown(&quot;mp_breakdown&quot;, &quot;mp_breakdown_button&quot;);'>Show all</button>";
const collapse_button_text = "<button class='show_all_button' id='mp_breakdown_button' onclick='open_and_close_breakdown(&quot;mp_breakdown&quot;, &quot;mp_breakdown_button&quot;);'>Collapse</button>";

// Default outputs
document.getElementById('mp_individual_values').innerHTML = "Your EITC is worth <b>$2,646</b> and your partner's EITC is worth <b>$585</b>,<br> for a combined EITC of <b>$3,231</b>.";
document.getElementById('mp_married_value').innerHTML     = "With a combined income of $40,000, if you married your EITC would be worth <b>$2,097</b>.";
document.getElementById('mp_explanation_line').innerHTML  = "Your family's EITC thus <b>decreases</b> by <b>$1,134</b> as a result of getting married.";
document.getElementById('mp_marriage_penalty').innerHTML  = "You face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,134</p></b>" + show_all_button_text;

function marriage_penalty_outputs(){
    let p1_income = mp_person1_income.value;
    let p2_income = mp_person2_income.value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    let p1_children = mp_person1_children.value;
    let p2_children = mp_person2_children.value;
    let num_children = sum_children(p1_children, p2_children);

    let p1_eitc = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc = eitc_value_2023(combined_income, 'married', num_children);
    
    document.getElementById('mp_individual_values').innerHTML = 'Your EITC is worth <b>$' + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>,<br> for a combined EITC of <b>$" + combined_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('mp_married_value').innerHTML     = "With a combined income of $" + combined_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + married_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"</b>.";

    let penalty = combined_eitc - married_eitc;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('mp_explanation_line').innerHTML = "Your family's EITC thus <b>increases</b> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> as a result of getting married.";
    }   
    else{
        document.getElementById('mp_explanation_line').innerHTML = "Your family's EITC thus <b>decreases</b> by <b>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> as a result of getting married.";
    }

    // chart type-specific outputs
    if(marriage_penalty_chart_type.value === 'intuitive'){
        document.getElementById('mp_marriage_penalty').innerHTML = marriage_penalty_intuitive_outputs(penalty);
    }
    else if(marriage_penalty_chart_type.value === 'values'){
        document.getElementById('mp_marriage_penalty').innerHTML = marriage_penalty_values_outputs(penalty, p1_income, p2_income);
    }
}

/****************************** Intuitive Chart *******************************************************************************/
function marriage_penalty_intuitive_outputs(penalty){
    if(penalty < 0){
        bonus = penalty * -1;
        penalty_text = 'You face a <b><p class="inline green">marriage bonus</p></b> of <b><p class="inline green">$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }   
    else{
        penalty_text = 'You face a <b><p class="inline red">marriage penalty</p></b> of <b><p class="inline red">$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>" 
    }
    return marriage_penalty_append_button(penalty_text);
}

/****************************** Values Chart *******************************************************************************/
function marriage_penalty_values_outputs(penalty, p1_income, p2_income){
    if(penalty < 0){
        bonus = penalty * -1;
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else {
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
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

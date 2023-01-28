function eitc_marriage_penalty_outputs(chart_name){
    let line1 = chart_name + '_penalty';
    let line2 = chart_name + '_individual';
    let line3 = chart_name + '_married';
    let line4 = chart_name + '_explanation_line';

    let p1_income = eval(chart_name + '_person1_income').value;
    let p2_income = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;
    let num_children = sum_children(p1_children, p2_children);

    let p1_eitc = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc = eitc_value_2023(combined_income, 'married', num_children);
    
    document.getElementById(line2).innerHTML = 'Your EITC is worth <b>$' + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>,<br> for a combined EITC of <b>$" + combined_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById(line3).innerHTML = "With a combined income of $" + combined_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + married_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"</b>.";

    let penalty = combined_eitc - married_eitc;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById(line4).innerHTML = "Your family's EITC thus <b>increases</b> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> as a result of getting married.";
    }   
    else{
        document.getElementById(line4).innerHTML = "Your family's EITC thus <b>decreases</b> by <b>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> as a result of getting married.";
    }

    // chart type-specific outputs
    if(eitc_marriage_penalty_chart_type.value === 'intuitive'){
        document.getElementById(line1).innerHTML = eitc_marriage_penalty_intuitive_outputs(chart_name, penalty);
    }
    else if(eitc_marriage_penalty_chart_type.value === 'values'){
        document.getElementById(line1).innerHTML = eitc_marriage_penalty_values_outputs(chart_name, penalty, p1_income, p2_income);
    }
}

/****************************** Intuitive Chart *******************************************************************************/
function eitc_marriage_penalty_intuitive_outputs(chart_name, penalty){
    if(penalty < 0){
        bonus = penalty * -1;
        penalty_text = 'You face a <b><p class="inline green">marriage bonus</p></b> of <b><p class="inline green">$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }   
    else{
        penalty_text = 'You face a <b><p class="inline red">marriage penalty</p></b> of <b><p class="inline red">$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>" 
    }
    return eitc_marriage_penalty_append_button(chart_name, penalty_text);
}

/****************************** Values Chart *******************************************************************************/
function eitc_marriage_penalty_values_outputs(chart_name, penalty, p1_income, p2_income){
    if(penalty < 0){
        bonus = penalty * -1;
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else {
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    return eitc_marriage_penalty_append_button(chart_name, penalty_text);
}

/****************************** Append Button *******************************************************************************/
function eitc_marriage_penalty_append_button(chart_name, penalty_text){
    let show_all_text = eval(chart_name + '_show_all_button_text');
    let collapse_text = eval(chart_name + '_collapse_button_text');
    let breakdown_id  = chart_name + '_breakdown';

    if(breakdown_states[breakdown_id] === 'open'){
        return penalty_text + collapse_text;
    }
    else {
        return penalty_text + show_all_text;
    }
}
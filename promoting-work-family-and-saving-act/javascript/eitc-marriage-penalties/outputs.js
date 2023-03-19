const reformed_eitc_marriage_penalty_show_all_button_text = "<button class='show_all_button' id='reformed_eitc_marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;reformed_eitc_marriage_penalty_breakdown&quot;, &quot;reformed_eitc_marriage_penalty_breakdown_button&quot;);'>Show all</button>";
const reformed_eitc_marriage_penalty_collapse_button_text = "<button class='show_all_button' id='reformed_eitc_marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;reformed_eitc_marriage_penalty_breakdown&quot;, &quot;reformed_eitc_marriage_penalty_breakdown_button&quot;);'>Collapse</button>";

/*********************** EITC Marriage Penalty *************************************************************************************/
document.getElementById('reformed_eitc_marriage_penalty_individual').innerHTML        = "Your EITC is worth <b>$3,165</b> and your partner's EITC is worth <b>$1,583</b>,<br> for a combined EITC of <b>$4,748</b>.";
document.getElementById('reformed_eitc_marriage_penalty_married').innerHTML           = "With a combined income of $20,000, if you married your EITC would be worth <b>$6,330</b>.";
document.getElementById('reformed_eitc_marriage_penalty_explanation_line').innerHTML  = "Your family's EITC thus <b>increases</b> by <b>$1,583</b> as a result of getting married.";
document.getElementById('reformed_eitc_marriage_penalty_penalty').innerHTML           = "You incur a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$1,583</p></b>" + reformed_eitc_marriage_penalty_show_all_button_text;

function eitc_marriage_penalty_outputs(chart_name, outputs_base_name, eitc_calculate_function){
    // html id's of output elements
    let line1 = outputs_base_name + '_penalty';
    let line2 = outputs_base_name + '_individual';
    let line3 = outputs_base_name + '_married';
    let line4 = outputs_base_name + '_explanation_line';

    // incomes
    let p1_income = eval(chart_name + '_person1_income').value;
    let p2_income = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    // number of children
    let p1_num_children   = eval(chart_name + '_person1_children').value;
    let p2_num_children   = eval(chart_name + '_person2_children').value;
    let combined_children = sum_children_no_cap(p1_num_children, p2_num_children); 

    // eitc values
    let p1_eitc = eitc_calculate_function(p1_income, 'single', p1_num_children);
    let p2_eitc = eitc_calculate_function(p2_income, 'single', p2_num_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc = eitc_calculate_function(combined_income, 'married', combined_children);
    
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

    if(penalty == 0){
    	penalty_text = "The value of your family's EITC <b>does not change</b>";
    }
    else if(penalty < 0){
        bonus = penalty * -1;
        penalty_text = 'You incur a <b><p class="inline green">marriage bonus</p></b> of <b><p class="inline green">$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }   
    else{
        penalty_text = 'You incur a <b><p class="inline red">marriage penalty</p></b> of <b><p class="inline red">$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>" 
    }
    document.getElementById(line1).innerHTML = eitc_marriage_penalty_append_button(outputs_base_name, penalty_text);
}

/****************************** Show All Button *******************************************************************************/
function eitc_marriage_penalty_append_button(chart_name, penalty_text){
    let show_all_text = eval(chart_name + '_show_all_button_text');
    let collapse_text = eval(chart_name + '_collapse_button_text');
    let breakdown_id  = chart_name + '_breakdown';

    if(is_open[breakdown_id] == true){
        return penalty_text + collapse_text;
    }
    else {
        return penalty_text + show_all_text;
    }
}
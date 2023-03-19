const eitc_marriage_penalty_show_all_button_text = "<button class='show_all_button' id='eitc_marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;eitc_marriage_penalty_breakdown&quot;, &quot;eitc_marriage_penalty_breakdown_button&quot;);'>Show all</button>";
const eitc_marriage_penalty_collapse_button_text = "<button class='show_all_button' id='eitc_marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;eitc_marriage_penalty_breakdown&quot;, &quot;eitc_marriage_penalty_breakdown_button&quot;);'>Collapse</button>";

/*********************** EITC Marriage Penalty *************************************************************************************/
document.getElementById('eitc_marriage_penalty_individual').innerHTML        = "Your EITC is worth <b>$3,000</b> and your partner's EITC is worth <b>$1,500</b>,<br> for a combined EITC of <b>$4,500</b>.";
document.getElementById('eitc_marriage_penalty_married').innerHTML           = "With a combined income of $20,000, if you married your EITC would be worth <b>$6,000</b>.";
document.getElementById('eitc_marriage_penalty_explanation_line').innerHTML  = "Your family's EITC thus <b>increases</b> by <b>$1,500</b> as a result of getting married.";
document.getElementById('eitc_marriage_penalty_penalty').innerHTML           = "You face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$1,500</p></b>" + eitc_marriage_penalty_show_all_button_text;

function eitc_marriage_penalty_outputs(chart_name){
    let line1 = chart_name + '_penalty';
    let line2 = chart_name + '_individual';
    let line3 = chart_name + '_married';
    let line4 = chart_name + '_explanation_line';

    let p1_income = eval(chart_name + '_person1_income').value;
    let p2_income = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    let p1_eitc = reformed_eitc_value(p1_income, 'single');
    let p2_eitc = reformed_eitc_value(p2_income, 'single');
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc = reformed_eitc_value(combined_income, 'married');
    
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
    	penalty_text = 'Your EITC <b>does not change</b>';
    }
    else if(penalty < 0){
        bonus = penalty * -1;
        penalty_text = 'You face a <b><p class="inline green">marriage bonus</p></b> of <b><p class="inline green">$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }   
    else{
        penalty_text = 'You face a <b><p class="inline red">marriage penalty</p></b> of <b><p class="inline red">$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>" 
    }
    document.getElementById(line1).innerHTML = eitc_marriage_penalty_append_button(chart_name, penalty_text);
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
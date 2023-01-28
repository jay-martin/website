function tax_outputs(chart_name){
    let chart      = eval(chart_name + '_chart');
    let chart_type = eval(chart_name + '_chart_type').value;
    let line1      = chart_name + '_penalty';
    let line2      = chart_name + '_individual';
    let line3      = chart_name + '_married';
    let line4      = chart_name + '_explanation_line';
    
    let p1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status = eval(chart_name + '_person2_filing_status').value;
    let p1_income        = eval(chart_name + '_person1_income').value;
    let p2_income        = eval(chart_name + '_person2_income').value;
    let combined_income  = parseInt(p1_income) + parseInt(p2_income);

    // Tax liabilities
    let p1_tax = tax_liability_2023(p1_filing_status, p1_income);
    let p2_tax = tax_liability_2023(p2_filing_status, p2_income);
    let combined_tax = p1_tax + p2_tax;
    let married_tax = tax_liability_2023('married', combined_income);

    // Outputs
    document.getElementById(line2).innerHTML = "You owe <b>$" + p1_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes and your partner owes <b>$" + p2_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined tax liability of <b>$" + combined_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById(line3).innerHTML = "With a combined income of $" + combined_income.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would owe <b>$" + married_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes.";

    let penalty = married_tax - combined_tax;
    if(penalty.toFixed(0) > 0){
        document.getElementById(line4).innerHTML = "Your family thus owes <b>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " <em>more</em></b> in taxes."
    }
    else if(penalty.toFixed(0) == 0){
        document.getElementById(line4).innerHTML = "Your family's taxes thus remain unchanged."
    }
    else {
        bonus = penalty * -1;
        document.getElementById(line4).innerHTML = "Your family thus owes <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " <em>less</em></b> in taxes."
    }

    // chart type-specific outputs
    if(chart_type=== 'intuitive'){
        document.getElementById(line1).innerHTML = tax_intuitive_outputs(chart_name, penalty);
    }
    else if(chart_type === 'values'){
        document.getElementById(line1).innerHTML = tax_values_outputs(chart_name, penalty, p1_income, p2_income);
    }
}

/****************************** Intuitive Chart *******************************************************************************/
function tax_intuitive_outputs(chart_name, penalty){
    if(penalty.toFixed(0) > 0){
        penalty_text = "You face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else if(penalty.toFixed(0) == 0){
        penalty_text = "Your family's taxes would <b>not change</b>";
    }
    else {
        bonus = penalty * -1;
        penalty_text = "You face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    return tax_append_button(chart_name, penalty_text);
}

/****************************** Values Chart *******************************************************************************/
function tax_values_outputs(chart_name, penalty, p1_income, p2_income){
    if(penalty.toFixed(0) > 0){
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else if(penalty.toFixed(0) == 0){
        penalty_text = "Your family's taxes would <b>not change</b>";
    }
    else {
        bonus = penalty * -1;
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    return tax_append_button(chart_name, penalty_text);
}

/****************************** Append Button *******************************************************************************/
function tax_append_button(chart_name, penalty_text){
    let breakdown_id  = chart_name + '_breakdown'; 
    let show_all_text = eval(chart_name + '_show_all_button_text');
    let collapse_text = eval(chart_name + '_collapse_button_text');

    if(breakdown_states[breakdown_id] === 'open'){
        return penalty_text + collapse_text;
    }
    else {
        return penalty_text + show_all_text;
    }
}
function multiple_policies_marriage_penalty_values_outputs(chart_name){
    let chart      = eval(chart_name + '_chart');
    let chart_type = eval(chart_name + '_chart_type').value;
    let line1      = chart_name + '_penalty';
    let line2      = chart_name + '_individual';
    let line3      = chart_name + '_married';
    let line4      = chart_name + '_explanation_line';

    let p1_children       = eval(chart_name + '_person1_children').value;
    let p2_children       = eval(chart_name + '_person2_children').value;
    let combined_children = sum_children(p1_children, p2_children);
    let p1_filing_status  = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status  = eval(chart_name + '_person2_filing_status').value;
    let p1_income         = eval(chart_name + '_person1_income').value;
    let p2_income         = eval(chart_name + '_person2_income').value;
    let combined_income   = parseInt(p1_income) + parseInt(p2_income);

    // Tax liabilities
    let p1_tax = tax_liability_2023(p1_filing_status, p1_income);
    let p2_tax = tax_liability_2023(p2_filing_status, p2_income);
    let combined_tax = p1_tax + p2_tax;
    let married_tax = tax_liability_2023('married', combined_income);

    // EITC values
    let p1_eitc = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc = eitc_value_2023(combined_income, 'married', combined_children);

    // Tax owed
    let p1_tax_owed       = p1_tax - p1_eitc;
    let p2_tax_owed       = p2_tax - p2_eitc;
    let combined_tax_owed = p1_tax_owed + p2_tax_owed;
    let married_tax_owed  = married_tax - married_eitc;

    // Outputs
    if(p1_tax_owed < 0 && p2_tax_owed < 0){
        p1_tax_owed = p1_tax_owed * -1;
        p2_tax_owed = p2_tax_owed * -1;
        positive_combined_tax_owed = combined_tax_owed * -1;
        document.getElementById(line2).innerHTML = "You have a tax liability of <b>$" + p1_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>–$" + p1_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your partner has a tax liability of <b>$" + p2_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>–$" + p2_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your family thus owes <b>-$" + positive_combined_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> of tax.";
    }
    else if(p1_tax_owed < 0){
        p1_tax_owed = p1_tax_owed * -1;
        if(combined_tax_owed < 0){
            positive_combined_tax_owed = combined_tax_owed * -1;
            document.getElementById(line2).innerHTML = "You have a tax liability of <b>$" + p1_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>–$" + p1_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your partner has a tax liability of <b>$" + p2_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>$" + p2_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your family thus owes <b>-$" + positive_combined_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> of tax.";
        }
        else {
            document.getElementById(line2).innerHTML = "You have a tax liability of <b>$" + p1_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>–$" + p1_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your partner has a tax liability of <b>$" + p2_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>$" + p2_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your family thus owes <b>$" + combined_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> of tax.";
        }
    }
    else if(p2_tax_owed < 0){
        p2_tax_owed = p2_tax_owed * -1;
        if(combined_tax_owed < 0){
            positive_combined_tax_owed = combined_tax_owed * -1;
            document.getElementById(line2).innerHTML = "You have a tax liability of <b>$" + p1_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>$" + p1_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your partner has a tax liability of <b>$" + p2_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>–$" + p2_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your family thus owes <b>-$" + positive_combined_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> of tax.";
        }
        else {
            document.getElementById(line2).innerHTML = "You have a tax liability of <b>$" + p1_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>$" + p1_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your partner has a tax liability of <b>$" + p2_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>–$" + p2_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your family thus owes <b>$" + combined_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> of tax.";
        }
    }
    else {
        document.getElementById(line2).innerHTML = "You have a tax liability of <b>$" + p1_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>$" + p1_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your partner has a tax liability of <b>$" + p2_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>$" + p2_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>. Your family thus owes <b>$" + combined_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> of tax.";
    }

    if(married_tax_owed < 0){
        positive_married_tax_owed = married_tax_owed * -1;
        document.getElementById(line3).innerHTML = "With a combined income of $" + combined_income.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would have a tax liability of <b>$" + married_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + married_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>–$" + positive_married_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else {
        document.getElementById(line3).innerHTML = "With a combined income of $" + combined_income.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would have a tax liability of <b>$" + married_tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and an EITC worth <b>$" + married_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a tax owed of <b>$" + married_tax_owed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }

    let penalty = married_tax_owed - combined_tax_owed;
    if(penalty.toFixed(0) > 0){
        document.getElementById(line4).innerHTML = "The tax your family owes thus <b>increases</b> by <b>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "."
    }
    else if(penalty.toFixed(0) == 0){
        document.getElementById(line4).innerHTML = "The tax your family owes thus remains unchanged."
    }
    else {
        bonus = penalty * -1;
        document.getElementById(line4).innerHTML = "The tax your family owes thus <b>decreases</b> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".";
    }

    document.getElementById(line1).innerHTML = both_line1_output(chart_name, penalty, p1_income, p2_income);

    // chart type-specific outputs
    /*
    if(chart_type=== 'intuitive'){
        document.getElementById(line1).innerHTML = tax_intuitive_outputs(chart_name, penalty);
    }
    else if(chart_type === 'values'){
        document.getElementById(line1).innerHTML = tax_values_outputs(chart_name, penalty, p1_income, p2_income);
    }
    */
}

/****************************** Values Chart *******************************************************************************/
function both_line1_output(chart_name, penalty, p1_income, p2_income){
    if(penalty.toFixed(0) > 0){
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else if(penalty.toFixed(0) == 0){
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, your family's taxes would <b>remain unchanged</b>"
    }
    else {
        bonus = penalty * -1;
        penalty_text = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your income of <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, you face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    return tax_append_button(chart_name, penalty_text);
}
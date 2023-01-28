function tax_values_adjust_chart(chart_name){
    let chart = eval(chart_name + '_chart');
    let p1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status = eval(chart_name + '_person2_filing_status').value;
    let p2_income        = eval(chart_name + '_person2_income').value;

    // ouptuts & modify income function
    tax_values_modify_income(chart_name);
    tax_outputs(chart_name);

    // Run chart builder
    hoh_marriage_penalty_value_chart_builder(chart, 'x_values', 'values', 200000, p2_income, p1_filing_status, p2_filing_status);
}

function tax_values_modify_income(chart_name){
    let chart = eval(chart_name + '_chart');
    
    let p1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status = eval(chart_name + '_person2_filing_status').value;
    let p1_income        = eval(chart_name + '_person1_income').value;
    let p2_income        = eval(chart_name + '_person2_income').value;
    let combined_income  = parseInt(p1_income) + parseInt(p2_income);

    // Tax liabilities
    combined_tax = tax_liability_2023(p1_filing_status, p1_income) + tax_liability_2023(p2_filing_status, p2_income);
    married_tax  = tax_liability_2023('married', combined_income);

    // Move xgrids
    chart.xgrids([{value: p1_income, text:'Your income'},]);

    // Move point 
    penalty = combined_tax - married_tax;
    chart.load({columns: [ ['x_values_point', p1_income] , ['values_point', penalty], ] });
}
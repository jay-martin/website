function adjust_hoh_marriage_penalty_values_chart(){
    // Person 2 income
    p2_income = values_person2_income.value;

    // Filing Statuses
    p1_filing_status = values_person1_filing_status.value;
    p2_filing_status = values_person2_filing_status.value;

    // Run chart builder
    hoh_marriage_penalty_value_chart_builder(valuesChart, 'x', 'penalty', p2_income, p1_filing_status, p2_filing_status);
}

function values_modify_income(){
    // Incomes
    p1_income = values_person1_income.value;
    p2_income = values_person2_income.value;
    combined_income = parseInt(p1_income) + parseInt(p2_income);

    // Filing Statuses
    p1_filing_status = values_person1_filing_status.value;
    p2_filing_status = values_person2_filing_status.value;

    // Tax liabilities
    combined_tax = tax_liability_2023(p1_filing_status, p1_income) + tax_liability_2023(p2_filing_status, p2_income);
    married_tax = tax_liability_2023('married', combined_income);

    // Move xgrids
    valuesChart.xgrids([{value: p1_income, text:'Your income'},]);

    // Move point 
    penalty = combined_tax - married_tax;
    valuesChart.load({columns: [ ['x_point', p1_income] , ['point', penalty], ] });
    
}
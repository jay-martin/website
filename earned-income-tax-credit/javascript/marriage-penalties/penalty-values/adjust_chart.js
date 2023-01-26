function marriage_penalties_values_adjust_chart(){
    eitc_marriage_penalty_value_chart_builder(MPchart, 'x_values', 'values', mp_person2_income.value, mp_person1_children.value, mp_person2_children.value);
}

function marriage_penalties_values_modify_income(){
    // Incomes
    let p1_income = mp_person1_income.value;
    let p2_income = mp_person2_income.value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    // Number of children
    let p1_children  = mp_person1_children.value;
    let p2_children  = mp_person2_children.value;
    let num_children = sum_children(p1_children, p2_children);

    // EITC values
    let combined_eitc = eitc_value_2023(p1_income, 'single', p1_children) + eitc_value_2023(p2_income, 'single', p2_children);
    let married_eitc  = eitc_value_2023(combined_income, 'married', num_children);

    // Move xgrids
    MPchart.xgrids([{value: p1_income, text:'Your income'},]);

    // Move point 
    MPchart.load({columns: [ ['x_point', p1_income] , ['values_point', married_eitc - combined_eitc], ] });
}

/*************************** Old ***************************************/

function adjust_eitc_penalty_values_chart(){
    eitc_marriage_penalty_value_chart_builder(valuesChart, 'x', 'penalty', values_person2_income.value, values_person1_children.value, values_person2_children.value);
}

function values_modify_income(){
    // Incomes
    let p1_income = values_person1_income.value;
    let p2_income = values_person2_income.value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    // Number of children
    let p1_children = values_person1_children.value;
    let p2_children = values_person2_children.value;
    let num_children = sum_children(p1_children, p2_children);

    // EITC values
    let combined_eitc = eitc_value_2023(p1_income, 'single', p1_children) + eitc_value_2023(p2_income, 'single', p2_children);
    let married_eitc = eitc_value_2023(combined_income, 'married', num_children);

    // Move xgrids
    valuesChart.xgrids([{value: p1_income, text:'Your income'},]);

    // Move point 
    valuesChart.load({columns: [ ['x_point', p1_income] , ['point', married_eitc - combined_eitc], ] });
    
}
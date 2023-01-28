function eitc_marriage_penalty_values_adjust_chart(chart_name){
    let chart = eval(chart_name + '_chart');
    let p2_income = eval(chart_name + '_person2_income').value;
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;

    eitc_marriage_penalty_value_chart_builder(chart, 'x_values', 'values', p2_income, p1_children, p2_children);
}

function eitc_marriage_penalty_values_modify_income(chart_name){
    let chart = eval(chart_name + '_chart');

    // incomes
    let p1_income = eval(chart_name + '_person1_income').value;
    let p2_income = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    // number of children
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;
    let num_children = sum_children(p1_children, p2_children);

    // EITC values
    let combined_eitc = eitc_value_2023(p1_income, 'single', p1_children) + eitc_value_2023(p2_income, 'single', p2_children);
    let married_eitc  = eitc_value_2023(combined_income, 'married', num_children);

    // Move xgrids
    chart.xgrids([{value: p1_income, text:'Your income'},]);

    // Move point 
    chart.load({columns: [ ['x_values_point', p1_income] , ['values_point', married_eitc - combined_eitc], ] });
}
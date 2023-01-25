function adjust_eitc_penalty_values_chart(){
    // Person 2 income
    p2Income = values_person2_income.value;

    // Number of children
    p1Children = values_person1_children.value;
    p2Children = values_person2_children.value;

    // Run chart builder
    eitc_marriage_penalty_value_chart_builder(valuesChart, 'x', 'penalty', p2Income, p1Children, p2Children);
}

function values_modify_income(){
    // Incomes
    p1Income = values_person1_income.value;
    p2Income = values_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // Number of children
    p1Children = values_person1_children.value;
    p2Children = values_person2_children.value;
    numChildren = sum_children(p1Children, p2Children);

    // EITC values
    p1EITC = eitc_value_2023(p1Income, 'single', p1Children);
    p2EITC = eitc_value_2023(p2Income, 'single', p2Children);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = eitc_value_2023(combinedIncome, 'married', numChildren);

    // Move xgrids
    valuesChart.xgrids([{value: p1Income, text:'Your income'},]);

    // Move point 
    penalty = marriedEITC - combinedEITC;
    valuesChart.load({columns: [ ['x_point', p1Income] , ['point', penalty], ] });
    
}
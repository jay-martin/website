function adjust_eitc_penalty_values_chart(){
    // person 2 income
    p2Income = person2_income.value;

    // number of children
    p1Children = person1_children.value;
    p2Children = person2_children.value;

    // run chart builder
    eitc_marriage_penalty_value_chart_builder(MPchart, 'x_horizontal', 'penalty', p2Income, p1Children, p2Children);
}

function eitc_penalty_value_modify_income(){
    // Income values
    p1Income = person1_income.value;
    p2Income = person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // Number of children values
    p1Children = person1_children.value;
    p2Children = person2_children.value;
    numChildren = sum_children(p1Children, p2Children);

    // EITC values
    p1EITC = eitc_value_2023(p1Income, 'single', p1Children);
    p2EITC = eitc_value_2023(p2Income, 'single', p2Children);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = eitc_value_2023(combinedIncome, 'married', numChildren);

    // Move xgrid 
    MPchart.xgrids([{value: p2Income, text:"Your partner's income"},]);

    // Move point 
    penalty = combinedEITC - marriedEITC;
    MPchart.load({columns: [ ['x_point_red', p2Income] , ['point_red', penalty], ] });
}


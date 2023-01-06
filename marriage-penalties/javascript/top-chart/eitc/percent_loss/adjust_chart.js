function modify_percent_loss_eitc(){
    p1Children = person1_children.value;
    p1Income = person1_income.value;


    single_eitc_builder_2023(MPchart, 'x1', 'person1', person1_num_children);
}

function eitc_modify_income(){
    p1Income = person1_income.value;
    p2Income = person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    p1Children = person1_children.value;
    p2Children = person2_children.value;
    numChildren = sum_children(p1Children, p2Children);

    // EITC values
    p1EITC = eitc_value_2023(p1Income, 'single', p1Children);
    p2EITC = eitc_value_2023(p2Income, 'single', p2Children);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = eitc_value_2023(combinedIncome, 'married', numChildren);

    /* Move xgrids */
    MPchart.xgrids([{value: p2Income, text:"Your partner's income"},]);

    /* Move point */
    penalty = combinedEITC - marriedEITC;
    MPchart.load({columns: [ ['x_point2', p2Income] , ['point2', penalty], ] });

    /* Adjust chart x-axis max in case combined income exceeds current x-axis max */
    if(combinedIncome > 60000 && combinedIncome <80000){
        MPchart.axis.max({x: 80000});
    }
    else if(combinedIncome >= 80000 && combinedIncome <100000){
        MPchart.axis.max({x: 100000});
    }
    else if(combinedIncome >= 100000){
        MPchart.axis.max({x: 120000});
    }
    else{
        MPchart.axis.max({x: 60000});
    }
}


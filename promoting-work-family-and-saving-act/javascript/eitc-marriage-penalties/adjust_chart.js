function reformed_eitc_marriage_penalty_adjust_chart(){
    build_eitc_marriage_penalty_chart('eitc_marriage_penalty', reformed_eitc_value_at_income, build_reformed_eitc);
    eitc_marriage_penalty_outputs('eitc_marriage_penalty', 'reformed_eitc_marriage_penalty', reformed_eitc_value_at_income);
}

function reformed_eitc_marriage_penalty_modify_income(){
    let p1_income = eitc_marriage_penalty_person1_income.value;
    let p2_income = eitc_marriage_penalty_person2_income.value;
    let p1_num_children = eitc_marriage_penalty_person1_children.value;
    let p2_num_children = eitc_marriage_penalty_person2_children.value;

    modify_income_eitc_marriage_penalty_chart('eitc_marriage_penalty', p1_income, p2_income, p1_num_children, p2_num_children, reformed_eitc_value_at_income);
    eitc_marriage_penalty_outputs('eitc_marriage_penalty', 'reformed_eitc_marriage_penalty', reformed_eitc_value_at_income);
}

function build_eitc_marriage_penalty_chart(chart_name, eitc_calculate_function, eitc_builder_function){
    let p1_income = eval(chart_name + '_person1_income').value;
    let p2_income = eval(chart_name + '_person2_income').value;
    let p1_num_children = eval(chart_name + '_person1_children').value;
    let p2_num_children = eval(chart_name + '_person2_children').value;

    adjust_eitc_marriage_penalty_chart(chart_name, p1_num_children, p2_num_children, eitc_builder_function);
    modify_income_eitc_marriage_penalty_chart(chart_name, p1_income, p2_income, p1_num_children, p2_num_children, eitc_calculate_function);
}

function adjust_eitc_marriage_penalty_chart(chart_name, p1_num_children, p2_num_children, eitc_builder_function){
    let chart = eval(chart_name + '_chart');
    let combined_children = sum_children_no_cap(p1_num_children, p2_num_children);
    build_overlapping_reformed_single_eitcs(chart, p1_num_children, p2_num_children);
    //eitc_builder_function(chart, 'x_person1', 'person1', 'single', p1_num_children);
    //eitc_builder_function(chart, 'x_person2', 'person2', 'single', p2_num_children);
    eitc_builder_function(chart, 'x_married', 'married', 'married', combined_children);
}

function modify_income_eitc_marriage_penalty_chart(chart_name, p1_income, p2_income, p1_num_children, p2_num_children, eitc_calculate_function){
    let chart = eval(chart_name + '_chart');

    // combined income & children
    let combined_income = parseInt(p1_income) + parseInt(p2_income);
    let combined_children = sum_children_no_cap(p1_num_children, p2_num_children);

    // EITC values
    let p1_eitc       = eitc_calculate_function(p1_income, 'single', p1_num_children);
    let p2_eitc       = eitc_calculate_function(p2_income, 'single', p2_num_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc  = eitc_calculate_function(combined_income, 'married', combined_children);

    /* Move xgrids */
    if(p1_income == 0){
        chart.xgrids([{value: p1_income, text:'Your income'},{value: combined_income, text:"Combined income / Person 2 income"}]);
    }
    else if(p2_income == 0){
        chart.xgrids([{value: combined_income, text:"Combined income / Person 1 income"}]);
    }
    else{
        chart.xgrids([{value: p1_income, text:'Your income'},{value: p2_income, text:"Your partner's income"},{value: combined_income, text:"Combined income"}]);
    }

    // Move points
    chart.load({columns: [ ['x_point1', p1_income] , ['point1', p1_eitc], ['x_point2', p2_income], ['point2', p2_eitc], ['x_point_married', combined_income], ['point_married', married_eitc], ] });

    // Move stacked eitc value curves
    penalty = combined_eitc - married_eitc;
    if(penalty == 0){ //exact values sometimes does not equal zero because income threshold values are rounded to the nearest whole number (I've put a $20 buffer but the actual discrepancy is a small fraction of a dollar)
        chart.hide(['combined_eitc', 'bonus_eitc', 'married_eitc', 'penalty_eitc']);
        chart.ygrids([{value: 0}, {value: married_eitc, text: "Combined Individual EITC's/Married EITC"}]);
    }
    else if(penalty > 0){
        chart.ygrids([{value: 0}, {value: combined_eitc, text: "Combined individual EITC's"}, {value: married_eitc, text: "Your married EITC", y_position: 'below'}]);
        chart.show(['married_eitc',  'penalty_eitc']);
        chart.hide(['combined_eitc', 'bonus_eitc']);
        chart.load({
            columns: [
                ['x_horizontal',  0,            120000],
                ['married_eitc',  married_eitc, married_eitc],
                ['penalty_eitc',  penalty,      penalty],
            ]
        });
    }
    else{
        chart.ygrids([{value: 0}, {value: married_eitc, text: "Your married EITC"}, {value: combined_eitc, text: "Combined individual EITC's", y_position: 'below'}]);
        chart.hide(['married_eitc',  'penalty_eitc']);
        chart.show(['combined_eitc', 'bonus_eitc']);
        chart.load({
            columns: [
                ['x_horizontal',  0, 120000],
                ['combined_eitc', combined_eitc, combined_eitc],
                ['bonus_eitc',    penalty * -1,  penalty * -1],
            ]
        });
    }
}



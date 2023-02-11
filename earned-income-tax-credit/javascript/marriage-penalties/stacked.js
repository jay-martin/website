function eitc_marriage_penalty_intuitive_stacked_modify_person1_income(chart_name){
    let chart       = eval(chart_name + '_chart');
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;
    let combined_children = sum_children(p1_children, p2_children);
    let p1_income   = eval(chart_name + '_person1_income').value;
    let p2_income   = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    let p1_eitc = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;

    let married_eitc = eitc_value_2023(combined_income, 'married', combined_children);
    let penalty = combined_eitc - married_eitc;

    chart.xgrids([ {value: p1_income, text: "Your income"}, {value: p2_income, text: "Your partner's income"}, {value: combined_income, text: "Combined income"},] );
    chart.ygrids([{value: 0}, {value: married_eitc, text: "Your married EITC"}, {value: combined_eitc, text: "Combined individual EITC's"}, {value: p2_eitc, text: "Your Partner's EITC"} ]);
    chart.load({ 
        columns: [
            ['x_horizontal',  0, 60000],
            ['married_eitc',  married_eitc, married_eitc],
            ['penalty_eitc',  penalty,      penalty],

            ['x_point1', p1_income],
            ['point1', combined_eitc],

            ['x_point_married', combined_income],
            ['point_married', married_eitc],
        ]
    });
}

function eitc_marriage_penalty_intuitive_stacked_modify_person2_income(chart_name){
    let chart       = eval(chart_name + '_chart');
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;
    let combined_children = sum_children(p1_children, p2_children);
    let p1_income   = eval(chart_name + '_person1_income').value;
    let p2_income   = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    let p1_eitc = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;

    let married_eitc = eitc_value_2023(combined_income, 'married', combined_children);
    let penalty = combined_eitc - married_eitc;

    chart.xgrids([ {value: p1_income, text: "Your income"}, {value: p2_income, text: "Your partner's income"}, {value: combined_income, text: "Combined income"},] );
    chart.ygrids([{value: 0}, {value: married_eitc, text: "Your married EITC"}, {value: combined_eitc, text: "Combined individual EITC's"}, {value: p2_eitc, text: "Your Partner's EITC"} ]);
    chart.load({ 
        columns: [
            ['x_horizontal',  0, 60000],
            ['married_eitc',  married_eitc, married_eitc],
            ['penalty_eitc',  penalty,      penalty],

            ['x_point1', p1_income],
            ['point1',   combined_eitc],

            ['x_point2', p2_income],
            ['point2',   p2_eitc],

            ['x_point_married', combined_income],
            ['point_married', married_eitc],
        ]
    });
    eitc_marriage_penalty_intuitive_stacked_adjust_person1(chart_name);
}

function eitc_marriage_penalty_intuitive_stacked_adjust_person1(chart_name){
    let chart       = eval(chart_name + '_chart');
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;
    let p2_income   = eval(chart_name + '_person2_income').value;

    single_stacked_eitc_builder_2023(chart, 'x1', 'person1', p2_income, p1_children, p2_children);
    eitc_marriage_penalty_intuitive_stacked_modify_person1_income(chart_name);
}

function single_stacked_eitc_builder_2023(chart, x_name, data_name, person2_income, person1_num_children, person2_num_children){
    const single_eitc_none_child  = [0, 600,   600,   0];
    const single_eitc_one_child   = [0, 3995,  3995,  0];
    const single_eitc_two_child   = [0, 6604,  6604,  0];
    const single_eitc_three_child = [0, 7430,  7430,  0];

    const single_eitc_none_child_x_vals  = [0, 7840, 9800, 17640];
    const single_eitc_one_child_x_vals   = [0, 11750, 21560, 46560];
    const single_eitc_two_child_x_vals   = [0, 16510, 21560, 52918];
    const single_eitc_three_child_x_vals = [0, 16510, 21560, 56838];

    let current_eitc_x_values       = eval('single_eitc_' + person1_num_children + '_child_x_vals');
    let current_eitc_initial_values = eval('single_eitc_' + person1_num_children + '_child');
    let p2_eitc_val = eitc_value_2023(person2_income, 'single', person2_num_children);
    
    let stacked_eitc_values = [];
    for(val of current_eitc_initial_values){
        stacked_eitc_values.push(val + p2_eitc_val);
    }

    // format
    current_eitc_x_values.unshift(x_name);
    stacked_eitc_values.unshift(data_name);

    chart.load({ columns: [current_eitc_x_values, stacked_eitc_values] });
}

function eitc_stacked_person2(chart_name){
    let chart       = eval(chart_name + '_chart');
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;
    let combined_children = sum_children(p1_children, p2_children);

    single_eitc_builder_2023(chart, 'x2', 'person2', p2_children);
    married_eitc_builder_2023(chart, 'x3', 'married', combined_children);
    eitc_marriage_penalty_intuitive_stacked_modify_person2_income(chart_name);
}
/** Moves c3.js income x-grid and adjust the point on the chart
 * @param {string} - name used for c3.js variables
 * */
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
    let penalty = married_eitc - combined_eitc;
    // red point if marriage penalty
    if(penalty <= 0){
        chart.load({
            columns : [ ['x_values_point', p1_income] , ['values_point', penalty], ],
            colors  : {'values_point' : '#eb3734'},
        });
    }
    // green point if marriage bonus
    else {
        chart.load({
            columns : [ ['x_values_point', p1_income] , ['values_point', penalty], ],
            colors  : {'values_point' : '#36D903'},
        });
    }
}

/** Adjusts curves of c3.js chart in response to user inputs
 * @param {string} - name used for c3.js variables
 * */
function eitc_marriage_penalty_values_adjust_chart(chart_name){
    let chart = eval(chart_name + '_chart');
    let p2_income = eval(chart_name + '_person2_income').value;
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;

    eitc_marriage_penalty_value_chart_builder(chart, 'x_values', 'values', p2_income, p1_children, p2_children);
}

/** Loads to given c3.js chart a curve showing the EITC marriage penalties a person faces given their partner's income and the number of children each of them have
 * @param {string}  - variable name of c3.js chart
 * @param {string}  - variable name of c3.js chart
 * @param {string}  - variable name of c3.js x variable
 * @param {string}  - variable name of c3.js dependent variable
 * @param {integer} - income of person 2
 * @param {string}  - string representing the number of children person1 has ('none', 'one', 'two', 'three')
 * @param {string}  - string representing the number of children person2 has ('none', 'one', 'two', 'three')
 * */
function eitc_marriage_penalty_value_chart_builder(chart, x_name, data_name, p2_income, p1_children, p2_children){
    let combined_children = sum_children(p1_children, p2_children);
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);
    let x_vals = eitc_marriage_penalty_x_values(p1_children, combined_children, p2_income);

    // marriage penalty (y) values
    let y_vals = [];
    for (i in x_vals) {
        married = eitc_value_2023(x_vals[i] + parseInt(p2_income), 'married', combined_children);
        combined = p2_eitc + eitc_value_2023(x_vals[i], 'single', p1_children);
        y_vals.push( married - combined );
    }

    // build regions
    let xy_val_arrays = marriage_penalty_values_region_builder(x_vals, y_vals, 70000);
    let array_of_x_val_arrays = xy_val_arrays[0];
    let array_of_y_val_arrays = xy_val_arrays[1];

    // x:y pair assignments, chart types, and colors for c3.js chart
    let chart_formatting_data = marriage_penalty_values_formatting_data(array_of_x_val_arrays, array_of_y_val_arrays);
    let xy_pairs = chart_formatting_data[0];
    let line_types = chart_formatting_data[1];
    let line_colors = chart_formatting_data[2];

    // hide and show lines
    let hide_and_show_data = marriage_penalty_values_hide_and_show_lines(array_of_y_val_arrays);
    let show_lines = hide_and_show_data[0];
    let hide_lines = hide_and_show_data[1];
    chart.hide(hide_lines);
    chart.show(show_lines);

    // append x & y array of arrays
    array_of_x_val_arrays.push.apply(array_of_x_val_arrays, array_of_y_val_arrays);

    // Load values to chart
    chart.load({ 
        xs      : xy_pairs, 
        columns : array_of_x_val_arrays,
        types   : line_types,
        colors  : line_colors,
    });
}

/** Returns formatted x-values for an eitc marriage penalty values chart
 * @param {string}  - string representing the number of children person1 has ('none', 'one', 'two', 'three')
 * @param {string}  - string representing the combined number of children ('none', 'one', 'two', 'three')
 * @param {integer} - income of person 2
 * @return {array of integers} - formatted x-values
 * */
function eitc_marriage_penalty_x_values(person1_children, combined_children, person2_income){
    const zero_child_values   = [0, 7840,  9800,  17640, 70000];
    const one_child_values    = [0, 11750, 21560, 46560, 70000];
    const two_child_values    = [0, 16510, 21560, 52918, 70000];
    const three_child_values  = [0, 16510, 21560, 56838, 70000];

    let combined_none_values  = [7840  - person2_income, 16379 - person2_income, 24210 - person2_income];
    let combined_one_values   = [11750 - person2_income, 28120 - person2_income, 53120 - person2_income];
    let combined_two_values   = [16510 - person2_income, 28120 - person2_income, 59478 - person2_income];
    let combined_three_values = [16510 - person2_income, 28120 - person2_income, 63398 - person2_income];

    // construct variable name based on combined_children
    let married_values = 'combined_' + combined_children + '_values';

    if(person1_children === 'none'){
        return format_marriage_penalty_x_values(zero_child_values.concat(eval(married_values)));
    }
    else if(person1_children === 'one'){
        return format_marriage_penalty_x_values(one_child_values.concat(eval(married_values)));
    }
    else if(person1_children === 'two'){
        return format_marriage_penalty_x_values(two_child_values.concat(eval(married_values)));
    }
    else if(person1_children === 'three'){
        return format_marriage_penalty_x_values(three_child_values.concat(eval(married_values)));
    }
}
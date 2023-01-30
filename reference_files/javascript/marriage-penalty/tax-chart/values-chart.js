/** Moves c3.js income x-grid and adjust the point on the chart
 * @param {string} - name used for c3.js variables
 * */
function tax_values_modify_income(chart_name){
    let chart = eval(chart_name + '_chart');
    
    let p1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status = eval(chart_name + '_person2_filing_status').value;
    let p1_income        = eval(chart_name + '_person1_income').value;
    let p2_income        = eval(chart_name + '_person2_income').value;
    let combined_income  = parseInt(p1_income) + parseInt(p2_income);

    // Tax liabilities
    let combined_tax = tax_liability_2023(p1_filing_status, p1_income) + tax_liability_2023(p2_filing_status, p2_income);
    let married_tax  = tax_liability_2023('married', combined_income);

    // Move xgrids
    chart.xgrids([{value: p1_income, text:'Your income'},]);

    // Move point 
    let penalty = combined_tax - married_tax;
    // red point if marriage penalty
    if(penalty < 0){
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
function tax_values_adjust_chart(chart_name){
    let chart = eval(chart_name + '_chart');
    let p1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status = eval(chart_name + '_person2_filing_status').value;
    let p2_income        = eval(chart_name + '_person2_income').value;

    // Run chart builder
    hoh_marriage_penalty_value_chart_builder(chart, 'x_values', 'values', 200000, p2_income, p1_filing_status, p2_filing_status);
}

/** Loads to given c3.js chart a curve showing the HOH marriage penalties a person faces given their partner's income and the number of children each of them have
 * @param {string}  - variable name of c3.js chart
 * @param {string}  - variable name of c3.js x variable
 * @param {string}  - variable name of c3.js dependent variable
 * @param {integer} - x-axis max value
 * @param {integer} - income of person 2
 * @param {string}  - person 1 filing status ('single', 'hoh', 'married')
 * @param {string}  - person 2 filing status ('single', 'hoh', 'married')
 * */
function hoh_marriage_penalty_value_chart_builder(chart, x_name, data_name, x_max, p2_income, p1_filing_status, p2_filing_status){
    // Person 2 Fixed Tax Liability
    let p2_tax_liability = tax_liability_2023(p2_filing_status, p2_income);

    // x values
    let x_vals = hoh_marriage_penalty_x_values(x_max, p2_income, p1_filing_status, p2_filing_status);

    // Marriage penalty (y) values
    let y_vals = [];
    for (i in x_vals) {
        married = tax_liability_2023('married', x_vals[i] + parseInt(p2_income));
        combined = p2_tax_liability + tax_liability_2023(p1_filing_status, x_vals[i]);
        y_vals.push( combined - married );
    }

    // build regions
    let xy_val_arrays = marriage_penalty_values_region_builder(x_vals, y_vals, 200000);
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

/** Returns formatted x-values for an HOH marriage penalty values chart
 * @param {integer} - income of person 2
 * @return {array of integers} - formatted x-values
 * */
function hoh_marriage_penalty_x_values(x_max, person2_income, person1_filing_status, person2_filing_status){
    const full_hoh_values    = [0, 20800, 36500, 80650, 116150, 202900, 252050, 598900];
    const full_single_values = [0, 13850, 24850, 58575, 109225, 195950, 245100, 591975];

    let hoh_values     = cut_x_values(x_max, full_hoh_values);
    let single_values  = cut_x_values(x_max, full_single_values);
    let married_values = cut_x_values(x_max, [27700 - person2_income, 49700 - person2_income, 117150 - person2_income, 218450 - person2_income, 391900 - person2_income, 490200 - person2_income, 721450 - person2_income]);

    if(person1_filing_status === 'single'){
        x_values = format_marriage_penalty_x_values(single_values.concat(married_values));
        x_values.push(x_max);
        return x_values;
    }
    else if(person1_filing_status === 'hoh'){
        x_values = format_marriage_penalty_x_values(hoh_values.concat(married_values));
        x_values.push(x_max);
        return x_values;
    }
}

/** Takes in an x_values array and returns an array with all values from x_values less than x_max
 * @param {integer} - max x value
 * @return {array of integers} - x-values
 * */
function cut_x_values(x_max, x_values){
    let formatted_x_values = [];
    for (x of x_values) {
        if(x < x_max){
            formatted_x_values.push(x);
        }
    }
    return formatted_x_values;
}
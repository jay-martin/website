/************************************************ EITC ******************************************************************************************************************/
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

/************************************************ HOH *********************************************************************************************************************/
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

/************************************************ Shared ******************************************************************************************************************/
/** Takes in array of integers, removes duplicates, sorts the array, removes values less than zero, and then returns that array
 * @param  {array of integer}
 * @return {array of integers}
 * */
function format_marriage_penalty_x_values(x_values){
    // remove any duplicates
    let x_values_set = new Set(x_values);

    // sort in ascending order
    let x_values_sorted = Array.from(x_values_set).sort(function(a,b){return a-b;});

    // remove values below zero
    let positive_values = [];
    for (x of x_values_sorted) {
        if(x >= 0){
            positive_values.push(x);
        }
    }
    return positive_values;
}

/** Returns the green and red regions of the eitc values chart
 * @param {array of floats}  - x values for entire chart
 * @param {array of floats}  - y values for entire chart
 * @return {array of arrays of floats} - formatted arrays for the c3.js chart
 * */
function marriage_penalty_values_region_builder(x_vals, y_vals, x_max){
    let array_of_x_val_arrays = [];
    let array_of_y_val_arrays = [];
    let current_x_vals = [];
    let current_y_vals = [];
    let y_previous = y_vals[0];
    let x_previous = x_vals[0];
    let green_number = 1;
    let red_number = 1;
    let current_color = '';
    let i = 0;
    while(i < y_vals.length){
        if(y_previous > 0 && y_vals[i] < 0 || y_previous < 0 && y_vals[i] > 0){
            // add last point to current arrays
            root = linear_root(x_previous, y_previous, x_vals[i], y_vals[i]);
            current_x_vals.push(root);
            current_y_vals.push(0);

            // format arrays & update data name number
            if(y_previous > 0){
                current_x_vals.unshift('x_green' + green_number.toString() );
                current_y_vals.unshift('y_green' + green_number.toString() );
                current_color = 'red';
                green_number++;
            }
            else {
                current_x_vals.unshift('x_red' + red_number.toString() );
                current_y_vals.unshift('y_red' + red_number.toString() );
                current_color = 'green';
                red_number++;
            }

            // add finished arrays to their respective array of columns
            array_of_x_val_arrays.push(current_x_vals);
            array_of_y_val_arrays.push(current_y_vals);

            // restart arrays
            current_x_vals = [root];
            current_y_vals = [0];

            // for loop condition
            y_previous = y_vals[i];
            x_previous = x_vals[i];
        }
        else if(x_vals[i] == x_max){
            // add last point to current arrays
            current_x_vals.push(x_vals[i]);
            current_y_vals.push(y_vals[i]);

            // format arrays
            if(current_color === ''){
                if(y_previous < 0){
                    current_x_vals.unshift('x_red' + red_number.toString() );
                    current_y_vals.unshift('y_red' + red_number.toString() );
                }
                else {
                    current_x_vals.unshift('x_green' + green_number.toString() );
                    current_y_vals.unshift('y_green' + green_number.toString() );
                }
            }
            else if(current_color === 'red'){
                current_x_vals.unshift('x_red' + red_number.toString() );
                current_y_vals.unshift('y_red' + red_number.toString() );
            }
            else {
                current_x_vals.unshift('x_green' + green_number.toString() );
                current_y_vals.unshift('y_green' + green_number.toString() );
            }

            // add finished arrays to their respective array of columns
            array_of_x_val_arrays.push(current_x_vals);
            array_of_y_val_arrays.push(current_y_vals);

            // ends loop
            i++;
        }
        else {
            current_x_vals.push(x_vals[i]);
            current_y_vals.push(y_vals[i]);
            y_previous = y_vals[i];
            x_previous = x_vals[i];
            i++;
        }       
    }

    return [array_of_x_val_arrays, array_of_y_val_arrays];
}

/** Returns formatting data for the c3.js eitc marriage penalties values chart
 * @param  {array of arrays of floats} - formatted x-value arrays of red & green regions (e.g. [ ['x_green1', x1, x2, x3], ['x_green2', x3, x4, x5] ])
 * @param  {array of arrays of floats} - formatted y-value arrays of red & green regions (e.g. [ ['y_green1', y1, y2, y3], ['y_green2', y3, y4, y5] ])
 * @return {array of three objects}
 *      0. xy_pairs    : object of key-value pairs showing which data names pair with which x names (e.g. 'y_green1' : 'x_green1')
 *      1. line_types  : object of key-value pairs specifying that each line is an area curve (e.g. 'y_green1' : 'area')
 *      2. line_colors : object of key-value pairs specifying the color of each curve (e.g. 'y_green1' : '#36D903', 'y_red1' : '#eb3734')
 * */
function marriage_penalty_values_formatting_data(array_of_x_val_arrays, array_of_y_val_arrays){
    // add x:y pair assignments, chart types, and colors to c3.js chart object
    let xy_pairs = new Object();
    let line_types = new Object;
    let line_colors = new Object;
    for(i in array_of_x_val_arrays){
        // x:y pairs
        current_x = array_of_x_val_arrays[i][0];
        current_y = array_of_y_val_arrays[i][0];
        xy_pairs[current_y] = current_x;

        // chart type
        line_types[current_y] = 'area';

        // chart color
        if(current_y.includes('green')){
            line_colors[current_y] = '#36D903';
        }
        else{
            line_colors[current_y] = '#eb3734';
        }
    }
    return [xy_pairs, line_types, line_colors]
}

/** Returns the names of the lines that should be hidden and the names of the lines that should be shown
 * @param  {array of arrays of floats} - formatted y-value arrays of red & green regions (e.g. [ ['y_green1', y1, y2, y3], ['y_green2', y3, y4, y5] ])
 * @return {array of two arrays of strings}
 *      0. show_lines : array of lines that should be shown on the chart (e.g. ['y_green1', 'y_red1'])
 *      1. hide_lines : array of lines that should be hidden on the chart (e.g. ['y_green2', 'y_red2',...] )
 * */
function marriage_penalty_values_hide_and_show_lines(array_of_y_val_arrays){
    const all_lines = ['y_red1', 'y_red2', 'y_red3', 'y_red4', 'y_green1', 'y_green2', 'y_green3', 'y_green4'];
    let show_lines  = [];
    let hide_lines  = [];
    for(y of array_of_y_val_arrays){
        show_lines.push(y[0]);
    }
    for(line of all_lines){
        if(show_lines.includes(line)){
            // do nothing
        }
        else{
            hide_lines.push(line);
        }
    }
    return [show_lines, hide_lines];
}

/** Returns the root of a linear equation given two points on the line (x_previous, y_previous), (x_current, y_current)
 * @param {integer} - x coordinate of first point
 * @param {integer} - y coordinate of first point
 * @param {integer} - x coordinate of second point
 * @param {integer} - y coordinate of second point
 * */
function linear_root(x_previous, y_previous, x_current, y_current){
    slope = (y_current - y_previous) / (x_current - x_previous);
    return x_previous - (y_previous / slope);
}
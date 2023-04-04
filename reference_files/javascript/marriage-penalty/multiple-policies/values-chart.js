/** Moves c3.js income x-grid and adjust the point on the chart
 * @param {string} - name used for c3.js variables
 * */
function multiple_policies_marriage_penalty_values_modify_income(chart_name){
    let chart = eval(chart_name + '_chart');
    chart.show(['values_point']); // needed in case all benefits are deselected and then one is reselected

    // incomes
    let p1_income = eval(chart_name + '_person1_income').value;
    let p2_income = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    // number of children
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;
    let num_children = sum_children(p1_children, p2_children);

    // filing statuses
    let p1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status = eval(chart_name + '_person2_filing_status').value;

    // tax liabilities
    let p1_tax       = tax_liability_2023(p1_filing_status, p1_income);
    let p2_tax       = tax_liability_2023(p2_filing_status, p2_income);
    let combined_tax = p1_tax + p2_tax;
    let married_tax  = tax_liability_2023('married', combined_income);

    // eitc values
    let p1_eitc       = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc       = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc  = eitc_value_2023(combined_income, 'married', num_children);

    // marriage penalty
    if(isActive['eitc'] && isActive['hoh']){
        penalty = (combined_tax - combined_eitc) - (married_tax - married_eitc);
    }
    else if(isActive['eitc']){
        penalty = married_eitc - combined_eitc;
    }
    else if(isActive['hoh']){
        penalty = combined_tax - married_tax;
    }
    
    // Move xgrids
    chart.xgrids([{value: p1_income, text:'Your income'},]);

    // red point if marriage penalty
    let point_color = '#eb3734';
    if(penalty > 0){
        point_color = '#36D903';
    }
    else if(penalty == 0){
        point_color = white_or_black;
    }

    chart.load({
        columns : [ ['x_values_point', p1_income] , ['values_point', penalty], ],
        colors  : {'values_point' : point_color},
    });
}

/** Adjusts curves of c3.js chart in response to user inputs
 * @param {string} - name used for c3.js variables
 * */
function multiple_policies_marriage_penalty_values_adjust_chart(chart_name){
    let chart = eval(chart_name + '_chart');
    let p1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status = eval(chart_name + '_person2_filing_status').value;
    let p1_children      = eval(chart_name + '_person1_children').value;
    let p2_children      = eval(chart_name + '_person2_children').value;  
    let p2_income        = eval(chart_name + '_person2_income').value;

    // Run chart builder
    multiple_policies_marriage_penalty_values_chart_builder(chart, 'x_values', 'values', 200000, p2_income, p1_filing_status, p2_filing_status, p1_children, p2_children);
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
function multiple_policies_marriage_penalty_values_chart_builder(chart, x_name, data_name, x_max, p2_income, p1_filing_status, p2_filing_status, p1_children, p2_children){
    let combined_children = sum_children(p1_children, p2_children)

    // person 2 fixed values
    let p2_value = 0;
    if(isActive['eitc'] && isActive['hoh']){
        p2_value = tax_liability_2023(p2_filing_status, p2_income) - eitc_value_2023(p2_income, 'single', p2_children);
    }
    else if(isActive['eitc']){
        p2_value = eitc_value_2023(p2_income, 'single', p2_children);
    }
    else if(isActive['hoh']){
        p2_value = tax_liability_2023(p2_filing_status, p2_income);
    }

    // x values
    let hoh_x_vals  = hoh_marriage_penalty_x_values(x_max, p2_income, p1_filing_status, p2_filing_status);
    let eitc_x_vals = eitc_marriage_penalty_x_values(p1_children, combined_children, p2_income);

    // combine x values
    let x_vals = [];
    if(isActive['eitc'] && isActive['hoh']){
        x_vals = format_marriage_penalty_x_values(hoh_x_vals.concat(eitc_x_vals));
    }
    else if(isActive['eitc']){
        x_vals = eitc_x_vals;
    }
    else if(isActive['hoh']){
        x_vals = hoh_x_vals;
    }

    // Marriage penalty (y) values
    let y_vals = [];
    for (i in x_vals) {
        if(isActive['eitc'] && isActive['hoh']){
            combined_tax_owed = p2_value + ( tax_liability_2023(p1_filing_status, x_vals[i]) - eitc_value_2023(x_vals[i], 'single', p1_children) ) ;
            married_tax_owed  = tax_liability_2023('married', x_vals[i] + parseInt(p2_income)) - eitc_value_2023(x_vals[i] + parseInt(p2_income), 'married', combined_children);
            y_vals.push( combined_tax_owed - married_tax_owed );
        }
        else if(isActive['eitc']){
            combined_eitc = p2_value + eitc_value_2023(x_vals[i], 'single', p1_children);
            married_eitc  = eitc_value_2023(x_vals[i] + parseInt(p2_income), 'married', combined_children);
            y_vals.push( married_eitc - combined_eitc );
        }
        else if(isActive['hoh']){
            combined_tax = p2_value + tax_liability_2023(p1_filing_status, x_vals[i]);
            married_tax  = tax_liability_2023('married', x_vals[i] + parseInt(p2_income));
            y_vals.push( combined_tax - married_tax );
        }
    }

    // build regions
    if( (isActive['eitc'] && isActive['hoh']) || isActive['hoh']){
        xy_val_arrays = marriage_penalty_values_region_builder(x_vals, y_vals, 200000);
    } 
    else {
        xy_val_arrays = marriage_penalty_values_region_builder(x_vals, y_vals, 70000);
    }
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


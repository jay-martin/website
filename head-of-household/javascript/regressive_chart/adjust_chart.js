/******************************************************************************************
 * This file controls adjustments to made to the chart
 * ****************************************************************************************/

/* Zooms graph on lower incomes */
function zoom_regressive(){
    if(zoom_switch_regressive.checked){
        income_regressive.max = "100000";
        regressiveChart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
        regressiveChart.axis.max({x: 100000});
    }
    else{
        income_regressive.max = "600000";
        regressiveChart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
        regressiveChart.axis.max({x: 620000});
    }
}

/* Moves the income slider */
function modify_income_regressive(){
    let income = income_regressive.value;
    let item_deduct = '0';

    let savings = hoh_tax_difference_2023(income, item_deduct);
    regressiveChart.load({
        columns: [
            ['x_point',   income],
            ['point',     savings],
            ['point_top', 4177],

            ['x_line',          income,  income],
            ['difference_line', savings, 4177],
        ]
    });
}

/* Adjusts the chart according to user input */
function modify_chart_regressive(){
    let tax_values = hoh_chart_values_2023(itemized_deductions.value);
    let x_values = tax_values[0];
    let y_values = tax_values[1];

    // format arrays
    x_values.unshift('x');
    y_values.unshift('HOH_Savings');

    HOHchart.load({
        columns: [
            x_values,
            y_values,
        ]
    });
}
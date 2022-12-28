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
        regressiveChart.axis.max({x: 600000});
    }
}

/* Moves the income slider */
function modify_income_regressive(){
    income = income_regressive.value;
    itemDeduct = '0';
    numChildren = 'none';

    value = tax_difference_at_income(income, itemDeduct, numChildren);
    regressiveChart.load({
        columns: [
            ['x_point',   income],
            ['point',     value],
            ['point_top', 3886],

            ['x_line',          income, income],
            ['difference_line', value,  3886],
        ]
    });
}

/* Adjusts the chart according to user input */
function modify_chart_regressive(){
    itemDeduct = itemized_deductions.value;
    numChildren = num_children_formatting(num_children.value);

    tax_no_ctc = tax_difference(itemDeduct);
    brackets_no_ctc = tax_no_ctc[0];
    tax_dif_no_ctc = tax_no_ctc[1];

    brackets_no_ctc.unshift('x');
    tax_dif_no_ctc.unshift('HOH_Savings');

    if(tax_credit_switch.checked === false){
        HOHchart.hide('after_ctc');
        HOHchart.load({
            columns: [
                brackets_no_ctc,
                tax_dif_no_ctc,
            ]
        });
    }
    else{
        HOHchart.show('after_ctc');
        
        tax_with_ctc = tax_difference_with_ctc(itemDeduct, numChildren);
        brackets_with_ctc = tax_with_ctc[0];
        tax_dif_with_ctc = tax_with_ctc[1];

        brackets_with_ctc.unshift('x3');
        tax_dif_with_ctc.unshift('after_ctc'); 

        HOHchart.load({
            columns: [
                brackets_no_ctc,
                tax_dif_no_ctc,
                brackets_with_ctc,
                tax_dif_with_ctc,
            ]
        });
    }
}
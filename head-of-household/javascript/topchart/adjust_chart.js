/******************************************************************************************
 * This file controls adjustments to made to the chart
 * ****************************************************************************************/

/* Zooms graph on lower incomes */
function zoomHOHGraph(){
    if(zoom_switch.checked === true){
        user_income.max = "100000";
        HOHchart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
        HOHchart.axis.max({x: 70000});
        setTimeout(function () {
            HOHchart.axis.max({y: 2000});
        }, 500);
    }
    else{
        user_income.max = "600000";
        HOHchart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
        HOHchart.axis.max({y: 4500});
        setTimeout(function () {
            HOHchart.axis.max({x: 620000});
        }, 500);
    }
}

/* Moves the income slider */
function modifyIncome_HOH(){
    income = user_income.value;
    itemDeduct = itemized_deductions.value;
    //numChildren = num_children_formatting(num_children.value);

    //value = tax_difference_at_income_2022(income, itemDeduct, numChildren);
    savings = hoh_tax_difference_2023(income, itemDeduct);
    HOHchart.xgrids([{value: income, text:'Your income'}]);
    HOHchart.load({
        columns: [
            ['x_point', income],
            ['point',   savings],
        ]
    });
}

/* Adjusts the chart according to user input */
function modifyGraph_HOH(){
    itemDeduct = itemized_deductions.value;
    numChildren = num_children_formatting(num_children.value);

    tax_no_ctc = hoh_chart_values_2022(itemDeduct);
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
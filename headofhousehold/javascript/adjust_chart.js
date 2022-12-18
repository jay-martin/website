/******************************************************************************************
 * This file controls adjustments to made to the chart
 * ****************************************************************************************/

/* Zooms graph on lower incomes */
function zoomHOHGraph(){
    if(zoom_switch.checked === true){
        user_income.max = "100000";
        HOHchart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
        HOHchart.axis.max({x: 60000});
        setTimeout(function () {
            HOHchart.axis.max({y: 1500});
        }, 500);
    }
    else{
        user_income.max = "600000";
        HOHchart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
        HOHchart.axis.max({y: 4000});
        setTimeout(function () {
            HOHchart.axis.max({x: 600000});
        }, 500);
    }
}

/* Moves the income slider */
function modifyIncome_HOH(){
    income = user_income.value;
    itemDeduct = itemized_deductions.value;
    numChildren = num_children_formatting(num_children.value);

    value = tax_difference_at_income(income, itemDeduct, numChildren);
    HOHchart.xgrids([{value: income, text:'Your income'}]);
    HOHchart.load({
            columns: [
                ['x_point', income],
                ['point',   value],
            ]
        });
}

/* Adjusts the chart according to user input */
function modifyGraph_HOH(){
    if(tax_credit_switch.checked === false){
        data = tax_difference(itemized_deductions.value);
        combined_brackets = data[0];
        tax_dif = data[1];

        combined_brackets.unshift('x');
        tax_dif.unshift('HOH_Savings');

        HOHchart.hide('after_ctc');
        HOHchart.data.names({HOH_Savings: 'HOH Tax Savings'});
    }
    else{
        numChildren = num_children_formatting(num_children.value);

        data = tax_difference_with_ctc(itemized_deductions.value, numChildren);
        combined_brackets = data[0];
        tax_dif = data[1];

        combined_brackets.unshift('x3');
        tax_dif.unshift('after_ctc'); 

        HOHchart.show('after_ctc');
        HOHchart.data.names({HOH_Savings: 'HOH Tax Savings Before CTC'}); 
    }

    HOHchart.load({
        columns: [
            combined_brackets,
            tax_dif
        ]
    });
}
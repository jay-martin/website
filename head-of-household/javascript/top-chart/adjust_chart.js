/******************************************************************************************
 * This file controls adjustments to made to the chart
 * ****************************************************************************************/

/* Zooms graph on lower incomes */
function zoom_top_chart(){
    if(zoom_switch.checked === true){
        user_income.max = "100000";
        top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
        top_chart_chart.axis.max({x: 70000});
        setTimeout(function () {
            top_chart_chart.axis.max({y: 2000});
        }, 500);
    }
    else{
        user_income.max = "600000";
        top_chart_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
        top_chart_chart.axis.max({y: 4500});
        setTimeout(function () {
            top_chart_chart.axis.max({x: 620000});
        }, 500);
    }
}

/* Moves the income slider */
function top_chart_modify_income(){
    let income = user_income.value;
    let item_deduct = itemized_deductions.value;

    let savings = hoh_tax_difference_2023(income, item_deduct);
    top_chart_chart.xgrids([{value: income, text:'Your income'}]);
    top_chart_chart.load({
        columns: [
            ['x_point', income],
            ['point',   savings],
        ]
    });
}

/* Adjusts the chart according to user input */
function adjust_top_chart(){
    let tax_values = hoh_chart_values_2023(itemized_deductions.value);
    let x_values = tax_values[0];
    let y_values = tax_values[1];

    // format arrays
    x_values.unshift('x');
    y_values.unshift('HOH_Savings');

    top_chart_chart.load({
        columns: [
            x_values,
            y_values,
        ]
    });
}

function top_chart_description_generator(){
    let itemized = parseInt(itemized_deductions.value);
    if(itemized <= 13850){
        document.getElementById('top_chart_title_description').innerHTML = 'Using the Standard Deduction';
    }
    else {
        document.getElementById('top_chart_title_description').innerHTML = 'With $' + itemized.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' in Itemized Deductions';
    }
}
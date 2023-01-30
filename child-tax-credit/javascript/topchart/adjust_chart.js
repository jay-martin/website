/******************************************************************************************
 * This file controls adjustments to the Top Chart
 * ****************************************************************************************/

/* Moves the income slider */
function modify_income(){
    let income = user_income.value;
    let filingStatus = filing_status.value;
    let numChildren = num_children.value;

    topChart.xgrids([{value: income, text:'Your income'}]);
    topChart.load({
        columns: [
            ['x_point', income],
            ['point',   ctc_value_2023(income, filingStatus, numChildren)],
        ]
    });
}

/* Adjusts the curve according to filing status and number of children */
var previous_filing_status = 'married';
function adjust_curve(){
    let numChildren = num_children.value;
    let filingStatus = filing_status.value;

    if(filingStatus === 'single'){
        single_ctc_builder_2023(topChart, 'x', 'ctc', numChildren);
    }
    else if(filingStatus === 'hoh'){
        hoh_ctc_builder_2023(topChart, 'x', 'ctc', numChildren);
    }
    else if(filingStatus === 'married'){
        married_ctc_builder_2023(topChart, 'x', 'ctc', numChildren);
    }

    // Adjust x-axis tick values
    x_axis_ticks();
}

/* Zooms on Lower Incomes */
function x_axis_ticks(){
    if(filing_status.value === 'married'){
        topChart.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000];
    }
    else{
        topChart.internal.config.axis_x_tick_values = [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 325000];
    }
}

/* Zooms on Lower Incomes */
function zoom_top_chart(){
    if(top_chart_zoom.checked){
        user_income.step = 100;
        if( filing_status.value === 'single' && (num_children.value === 'one' || num_children.value === 'two') ) {
            topChart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000];
            topChart.axis.max({x: 25000});
            user_income.max = 25000;
        }
        else if( filing_status.value === 'hoh' && (num_children.value === 'one')){
            topChart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
            topChart.axis.max({x: 35000});
            user_income.max = 35000;
        }
        else{
            topChart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000];
            topChart.axis.max({x: 50000});
            user_income.max = 50000;
        }
    }
    else {
        x_axis_ticks();
        topChart.internal.config.axis_x_max = undefined;
        modify_income(); //needed to force axis re-adjust
        user_income.step = 1000;
        user_income.max = 240000;
    }
}




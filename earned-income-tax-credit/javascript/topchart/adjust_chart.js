/******************************************************************************************
 * This file controls adjustments to the Top Chart
 * ****************************************************************************************/
/* Moves the income slider */
function modify_income(){
    income = user_income.value;
    filingStatus = filing_status.value;
    numChildren = top_num_children.value;

    // Calculate EITC value
    eitc_value = eitc_value_2023(income, filingStatus, numChildren);

    // Adjust chart
    topChart.xgrids([{value: income, text:'Your income'}]);
    topChart.load({
        columns: [
            ['x_point', income],
            ['point',   eitc_value],
        ]
    });
}

current_num_children = 'one';
function top_chart_builder(input){
    // user inputs
    filingStatus = filing_status.value;
    numChildren  = top_num_children.value;

    if(input === 'filing_status'){
        filing_status_top_chart_builder(filingStatus, numChildren);
    }
    else if(input === 'num_children'){
        num_children_top_chart_builder(filingStatus, numChildren);
    }
}

function filing_status_top_chart_builder(filingStatus, numChildren){
    
    if(filingStatus === 'married'){
        // adjust axes first
        top_chart_adjust_y_axis();
        top_chart_adjust_x_axis();

        // update chart second
        setTimeout(function(){
            if(filingStatus === 'single' || filingStatus === 'hoh'){
                single_eitc_builder_2023(topChart, 'x', 'eitc', numChildren);
            }
            else if(filingStatus === 'married'){
                married_eitc_builder_2023(topChart, 'x', 'eitc', numChildren);
            }
            modify_income();
        }, 400);
    }
    else{
        // update chart first
        if(filingStatus === 'single' || filingStatus === 'hoh'){
            single_eitc_builder_2023(topChart, 'x', 'eitc', numChildren);
        }
        else if(filingStatus === 'married'){
            married_eitc_builder_2023(topChart, 'x', 'eitc', numChildren);
        }
        modify_income();

        // adjust axes second
        setTimeout(function(){
            top_chart_adjust_y_axis();
            top_chart_adjust_x_axis();
        }, 400);
    }
}

function num_children_top_chart_builder(filingStatus, numChildren){
    // new number of children is larger than current number of children
    if(compare_num_children(current_num_children, numChildren)){
        // adjust axes first
        top_chart_adjust_y_axis();
        top_chart_adjust_x_axis();

        // update chart second
        setTimeout(function(){
            if(filingStatus === 'single' || filingStatus === 'hoh'){
                single_eitc_builder_2023(topChart, 'x', 'eitc', numChildren);
            }
            else if(filingStatus === 'married'){
                married_eitc_builder_2023(topChart, 'x', 'eitc', numChildren);
            }
            modify_income();
        }, 400);
    }
    // new number of children is smaller than current number of children
    else{
        // update chart first
        if(filingStatus === 'single' || filingStatus === 'hoh'){
            single_eitc_builder_2023(topChart, 'x', 'eitc', numChildren);
        }
        else if(filingStatus === 'married'){
            married_eitc_builder_2023(topChart, 'x', 'eitc', numChildren);
        }
        modify_income();

        // adjust axes second
        setTimeout(function(){
            top_chart_adjust_y_axis();
            top_chart_adjust_x_axis();
        }, 400);
    }

    // update number of children
    current_num_children = numChildren;
}

/** Returns when the updated number of children input is larger than the old number of children input
 * @param {string} - current number of children displayed on chart
 * @param {string} - new number of children input
 * @return {boolean} - true if new num children is larger, false otherwise
 * */
function compare_num_children(current, updated){
    if(updated === 'three' && current !== 'three'){
        return true;
    }
    else if(updated === 'two' && (current === 'none' || current === 'one')){
        return true;
    }
    else if(updated === 'one' && current === 'none'){
        return true;
    }
    else{
        return false;
    }
}  

/* adjusts the y-axis */
function top_chart_adjust_y_axis(){
    numChildren = top_num_children.value;

    // adjust y-axis ticks
    if(numChildren === 'none'){
        topChart.internal.config.axis_y_tick_values = [0, 200, 400, 600, 800, 1000];
    }
    else{
        topChart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    }

    // adjust y-axis max
    if(numChildren === 'none'){
        topChart.axis.max({y: 1000});
    }
    else if(numChildren === 'one'){
        topChart.axis.max({y: 5500});
    }
    else if(numChildren === 'two'){
        topChart.axis.max({y: 8500});
    }
    else{
        topChart.axis.max({y: 10000});
    }
}

/* adjusts the x-axis */
function top_chart_adjust_x_axis(){
    numChildren  = top_num_children.value;
    filingStatus = filing_status.value;

    // adjust x-axis ticks
    if(numChildren === 'none'){
        topChart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000];
    }
    else{
        topChart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 65000];
    }

    // adjust x-axis max
    if(numChildren === 'none' && filingStatus === 'single'){
        topChart.axis.max({x: 20000});
        user_income.max = 20000;
    }
    else if(numChildren === 'none' && filingStatus === 'married'){
        topChart.axis.max({x: 25000});
        user_income.max = 25000;
    }
    else if(numChildren === 'one' && filingStatus === 'single'){
        topChart.axis.max({x: 50000});
        user_income.max = 50000;
    }
    else if( (numChildren === 'two' && filingStatus === 'single') || (numChildren === 'one' && filingStatus === 'married') ){
        topChart.axis.max({x: 55000});
        user_income.max = 55000;
    }
    else if( (numChildren === 'three' && filingStatus === 'single') || (numChildren === 'two' && filingStatus === 'married') ){
        topChart.axis.max({x: 60000});
        user_income.max = 60000;
    }
    else if(numChildren === 'three' && filingStatus === 'married'){
        topChart.axis.max({x: 65000});
        user_income.max = 65000;
    }
}


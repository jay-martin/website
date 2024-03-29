/******************************************************************************************
 * This file controls adjustments to the Top Chart
 * ****************************************************************************************/

/* Moves the income slider */
function modify_income(){
    let income = top_chart_income.value;
    let filingStatus = top_chart_filing_status.value;
    let numChildren = top_chart_num_children.value;

    top_chart_chart.xgrids([{value: income, text:'Your income'}]);
    top_chart_chart.load({
        columns: [
            ['x_point', income],
            ['point',   ctc_value_2023(income, filingStatus, numChildren)],
        ]
    });
}

/* Adjusts the curve according to filing status and number of children */
var previous_top_chart_filing_status = 'married';
function adjust_curve(){
    let numChildren = top_chart_num_children.value;
    let filingStatus = top_chart_filing_status.value;

    if(filingStatus === 'single'){
        single_ctc_builder_2023(top_chart_chart, 'x', 'ctc', numChildren);
    }
    else if(filingStatus === 'hoh'){
        hoh_ctc_builder_2023(top_chart_chart, 'x', 'ctc', numChildren);
    }
    else if(filingStatus === 'married'){
        married_ctc_builder_2023(top_chart_chart, 'x', 'ctc', numChildren);
    }

    // Adjust x-axis tick values
    x_axis_ticks();
    y_axis_tick();

    // modify income if not hiding outputs
    if(top_chart_hide_outputs_switch.checked == false){
        modify_income();
    }
}

/* Zooms on Lower Incomes */
function x_axis_ticks(){
    if(window.innerWidth < 800){
        if(top_chart_filing_status.value === 'married'){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
        }
        else{
            if(top_chart_num_children.value === 'three'){
                top_chart_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000];
            }
            else{
                top_chart_chart.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000];
            }
        }
    }
    else {
        if(top_chart_filing_status.value === 'married'){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000];
        }
        else{
            top_chart_chart.internal.config.axis_x_tick_values = [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 325000];
        }
    }
}

function y_axis_tick(){
    if(top_chart_num_children.value === 'one'){
        top_chart_chart.internal.config.axis_y_tick_values = [0, 500, 1000, 1500, 2000, 2500];
    }
    else {
        top_chart_chart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000];
    }
}

/* Zooms on Lower Incomes */
function zoom_top_chart(){
    if(top_chart_zoom.checked){
        top_chart_income.step = 100;
        if( top_chart_filing_status.value === 'single' && (top_chart_num_children.value === 'one' || top_chart_num_children.value === 'two') ) {
            top_chart_chart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000];
            top_chart_chart.axis.max({x: 25000});
            top_chart_income.max = 25000;
        }
        else if( top_chart_filing_status.value === 'hoh' && (top_chart_num_children.value === 'one')){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
            top_chart_chart.axis.max({x: 35000});
            top_chart_income.max = 35000;
        }
        else{
            top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000];
            top_chart_chart.axis.max({x: 50000});
            top_chart_income.max = 50000;
        }
    }
    else {
        x_axis_ticks();
        top_chart_chart.internal.config.axis_x_max = undefined;
        modify_income(); //needed to force axis re-adjust
        top_chart_income.step = 1000;
        top_chart_income.max = 240000;
    }
}

function top_chart_description_generator(){
    let filing_status = capitalize_filing_status(top_chart_filing_status.value);
    let num_children  = capitalize_num_children(top_chart_num_children.value);

    document.getElementById('top_chart_title_description').innerHTML = filing_status + ', ' + num_children;
}

var top_chart_previous_income = 20000;
function top_chart_hide_outputs(){
    top_chart_previous_income = top_chart_income.value;
    if(top_chart_hide_outputs_switch.checked){
        $('#top_chart_outputs').css('display', 'none');
        $('#top_chart_income_container').css('display', 'none');
        top_chart_chart.xgrids([]);
        top_chart_chart.hide(['point']);
    }
    else{
        $('#top_chart_outputs').css('display', 'block');
        $('#top_chart_income_container').css('display', 'block');
        top_chart_chart.xgrids([{value: top_chart_previous_income, text: 'Your income'}]);
        top_chart_chart.show(['point']);
    }
}




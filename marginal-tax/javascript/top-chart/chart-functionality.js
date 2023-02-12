/******************************************************************************************
 * This file controls all top_chart_chart functionality, e.g. moving the income slider, adjusting
 * the range of the axes, disabling/enabling policy buttons based on user inputs
 * ****************************************************************************************/

/********************************** Adjust Axes *********************************************************************************************************/
$( function() {
    $( "#x_axis_range" ).slider({
      range: true,
      min: 0,
      max: 600000,
      step: 1000,
      values: [ 0, 100000 ],
      slide: function( event, ui ) {
        $( "#x_axis_output_start" ).text(ui.values[ 0 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        $( "#x_axis_output_end" ).text(ui.values[ 1 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        arbitrary_x_axis(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });

    $( "#y_axis_range" ).slider({
      range: true,
      min: -60,
      max: 120,
      step: 1,
      values: [ 0, 60 ],
      slide: function( event, ui ) {
        $( "#y_axis_output_start" ).text(ui.values[ 0 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        $( "#y_axis_output_end" ).text(ui.values[ 1 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        arbitrary_y_axis(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });

    $( "#y_axis_range_ei" ).slider({
      range: true,
      min: -20000,
      max: 20000,
      step: 500,
      values: [ 0, 20000 ],
      slide: function( event, ui ) {
        $( "#y_axis_output_start_ei" ).text(ui.values[ 0 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        $( "#y_axis_output_end_ei" ).text(ui.values[ 1 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        arbitrary_y_axis(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });

} );

// Adjusts x-axis range in response to JQuery x-axis range slider
function arbitrary_x_axis(min, max){
    adjust_x_axis_ticks(max);
    top_chart_chart.axis.max({x: max});
    top_chart_chart.axis.min({x: min});
}

// Adjusts y-axis range in response to JQuery y-axis range slider
function arbitrary_y_axis(min, max){
    top_chart_chart.internal.config.axis_y_padding = {top: 10, bottom: 0}; // no padding on custom axis
    top_chart_chart.axis.max({y: max});
    top_chart_chart.axis.min({y: min});
}

function show_adjust_axes(){
    if(top_chart_adjust_axes_switch.checked){
        $('#top_chart_axis_sliders_container').css('display', 'block');
        if(top_chart_screenshot_mode_switch.checked){
            $('#top_chart_axis_sliders_container').addClass('axis_sliders_border');
        }
    }
    else {
        $('#top_chart_axis_sliders_container').css('display', 'none');
        top_chart_chart.internal.config.axis_y_max = undefined;
        top_chart_chart.internal.config.axis_y_min = undefined;
        top_chart_chart.internal.config.axis_y_padding = {top: 10, bottom: 7.5};
    }
}

function adjust_x_axis_ticks(x_max){
    // mobile
    if(window.innerWidth < 700){
        if(x_max < 50000){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000];
        }
        else if(x_max < 110000){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000];
        }
        else if(x_max < 300000){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000, 250000];
        }
        else if(x_max <= 600000){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
        }
    }
    // desktop
    else {
        if(x_max < 50000){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000];
        }
        else if(x_max < 140000){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000];
        }
        else if(x_max < 240000){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000];
        }
        else if(x_max <= 600000){
            top_chart_chart.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000];
        }
    }
}

function top_chart_reset_y_padding(){
    top_chart_chart.internal.config.axis_y_padding = {top: 10, bottom: 7.5};
}

/********************************** Arbitrary Income *********************************************************************************************************/

// Reval arbitrary income when switch is pressed
function show_arbitrary_income(){
    if(arbitrary_income_switch.checked){
        arbitray_income_container.style.display = 'block';
        user_income.step = "1";
    }
    else{
        arbitray_income_container.style.display = 'none';
        user_income.step = "1000";
    }
}

// Adjusts the income slider if arbitrary input box is adjusted 
function arbitrary_income_input(){
    let income = arbitray_income.value;
    user_income.value = income;
    user_income_output.innerText = income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    user_income.step = "1";
}

// Adjusts arbitrary input box if income slider is moved
function adjust_arbitrary_income(){
    let income = arbitray_income.value;
    arbitray_income.value = income;
}

// Zooms on lower incomes 
function top_chart_zoom(){
    let x_max = 0;
    if(top_chart_type.value === 'EMTR'){
        if(zoom_dropdown.value === 'default'){
            x_max = 100000;
        }
        else if(zoom_dropdown.value === 'higher'){
            x_max = 600000;
        }
        else if(zoom_dropdown.value === 'lower'){
            x_max = 40000;
        }
    }
    else {
        if(zoom_dropdown.value === 'default'){
            user_income.max = "100000";
            top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
            top_chart_chart.axis.max({x: 100000});

            setTimeout(function () {
                top_chart_chart.internal.config.axis_y_tick_values = [-8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];
                top_chart_chart.axis.max({y: 8000});
                top_chart_chart.axis.min({y: -4000})
            }, 500);
        }
        else if(zoom_dropdown.value === 'lower'){
            user_income.max = "40000";
            top_chart_chart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];
            top_chart_chart.axis.max({x: 40000});

            setTimeout(function () {
                top_chart_chart.internal.config.axis_y_tick_values = [-8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];
                top_chart_chart.axis.max({y: 8000});
                top_chart_chart.axis.min({y: -4000})
            }, 500);
        }
        else if(zoom_dropdown.value === 'higher'){
            user_income.max = "600000";
            top_chart_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
            top_chart_chart.axis.max({x: 600000});

            setTimeout(function () {
                top_chart_chart.internal.config.axis_y_tick_values = [-600000, -500000, -400000, -300000, -200000, -100000, 0, 100000, 200000, 300000, 400000, 500000, 600000];
                top_chart_chart.axis.max({y: 100000});
                top_chart_chart.axis.min({y: -200000});
            }, 500);
        }
    }

    user_income.max = x_max;
    adjust_x_axis_ticks(x_max);
    top_chart_chart.axis.max({x: x_max});
}

/********************************** Screenshot Mode *********************************************************************************************************/
const policy_names = {
    income_tax : 'Income Tax',
    fica       : 'Payroll Tax',
    eitc       : 'EITC',
    ctc        : 'CTC',
    snap       : 'SNAP',
    ssi        : 'SSI',
    ptc        : 'Premium Tax Credits',      
}
function top_chart_description_generator(){
    let caption = "";

    // filing status & number of children
    let filing_status   = capitalize_filing_status(filingstatus.value);
    let number_children = capitalize_num_children(num_children.value);
    caption = caption.concat(filing_status + ', ' + number_children + '<br>');

    for(policy in isActive){
        if(isActive[policy]){
            caption = caption.concat(policy_names[policy] + ', ');
        }
    }

    // remove last space and comma
    caption = caption.substring(0, caption.length - 2);

    document.getElementById('top_chart_title_description').innerHTML = caption;
}

function additional_screenshot_modes_changes(){
    if(top_chart_screenshot_mode_switch.checked){
        $('#top_chart_notes_button').css('display', 'none');
        $('#arbitrary_income_label').css('display', 'none');
    }
    else {
        $('#top_chart_notes_button').css('display', 'block');
        $('#arbitrary_income_label').css('display', 'inline-block');
    }
}

/********************************** Hide Outputs *********************************************************************************************************/
var top_chart_previous_income = 15000;
function top_chart_hide_outputs(){
    top_chart_previous_income = user_income.value;
    if(top_chart_hide_outputs_switch.checked){
        $('#top_chart_outputs').css('display', 'none');
        $('#income_slider_container').css('display', 'none');
        top_chart_chart.xgrids([]);
        top_chart_chart.hide(['point']);
    }
    else {
        $('#top_chart_outputs').css('display', 'block');
        $('#income_slider_container').css('display', 'block');
        top_chart_chart.xgrids([{value: top_chart_previous_income, text: 'Your income'}]);
        top_chart_chart.show(['point']);
    }
}



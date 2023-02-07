/******************************************************************************************
 * This file controls all chart functionality, e.g. moving the income slider, adjusting
 * the range of the axes, disabling/enabling policy buttons based on user inputs
 * ****************************************************************************************/

/* Power Users: Function for JQuery UI slider that enables the user to manipulate the ranges of the x and y axes */
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

/* Power Users: Adjusts x-axis range in response to JQuery x-axis range slider */
function arbitrary_x_axis(min, max){
    chart.axis.max({x: max});
    chart.axis.min({x: min});
}

/* Power Users: Adjusts y-axis range in response to JQuery y-axis range slider */
function arbitrary_y_axis(min, max){
    chart.axis.max({y: max});
    chart.axis.min({y: min});
}

/* Power Users: Reveals the axis sliders */
function show_adjust_axes(){
    if(adjust_axes_switch.checked === true){
        x_axis_slider_container.style.display = 'block';
        y_axis_slider_container.style.display = 'block';
        y_axis_slider_container_ei.style.display = 'block';
    }
    else{
        x_axis_slider_container.style.display = 'none';
        y_axis_slider_container.style.display = 'none';
        y_axis_slider_container_ei.style.display = 'none';
    }
}

/* Power Users: Reveals the arbitrary income input */
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

/* Power Users: Adjusts the income slider if arbitrary input box is adjusted */
function arbitrary_income_input(){
    let income = arbitray_income.value;
    user_income.value = income;
    user_income_output.innerText = income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    user_income.step = "1";
}

/* Power Users: adjusts arbitrary input box if income slider is moved */
function adjust_arbitrary_income(){
    let income = arbitray_income.value;
    arbitray_income.value = income;
}

/* Zooms on lower incomes */
function zoom_chart(){
    if(chart_type.value === 'EMTR'){
        if(zoom_dropdown.value === 'default'){
            user_income.max = "100000";
            chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
            chart.axis.max({x: 100000});
        }
        else if(zoom_dropdown.value === 'higher'){
            user_income.max = "600000";
            chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
            chart.axis.max({x: 600000});
        }
        else if(zoom_dropdown.value === 'lower'){
            user_income.max = "40000";
            chart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];
            chart.axis.max({x: 40000});
        }
    }
    else {
        if(zoom_dropdown.value === 'default'){
            user_income.max = "100000";
            chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
            chart.axis.max({x: 100000});

            setTimeout(function () {
                chart.internal.config.axis_y_tick_values = [-8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];
                chart.axis.max({y: 8000});
                chart.axis.min({y: -4000})
            }, 500);
        }
        else if(zoom_dropdown.value === 'lower'){
            user_income.max = "40000";
            chart.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];
            chart.axis.max({x: 40000});

            setTimeout(function () {
                chart.internal.config.axis_y_tick_values = [-8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];
                chart.axis.max({y: 8000});
                chart.axis.min({y: -4000})
            }, 500);
        }
        else if(zoom_dropdown.value === 'higher'){
            user_income.max = "600000";
            chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
            chart.axis.max({x: 600000});

            setTimeout(function () {
                chart.internal.config.axis_y_tick_values = [-600000, -500000, -400000, -300000, -200000, -100000, 0, 100000, 200000, 300000, 400000, 500000, 600000];
                chart.axis.max({y: 100000});
                chart.axis.min({y: -200000});
            }, 500);
        }
    }
    /* adjust for particular selection of charts */
    /*
    setTimeout(function () {
        adjust_y_axis_ei();
    }, 500);
    */
}
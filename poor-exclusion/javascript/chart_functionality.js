/******************************************************************************************
 * This file controls all chart functionality, e.g. moving the income slider, adjusting
 * the range of the axes, disabling/enabling policy buttons based on user inputs
 * ****************************************************************************************/

/* Moves the income slider */
function modifyIncome(){
    income = user_income.value;
    chart.xgrids([{value: income, text:'Your income'}]);
    load_points();
}

/* Zooms graph on lower incomes */
function zoom_chart(){
    if(zoom_switch.checked === true){
        chart.internal.config.axis_x_tick_values = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000];
        chart.axis.max({x: 20000});
    }
    else{
        chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000];
        chart.axis.max({x: 50000});
    }
}

/* JQuery UI slider for x and y axes */
$( function() {
    $( "#x_axis_range" ).slider({
      range: true,
      min: 0,
      max: 50000,
      step: 100,
      values: [ 0, 50000 ],
      slide: function( event, ui ) {
        $( "#x_axis_output_start" ).text(ui.values[ 0 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        $( "#x_axis_output_end" ).text(ui.values[ 1 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        arbitrary_x_axis(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });

    $( "#y_axis_range" ).slider({
      range: true,
      min: 0,
      max: 14000,
      step: 100,
      values: [ 0, 7000 ],
      slide: function( event, ui ) {
        $( "#y_axis_output_start" ).text(ui.values[ 0 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        $( "#y_axis_output_end" ).text(ui.values[ 1 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        arbitrary_y_axis(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });
} );

function arbitrary_x_axis(xMin, xMax){
    chart.axis.min({x: xMin});
    chart.axis.max({x: xMax});
}

function arbitrary_y_axis(yMin, yMax){
    chart.axis.min({y: yMin});
    chart.axis.max({y: yMax});
}

function show_arbitrary_axes(){
    if(arbitrary_axes_switch.checked){
        x_axis_slider_container.style.display = 'block';
        y_axis_slider_container.style.display = 'block';
        zoom_switch.disabled = true;
    }
    else{
        x_axis_slider_container.style.display = 'none';
        y_axis_slider_container.style.display = 'none';
        zoom_switch.disabled = false;
    }
}

function arbitrary_income_input(){
    income = arbitray_income.value;
    user_income.value = income;
    user_income_output.innerText = income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    user_income.step = "1";
}

function adjust_arbitrary_income(){
    /*adjust arbitrary input box if slider is moved */
    arbitray_income.value = income;
}

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
/******************************************************************************************
 * This file controls all chart functionality, e.g. moving the income slider, adjusting
 * the range of the axes, disabling/enabling policy buttons based on user inputs
 * ****************************************************************************************/

/* Moves the income slider */
function modifyIncome(){
    income = user_income.value;
    /* move xgrid */
    chart.xgrids([{value: income, text:'Your income'}]);

    /* if EMTR chart, adjust point */
    if(chart_type.value === 'EMTR'){
        val = tax_and_transfer_at_income_marginal(income, num_children.value, filingstatus.value)[6];
        chart.load({columns: [ ['x_point', income], ['point', val] ] });
    }
    /* if income chart, adjust tangent curve */
    else if(chart_type.value === 'EI'){
        add_tangent_line(income, num_children.value);
    }
}

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
    income = arbitray_income.value;
    user_income.value = income;
    user_income_output.innerText = income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    user_income.step = "1";
}

/* Power Users: adjusts arbitrary input box if income slider is moved */
function adjust_arbitrary_income(){
    arbitray_income.value = income;
}

/* Disables/Enables the SSI button based upon whether the user selects that they are not disabled/disabled */
function disable_ssi(){
    if(disability_status.value === 'disabled'){
        ssi_button.disabled = false;
    }
    else{
        ssi_button.disabled = true;
    }
}

/* Disables/Enables the Medicaid/PCT button & CSR button based upon whether the user selects that they have/do not have employer-sponsored healthcare */
function disable_healthcare(){
    if(healthcare_status.value === 'no_employer'){
        ptc_button.disabled = false;
        cost_sharing_button.disabled = false;
    }
    else{
        ptc_button.disabled = true;
        cost_sharing_button.disabled = true;
    }
}
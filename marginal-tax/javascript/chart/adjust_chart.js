/******************************************************************************************
 * This file controls adjustments to made to the chart:
 * Axis adjustments: adjust_axes(); adjust_axes_numChildren(); adjust_y_axis(); fit_y_axis_ei;
 * Zoom: zoom_chart();
 * ****************************************************************************************/

/* Adjusts axis labels when chart is changed */
function adjust_axis_labels(){
	if(chart_type.value === 'EMTR'){
        chart.internal.config.axis_y_tick_format = function(value){return d3.format('.0%')(value/100)};
        chart.internal.config.axis_y_tick_values = [-60, -50, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
        chart.axis.labels({y: 'Effective Marginal Tax Rate'});
    }
    else{
        chart.internal.config.axis_y_tick_format = d3.format('$,');
        chart.axis.labels({y: 'Difference in Income'});
    }
}

/* Adjusts axis when  number of children is changed */
function adjust_axes_numChildren(){
	numChildren = num_children.value;
	if(numChildren === 'three'){
		chart.axis.max({y: 80});
	}
	else if(numChildren === 'two'){
		chart.axis.max({y: 80});
	}
	else{
		chart.axis.max({y: 60});
	}
}

/* adjusts the y-axis of the EMTR chart */
function adjust_y_axis_emtr(){
    /* allow c3.js to dynamically update axes */
    chart.internal.config.axis_y_max = undefined;
    chart.internal.config.axis_y_min = undefined;

    /* adjust for the fact that snap contains very large benefit cliffs (much greater than 100%) */
    if(isActive['income_tax'] && isActive['eitc'] && isActive['snap'] && isActive['ssi']){
         chart.axis.max({y: 110});
    }
    else if(isActive['snap']){
        chart.axis.max({y: 90});
    }
}

/* adjust y-axis of the EI chart */
function adjust_y_axis_ei(){
    numBenefitsActive = isActive['eitc'] + isActive['ctc'] + isActive['snap'];
    numTaxesActive = isActive['income_tax'] + isActive['fica'];

    /* 
    if(zoom_dropdown.value === 'default'){
        if(numBenefitsActive == 3 && numTaxesActive == 0){
            chart.axis.max({y: 12000});
            chart.axis.min({y: 0});
        }
        else if(numBenefitsActive == 3 && (numTaxesActive == 1 || numTaxesActive == 2)){
            chart.axis.max({y: 12000});
            chart.axis.min({y: -4000});
        }
        else if(numBenefitsActive == 2 && numTaxesActive == 0){
            chart.axis.max({y: 8000});
            chart.axis.min({y: 0});
        }
        else if(numBenefitsActive == 2 && numTaxesActive == 1 ){
            chart.axis.max({y: 8000});
            chart.axis.min({y: -4000});
        }
        else if(numBenefitsActive == 2 && numTaxesActive == 2){
            chart.axis.max({y: 8000});
            chart.axis.min({y: -6000});
        }
        else if(numBenefitsActive == 1 && numTaxesActive == 1 && personal_income_tax_isActive){
            chart.axis.max({y: 4000});
            chart.axis.min({y: -14000});
        }
        else if(numBenefitsActive == 1 && numTaxesActive == 1 && fica_isActive){
            chart.axis.max({y: 4000});
            chart.axis.min({y: -8000});
        }
        else if(numBenefitsActive == 1 && snap_isActive == true && numTaxesActive == 2){
            chart.axis.max({y: 6000});
            chart.axis.min({y: -22000});
        }
        else if(numBenefitsActive == 1 && ctc_isActive == true && numTaxesActive == 2){
            chart.axis.max({y: 0});
            chart.axis.min({y: -20000});
        }
        else if(numBenefitsActive == 1 && eitc_isActive == true && numTaxesActive == 2){
            chart.axis.max({y: 4000});
            chart.axis.min({y: -22000});
        }
        else if(numBenefitsActive == 0 && numTaxesActive == 2){
            chart.axis.max({y: 0});
            chart.axis.min({y: -22000});
        }
        else if(numBenefitsActive == 0 && numTaxesActive == 1 && personal_income_tax_isActive){
            chart.axis.max({y: 0});
            chart.axis.min({y: -15000});
        }
        else if(numBenefitsActive == 0 && numTaxesActive == 1 && fica_isActive){
            chart.axis.max({y: 0});
            chart.axis.min({y: -8000});
        }
        else{
            chart.axis.max({y: 8000});
            chart.axis.min({y: -4000});
        }
    }
    */
    if(zoom_dropdown.value === 'lower' || zoom_dropdown.value === 'default'){
        if(numBenefitsActive == 3 && numTaxesActive == 0){
            chart.axis.max({y: 12000});
            chart.axis.min({y: 0});
        }
        else if(numBenefitsActive == 3 && (numTaxesActive == 1 || numTaxesActive == 2)){
            chart.axis.max({y: 12000});
            chart.axis.min({y: -4000});
        }
        else if(numBenefitsActive == 2 && numTaxesActive == 0){
            chart.axis.max({y: 8000});
            chart.axis.min({y: 0});
        }
        else if(numBenefitsActive == 2 && numTaxesActive == 1 ){
            chart.axis.max({y: 8000});
            chart.axis.min({y: -4000});
        }
        else if(numBenefitsActive == 2 && numTaxesActive == 2){
            chart.axis.max({y: 8000});
            chart.axis.min({y: -6000});
        }
        else if(numBenefitsActive == 1 && isActive['snap'] == true && (numTaxesActive == 0 || numTaxesActive == 1)){
            chart.axis.max({y: 6000});
            chart.axis.min({y: -4000});
        }
        else if(numBenefitsActive == 1 && isActive['ctc'] == true && (numTaxesActive == 0 || numTaxesActive == 1)){
            chart.axis.max({y: 4000});
            chart.axis.min({y: -2000});
        }
        else if(numBenefitsActive == 1 && (numTaxesActive == 0 || numTaxesActive == 1)){
            chart.axis.max({y: 6000});
            chart.axis.min({y: -2000});
        }
        else if(numBenefitsActive == 1 && isActive['snap'] == true && numTaxesActive == 2){
            chart.axis.max({y: 6000});
            chart.axis.min({y: -6000});
        }
        else if(numBenefitsActive == 1 && isActive['ctc'] == true && numTaxesActive == 2){
            chart.axis.max({y: 2000});
            chart.axis.min({y: -4000});
        }
        else if(numBenefitsActive == 1 && isActive['eitc'] == true && numTaxesActive == 2){
            chart.axis.max({y: 6000});
            chart.axis.min({y: -6000});
        }
        else if(numBenefitsActive == 0 && numTaxesActive == 2){
            chart.axis.max({y: 2000});
            chart.axis.min({y: -7000});
        }
        else if(numBenefitsActive == 0 && numTaxesActive == 1){
            chart.axis.max({y: 2000});
            chart.axis.min({y: -4000});
        }
        else{
            chart.axis.max({y: 8000});
            chart.axis.min({y: -4000});
        }
    }

    currentMax = chart.axis.max()['y'];
    newMax = currentMax;
    if(isActive['ptc'] === true){
        newMax += 10000;
    }
    if(isActive['ssi'] === true){
        newMax += 10000;
    }
    fit_y_axis_ei(newMax);
    chart.axis.max({y: newMax});
}

/* update y-axis tick values for power users using custom axis ranges */
function fit_y_axis_ei(newMax){
    if(newMax > 20000){
        chart.internal.config.axis_y_tick_values = [-10000, -5000, 0, 5000, 10000, 15000, 20000, 25000, 30000];
    }
    else if(newMax > 12000){
        chart.internal.config.axis_y_tick_values = [-8000, -6000, -4000, -2000, 0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000];
    }
    else{
        chart.internal.config.axis_y_tick_values = [-8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];
    }
}

/* Zooms graph on lower incomes */
function zoom_chart(){
    console.log('in zoom chart');
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
    else{
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
    setTimeout(function () {
        adjust_y_axis_ei();
    }, 500);
}
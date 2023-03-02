var isActive = {
	income_tax : true,
	fica       : false,
	eitc       : false,
	ctc        : false,
	snap       : false,
	ssi        : false,
	ptc        : false,
	ca_income_tax  : false,
	ca_eitc    : false,
	ca_yctc    : false,
};

var state_benefit_names = ['ca_income_tax', 'ca_eitc', 'ca_yctc'];

/************************ Move the income slider *******************************************************/
function modifyIncome(){
    let income = user_income.value;
    
    // move xgrid 
    top_chart_chart.xgrids([{value: income, text:'Your income'}]);

    if(select_year.value === '2023'){
        emtr_modify_income_2023();
    }
    else if(select_year.value === '2022'){
    	emtr_modify_income_2022();
    }

    /*
    else if(top_chart_type.value === 'EI'){
        add_tangent_line(income, num_children.value);
    }
    */

    // update outputs and arbitrary income
    adjust_arbitrary_income();
    top_chart_outputs();
}

/************************ Outputs *******************************************************/
function top_chart_outputs(){
	if(select_year.value === '2023'){
		top_chart_outputs_2023();
	}
	else{
		top_chart_outputs_2022();
	}
}

/************************* Controls for benefit buttons *******************************************************/
function add_benefit(benefit){
	id = '#' + benefit + '_button';

	if(isActive[benefit]){
		isActive[benefit] = false;
		$(id).removeClass('selected_button');
		load_data();
	}
	else {
		isActive[benefit] = true;
		$(id).addClass('selected_button');
		load_data();
	}

	top_chart_outputs();
	if(top_chart_hide_outputs_switch.checked == false){
		modifyIncome();
	}
}

/********************** Controls data loading *******************************************************/
/* Controls the loading of data to the chart based on year and chart type */
function load_data(){
	if(select_year.value === '2022'){
		load_emtr_data_2022();
	}
	else{
		load_emtr_data_2023();
	}
	modifyIncome();
}

/* Controls the switch from the EMTR top_chart_chart to the EI top_chart_chart & vice versa */
function switch_top_chart_chart(){
	if(top_chart_type.value === 'EMTR'){
		switch_to_emtr();
	}
	else{
		switch_to_ei();
	}
}

/* Controls the switch to the EMTR top_chart_chart */
function switch_to_emtr(){
	top_chart_chart.unload({ids: ['income_tax_and_transfer', 'tangent_line']});
	setTimeout(function () {
		adjust_y_axis_emtr();
		adjust_axis_labels();
	}, 500);
	setTimeout(function () {
		load_data();
		modifyIncome();
	}, 1000);

}

/* Controls the switch to the EI top_chart_chart */
function switch_to_ei(){
	top_chart_chart.unload({ids: ['personal_income_tax', 'fica', 'eitc', 'ctc', 'snap', 'total']});
	adjust_axis_labels();
	adjust_y_axis_ei();
	setTimeout(function () {
		load_ei_data();
	}, 500);
}

/* Controls whether the y-axis is adjusted for the EMTR or EI graph based on user selection of top_chart_chart */
function adjust_y_axis(){
	if(top_chart_type.value === 'EMTR'){
		//adjust_y_axis_emtr();
	}
	else{
		//adjust_y_axis_ei();
	}
}



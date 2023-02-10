var isActive = {
	income_tax : true,
	fica       : false,
	eitc       : false,
	ctc        : false,
	snap       : false,
	ssi        : false,
	ptc        : false,
};

/******************************************************** Move the income slider *******************************************************/
function modifyIncome(){
    let income = user_income.value;
    
    // move xgrid 
    top_chart_chart.xgrids([{value: income, text:'Your income'}]);

    if(top_chart_type.value === 'EMTR'){
        emtr_modify_income();
    }
    else if(top_chart_type.value === 'EI'){
        add_tangent_line(income, num_children.value);
    }
}

/******************************************************** Controls for benefit buttons *******************************************************/
function add_benefit(benefit){
	id = '#' + benefit + '_button';

	if(isActive[benefit]){
		isActive[benefit] = false;
		$(id).removeClass('selected_button');
		load_data();
		//top_chart_chart.unload(benefit);
	}
	else {
		isActive[benefit] = true;
		$(id).addClass('selected_button');
		load_data();
	}
}

/* Disables/Enables the SSI button based upon whether the user selects that they are not disabled/disabled */
function disable_ssi(){
    if(disability_status.value === 'disabled'){
        ssi_button.disabled = false;
    }
    else{
        ssi_button.disabled = true;
        isActive['ssi'] = false;
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
        isActive['ptc'] = false;
    }
}

/******************************************************** Controls for top_chart_chart loading *******************************************************/
/* Controls whether EMTR or EI data will be loaded */
function load_data(){
	if(top_chart_type.value === 'EMTR'){
		load_emtr_data();
		emtr_modify_income();
	}
	else{
		load_ei_data();
	}
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
		load_emtr_data();
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

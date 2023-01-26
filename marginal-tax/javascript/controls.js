/******************************************************************************************
 * This file contains the functions that control the loading of data to the chart
 * ****************************************************************************************/
personal_income_tax_isActive = true;

var isActive = {
	income_tax : true,
	fica : false,
	eitc : false,
	ctc : false,
	snap : false,
	ptc : false,
	ssi : false,
};

/******************************************************** Controls for benefit buttons *******************************************************/
function add_benefit(benefit){
	id = '#' + benefit + '_button';

	if(isActive[benefit]){
		isActive[benefit] = false;
		$(id).removeClass('selected_button');
		load_data();
		chart.unload(benefit);
	}
	else{
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

/******************************************************** Controls for chart loading *******************************************************/
/* Controls whether EMTR or EI data will be loaded */
function load_data(){
	if(chart_type.value === 'EMTR'){
		load_emtr_data();
	}
	else{
		load_ei_data();
	}
}

/* Controls the switch from the EMTR chart to the EI chart & vice versa */
function switch_chart(){
	if(chart_type.value === 'EMTR'){
		switch_to_emtr();
	}
	else{
		switch_to_ei();
	}
}

/* Controls the switch to the EMTR chart */
function switch_to_emtr(){
	chart.unload({ids: ['income_tax_and_transfer', 'tangent_line']});
	setTimeout(function () {
		adjust_y_axis_emtr();
		adjust_axis_labels();
	}, 500);
	setTimeout(function () {
		load_emtr_data();
		modifyIncome();
	}, 1000);

}

/* Controls the switch to the EI chart */
function switch_to_ei(){
	chart.unload({ids: ['personal_income_tax', 'fica', 'eitc', 'ctc', 'snap', 'total']});
	adjust_axis_labels();
	adjust_y_axis_ei();
	setTimeout(function () {
		load_ei_data();
	}, 500);
}

/* Controls whether the y-axis is adjusted for the EMTR or EI graph based on user selection of chart */
function adjust_y_axis(){
	if(chart_type.value === 'EMTR'){
		adjust_y_axis_emtr();
	}
	else{
		adjust_y_axis_ei();
	}
}

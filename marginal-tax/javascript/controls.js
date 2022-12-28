/******************************************************************************************
 * This file contains the functions that control the loading of data to the chart
 * ****************************************************************************************/

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

/****************************************
 *  The functions below control the
 * addition of new policies to the chart
 * *************************************/
function add_personal_income_tax(){
	if(personal_income_tax_isActive === false){
		personal_income_tax_isActive = true;
		document.getElementById('tax_brackets_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		personal_income_tax_isActive = false;
		document.getElementById('tax_brackets_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('personal_income_tax');
	}
}

function add_fica(){
	if(fica_isActive === false){
		fica_isActive = true;
		document.getElementById('fica_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		fica_isActive = false;
		document.getElementById('fica_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('fica');
	}
}

function add_eitc(){
	if(eitc_isActive === false){
		eitc_isActive = true;
		document.getElementById('eitc_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		eitc_isActive = false;
		document.getElementById('eitc_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('eitc');
	}
}

function add_ctc(){
	if(ctc_isActive === false){
		ctc_isActive = true;
		document.getElementById('ctc_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		ctc_isActive = false;
		document.getElementById('ctc_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('ctc');
	}
}

function add_snap(){
	if(snap_isActive === false){
		snap_isActive = true;
		document.getElementById('snap_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		snap_isActive = false;
		document.getElementById('snap_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('snap');
	}
}

function add_ptc(){
	if(ptc_isActive === false){
		ptc_isActive = true;
		document.getElementById('ptc_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		ptc_isActive = false;
		document.getElementById('ptc_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('ptc');
	}
}

function add_ssi(){
	if(ssi_isActive === false){
		ssi_isActive = true;
		document.getElementById('ssi_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		ssi_isActive = false;
		document.getElementById('ssi_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('ssi');
	}
}
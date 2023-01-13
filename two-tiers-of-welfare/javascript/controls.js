/******************************************************************************************
 * This file contains the functions that control the loading of data to the chart
 * ****************************************************************************************/

function chart_master_control(){
	if(chart_selector.value === 'highlight'){
		adjust_chart_highlight();
	}
	else{
		adjust_chart_curve();
	}
}

function adjust_chart_highlight(){
	if(benefit_selector.value === 'all'){
		load_all();
		load_points();
	}
	else if(benefit_selector.value === 'eitc'){
		load_eitc();
		load_points();
	}
	else{
		load_ctc();
		load_points();
	}
}

function adjust_chart_curve(){
	if(benefit_selector.value === 'all'){
		load_all_curve();
		load_point_curve();
	}
	else if(benefit_selector.value === 'eitc'){
		load_eitc_curve();
		load_point_curve();
	}
	else{
		load_ctc_curve();
		load_point_curve();
	}
}

/* Control which point values should be loaded based on whether the highlighted region or curve chart is selected */
function load_points(){
	if(chart_selector.value === 'highlight'){
		load_points_highlight();
	}
	else{
		load_point_curve();
	}
}

function switch_charts(){
	if(chart_selector.value === 'highlight'){
		chart.hide(['loss_in_benefits']);
		chart.legend.hide(['loss_in_benefits']);
		chart.show(['total', 'no_exclusion', 'total_hidden', 'no_exclusion_end', 'existing_point']);
		chart.legend.show(['total', 'no_exclusion',]);
		adjust_chart_highlight();
	}
	else{
		chart.hide(['total', 'no_exclusion', 'total_hidden', 'no_exclusion_end', 'existing_point']);
		chart.legend.hide(['total', 'no_exclusion',]);
		chart.show(['loss_in_benefits']);
		chart.legend.show(['loss_in_benefits']);

		adjust_chart_curve();
	}
}
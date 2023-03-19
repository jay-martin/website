function phase_out_reform_adjust_chart(){
	let filing_status = phase_out_reform_filing_status.value;
	let num_children  = phase_out_reform_num_children.value;

	phase_out_reform_adjust_current_benefits(filing_status, num_children);
	phase_out_reform_adjust_current_emtr(filing_status, num_children);
	phase_out_reform_adjust_reformed_benefits(filing_status, num_children);
	phase_out_reform_adjust_reformed_emtr(filing_status, num_children);
}

function add_fica_tax(){
	phase_out_reform_adjust_chart();

	if(show_fica_income_switch.checked){
		document.getElementById('current_emtr_description').innerHTML = 'SNAP, EITC & Payroll Tax';
		document.getElementById('reformed_emtr_description').innerHTML = 'SNAP, EITC & Payroll Tax';
	}
	else{
		document.getElementById('current_emtr_description').innerHTML = 'SNAP & EITC';
		document.getElementById('reformed_emtr_description').innerHTML = 'SNAP & EITC';
	}
}

/******************************************************* Benefits Charts ************************************************************/
function phase_out_reform_adjust_current_benefits(filing_status, num_children){
	eitc_builder_2023(current_benefits_chart, 'x_eitc', 'eitc', filing_status, num_children);
	snap_builder_2023(current_benefits_chart, 'x_snap', 'snap', filing_status, num_children);
	fit_y_axis_to_reformed_snap(current_benefits_chart, filing_status, num_children);
}

function phase_out_reform_adjust_reformed_benefits(filing_status, num_children){
	build_reformed_eitc(phase_out_reform_benefits_chart, 'x_eitc', 'eitc', filing_status, num_children);
	build_reformed_snap(phase_out_reform_benefits_chart, 'x_snap', 'snap', filing_status, num_children);
	build_reformed_snap_eitc_xgrid(phase_out_reform_benefits_chart, filing_status, num_children);
	fit_y_axis_to_reformed_snap(phase_out_reform_benefits_chart, filing_status, num_children);
}

/******************************************************* EMTR Charts ************************************************************/
function phase_out_reform_adjust_current_emtr(filing_status, num_children){
	let chart_values = {};
	if(show_fica_income_switch.checked){
		chart_values = current_emtr_with_fica(filing_status, num_children);
	}
	else{
		chart_values = current_emtr_only_benefits(filing_status, num_children);
	}

	// load to chart
	current_emtr_chart.load({ columns: [ chart_values['x_vals'], chart_values['y_vals'] ] });
}

function current_emtr_only_benefits(filing_status, num_children){
	/******************************************************* Married *****************************************************/
	// Married No Children
	const married_none_child_x_vals = ['x',     0,     2894,  2895,  7839,  7840, 16369, 16370, 23807, 23808, 23809, 24209, 24210, 100000];
	const married_none_child_y_vals = ['total', -7.65, -7.65, 16.35, 16.35, 24,   24,    31.65, 31.65, 100,   7.65,  7.65,  0,     0];

	// Married One Child
	const married_one_child_x_vals = ['x',     0,   2894, 2895, 11749, 11750, 28119, 28120, 29939, 29940, 29941, 53119, 53120, 100000];
	const married_one_child_y_vals = ['total', -34, -34,  -10,  -10,   24,    24,    39.98, 39.98, 100,   15.98, 15.98, 0,     0];

	// Married Two Child
	const married_two_child_x_vals = ['x',     0,   2894, 2895, 16509, 16510, 28119, 28120, 36083, 36084, 36085, 59477, 59478, 100000];
	const married_two_child_y_vals = ['total', -40, -40,  -16,  -16,   24,    24,    45.06, 45.06, 100,   21.06, 21.06, 0,     0];

	// Married Three Child
	const married_three_child_x_vals = ['x',     0,   2894, 2895, 16509, 16510, 28119, 28120, 42215, 42216, 42217, 63397, 63398, 100000];
	const married_three_child_y_vals = ['total', -45, -45,  -21,  -21,   24,    24,    45.06, 45.06, 100,   21.06, 21.06, 0,     0];

	/******************************************************* Single & HOH *************************************************/
	// Single No Children
	const single_none_child_x_vals = ['x',     0,     2894,  2895,  7839,  7840, 9799, 9800,  16943, 16944, 17639, 17640, 100000];
	const single_none_child_y_vals = ['total', -7.65, -7.65, 16.35, 16.35, 24,   24,   31.65, 31.65, 7.65,  7.65,  0,     0];

	// Single One Child
	const single_one_child_x_vals = ['x',     0,   2894, 2895, 11749, 11750, 21559, 21560, 23807, 23808, 23809, 46559, 46560, 100000];
	const single_one_child_y_vals = ['total', -34, -34,  -10,  -10,   24,    24,    39.98, 39.98, 100,   15.98, 15.98, 0,     0];

	// Single Two Child
	const single_two_child_x_vals = ['x',     0,   2894, 2895, 16509, 16510, 21559, 21560, 29939, 29940, 29941, 52917, 52918, 100000];
	const single_two_child_y_vals = ['total', -40, -40,  -16,  -16,   24,    24,    45.06, 45.06, 100,   21.06, 21.06, 0,     0];

	// Single Three Child
	const single_three_child_x_vals = ['x',     0,   2894, 2895, 16509, 16510, 21559, 21560, 36083, 36084, 36085, 56827, 56838, 100000];
	const single_three_child_y_vals = ['total', -45, -45,  -21,  -21,   24,    24,    45.06, 45.06, 100,   21.06, 21.06, 0,     0];

	/******************************************************* Return appropriate values ************************************************/
	if(filing_status == 'hoh'){
		filing_status = 'single';
	}

	return {
		x_vals : eval(filing_status + '_' + num_children + '_child_x_vals'),
		y_vals : eval(filing_status + '_' + num_children + '_child_y_vals'),

	}
}

function current_emtr_with_fica(filing_status, num_children){
	chart_values = current_emtr_only_benefits(filing_status, num_children);

	for (var i = 1; i < chart_values['y_vals'].length; i++) {
		chart_values['y_vals'][i] = chart_values['y_vals'][i] + 7.65;
	}

	return {
		x_vals : chart_values['x_vals'],
		y_vals : chart_values['y_vals'],
	}
}

function phase_out_reform_adjust_reformed_emtr(filing_status, num_children){
	let chart_values = {};
	if(show_fica_income_switch.checked){
		chart_values = reformed_emtr_with_fica(filing_status, num_children);
	}
	else{
		chart_values = reformed_emtr_only_benefits(filing_status, num_children);
	}

	// load to chart
	phase_out_reform_emtr_chart.load({ columns: [ chart_values['x_vals'], chart_values['y_vals'] ] });
}

function reformed_emtr_only_benefits(filing_status, num_children){
	/******************************************************* Married *****************************************************/
	// Married No Children
	const married_none_child_x_vals = ['x',     0,     19999, 20000, 49999, 50000, 100000];
	const married_none_child_y_vals = ['total', -7.65, -7.65, 24,    24,    0,     0];

	// Married One Child
	const married_one_child_x_vals = ['x',     0,     19999, 20000, 62499, 62500, 100000];
	const married_one_child_y_vals = ['total', -7.65, -7.65, 24,    24,    0,     0];

	// Married Two Child
	const married_two_child_x_vals = ['x',     0,     19999, 20000, 74999, 75000, 100000];
	const married_two_child_y_vals = ['total', -7.65, -7.65, 24,    24,    0,     0];

	// Married Three Child
	const married_three_child_x_vals = ['x',     0,     19999, 20000, 87499, 87500, 100000];
	const married_three_child_y_vals = ['total', -7.65, -7.65, 24,    24,    0,     0];

	/******************************************************* Single & HOH ************************************************/
	// Single No Children
	const single_none_child_x_vals = ['x',     0,     9999,  10000, 24999, 25000, 100000];
	const single_none_child_y_vals = ['total', -7.65, -7.65, 24,    24,    0,     0];

	// Single One Child
	const single_one_child_x_vals = ['x',     0,      9999, 10000, 37499, 37500, 100000];
	const single_one_child_y_vals = ['total', -7.65, -7.65, 24,    24,    0,     0];

	// Single Two Child
	const single_two_child_x_vals = ['x',     0,      9999, 10000, 49999, 50000, 100000];
	const single_two_child_y_vals = ['total', -7.65, -7.65, 24,    24,    0,     0];

	// Single Three Child
	const single_three_child_x_vals = ['x',     0,     9999,  10000, 62499, 62500, 100000];
	const single_three_child_y_vals = ['total', -7.65, -7.65, 24,    24,    0,     0];

	/******************************************************* Return values ***********************************************/
	if(filing_status == 'hoh'){
		filing_status = 'single';
	}

	return {
		x_vals : eval(filing_status + '_' + num_children + '_child_x_vals'),
		y_vals : eval(filing_status + '_' + num_children + '_child_y_vals'),
	}
}

function reformed_emtr_with_fica(filing_status, num_children){
	chart_values = reformed_emtr_only_benefits(filing_status, num_children);

	for (var i = 1; i < chart_values['y_vals'].length; i++) {
		chart_values['y_vals'][i] = chart_values['y_vals'][i] + 7.65;
	}

	// load to chart
	return {
		x_vals : chart_values['x_vals'],
		y_vals : chart_values['y_vals'],
	}
}



























/************************************************************************************ Current with FICA AND INCOME TAX *******************************************************************************/
function current_emtr_with_taxes(filing_status, num_children){
	/******************************************************* Married *****************************************************/
	// Married No Children
	const married_none_child_x_vals = ['x',     0, 2894, 2895, 7839, 7840,  16369, 16370, 23807, 23808, 24119, 24120, 27699, 27700, 49699, 49700, 100000];
	const married_none_child_y_vals = ['total', 0, 0,    24,   24,   31.65, 31.65, 39.3,  39.3,  15.3,  15.3,  7.65,  7.65,  17.65, 17.65, 19.65, 19.65];

	// Married One Child
	const married_one_child_x_vals = ['x',     0,      2894,    2895,  11749, 11750, 27699, 27700, 28119, 28120, 29939, 29940, 29941, 49699, 49700, 53119, 53120, 100000];
	const married_one_child_y_vals = ['total', -26.35, -26.35,  -2.35, -2.35, 31.65, 31.65, 41.65, 41.65, 57.65, 57.65, 100,   33.65, 33.65, 35.65, 35.65, 19.65,  19.65];

	// Married Two Child
	const married_two_child_x_vals = ['x',     0,      2894,   2895,  16509, 16510, 27699, 27700, 28119, 28120, 36083, 36084, 36085, 49699, 49700, 59477, 59478, 100000];
	const married_two_child_y_vals = ['total', -32.35, -32.35, -8.35, -8.35, 31.65, 31.65, 41.65, 41.65, 62.71, 62.71, 100,   38.71, 38.71, 40.71, 40.71, 19.65, 19.65];

	// Married Three Child
	const married_three_child_x_vals = ['x',     0,      2894,   2895,   16509,  16510, 27699, 27700, 28119, 28120, 42215, 42216, 42217, 49699, 49700, 63397, 63398, 100000];
	const married_three_child_y_vals = ['total', -37.35, -37.35, -13.35, -13.35, 31.65, 31.65, 41.65, 41.65, 62.71, 62.71, 100,   38.71, 38.71, 40.71, 40.71, 19.65, 19.65];

	/******************************************************* HOH ********************************************************/
	// HOH No Children
	const hoh_none_child_x_vals = ['x',     0, 2894, 2895, 7839, 7840,  9799,  9800, 16943, 16944, 17639, 17640, 20799, 20800, 36499, 36500, 80644, 80650, 100000];
	const hoh_none_child_y_vals = ['total', 0, 0,    24,   24,   31.65, 31.65, 39.3, 39.3,  15.3,  15.3,  7.65,  7.65,  17.65, 17.65, 19.65, 19.65, 29.65, 29.65];

	// HOH One Child
	const hoh_one_child_x_vals = ['x',     0,      2894,   2895,  11749, 11750, 20799, 20800, 21559, 21560, 23807, 23808, 23809, 36499, 36500, 46559, 46560, 80644, 80650, 100000];
	const hoh_one_child_y_vals = ['total', -26.35, -26.35, -2.35, -2.35, 31.65, 31.65, 41.65, 41.65, 57.63, 57.63, 100,   33.63, 33.63, 35.63, 35.63, 19.65, 19.65, 29.65, 29.65];

	// HOH Two Child
	const hoh_two_child_x_vals = ['x',     0,      2894,   2895,  16509, 16510, 20799, 20800, 21559, 21560, 29939, 29940, 29941, 36499, 36500, 52917, 52918, 80644, 80650, 100000];
	const hoh_two_child_y_vals = ['total', -32.35, -32.35, -8.35, -8.35, 31.65, 31.65, 41.65, 41.65, 62.71, 62.71, 100,   38.71, 38.71, 40.71, 40.71, 19.65, 19.65, 29.65, 29.65];

	// HOH Three Child
	const hoh_three_child_x_vals = ['x',     0,      2894,   2895,   16509,  16510, 20799, 20800, 21559, 21560, 36083, 36084, 36085, 36499, 36500, 56837, 56838, 80644, 80650, 100000];
	const hoh_three_child_y_vals = ['total', -37.35, -37.35, -13.35, -13.35, 31.65, 31.65, 41.65, 41.65, 62.71, 62.71, 100,   38.71, 38.71, 40.71, 40.71, 19.65, 19.65, 29.65, 29.65];

	/******************************************************* Single *****************************************************/
	// Single No Children
	const single_none_child_x_vals = ['x',     0, 2894, 2895, 7839, 7840,  9799,  9800, 13849, 13850, 16943, 16944, 17639, 17640, 24849, 24850, 58574, 58575, 100000];
	const single_none_child_y_vals = ['total', 0, 0,    24,   24,   31.65, 31.65, 39.3, 39.3,  49.3,  49.3,  25.3,  25.3,  17.65, 17.65, 19.65, 19.65, 29.65, 29.65];

	// Single One Child
	const single_one_child_x_vals = ['x',     0,      2894,   2895,  11749, 11750, 13849, 13850, 21559, 21560, 23807, 23808, 23809, 24849, 24850, 46559, 46560, 58574, 58575, 100000];
	const single_one_child_y_vals = ['total', -26.35, -26.35, -2.35, -2.35, 31.65, 31.65, 41.65, 41.65, 57.63, 57.63, 100,   33.63, 33.63, 35.63, 35.63, 19.65, 19.65, 29.65, 29.65];

	// Single Two Child
	const single_two_child_x_vals = ['x',     0,      2894,   2895,  13849, 13850, 16509, 16510, 21559, 21560, 24849, 24850, 29939, 29940, 29941, 52917, 52918, 58574, 58575, 100000];
	const single_two_child_y_vals = ['total', -32.35, -32.35, -8.35, -8.35, 1.65,  1.65,  41.65, 41.65, 62.71, 62.71, 64.71, 64.71, 100,   40.71, 40.71, 19.65, 19.65, 29.65, 29.65];

	// Single Three Child
	const single_three_child_x_vals = ['x',     0,      2894,   2895,   13849,  13850, 16509, 16510, 21559, 21560, 24849, 24850, 36083, 36084, 36085, 56837, 56838, 58574, 58575, 100000];
	const single_three_child_y_vals = ['total', -37.35, -37.35, -13.35, -13.35, -3.35, -3.35, 41.65, 41.65, 62.71, 62.71, 64.71, 64.71, 100,   40.71, 40.71, 19.65, 19.65, 29.65, 29.65];

	/******************************************************* Load to chart *****************************************************/
	// select values
	let x_vals = eval(filing_status + '_' + num_children + '_child_x_vals');
	let y_vals = eval(filing_status + '_' + num_children + '_child_y_vals');

	// load to chart
	current_emtr_chart.load({ columns: [x_vals, y_vals] });
}


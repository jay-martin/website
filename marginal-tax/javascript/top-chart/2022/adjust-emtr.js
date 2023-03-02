// Loads 2022 EMTR data to the top chart
function load_emtr_data_2022(){
	// hide curve if no benefits are selected
	if(Object.values(isActive).every((v) => v === false)){
		top_chart_chart.hide();
		return;
	}
	else{
		top_chart_chart.show();
		if(top_chart_hide_outputs_switch.checked){
			top_chart_chart.hide(['point']);
		}
	}

	let numChildren  = num_children.value;
	let filingStatus = filingstatus.value;
	
	let total = [];
	let x_vals = get_x_values_2022_marginal(filingStatus, numChildren);
	for (i in x_vals) {
		marginal_tax_rates = marginal_tax_rates_at_income_2022(x_vals[i], numChildren, filingStatus);
		val = marginal_tax_rates['total'];
		if(val < 120){
			total[i] = val;
		}
		else {
			total[i] = 120;
		}
	}

	// format 
	x_vals.unshift('x');
	total.unshift('total');

	// load to top_chart_chart
	top_chart_chart.load({columns: [ x_vals, total ]});
}

// Adjusts the EMTR income slider when 2022 is selected
function emtr_modify_income_2022(){
	let income = user_income.value;
	let total  = marginal_tax_rates_at_income_2022(income, num_children.value, filingstatus.value)['total'];
	if(total > 120){
		total = 120;
	}
	
	top_chart_chart.load({columns: [
			['x_point', income],
			['point',   total],
		],
	});
}

/** Returns the x-values needed for c3.js to render the EMTR chart
 * @return {sorted array of integers} - x-values that will be fed into the c3.js chart
 * */
function get_x_values_2022_marginal(filing_status, num_children){
	let x_vals = [];
	if(isActive['income_tax']){
		x_vals = x_vals.concat(personal_income_tax_x_vals_2022(filing_status));
	}
	if(isActive['fica']){
		x_vals = x_vals.concat(fica_x_vals_2022());
	}
	if(isActive['eitc']){
		x_vals = x_vals.concat(eitc_x_vals_2022(filing_status, num_children));
	}
	if(isActive['ctc']){
		x_vals = x_vals.concat(ctc_x_vals_2022(filing_status, num_children));
	}
	if(isActive['snap']){
		let householdSize = household_size(filing_status, num_children);
		x_vals = x_vals.concat(snap_x_vals_2022(householdSize));
	}
	if(isActive['ssi']){
		x_vals = x_vals.concat(ssi_x_vals_2022(filing_status));
	}
	if(isActive['ptc']){
		x_vals = x_vals.concat(ptc_x_vals_2022(filing_status, num_children));
	}
	if(isActive['ca_income_tax']){
		x_vals = x_vals.concat(california_income_tax_x_vals_2022(filing_status));
	}
	if(isActive['ca_eitc']){
		x_vals = x_vals.concat(california_eitc_x_vals_2022(num_children));
	}
	if(isActive['ca_yctc']){
		x_vals = x_vals.concat(california_yctc_x_vals_2022(num_children));
	}

	/* add 0 and 600,000 */
	x_vals.push(0);
	x_vals.push(600000);

	// remove duplicates and sort
	x_val_set = new Set(x_vals);
	x_vals = Array.from(x_val_set).sort(function(a,b){return a-b;});

	return x_vals;
}

/** Returns the x-values needed for c3.js to render the 2022 personal income tax marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function personal_income_tax_x_vals_2022(filing_status){
	const single_tax_brackets_2022  = [12949, 12950, 23224, 23225, 54724,  54725,  102024, 102025, 182999, 183000, 228899, 228900, 552849, 552850];
	const hoh_tax_brackets_2022     = [19399, 19400, 34049, 34050, 75299,  75300,  108449, 108450, 189449, 189450, 235349, 235350, 559299, 559300];
	const married_tax_brackets_2022 = [25899, 25900, 46399, 46400, 109449, 109450, 204049, 204050, 365999, 366000, 457799, 457800, 673759, 673750]; 

	if(filing_status === 'single'){
		return single_tax_brackets_2022;
	}
	else if(filing_status === 'hoh'){
		return hoh_tax_brackets_2022;
	}
	else if(filing_status === 'married'){
		return married_tax_brackets_2022;
	}
}

/** Returns the x-values needed for c3.js to render the 2022 fica payrol tax marginal tax rates
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function fica_x_vals_2022(){
	return [146999, 147000, 199999, 200000];
}

/** Returns the x-values needed for c3.js to render 2022 eitc marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function eitc_x_vals_2022(filing_status, num_children){
	if(filing_status === 'married'){
		if(num_children === 'none'){
			return [7319, 7320, 15289, 15290, 22609, 22610];
		}
		else if(num_children === 'one'){
			return [10978, 10979, 26261, 26262, 49621, 49622];
		}
		else if(num_children === 'two'){
			return [15289, 15290, 26261, 26262, 55528, 55528];
		}
		else if(num_children === 'three'){
			return [15409, 15410, 26261, 26262, 59186, 59187];
		}
	}
	else {
		if(num_children === 'none'){
			return [7319, 7320, 9159, 9160, 16479, 16480];
		}
		else if(num_children === 'one'){
			return [10978, 10979, 20130, 20131, 43491, 43492];
		}
		else if(num_children === 'two'){
			return [15289, 15290, 20130, 20131, 49398, 49399];
		}
		else if(num_children === 'three'){
			return [15409, 15410, 20130, 20131, 53056, 53057];
		}
	}
}

/** Returns the x-values needed for c3.js to render 2022 ctc marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function ctc_x_vals_2022(filing_status, num_children){
	// IMPORTANT: HOH and Married values below are 2023 values and need to be updated

	if(num_children === 'none'){
		return [];
	}

	if(filing_status === 'married'){
		if(num_children === 'one'){
			return [2499, 2500, 12499, 12500, 25899, 25900, 30899, 30900, 399999, 400000, 439999, 440000 ];
		}
		else if(num_children === 'two'){
			return [2499, 2500, 22499, 22500, 25899, 25900, 35899, 35900, 399999, 400000, 479999, 480000];
		}
		else if(num_children === 'three'){
			return [2499, 2500, 25899, 25900, 32499, 32500, 40899, 40900, 399999, 400000, 519999, 520000];
		}
	}
	else if(filing_status === 'hoh'){
		if(num_children === 'one'){
			return [2499, 2500, 12499, 12500, 19399, 19400, 24399, 24400, 199999, 200000, 239999, 240000 ];
		}
		else if(num_children === 'two'){
			return [2499, 2500, 19399, 19400, 22499, 22500, 29399, 29400, 199999, 200000, 279999, 280000];
		}
		else if(num_children === 'three'){
			return [2499, 2500, 19399, 19400, 32499, 32500, 34049, 34050, 34341, 34342, 199999, 200000, 319999, 320000];
		}
	}
	else if(filing_status === 'single'){
		if(num_children === 'one'){
			return [2499, 2500, 12499, 12500, 12949, 12950, 17949, 17959, 199999, 200000, 239999, 240000 ];
		}
		else if(num_children === 'two'){
			return [2499, 2500, 12949, 12950, 22499, 22500, 22666, 22667, 199999, 200000, 279999, 280000];
		}
		else if(num_children === 'three'){
			return [2499, 2500, 12949, 12950, 23224, 23225, 30128, 30129, 199999, 200000, 319999, 320000];
		}
	}
}

/** Returns the x-values needed for c3.js to render 2022 eitc marginal tax rates
 * @param {integer} - number of people in the household household
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function snap_x_vals_2022(household_size){
	if(household_size == 1){
		return [2654, 2655, 15154, 15155];
	}
	else if(household_size == 2){
		return [2654, 2655, 22655, 22656, 22657];
	}
	else if(household_size == 3){
		return [2654, 2655, 28547, 28548, 28549];
	}
	else if(household_size == 4){
		return [2759, 2760, 34451, 34452, 34453];
	}
	else if(household_size == 5){
		
	}
}

/** Returns the x-values needed for c3.js to render 2022 SSI marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function ssi_x_vals_2022(filing_status){
	const ssi_single_2023_x_vals  = [779, 780, 20963, 20964];
	const ssi_married_2023_x_vals = [779, 780, 31043, 31044];

	if(filing_status === 'married'){
		return ssi_married_2023_x_vals;
	}
	else {
		return ssi_single_2023_x_vals;
	}
}

/** Returns the x-values needed for c3.js to render 2022 premium tax credit marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function ptc_x_vals_2022(filing_status, num_children){
	if(filing_status === 'married'){
		if(num_children === 'none'){
			return [27464, 27465, 54929, 54930, 73239, 73240, 148540, 148541];
		}
		else if(num_children === 'one'){
			return [34544, 34545, 69089, 69090, 92119, 92120, 192281, 192282];
		}
		else if(num_children === 'two'){
			return [41625, 41626, 83249, 83250, 110999, 111000, 236187, 236188];
		}
		else if(num_children === 'three'){
			return [48704, 48705, 97409, 97410, 129879, 129880, 279952, 279953];
		}
	}
	else {
		if(num_children === 'none'){
			return [20384, 20385, 40769, 40770, 54359, 54360, 74258, 74259];
		}
		else if(num_children === 'one'){
			return [27464, 27465, 54929, 54930, 73239, 73240, 118023, 118024];
		}
		else if(num_children === 'two'){
			return [34544, 34545, 69089, 69090, 92119, 92120, 161928, 161929];
		}
		else if(num_children === 'three'){
			return [41624, 41625, 83249, 83250, 110999, 111000, 205693, 205694];
		}
	}
}

/**************************** California **********************************************************************************************************************************************************/
function california_income_tax_x_vals_2022(filing_status){
	if(filing_status === 'married'){
		return [10403, 10404, 30602, 30603, 58288, 58289, 85980, 85981, 115314, 115315, 142994, 142995, 687682, 687683, 823132, 823133, 1364954, 1364955];
	}
	else if(filing_status === 'hoh'){
		return [10403, 10404, 30616, 30617, 58291, 58292, 72134, 72135, 86801, 86802, 100644, 100645, 470951, 470952, 563062, 563063, 931499, 931500];
	}
	else {
		return [5201, 5202, 15301, 15302, 29144, 29145, 42990, 42991, 57657, 57658, 71497, 71498, 343841, 343842, 411566, 411567, 582477, 682478];
	}
}

function california_eitc_x_vals_2022(num_children){
	if(num_children === 'none'){
		return [4228, 4229, 5336, 5337, 29999, 30000];
	}
	else if(num_children === 'one'){
		return [6377, 6378, 10983, 10984, 29999, 30000];
	}
	else if(num_children === 'two'){
		return [8931, 8932, 16358, 16359, 29999, 30000];
	}
	else if(num_children === 'three'){
		return [8932, 8933, 16527, 16528, 29999, 30000];
	}
}

function california_yctc_x_vals_2022(num_children){
	if(num_children === 'none'){
		return [];
	}
	else{
		return [24999, 25000, 29999, 30000];
	}
}




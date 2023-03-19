// Loads 2023 EMTR data to the top chart
function load_emtr_data_2023(){
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
	let x_vals = get_x_values_2023_marginal(filingStatus, numChildren);
	for (i in x_vals) {
		marginal_tax_rates = marginal_tax_rates_at_income_2023(x_vals[i], numChildren, filingStatus);
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

// Adjusts the EMTR income slider when 2023 is selected
function emtr_modify_income_2023(){
	let income = user_income.value;
	let total  = marginal_tax_rates_at_income_2023(income, num_children.value, filingstatus.value)['total'];
	if(total > 120){
		total = 120;
	}
	
	top_chart_chart.load({columns: [
			['x_point', income],
			['point',   total],
		],
	});
}

/** Returns the x-values needed for c3.js to render the effective marginal tax rate top_chart_chart
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function get_x_values_2023_marginal(filing_status, num_children){
	let x_vals = [];

	if(isActive['income_tax']){
		x_vals = x_vals.concat(personal_income_tax_x_vals_2023(filing_status));
	}
	if(isActive['fica']){
		x_vals = x_vals.concat(fica_x_vals_2023());
	}
	if(isActive['eitc']){
		x_vals = x_vals.concat(eitc_x_vals_2023(filing_status, num_children));
	}
	if(isActive['ctc']){
		x_vals = x_vals.concat(ctc_x_vals_2023(filing_status, num_children));
	}
	if(isActive['snap']){
		let householdSize = household_size(filing_status, num_children);
		x_vals = x_vals.concat(snap_x_vals_2023(householdSize));
	}
	if(isActive['ssi']){
		x_vals = x_vals.concat(ssi_x_vals_2023(filing_status));
	}
	if(isActive['ptc']){
		x_vals = x_vals.concat(ptc_x_vals_2023(filing_status, num_children));
	}

	// add 0 and 600,000
	x_vals.push(0);
	x_vals.push(600000);

	// remove duplicates and sort
	x_val_set = new Set(x_vals);
	x_vals = Array.from(x_val_set).sort(function(a,b){return a-b;});

	return x_vals;
}

/** Returns the x-values needed for c3.js to render the 2023 personal income tax marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function personal_income_tax_x_vals_2023(filing_status){
	const single_tax_brackets_2023  = [13849, 13859, 24849, 24850, 58574,  58575,  109224, 109225, 195949, 195950, 245099, 245100, 591974, 591975];
	const hoh_tax_brackets_2023     = [20799, 20800, 36499, 36500, 80649,  80650,  116149, 116150, 202899, 202900, 252049, 252050, 598899, 598900];
	const married_tax_brackets_2023 = [27699, 27700, 49699, 49700, 117149, 117150, 218449, 218450, 391899, 391900, 490199, 490200, 721449, 721450];

	if(filing_status === 'single'){
		return single_tax_brackets_2023;
	}
	else if(filing_status === 'hoh'){
		return hoh_tax_brackets_2023;
	}
	else if(filing_status === 'married'){
		return married_tax_brackets_2023;
	}
}

/** Returns the x-values needed for c3.js to render the 2023 fica payrol taxx marginal tax rates
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function fica_x_vals_2023(){
	return [160199, 160200, 199999, 200000];
}

/** Returns the x-values needed for c3.js to render 2023 eitc marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function eitc_x_vals_2023(filing_status, num_children){
	if(filing_status === 'married'){
		if(num_children === 'none'){
			return [7839, 7840, 16369, 16370, 24209, 24210];
		}
		else if(num_children === 'one'){
			return [11749, 11750, 28119, 28120, 53119, 53120];
		}
		else if(num_children === 'two'){
			return [16509, 16510, 28119, 28120, 59477, 59478];
		}
		else if(num_children === 'three'){
			return [16509, 16510, 28119, 28120, 63397, 63398];
		}
	}
	else {
		if(num_children === 'none'){
			return [7839, 7840, 9799, 9800, 17639, 17640];
		}
		else if(num_children === 'one'){
			return [11749, 11750, 21559, 21560, 46559, 46560];
		}
		else if(num_children === 'two'){
			return [16509, 16510, 21559, 21560, 52917, 52918];
		}
		else if(num_children === 'three'){
			return [16509, 16510, 21559, 21560, 56837, 56838];
		}
	}
}

/** Returns the x-values needed for c3.js to render 2023 ctc marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function ctc_x_vals_2023(filing_status, num_children){
	if(filing_status === 'married'){
		if(num_children === 'none'){
			return [];
		}
		else if(num_children === 'one'){
			return [2499, 2500, 13166, 13167, 27699, 27700, 31699, 31700, 399999, 400000, 439999, 440000 ];
		}
		else if(num_children === 'two'){
			return [2499, 2500, 23832, 23833, 27699, 27700, 35699, 35700, 399999, 400000, 479999, 480000];
		}
		else if(num_children === 'three'){
			return [2499, 2500, 27699, 27700, 34499, 34500, 39699, 39700, 399999, 400000, 519999, 520000];
		}
	}
	else if(filing_status === 'hoh'){
		if(num_children === 'none'){
			return [];
		}
		else if(num_children === 'one'){
			return [2499, 2500, 13166, 13167, 20799, 20800, 24799, 24800, 199999, 200000, 239999, 240000 ];
		}
		else if(num_children === 'two'){
			return [2499, 2500, 20799, 20800, 23832, 23833, 28799, 28800, 199999, 200000, 279999, 280000];
		}
		else if(num_children === 'three'){
			return [2499, 2500, 20799, 20800, 33819, 33820, 199999, 200000, 319999, 320000];
		}
	}
	else if(filing_status === 'single'){
		if(num_children === 'none'){
			return [];
		}
		else if(num_children === 'one'){
			return [2499, 2500, 13166, 13167, 13849, 13850, 17849, 17850, 199999, 200000, 239999, 240000 ];
		}
		else if(num_children === 'two'){
			return [2499, 2500, 13849, 13850, 23039, 23040, 199999, 200000, 279999, 280000];
		}
		else if(num_children === 'three'){
			return [2499, 2500, 13849, 13850, 24849, 24850, 30580, 30581, 199999, 200000, 319999, 320000];
		}
	}
}

/** Returns the x-values needed for c3.js to render 2023 eitc marginal tax rates
 * @param {integer} - number of people in the household household
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function snap_x_vals_2023(household_size){
	if(household_size == 1){
		return [2894, 2895, 16944, 16945];
	}
	else if(household_size == 2){
		return [2894, 2895, 23807, 23808, 23809];
	}
	else if(household_size == 3){
		return [2894, 2895, 29938, 29939, 29940];
	}
	else if(household_size == 4){
		return [2894, 2895, 36082, 36083, 36084];
	}
	else if(household_size == 5){
		return [3374, 3375, 42215, 42216, 42217];
	}
}

/** Returns the x-values needed for c3.js to render 2023 SSI marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function ssi_x_vals_2023(filing_status){
	const ssi_single_2023_x_vals  = [779, 780, 22714, 22716];
	const ssi_married_2023_x_vals = [779, 780, 33683, 33684];

	if(filing_status === 'married'){
		return ssi_married_2023_x_vals;
	}
	else {
		return ssi_single_2023_x_vals;
	}
}

/** Returns the x-values needed for c3.js to render 2023 premium tax credit marginal tax rates
 * @param {string} - filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {sorted array of integers} - x-values that will be fed into the c3.js top_chart_chart
 * */
function ptc_x_vals_2023(filing_status, num_children){
	if(filing_status === 'married'){
		if(num_children === 'none'){
			return [29579, 29580, 59159, 59160, 78879, 78880, 148540, 148541];
		}
		else if(num_children === 'one'){
			return [37289, 37290, 74579, 74580, 99439, 99440, 192281, 192282];
		}
		else if(num_children === 'two'){
			return [44999, 45000, 89999, 90000, 119999, 120000, 236187, 236188];
		}
		else if(num_children === 'three'){
			return [52709, 52710, 105419, 105420, 140559, 140560, 279952, 279953];
		}
	}
	else {
		if(num_children === 'none'){
			return [22274, 22275, 44549, 44550, 59399, 59400, 74258, 74259];
		}
		else if(num_children === 'one'){
			return [29579, 29580, 59159, 59160, 78879, 78880, 118023, 118024];
		}
		else if(num_children === 'two'){
			return [37289, 37290, 74579, 74580, 99439, 99440, 161928, 161929];
		}
		else if(num_children === 'three'){
			return [44999, 45000, 89999, 90000, 119999, 120000, 205693, 205694];
		}
	}
}






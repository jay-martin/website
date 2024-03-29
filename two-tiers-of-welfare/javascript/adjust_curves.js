/******************************************************************************************
 * This file contains the functions that add data to the chart
 * ****************************************************************************************/

function load_all(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;
	maxCTC = max_benefit_ctc(numChildren);
	hitMax = false;

	xVals = all_reference_values(filingStatus, numChildren);
	
	total = [];
	total_hidden = [];
	no_exclusion = [];
	x2 = [];
	no_exclusion_end = [];
	j = 0;
	for (var i = 0; i < xVals.length; i++) {
		benefitVal = eitc_value(xVals[i], filingStatus, numChildren) + ctc_value(xVals[i], filingStatus, numChildren);

		total[i] = benefitVal;
		total_hidden[i] = benefitVal;

		if(hitMax === false){
			no_exclusion[i] = maxCTC + non_exclude_eitc_value(xVals[i], filingStatus, numChildren) - benefitVal;
		}
		else{
			x2[j] = xVals[i];
			no_exclusion_end[j] = benefitVal;
			j++;
		}

		if(parseInt(no_exclusion[i]) == 0){
			hitMax = true;
			x2[j] = xVals[i];
			no_exclusion_end[j] = benefitVal;
			j++;
		}
	}

	/* add strings */
	total.unshift('total');
	total_hidden.unshift('total_hidden');
	xVals.unshift('x');
	no_exclusion.unshift('no_exclusion');
	x2.unshift('x2');
	no_exclusion_end.unshift('no_exclusion_end');

	/* load chart */
	chart.load({ columns: [xVals, total, total_hidden, no_exclusion, x2, no_exclusion_end] });

	/* adjust axes */
	adjust_axes_y();
	if(zoom_switch.checked === false){
		adjust_axes_x();
	}
}

function load_all_curve(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;
	maxCTC = max_benefit_ctc(numChildren);

	xVals = all_reference_values(filingStatus, numChildren);

	benefitLoss = [];
	for (var i = 0; i < xVals.length; i++) {
		benefitLoss[i] = maxCTC + non_exclude_eitc_value(xVals[i], filingStatus, numChildren) - eitc_value(xVals[i], filingStatus, numChildren) - ctc_value(xVals[i], filingStatus, numChildren);
	}

	/* add strings */
	xVals.unshift('x');
	benefitLoss.unshift('loss_in_benefits');

	/* load chart */
	chart.load({ columns: [xVals, benefitLoss] });

	/* adjust axes */
	adjust_axes_y();
	if(zoom_switch.checked === false){
		adjust_axes_x();
	}
}

function load_eitc(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;
	maxBenefit = max_benefit_eitc(numChildren);

	xVals = eitc_reference_value(filingStatus, numChildren);

	total = [];
	total_hidden = [];
	no_exclusion = [];
	x2 = [];
	no_exclusion_end = [];
	hitMax = false;
	j = 0;
	for (var i = 0; i < xVals.length; i++) {
		benefitVal = eitc_value(xVals[i], filingStatus, numChildren);
		benefitVal = benefitVal.toFixed(2);

		total[i] = benefitVal;
		total_hidden[i] = benefitVal;

		/* Used to calculate the stacked max curve, which should stop including data once the max benefit is reached */
		if(hitMax === false){
			no_exclusion[i] = maxBenefit - benefitVal;
		}
		else{
			x2[j] = xVals[i];
			no_exclusion_end[j] = benefitVal;
			j++;
		}

		if(benefitVal == maxBenefit){
			hitMax = true;
			x2[j] = xVals[i];
			no_exclusion_end[j] = benefitVal;
			j++;
		}
	}

	/* add strings */
	total.unshift('total');
	total_hidden.unshift('total_hidden');
	xVals.unshift('x');
	no_exclusion.unshift('no_exclusion');
	x2.unshift('x2');
	no_exclusion_end.unshift('no_exclusion_end');

	/* load chart */
	chart.load({ columns: [xVals, total, total_hidden, no_exclusion, x2, no_exclusion_end] });
}

function load_eitc_curve(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;

	xVals = eitc_reference_value(filingStatus, numChildren);

	benefitLoss = [];
	for (var i = 0; i < xVals.length; i++) {
		benefitLoss[i] = non_exclude_eitc_value(xVals[i], filingStatus, numChildren) - eitc_value(xVals[i], filingStatus, numChildren);
	}

	/* add strings */
	xVals.unshift('x');
	benefitLoss.unshift('loss_in_benefits');

	/* load chart */
	chart.load({ columns: [xVals, benefitLoss] });
}

function load_ctc(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;
	maxBenefit = max_benefit_ctc(numChildren);

	xVals = ctc_reference_values(filingStatus, numChildren);

	total = [];
	total_hidden = [];
	no_exclusion = [];
	x2 = [];
	no_exclusion_end = [];
	hitMax = false;
	j = 0;
	for (var i = 0; i < xVals.length; i++) {
		benefitVal = ctc_value(xVals[i], filingStatus, numChildren);
		benefitVal = benefitVal.toFixed(2);

		total[i] = benefitVal;
		total_hidden[i] = benefitVal;

		/* Used to calculate the stacked max curve, which should stop including data once the max benefit is reached */
		if(hitMax === false){
			no_exclusion[i] = maxBenefit - benefitVal;
		}
		else{
			x2[j] = xVals[i];
			no_exclusion_end[j] = benefitVal;
			j++;
		}

		if(benefitVal == maxBenefit){
			hitMax = true;
			x2[j] = xVals[i];
			no_exclusion_end[j] = benefitVal;
			j++;
		}
	}

	/* add strings */
	total.unshift('total');
	total_hidden.unshift('total_hidden');
	xVals.unshift('x');
	no_exclusion.unshift('no_exclusion');
	x2.unshift('x2');
	no_exclusion_end.unshift('no_exclusion_end');

	/* load chart */
	chart.load({ columns: [xVals, total, total_hidden, no_exclusion, x2, no_exclusion_end] });
}

function load_ctc_curve(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;
	maxCTC = max_benefit_ctc(numChildren);

	xVals = ctc_reference_values(filingStatus, numChildren);

	benefitLoss = [];
	for (var i = 0; i < xVals.length; i++) {
		benefitLoss[i] = maxCTC - ctc_value(xVals[i], filingStatus, numChildren);
	}

	/* add strings */
	xVals.unshift('x');
	benefitLoss.unshift('loss_in_benefits');

	/* load chart */
	chart.load({ columns: [xVals, benefitLoss] });
}

/* Loads data for the two points of the highlighted region chart into c3.js */
function load_points_highlight(){
	income = user_income.value;
	filingStatus = filingstatus.value;
	numChildren = num_children.value;

	if(benefit_selector.value === 'all'){
		existing = eitc_value(income, filingStatus, numChildren) + ctc_value(income, filingStatus, numChildren);
		no_exclusion = non_exclude_eitc_value(income, filingStatus, numChildren) + max_benefit_ctc(numChildren);
	}
	else if(benefit_selector.value === 'eitc'){
		existing = eitc_value(income, filingStatus, numChildren);
		no_exclusion = non_exclude_eitc_value(income, filingStatus, numChildren);
	}
	else{
		existing = ctc_value(income, filingStatus, numChildren);
		no_exclusion = max_benefit_ctc(numChildren);
	}

	/* add strings */
	xPoint = ['x_point', income];
	existingPoint = ['existing_point', existing];
	noExclusionPoint = ['no_exclusion_point', no_exclusion];

	/* load to chart */
	chart.load({ columns: [xPoint, existingPoint, noExclusionPoint] });
}

/* Loads data for the one points of the curve chart into c3.js */
function load_point_curve(){
	income = user_income.value;
	filingStatus = filingstatus.value;
	numChildren = num_children.value;

	if(benefit_selector.value === 'all'){
		benefitLoss = max_benefit_ctc(numChildren) + non_exclude_eitc_value(income, filingStatus, numChildren) - ctc_value(income, filingStatus, numChildren) - eitc_value(income, filingStatus, numChildren);
	}
	else if(benefit_selector.value === 'eitc'){
		benefitLoss = non_exclude_eitc_value(income, filingStatus, numChildren) - eitc_value(income, filingStatus, numChildren);
	}
	else{
		benefitLoss = max_benefit_ctc(numChildren) - ctc_value(income, filingStatus, numChildren);
	}

	/* add strings */
	/* no_exclusion_point used since it is red */
	xPoint = ['x_point', income];
	benefitLossPoint = ['no_exclusion_point', benefitLoss];

	/* load to chart */
	chart.load({ columns: [xPoint, benefitLossPoint] });
}




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
	}
	else if(benefit_selector.value === 'eitc'){
		load_eitc();
	}
	else{
		load_ctc();
	}
}

function adjust_chart_curve(){
	if(benefit_selector.value === 'all'){
		load_all_curve();
	}
	else if(benefit_selector.value === 'eitc'){
		load_eitc_curve();
	}
	else{
		load_ctc_curve();
	}
}

function switch_charts(){
	if(chart_selector.value === 'highlight'){
		chart.hide(['loss_in_benefits']);
		chart.legend.hide(['loss_in_benefits']);
		chart.show(['total', 'no_exclusion', 'total_hidden', 'no_exclusion_end']);
		chart.legend.show(['total', 'no_exclusion',]);
		adjust_chart_highlight();
	}
	else{
		chart.hide(['total', 'no_exclusion', 'total_hidden', 'no_exclusion_end']);
		chart.legend.hide(['total', 'no_exclusion',]);
		chart.show(['loss_in_benefits']);
		chart.legend.show(['loss_in_benefits']);

		adjust_chart_curve();
	}
}

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

function adjust_axes_x(){
	if(arbitrary_axes_switch.checked === true){
		return;
	}

	if(numChildren === 'none'){
		chart.axis.max({x: 20000})
		/* adjust arbitry axis range to keep up-to-date */
		$("#x_axis_range").slider("values", [0, 20000]);
		$("#x_axis_output_end").text('20,000');
	}
	else if(numChildren === 'one'){
		chart.axis.max({x: 50000})
		/* adjust arbitry axis range to keep up-to-date */
		$("#x_axis_range").slider("values", [0, 50000]);
		$("#x_axis_output_end").text('50,000');
	}
	else if(numChildren === 'two'){
		chart.axis.max({x: 50000})
		/* adjust arbitry axis range to keep up-to-date */
		$("#x_axis_range").slider("values", [0, 50000]);
		$("#x_axis_output_end").text('50,000');
	}
	else if(numChildren === 'three'){
		chart.axis.max({x: 50000})
		/* adjust arbitry axis range to keep up-to-date */
		$("#x_axis_range").slider("values", [0, 50000]);
		$("#x_axis_output_end").text('50,000');
	}
}

function adjust_axes_y(){
	if(arbitrary_axes_switch.checked === true){
		return;
	}

	if(numChildren === 'none'){
		chart.axis.max({y: 1000})
		/* adjust arbitry axis range to keep up-to-date */
		$("#y_axis_range").slider("values", [0, 1000]);
		$("#y_axis_output_end").text('1,000');
	}
	else if(numChildren === 'one'){
		chart.axis.max({y: 7000})
		/* adjust arbitry axis range to keep up-to-date */
		$("#y_axis_range").slider("values", [0, 7000]);
		$("#y_axis_output_end").text('7,000');
	}
	else if(numChildren === 'two'){
		chart.axis.max({y: 12000})
		/* adjust arbitry axis range to keep up-to-date */
		$("#y_axis_range").slider("values", [0, 12000]);
		$("#y_axis_output_end").text('12,000');
	}
	else if(numChildren === 'three'){
		chart.axis.max({y: 14000})
		/* adjust arbitry axis range to keep up-to-date */
		$("#y_axis_range").slider("values", [0, 14000]);
		$("#y_axis_output_end").text('14,000');
	}

}

function all_reference_values(filingStatus, numChildren){
    eitcReferenceValues = eitc_reference_value(filingStatus, numChildren);
    ctcReferenceValues = ctc_reference_values(filingStatus, numChildren);
    hohReferenceValues = hoh_reference_values();

    if(filingStatus === 'hoh'){
    	fullArray = eitcReferenceValues.concat(ctcReferenceValues).concat(hohReferenceValues);
    }
    else{
    	fullArray = eitcReferenceValues.concat(ctcReferenceValues);
    }

    refSet = new Set(fullArray); /* prevents duplicate values */
    combined_brackets = Array.from(refSet).sort(function(a,b){return a-b;});

    return combined_brackets;
}

function hoh_reference_values(){
	return [0, 12950, 19400, 23225, 34050, 54725, 75300];
}

function eitc_reference_value(filingStatus, numChildren){
    referenceValues = [];

    if(filingStatus==="married"){
        if(numChildren === 'three') {
            referenceValues = [0, 15410, 26262, 59187];
        }
        if(numChildren === 'two') {
            referenceValues = [0, 15290, 26262, 55529];
        }
        if(numChildren === 'one'){
            referenceValues = [0, 10979, 26262, 49622];
        }
        if(numChildren === 'none') {
            referenceValues = [0, 7320, 15290, 22610];
        }
    }
    else if(filingStatus==="hoh" || filingStatus==="single"){
        if(numChildren === 'three') {
            referenceValues = [0, 15410, 20131, 53057];
        }
        if(numChildren === 'two') {
            referenceValues = [0, 15290, 20131, 49399];
        }
        if(numChildren === 'one'){
            referenceValues = [0, 10979, 20131, 43492];
        }
        if(numChildren === 'none') {
            referenceValues = [0, 7320,  9160, 16480];
        }
    }
    return referenceValues;
}

function ctc_reference_values(filingStatus, numChildren){
    referenceValues = [];
    if (filingStatus==="married"){
        if(numChildren === 'none') {
                referenceValues = [];
        }
        if(numChildren === 'one') {
                referenceValues = [0, 2500, 11833, 25900, 31900, 400000, 440000];
        }
        if(numChildren === 'two'){
                referenceValues = [0, 2500, 21167, 25900, 37900, 400000, 480000];
        }
        if(numChildren === 'three'){
                referenceValues = [0, 2500, 25900, 30500, 43900, 400000, 520000];
        }
    }
    else if (filingStatus==="hoh"){
        if(numChildren === 'none') {
                referenceValues = [];
        }
        if(numChildren === 'one') {
                referenceValues = [0, 2500, 11833, 19400, 25400, 200000, 240000];
        }
        if(numChildren === 'two'){
                referenceValues = [0, 2500, 19400, 21167, 31397, 200000, 280000];
        }
        if(numChildren === 'three'){
                referenceValues= [0, 2500, 19400, 30500, 34050, 36842, 200000, 320000];
        }
    }
    else if (filingStatus==="single"){
        if(numChildren === 'none') {
                referenceValues = [];
        }
        if(numChildren === 'one') {
                referenceValues = [0, 2500, 11833, 12950, 18950, 200000, 240000];
        }
        if(numChildren === 'two'){
                referenceValues = [0, 2500, 12950, 21167, 23225, 24658,  200000, 280000];
        }
        if(numChildren === 'three'){
                referenceValues= [0, 2500, 12950, 23225, 30129, 200000, 320000];
        }
    }
    return referenceValues;
}  
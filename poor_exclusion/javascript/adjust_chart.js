function adjust_chart(){
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

function load_all(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;
	maxBenefit = max_benefit(filingStatus, numChildren);

	xVals = all_reference_values(filingStatus, numChildren);
	
	total = [];
	total_hidden = [];
	max = [];
	hitMax = false;
	for (var i = 0; i < xVals.length; i++) {
		benefitVal = eitc_value(xVals[i], filingStatus, numChildren) + ctc_value(xVals[i], filingStatus, numChildren);
		if(filingStatus === 'hoh'){
			benefitVal += hoh_value(xVals[i]);
		}

		benefitVal = benefitVal.toFixed(2);

		total[i] = benefitVal;
		total_hidden[i] = benefitVal;

		/* Used to calculate the stacked max curve, which should stop including data once the max benefit is reached */
		if(hitMax === false){
			max[i] = maxBenefit - benefitVal;
		}
		if(benefitVal == maxBenefit){
			hitMax = true;
		}
	}

	/* add strings */
	total.unshift('total');
	total_hidden.unshift('total_hidden');
	xVals.unshift('x');
	max.unshift('max');

	/* load chart */
	chart.load({ columns: [xVals, total, total_hidden, max] });

	/* adjust axes */
	adjust_axes();
}

function load_eitc(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;
	maxBenefit = max_benefit_eitc(numChildren);

	xVals = eitc_reference_value(filingStatus, numChildren);

	total = [];
	total_hidden = [];
	max = [];
	hitMax = false;
	for (var i = 0; i < xVals.length; i++) {
		benefitVal = eitc_value(xVals[i], filingStatus, numChildren);
		benefitVal = benefitVal.toFixed(2);

		total[i] = benefitVal;
		total_hidden[i] = benefitVal;

		/* Used to calculate the stacked max curve, which should stop including data once the max benefit is reached */
		if(hitMax === false){
			max[i] = maxBenefit - benefitVal;
		}
		if(benefitVal == maxBenefit){
			hitMax = true;
		}
	}

	/* add strings */
	total.unshift('total');
	total_hidden.unshift('total_hidden');
	xVals.unshift('x');
	max.unshift('max');

	/* load chart */
	chart.load({ columns: [xVals, total, total_hidden, max] });
}

function load_ctc(){
	filingStatus = filingstatus.value;
	numChildren = num_children.value;
	maxBenefit = max_benefit_ctc(numChildren);

	xVals = ctc_reference_values(filingStatus, numChildren);

	total = [];
	total_hidden = [];
	max = [];
	hitMax = false;
	for (var i = 0; i < xVals.length; i++) {
		benefitVal = ctc_value(xVals[i], filingStatus, numChildren);
		benefitVal = benefitVal.toFixed(2);

		total[i] = benefitVal;
		total_hidden[i] = benefitVal;

		/* Used to calculate the stacked max curve, which should stop including data once the max benefit is reached */
		if(hitMax === false){
			max[i] = maxBenefit - benefitVal;
		}
		if(benefitVal == maxBenefit){
			hitMax = true;
		}
	}

	/* add strings */
	total.unshift('total');
	total_hidden.unshift('total_hidden');
	xVals.unshift('x');
	max.unshift('max');

	/* load chart */
	chart.load({ columns: [xVals, total, total_hidden, max] });
}

function adjust_axes(){
	if(numChildren === 'none'){
		chart.axis.max({y: 1000, x: 20000})
	}
	else if(numChildren === 'one'){
		chart.axis.max({y: 7000, x: 50000})
	}
	else if(numChildren === 'two' || numChildren === 'three'){
		chart.axis.max({y: 12000, x: 50000})
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
    combined_brackets.unshift(0);

    return combined_brackets;
}

function hoh_reference_values(){
	return [0, 12950, 19400, 23225, 34050, 54725, 75300];
}

function eitc_reference_value(filingStatus, numChildren){
    referenceValues = [];

    if(filingStatus==="married"){
        if(numChildren === 'three') {
            referenceValues = [0, 15410, 18000, 26262, 33000, 54000, 59187];
        }
        if(numChildren === 'two') {
            referenceValues = [0, 15290, 18000, 26262, 33000, 54000, 55529];
        }
        if(numChildren === 'one'){
            referenceValues = [0, 10979, 18000, 26262, 33000, 49622, 54000];
        }
        if(numChildren === 'none') {
            referenceValues = [0, 7320, 15290, 16000, 20000, 22610, 34000];
        }
    }
    else if(filingStatus==="hoh" || filingStatus==="single"){
        if(numChildren === 'three') {
            referenceValues = [0, 12000, 15410, 20131, 23000, 37000, 53057];
        }
        if(numChildren === 'two') {
            referenceValues = [0, 12000, 15290, 20131, 23000, 37000, 49399];
        }
        if(numChildren === 'one'){
            referenceValues = [0, 10979, 12000, 20131, 23000, 37000, 43492];
        }
        if(numChildren === 'none') {
            referenceValues = [0, 7320,  8000,  9160,  10000, 16480, 17000];
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
                referenceValues = [2500, 11833, 25900, 31900, 400000, 440000];
        }
        if(numChildren === 'two'){
                referenceValues = [2500, 21167, 25900, 37900, 400000, 480000];
        }
        if(numChildren === 'three'){
                referenceValues = [2500, 25900, 30500, 43900, 400000, 520000];
        }
    }
    else if (filingStatus==="hoh"){
        if(numChildren === 'none') {
                referenceValues = [];
        }
        if(numChildren === 'one') {
                referenceValues = [2500, 11833, 19400, 25400, 200000, 240000];
        }
        if(numChildren === 'two'){
                referenceValues = [2500, 19400, 21167, 31397, 200000, 280000];
        }
        if(numChildren === 'three'){
                referenceValues= [2500, 19400, 30500, 34050, 36842, 200000, 320000];
        }
    }
    else if (filingStatus==="single"){
        if(numChildren === 'none') {
                referenceValues = [];
        }
        if(numChildren === 'one') {
                referenceValues = [2500, 11833, 12950, 18950, 200000, 240000];
        }
        if(numChildren === 'two'){
                referenceValues = [2500, 12950, 21167, 23225, 24658,  200000, 280000];
        }
        if(numChildren === 'three'){
                referenceValues= [2500, 12950, 23225, 30129, 200000, 320000];
        }
    }
    return referenceValues;
}  
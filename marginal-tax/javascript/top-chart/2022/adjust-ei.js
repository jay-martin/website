/* Loads EI data to the chart */
function load_ei_data(){
	if(isActive['ptc']){
		load_ei_with_ptc();
		return;
	}

	income_tax_and_transfer = [];
	xVals = get_x_values_effective_income();
	for (var i = 0; i < xVals.length; i++) {
		income_tax_and_transfer[i] = tax_and_transfer_at_income(xVals[i], numChildren)[5];
	}

	/* add $600,000 */
	xVals.push(600000);
	income_tax_and_transfer.push(tax_and_transfer_at_income(600000, numChildren)[5])

	/* add beginning string */
	xVals.unshift('x');
	income_tax_and_transfer.unshift('income_tax_and_transfer');

	/* load data */
	chart.load({columns: [xVals, income_tax_and_transfer]});
	add_tangent_line(user_income.value, numChildren);
}

/* Loads EI data to the chart if the Medicaid/PTC button is selected
/* This exists as a separate function because the PTC benefit curve is quadratic,
/* which requires loading a large number of data points into the c3.js chart */
/*PROBLEM: Some gaps */
function load_ei_with_ptc(){
	numChildren = num_children.value;
	ptcVals = get_important_ptc_vals(numChildren);
	otherVals = get_x_values_effective_income();

	income_tax_and_transfer = [];
	xVals = [];

	/* add first easy value: 0 */
	xVals[0] = 0;
	income_tax_and_transfer[0] = tax_and_transfer_at_income(0, numChildren)[5];

	/* add other values between $0 and the end of Medicaid, if they exist */
	i = 1;
	otherVal_index = 0;
	while(otherVals[otherVal_index] < ptcVals[1]){
		xVals[i] = otherVals[otherVal_index];
		income_tax_and_transfer[i] = tax_and_transfer_at_income(otherVals[otherVal_index], numChildren)[5];

		otherVal_index++;
		i++;
	}

	/* add second easy value: end of Medicaid */
	xVals[i] = ptcVals[1];
	income_tax_and_transfer[i] = tax_and_transfer_at_income(ptcVals[1], numChildren)[5];
	i++;

	/* add values between end of Medicaid and 300% of PL */
	rangeStart = ptcVals[1];
	rangeEnd = ptcVals[2];
	j = rangeStart + 100;
	while(j < rangeEnd){
		/* check for other x values in between $100 range */
		if(otherVals[otherVal_index] < j){
			while(otherVals[otherVal_index] < j){
				xVals[i] = otherVals[otherVal_index];
				income_tax_and_transfer[i] = tax_and_transfer_at_income(otherVals[otherVal_index], numChildren)[5];
				i++;
				otherVal_index++;
			}
		}

		xVals[i] = j;
		income_tax_and_transfer[i] = tax_and_transfer_at_income(j, numChildren)[5];
		i++;
		j+=100;
	}

	/* add third easy value: 300% of PL */
	xVals[i] = ptcVals[2];
	income_tax_and_transfer[i] = tax_and_transfer_at_income(ptcVals[2], numChildren)[5];
	i++;

	/* add values between 300% and 400% of PL */
	rangeStart = ptcVals[2];
	rangeEnd = ptcVals[3];
	j = rangeStart + 100;
	while(j < rangeEnd){
		/* check for other x values in between $100 range */
		if(otherVals[otherVal_index] < j){
			while(otherVals[otherVal_index] < j){
				xVals[i] = otherVals[otherVal_index];
				income_tax_and_transfer[i] = tax_and_transfer_at_income(otherVals[otherVal_index], numChildren)[5];
				i++;
				otherVal_index++;
			}
		}

		xVals[i] = j;
		income_tax_and_transfer[i] = tax_and_transfer_at_income(j, numChildren)[5];
		i++;
		j+=100;
	}

	/* add fourth easy value: 400% of PL */
	xVals[i] = ptcVals[3];
	income_tax_and_transfer[i] = tax_and_transfer_at_income(ptcVals[3], numChildren)[5];
	i++;

	/* add other values between 400% of PL and required contribution = premium */
	while(otherVals[otherVal_index] < ptcVals[4]){
		xVals[i] = otherVals[otherVal_index];
		income_tax_and_transfer[i] = tax_and_transfer_at_income(otherVals[otherVal_index], numChildren)[5];

		otherVal_index++;
		i++;
	}

	/* add fifth easy value: required contribution = premium */
	xVals[i] = ptcVals[4];
	income_tax_and_transfer[i] = tax_and_transfer_at_income(ptcVals[4], numChildren)[5];
	i++;

	/* add other values between required contribution = premium and $600,000*/
	while(otherVals[otherVal_index] < 600000){
		xVals[i] = otherVals[otherVal_index];
		income_tax_and_transfer[i] = tax_and_transfer_at_income(otherVals[otherVal_index], numChildren)[5];

		otherVal_index++;
		i++;
	}

	/* add value for $600,000 */
	xVals[i] = 600000;
	income_tax_and_transfer[i] = tax_and_transfer_at_income(600000, numChildren)[5];

	/* add beginning string */
	xVals.unshift('x');
	income_tax_and_transfer.unshift('income_tax_and_transfer');

	/* load data */
	chart.load({columns: [xVals, income_tax_and_transfer]});
	add_tangent_line(user_income.value, numChildren);
}

/* Returns income (x) values that are important to the PTC */
/* Need for load_ei_with_ptc() */
function get_important_ptc_vals(numChildren){
	if(numChildren === 'none'){
		return [0, 20385, 40770, 54360, 74259];
	}
	else if(numChildren === 'one'){
		return [0, 27465, 54930, 73240, 118024];
	}
}

/* Adds the tangent line to the EI graph */
function add_tangent_line(income, numChildren){
	/* add tangent line */
    slope = slope_at_point(income, numChildren) * -1;
    yInitial = tax_and_transfer_at_income(income, numChildren)[5];

    y0 = slope * (0 - income) + yInitial;
    yEnd = slope * (600000 - income) + yInitial;

    chart.load({columns: [ ['x_tangent', 0, 600000], ['tangent_line', y0, yEnd], ['x_point', income], ['point', yInitial] ] });
}
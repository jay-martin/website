/************************* EITC ****************************************************************************************************/

/** Loads to a c3.js chart a curve for the 2023 single/hoh eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function single_eitc_builder_2023(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,    0, 16510, 21560, 56838],
    			[dataName, 0, 7430,  7430,  0],
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,    0, 16510, 21560, 52918],
    			[dataName, 0, 6604,  6604,  0],
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,    0, 11750, 21560, 46560],
    			[dataName, 0, 3995,  3995,  0],
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,    0, 7840, 9800, 17640],
    			[dataName, 0, 600,  600,  0],
			]
    	});
	}
}

/** Loads to a c3.js chart a curve for the 2023 married eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function married_eitc_builder_2023(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,    0, 16510, 28120, 63398],
    			[dataName, 0, 7430,  7430,  0],
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,    0, 16510, 28120, 59478],
    			[dataName, 0, 6604,  6604,  0],
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,    0, 11750, 28120, 53120],
    			[dataName, 0, 3995,  3995,  0],
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,    0, 7840, 16370, 24210],
    			[dataName, 0, 600,  600,   0],
			]
    	});
	}
}

/** Loads to a c3.js chart a curve for the 2022 single/hoh eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function single_eitc_builder_2022(chartName, xName, dataName, numChildren){
	if(numChildren === "none"){
        chartName.load({
            columns: [
                [xName,      0, 7320, 9160, 16480],
                [dataName,   0, 560,  560,  0]
            ]
        });
    }
    else if(numChildren === "one"){
        chartName.load({
            columns: [
                [xName,      0, 10979, 20131, 43493],
                [dataName,   0, 3733,  3733,  0]
            ]
        });
    }
    else if(numChildren === "two"){
        chartName.load({
            columns: [
                [xName,      0, 15290, 20131, 49399],
                [dataName,   0, 6164,  6164,  0]
            ]
        });
    }
    else if (numChildren === "three"){
        chartName.load({
            columns: [
                [xName,      0, 15410, 20131, 53057],
                [dataName,   0, 6935,  6935,  0]
            ]
        });
    }
}

/** Loads to a c3.js chart a curve for the 2022 married eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function married_eitc_builder_2022(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,      0, 15410, 26262, 59187],
                [dataName,   0, 6935,  6935,  0]
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,      0, 15290, 26262, 55529],
                [dataName,   0, 6164,  6164,  0]
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,      0, 10979, 26262, 49622],
                [dataName,   0, 3733,  3733,  0]
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,      0, 7320, 15290, 22610],
                [dataName,   0, 560,  560,   0],
			]
    	});
	}
}

/************************* Tax Brackets ****************************************************************************************************/

/** Loads to a c3.js chart a curve of the 2023 tax liability (including standard deduction) of a single taxpayer
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * */
function single_tax_liability_builder_2023(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,    0, 13850, 24850, 58575, 109225, 195950, 245100, 591975],
            [dataName, 0, 0,     1100,  5147,  16290,  37104,  52832,  174238.25],
        ]
    });

}

/** Loads to a c3.js chart a curve of the 2023 tax liability (including standard deduction) of a head of household
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * */
function hoh_tax_liability_builder_2023(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,     0, 20800, 36500, 80650, 116150, 202900, 252050, 598900],
            [dataName,  0, 0,     1570,  6868,  14678,  35498,  51226,  172623.5],
        ]
    });
}

/** Loads to a c3.js chart a curve of the 2023 tax liability (including standard deduction) of a married taxpayer
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * */
function married_tax_liability_builder_2023(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,    0, 27700, 49700, 117150, 218450, 391900, 490200, 721450],
            [dataName, 0, 0,     2200,  10294,  32580,  74208,  105664, 186601.5],
        ]
    });
}

/** Loads to a c3.js chart a curve of the 2022 tax liability (including standard deduction) of a single taxpayer
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * */
function single_tax_liability_builder_2022(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,    0, 12950, 23225,  54725,  102025,  183000],
            [dataName, 0, 0,     1027.5, 4807.5, 15213.5, 37755.5],
        ]
    });

}

/** Loads to a c3.js chart a curve of the 2022 tax liability (including standard deduction) of a head of household
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * */
function hoh_tax_liability_builder_2022(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,     0, 19400, 34050, 75300, 108450, 189450],
            [dataName,  0, 0,     1465,  6415,  13708,  33148],
        ]
    });
}

/** Loads to a c3.js chart a curve of the 2022 tax liability (including standard deduction) of a married taxpayer
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * */
function married_tax_liability_builder_2022(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,    0, 25900, 46400, 109450, 204050],
            [dataName, 0, 0,     2050,  9616,   30428],
        ]
    });
}

/************************* CTC ****************************************************************************************************/

/** Loads to a c3.js chart a curve for the 2023 single CTC for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function single_ctc_builder_2023(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 13850,  24850,  30581, 200000, 320000],
    			[dataName, 0, 0,    1702.5, 4452.5, 6000,  6000,   0],
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 13850,  23040, 200000, 280000],
    			[dataName, 0, 0,    1702.5, 4000,  4000,   0],
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 13167, 13850, 17850, 200000, 240000],
    			[dataName, 0, 0,    1600,  1600,  2000,  2000,   0],
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,    0,],
    			[dataName, 0,],
			]
    	});
	}
}

/** Loads to a c3.js chart a curve for the 2023 HOH CTC for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function hoh_ctc_builder_2023(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 20800, 33820, 200000, 320000],
    			[dataName, 0, 0,    2745,  6000,  6000,   0],
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 20800, 23833,   28800, 200000, 280000],
    			[dataName, 0, 0,    2745,  3503.25, 4000,  4000,   0],
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 13167, 20800, 24800, 200000, 240000],
    			[dataName, 0, 0,    1600,  1600,  2000,  2000,   0],
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,    0,],
    			[dataName, 0,],
			]
    	});
	}
}

/** Loads to a c3.js chart a curve for the 2023 married CTC for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function married_ctc_builder_2023(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 27700, 34500, 39700, 400000, 520000],
    			[dataName, 0, 0,    3780,  5480,  6000,  6000,   0],
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 23833, 27700, 35700, 400000, 480000],
    			[dataName, 0, 0,    3200,  3200,  4000,  4000,   0],
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 13167, 27700, 31700, 400000, 440000],
    			[dataName, 0, 0,    1600,  1600,  2000,  2000,   0 ],
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,    0,],
    			[dataName, 0,],
			]
    	});
	}
}

/************************* HOH Tax Savings ****************************************************************************************************/

/** Loads to a c3.js chart a curve for the 2023 married CTC for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function married_ctc_builder_2023(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 27700, 34500, 39700, 400000, 520000],
    			[dataName, 0, 0,    3780,  5480,  6000,  6000,   0],
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 23833, 27700, 35700, 400000, 480000],
    			[dataName, 0, 0,    3200,  3200,  4000,  4000,   0],
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,    0, 2500, 13167, 27700, 31700, 400000, 440000],
    			[dataName, 0, 0,    1600,  1600,  2000,  2000,   0 ],
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,    0,],
    			[dataName, 0,],
			]
    	});
	}
}

/************************* EITC Marriage Penalties ****************************************************************************************************/

/** Loads to given c3.js chart a curve showing the EITC marriage penalties a person faces given their partner's income and the number of children each of them have
 * @param {string}  - variable name of c3.js chart
 * @param {string}  - variable name of c3.js x variable
 * @param {string}  - variable name of c3.js dependent variable
 * @param {integer} - income of person 2
 * @param {string}  - string representing the number of children person1 has ('none', 'one', 'two', 'three')
 * @param {string}  - string representing the number of children person2 has ('none', 'one', 'two', 'three')
 * */
function eitc_marriage_penalty_value_chart_builder(chart_name, x_name, data_name, p2_income, p1_children, p2_children){
    // Calculate combined number of children
    let combined_children = sum_children(p1_children, p2_children);

    // Person 2 Fixed EITC
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);

    // x values
    let x_vals = eitc_marriage_penalty_x_values(p1_children, combined_children, p2_income);

    // Marriage penalty (y) values
    let y_vals = [];
    for (i in x_vals) {
    	married = eitc_value_2023(x_vals[i] + parseInt(p2_income), 'married', combined_children);
    	combined = p2_eitc + eitc_value_2023(x_vals[i], 'single', p1_children);
        y_vals.push( married - combined );
    }

    // Format arrays
    x_vals.unshift(x_name);
    y_vals.unshift(data_name);

    // Load values to chart
    chart_name.load({ columns: [x_vals, y_vals] });
}

/** Returns formatted x-values for an eitc marriage penalty values chart
 * @param {string}  - string representing the number of children person1 has ('none', 'one', 'two', 'three')
 * @param {string}  - string representing the combined number of children ('none', 'one', 'two', 'three')
 * @param {integer} - income of person 2
 * @return {array of integers} - formatted x-values
 * */
function eitc_marriage_penalty_x_values(person1_children, combined_children, person2_income){
	const zero_child_values   = [0, 7840,  9800,  17640, 70000];
	const one_child_values    = [0, 11750, 21560, 46560, 70000];
	const two_child_values    = [0, 16510, 21560, 52918, 70000];
	const three_child_values  = [0, 16510, 21560, 56838, 70000];

	let combined_none_values  = [7840  - person2_income, 16379 - person2_income, 24210 - person2_income];
	let combined_one_values   = [11750 - person2_income, 28120 - person2_income, 53120 - person2_income];
	let combined_two_values   = [16510 - person2_income, 28120 - person2_income, 59478 - person2_income];
	let combined_three_values = [16510 - person2_income, 28120 - person2_income, 63398 - person2_income];

	// construct variable name based on combined_children
	let married_values = 'combined_' + combined_children + '_values';

    if(person1_children === 'none'){
    	return format_eitc_marriage_penalty_x_values(zero_child_values.concat(eval(married_values)));
    }
    else if(person1_children === 'one'){
    	return format_eitc_marriage_penalty_x_values(one_child_values.concat(eval(married_values)));
    }
    else if(person1_children === 'two'){
    	return format_eitc_marriage_penalty_x_values(two_child_values.concat(eval(married_values)));
    }
    else if(person1_children === 'three'){
    	return format_eitc_marriage_penalty_x_values(three_child_values.concat(eval(married_values)));
    }
}

/** Takes in array of integers, removes duplicates, sorts the array, removes values less than zero, and then returns that array
 * @param  {array of integer}
 * @return {array of integers}
 * */
function format_eitc_marriage_penalty_x_values(x_values){
	// remove any duplicates
	let x_values_set = new Set(x_values);

	// sort in ascending order
	let x_values_sorted = Array.from(x_values_set).sort(function(a,b){return a-b;});

	// remove values below zero
	let positive_values = [];
	for (x of x_values_sorted) {
		if(x >= 0){
			positive_values.push(x);
		}
	}
	return positive_values;
}


/************************* HOH Marriage Penalties ****************************************************************************************************/
/** Loads to given c3.js chart a curve showing the HOH marriage penalties a person faces given their partner's income and the number of children each of them have
 * @param {string}  - variable name of c3.js chart
 * @param {string}  - variable name of c3.js x variable
 * @param {string}  - variable name of c3.js dependent variable
 * @param {integer} - income of person 2
 * */
function hoh_marriage_penalty_value_chart_builder(chart_name, x_name, data_name, p2_income, p1_filing_status, p2_filing_status){
    // Person 2 Fixed Tax Liability
    let p2_tax_liability = tax_liability_2023(p2_filing_status, p2_income);

    // x values
    let x_vals = hoh_marriage_penalty_x_values(p2_income, p1_filing_status, p2_filing_status);

    // Marriage penalty (y) values
    let y_vals = [];
    for (i in x_vals) {
    	married = tax_liability_2023('married', x_vals[i] + parseInt(p2_income));
    	combined = p2_tax_liability + tax_liability_2023(p1_filing_status, x_vals[i]);
        y_vals.push( combined - married );
    }

    // Format arrays
    x_vals.unshift(x_name);
    y_vals.unshift(data_name);

    // Load values to chart
    chart_name.load({ columns: [x_vals, y_vals] });
}

/** Returns formatted x-values for an HOH marriage penalty values chart
 * @param {integer} - income of person 2
 * @return {array of integers} - formatted x-values
 * */
function hoh_marriage_penalty_x_values(person2_income, person1_filing_status, person2_filing_status){
	// const hoh_values    = [0, 20800, 36500, 80650, 116150, 202900, 252050, 598900, 650000];
	// const single_values = [0, 13850, 24850, 58575, 109225, 195950, 245100, 591975, 650000];

	const hoh_values    = [0, 20800, 36500, 80650, 116150, 202900, 252050, 300000];
	const single_values = [0, 13850, 24850, 58575, 109225, 195950, 245100, 300000];

	let married_values  = cut_married_values([27700 - person2_income, 49700 - person2_income, 117150 - person2_income, 218450 - person2_income, 391900 - person2_income, 490200 - person2_income, 721450 - person2_income]);

	if(person1_filing_status === 'single'){
		return format_eitc_marriage_penalty_x_values(single_values.concat(married_values));
	}
	else if(person1_filing_status === 'hoh'){
		return format_eitc_marriage_penalty_x_values(hoh_values.concat(married_values));
	}
}

function cut_married_values(x_values){
	let less_than_300k = [];
	for (x of x_values) {
		if(x < 300000){
			less_than_300k.push(x);
		}
	}
	return less_than_300k;
}


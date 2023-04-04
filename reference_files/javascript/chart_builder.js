/************************* EITC ****************************************************************************************************/
/** Loads to a c3.js chart a curve for the 2023 eitc for a given number of children and filing status
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @param {string} - string representing the filing status ('single', 'hoh', 'married')
 * */
function eitc_builder_2023(chartName, xName, dataName, filingStatus, numChildren){
    if(filingStatus === 'married'){
        married_eitc_builder_2023(chartName, xName, dataName, numChildren);
    }
    else{
        single_eitc_builder_2023(chartName, xName, dataName, numChildren);
    }
}

/** Loads to a c3.js chart a curve for the 2023 single/hoh eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function single_eitc_builder_2023(chartName, xName, dataName, numChildren){
	let xy_pairs = single_eitc_values_2023(numChildren);

    // format
    xy_pairs['x_vals'].unshift(xName);
    xy_pairs['y_vals'].unshift(dataName);

    // load to chart
    chartName.load({ columns: [ xy_pairs['x_vals'], xy_pairs['y_vals'] ] });
}

/** Returns the x and y values for the 2023 single eitc
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {object of two arrays}
 * */
function single_eitc_values_2023(numChildren){
    if(numChildren === 'three'){
        return {
            x_vals : [0, 16510, 21560, 56838],
            y_vals : [0, 7430,  7430,  0],
        }
    }
    else if(numChildren === 'two'){
        return {
            x_vals : [0, 16510, 21560, 52918],
            y_vals : [0, 6604,  6604,  0],
        }
    }
    else if(numChildren === 'one'){
        return {
            x_vals : [0, 11750, 21560, 46560],
            y_vals : [0, 3995,  3995,  0],
        }
    }
    else if(numChildren === 'none'){
        return {
            x_vals : [0, 7840, 9800, 17640],
            y_vals : [0, 600,  600,  0],
        }
    }
}

/** Loads to a c3.js chart a curve for the 2023 married eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function married_eitc_builder_2023(chartName, xName, dataName, numChildren){
    let xy_pairs = married_eitc_values_2023(numChildren);

    // format
    xy_pairs['x_vals'].unshift(xName);
    xy_pairs['y_vals'].unshift(dataName);

    // load to chart
    chartName.load({ columns: [ xy_pairs['x_vals'], xy_pairs['y_vals'] ] });
}

/** Returns the x and y values for the 2023 married eitc
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {object of two arrays}
 * */
function married_eitc_values_2023(numChildren){
    if(numChildren === 'three'){
        return {
            x_vals : [0, 16510, 28120, 63398],
            y_vals : [0, 7430,  7430,  0],
        }
    }
    else if(numChildren === 'two'){
        return {
            x_vals : [0, 16510, 28120, 59478],
            y_vals : [0, 6604,  6604,  0],
        }
    }
    else if(numChildren === 'one'){
        return {
            x_vals : [0, 11750, 28120, 53120],
            y_vals : [0, 3995,  3995,  0],
        }
    }
    else if(numChildren === 'none'){
        return {
            x_vals : [0, 7840, 16370, 24210],
            y_vals : [0, 600,  600,   0],
        }
    }
}

function eitc_values_2023(filingStatus, numChildren){
    if(filingStatus == 'married'){
        return married_eitc_values_2023(numChildren);
    }
    else {
        return single_eitc_values_2023(numChildren);
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

/** Loads to a c3.js chart a curve for the 2019 single/hoh eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function single_eitc_builder_2019(chartName, xName, dataName, numChildren){
    if(numChildren === "none"){
        chartName.load({
            columns: [
                [xName,      0, 6920, 8650, 15570],
                [dataName,   0, 529,  529,  0]
            ]
        });
    }
    else if(numChildren === "one"){
        chartName.load({
            columns: [
                [xName,      0, 10370, 19030, 41094],
                [dataName,   0, 3526,  3526,  0]
            ]
        });
    }
    else if(numChildren === "two"){
        chartName.load({
            columns: [
                [xName,      0, 14570, 19030, 46703],
                [dataName,   0, 5828,  5828,  0]
            ]
        });
    }
    else if (numChildren === "three"){
        chartName.load({
            columns: [
                [xName,      0, 14570, 19030, 50162],
                [dataName,   0, 6557,  6557,  0]
            ]
        });
    }
}

/** Loads to a c3.js chart a curve for the 2019 married eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function married_eitc_builder_2019(chartName, xName, dataName, numChildren){
    if(numChildren === "none"){
        chartName.load({
            columns: [
                [xName,      0, 6920, 14450, 21370],
                [dataName,   0, 529,  529,  0]
            ]
        });
    }
    else if(numChildren === "one"){
        chartName.load({
            columns: [
                [xName,      0, 10370, 24820, 46884],
                [dataName,   0, 3526,  3526,  0]
            ]
        });
    }
    else if(numChildren === "two"){
        chartName.load({
            columns: [
                [xName,      0, 14570, 24820, 52493],
                [dataName,   0, 5828,  5828,  0]
            ]
        });
    }
    else if (numChildren === "three"){
        chartName.load({
            columns: [
                [xName,      0, 14570, 24820, 55952],
                [dataName,   0, 6557,  6557,  0]
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
 * @param {string} - string representing the filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function ctc_builder_2023(chartName, xName, dataName, filingStatus, numChildren){
    if(filingStatus == 'single'){
        single_ctc_builder_2023(chartName, xName, dataName, numChildren);
    }
    else if(filingStatus == 'hoh'){
        hoh_ctc_builder_2023(chartName, xName, dataName, numChildren);
    }
    else if(filingStatus == 'married'){
        married_ctc_builder_2023(chartName, xName, dataName, numChildren);
    }
}

/** Loads to a c3.js chart a curve for the 2023 single CTC for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function single_ctc_builder_2023(chartName, xName, dataName, numChildren){
    let xy_pairs = single_ctc_values_2023(numChildren);

    // format
    xy_pairs['x_vals'].unshift(xName);
    xy_pairs['y_vals'].unshift(dataName);

    // load to chart
    chartName.load({ columns: [ xy_pairs['x_vals'], xy_pairs['y_vals'] ] });
}

/** Returns the x and y values for the 2023 single ctc
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {object of two arrays}
 * */
function single_ctc_values_2023(numChildren){
    if(numChildren === 'three'){
        return {
            x_vals : [0, 2500, 13850,  24850,  30581, 200000, 320000],
            y_vals : [0, 0,    1702.5, 4452.5, 6000,  6000,   0],
        }
    }
    else if(numChildren === 'two'){
        return {
            x_vals : [0, 2500, 13850,  23040, 200000, 280000],
            y_vals : [0, 0,    1702.5, 4000,  4000,   0],
        }
    }
    else if(numChildren === 'one'){
        return {
            x_vals : [0, 2500, 13167, 13850, 17850, 200000, 240000],
            y_vals : [0, 0,    1600,  1600,  2000,  2000,   0],
        }
    }
    else if(numChildren === 'none'){
        return {
            x_vals : [0],
            y_vals : [0],
        }
    }
}

/** Loads to a c3.js chart a curve for the 2023 HOH CTC for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function hoh_ctc_builder_2023(chartName, xName, dataName, numChildren){
    let xy_pairs = hoh_ctc_values_2023(numChildren);

    // format
    xy_pairs['x_vals'].unshift(xName);
    xy_pairs['y_vals'].unshift(dataName);

    // load to chart
    chartName.load({ columns: [ xy_pairs['x_vals'], xy_pairs['y_vals'] ] });
}

/** Returns the x and y values for the 2023 hoh ctc
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {object of two arrays}
 * */
function hoh_ctc_values_2023(numChildren){
    if(numChildren === 'three'){
        return {
            x_vals : [0, 2500, 20800, 33820, 200000, 320000],
            y_vals : [0, 0,    2745,  6000,  6000,   0],
        }
    }
    else if(numChildren === 'two'){
        return {
            x_vals : [0, 2500, 20800, 23833,   28800, 200000, 280000],
            y_vals : [0, 0,    2745,  3503.25, 4000,  4000,   0],
        }
    }
    else if(numChildren === 'one'){
        return {
            x_vals : [0, 2500, 13167, 20800, 24800, 200000, 240000],
            y_vals : [0, 0,    1600,  1600,  2000,  2000,   0],
        }
    }
    else if(numChildren === 'none'){
        return {
            x_vals : [0],
            y_vals : [0],
        }
    }
}

/** Loads to a c3.js chart a curve for the 2023 married CTC for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function married_ctc_builder_2023(chartName, xName, dataName, numChildren){
    let xy_pairs = married_ctc_values_2023(numChildren);

    // format
    xy_pairs['x_vals'].unshift(xName);
    xy_pairs['y_vals'].unshift(dataName);

    // load to chart
    chartName.load({ columns: [ xy_pairs['x_vals'], xy_pairs['y_vals'] ] });
}

/** Returns the x and y values for the 2023 married ctc
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @return {object of two arrays}
 * */
function married_ctc_values_2023(numChildren){
    if(numChildren === 'three'){
        return {
            x_vals : [0, 2500, 27700, 34500, 39700, 400000, 520000],
            y_vals : [0, 0,    3780,  5480,  6000,  6000,   0],
        }
    }
    else if(numChildren === 'two'){
        return {
            x_vals : [0, 2500, 23833, 27700, 35700, 400000, 480000],
            y_vals : [0, 0,    3200,  3200,  4000,  4000,   0],
        }
    }
    else if(numChildren === 'one'){
        return {
            x_vals : [0, 2500, 13167, 27700, 31700, 400000, 440000],
            y_vals : [0, 0,    1600,  1600,  2000,  2000,   0],
        }
    }
    else if(numChildren === 'none'){
        return {
            x_vals : [0],
            y_vals : [0],
        }
    }
}

function ctc_values_2023(filingStatus, numChildren){
    if(filingStatus == 'married'){
        return married_ctc_values_2023(numChildren);
    }
    else if(filingStatus == 'hoh'){
        return hoh_ctc_values_2023(numChildren);
    }
    else if(filingStatus == 'single'){
        return single_ctc_values_2023(numChildren);
    }
}

/************************* SNAP ****************************************************************************************************************/
/** Loads to a c3.js chart a curve for the 2019 married eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function snap_builder_2023(chartName, xName, dataName, filingStatus, numChildren){
    let xy_pairs = snap_values_2023(filingStatus, numChildren);

    // add xName and dataName
    xy_pairs['x_vals'].unshift(xName);
    xy_pairs['y_vals'].unshift(dataName);

    // load to chart
    chartName.load({ columns: [ xy_pairs['x_vals'], xy_pairs['y_vals'] ] });
}

function snap_values_2023(filingStatus, numChildren){
    // SNAP Household Size: One
    const one_snap_x_vals  = [0,    2895, 16944];
    const one_snap_y_vals  = [3372, 3372, 0];

    // SNAP Household Size: Two
    const two_snap_x_vals   = [0,    2895,  23808, 23809];
    const two_snap_y_vals   = [6192, 6192,  1713,  0];

    // SNAP Household Size: Three
    const three_snap_x_vals = [0,    2895,  29940, 29941,];
    const three_snap_y_vals = [8880, 8880,  2250,  0];

    // SNAP Household Size: Four
    const four_snap_x_vals  = [0,     2895,  36084, 36085,];
    const four_snap_y_vals  = [11268, 11268, 3303,  0];

    // SNAP Household Size: Five
    const five_snap_x_vals  = [0,     2895,  42216, 42217,];
    const five_snap_y_vals  = [13392, 13392, 4070,  0];

    // select and return values
    let household_size = calculate_household_size(filingStatus, numChildren);
    return {
        x_vals : eval(household_size + '_snap_x_vals'),
        y_vals : eval(household_size + '_snap_y_vals'),
    }
}

/************************* Summed Benefit Chart **************************************************************************************************/
/** Loads to a c3.js chart a curve for the 2019 married eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the filing status ('single', 'hoh', 'married')
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * @param {object} - key-value pairs indicating whether a benefit should be added (e.g. {ctc: true, eitc: true})
 * */
function build_summed_benefits_chart_2023(chart_name, x_name, data_name, filing_status, num_children, benefits_active){
    // x values
    let x_vals = [];
    if(benefits_active['eitc']){
        x_vals = x_vals.concat(eitc_values_2023(filing_status, num_children)['x_vals']);
    }
    if(benefits_active['ctc']){
        x_vals = x_vals.concat(ctc_values_2023(filing_status, num_children)['x_vals']);
    }
    if(benefits_active['snap']){
        x_vals = x_vals.concat(snap_values_2023(filing_status, num_children)['x_vals']);
    }

    // remove duplicates and sort
    let set = new Set(x_vals);
    x_vals = Array.from(set).sort(function(a,b){return a-b;});

    // y values
    let y_vals = [], new_y_val = 0;
    for(income of x_vals){
        new_y_val = 0;
        if(benefits_active['eitc']){
            new_y_val += eitc_value_2023(income, filing_status, num_children);
        }
        if(benefits_active['ctc']){
            new_y_val += ctc_value_2023(income, filing_status, num_children);
        }
        if(benefits_active['snap']){
            new_y_val += snap_value_2023(income, filing_status, num_children);
        }
        y_vals.push(new_y_val);
    }

    // format
    x_vals.unshift(x_name);
    y_vals.unshift(data_name);

    chart_name.load({ columns: [x_vals, y_vals] });
}

/************************* Marriage Penalties ****************************************************************************************************/
function generic_marriage_penalty_values_chart_builder(chart, x_vals, y_vals, x_max){
    // create regions
    let green_and_red_regions = marriage_penalty_values_region_builder(x_vals, y_vals, x_max);
    array_of_regions_x_vals = green_and_red_regions[0];
    array_of_regions_y_vals = green_and_red_regions[1];

    // x:y pair assignments, chart types, and colors for c3.js chart
    let chart_formatting_data = marriage_penalty_values_formatting_data(array_of_regions_x_vals, array_of_regions_y_vals);
    let xy_pairs    = chart_formatting_data[0];
    let line_types  = chart_formatting_data[1];
    let line_colors = chart_formatting_data[2];

    // hide and show lines
    let hide_and_show_data = marriage_penalty_values_hide_and_show_lines(array_of_regions_y_vals);
    let show_lines = hide_and_show_data[0];
    let hide_lines = hide_and_show_data[1];
    chart.hide(hide_lines);
    chart.show(show_lines);

    // load to chart
    let green_and_red_regions_array = [];
    green_and_red_regions_array.push.apply(green_and_red_regions_array, array_of_regions_x_vals);
    green_and_red_regions_array.push.apply(green_and_red_regions_array, array_of_regions_y_vals);
    chart.load({ 
        xs      : xy_pairs, 
        columns : green_and_red_regions_array,
        types   : line_types,
        colors  : line_colors,
    });
}

/** Returns the green and red regions of the eitc values chart
 * @param {array of floats}  - x values for entire chart
 * @param {array of floats}  - y values for entire chart
 * @param {int} - chart maximum x value
 * @return {array of arrays of floats} - formatted arrays for the c3.js chart
 * */
function marriage_penalty_values_region_builder(x_vals, y_vals, x_max){
    // get current color
    let current_color = '';
    let j = 0;
    while(y_vals[j] == 0){
        j++;
    }
    if(y_vals[j] > 0 ){
        current_color = 'green';
    }
    else{
        current_color = 'red';
    }

    let array_of_x_val_arrays = [], array_of_y_val_arrays = [], current_x_vals = [], current_y_vals = [];
    let green_number = 1, red_number = 1;
    let y_previous = y_vals[0];
    let x_previous = x_vals[0];
    let i = 0;
    while(i < y_vals.length){
        // next point crosses x-axis: set point at root and switch color
        if(y_previous > 0 && y_vals[i] < 0 || y_previous < 0 && y_vals[i] > 0){
            // add root to current arrays
            root = linear_root(x_previous, y_previous, x_vals[i], y_vals[i]);
            current_x_vals.push(root);
            current_y_vals.push(0);

            // format arrays & update data name number
            // since we cross the x-axis, current_color must flip
            if(current_color == 'green'){
                current_x_vals.unshift('x_green' + green_number.toString() );
                current_y_vals.unshift('y_green' + green_number.toString() );
                green_number++;
                current_color = 'red';
            }
            else {
                current_x_vals.unshift('x_red' + red_number.toString() );
                current_y_vals.unshift('y_red' + red_number.toString() );
                red_number++;
                current_color = 'green';
            }

            // add finished arrays to their respective array of columns
            array_of_x_val_arrays.push(current_x_vals);
            array_of_y_val_arrays.push(current_y_vals);

            // restart arrays
            current_x_vals = [root];
            current_y_vals = [0];

            // for loop condition
            y_previous = y_vals[i];
            x_previous = x_vals[i];
        }
        // last value
        else if(x_vals[i] == x_max){
            // add last point to current arrays
            current_x_vals.push(x_vals[i]);
            current_y_vals.push(y_vals[i]);

            // format arrays
            if(!( String(current_x_vals[0]).includes('red') || String(current_x_vals[0]).includes('green') )){
                if(current_color === 'red'){
                    current_x_vals.unshift('x_red' + red_number.toString() );
                    current_y_vals.unshift('y_red' + red_number.toString() );
                }
                else {
                    current_x_vals.unshift('x_green' + green_number.toString() );
                    current_y_vals.unshift('y_green' + green_number.toString() );
                }
            }

            // add finished arrays to their respective array of columns
            array_of_x_val_arrays.push(current_x_vals);
            array_of_y_val_arrays.push(current_y_vals);

            // ends loop
            i++;
        }
        // next point remains above/below x-axis: simply add point
        else {
            current_x_vals.push(x_vals[i]);
            current_y_vals.push(y_vals[i]);
            y_previous = y_vals[i];
            x_previous = x_vals[i];
            i++;
        }       
    }

    return [array_of_x_val_arrays, array_of_y_val_arrays];
}

/** Takes in array of integers, removes duplicates, sorts the array, removes values less than zero, and then returns that array
 * @param  {array of integer}
 * @return {array of integers}
 * */
function format_marriage_penalty_x_values(x_values){
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

/** Returns formatting data for the c3.js eitc marriage penalties values chart
 * @param  {array of arrays of floats} - formatted x-value arrays of red & green regions (e.g. [ ['x_green1', x1, x2, x3], ['x_green2', x3, x4, x5] ])
 * @param  {array of arrays of floats} - formatted y-value arrays of red & green regions (e.g. [ ['y_green1', y1, y2, y3], ['y_green2', y3, y4, y5] ])
 * @return {array of three objects}
 *      0. xy_pairs    : object of key-value pairs showing which data names pair with which x names (e.g. 'y_green1' : 'x_green1')
 *      1. line_types  : object of key-value pairs specifying that each line is an area curve (e.g. 'y_green1' : 'area')
 *      2. line_colors : object of key-value pairs specifying the color of each curve (e.g. 'y_green1' : '#36D903', 'y_red1' : '#eb3734')
 * */
function marriage_penalty_values_formatting_data(array_of_x_val_arrays, array_of_y_val_arrays){
    // add x:y pair assignments, chart types, and colors to c3.js chart object
    let xy_pairs = new Object();
    let line_types = new Object;
    let line_colors = new Object;
    for(i in array_of_x_val_arrays){
        // x:y pairs
        current_x = array_of_x_val_arrays[i][0];
        current_y = array_of_y_val_arrays[i][0];
        xy_pairs[current_y] = current_x;

        // chart type
        line_types[current_y] = 'area';

        // chart color
        if(current_y.includes('green')){
            line_colors[current_y] = '#36D903';
        }
        else{
            line_colors[current_y] = '#eb3734';
        }
    }
    return [xy_pairs, line_types, line_colors]
}

/** Returns the names of the lines that should be hidden and the names of the lines that should be shown
 * @param  {array of arrays of floats} - formatted y-value arrays of red & green regions (e.g. [ ['y_green1', y1, y2, y3], ['y_green2', y3, y4, y5] ])
 * @return {array of two arrays of strings}
 *      0. show_lines : array of lines that should be shown on the chart (e.g. ['y_green1', 'y_red1'])
 *      1. hide_lines : array of lines that should be hidden on the chart (e.g. ['y_green2', 'y_red2',...] )
 * */
function marriage_penalty_values_hide_and_show_lines(array_of_y_val_arrays){
    const all_lines = ['y_red1', 'y_red2', 'y_red3', 'y_red4', 'y_red5', 'y_red6', 'y_green1', 'y_green2', 'y_green3', 'y_green4', 'y_green5', 'y_green6'];
    let show_lines  = [];
    let hide_lines  = [];
    for(y of array_of_y_val_arrays){
        show_lines.push(y[0]);
    }
    for(line of all_lines){
        if(show_lines.includes(line)){
            // do nothing
        }
        else{
            hide_lines.push(line);
        }
    }
    return [show_lines, hide_lines];
}

/** Returns the root of a linear equation given two points on the line (x_previous, y_previous), (x_current, y_current)
 * @param {integer} - x coordinate of first point
 * @param {integer} - y coordinate of first point
 * @param {integer} - x coordinate of second point
 * @param {integer} - y coordinate of second point
 * */
function linear_root(x_previous, y_previous, x_current, y_current){
    slope = (y_current - y_previous) / (x_current - x_previous);
    return x_previous - (y_previous / slope);
}


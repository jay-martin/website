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

/************************* Marriage Penalties ****************************************************************************************************/
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

/** Returns the green and red regions of the eitc values chart
 * @param {array of floats}  - x values for entire chart
 * @param {array of floats}  - y values for entire chart
 * @return {array of arrays of floats} - formatted arrays for the c3.js chart
 * */
function marriage_penalty_values_region_builder(x_vals, y_vals, x_max){
    // get current color
    let current_color = '';
    j = 0;
    while(y_vals[j] == 0){
        if(y_vals[j] > 0){
            current_color = 'green';
        }
        else{
            current_color = 'red';
        }
        j++;
    }

    let array_of_x_val_arrays = [];
    let array_of_y_val_arrays = [];
    let current_x_vals = [];
    let current_y_vals = [];
    let y_previous = y_vals[0];
    let x_previous = x_vals[0];
    let green_number = 1;
    let red_number = 1;
    let i = 0;
    while(i < y_vals.length){
        if(y_previous > 0 && y_vals[i] < 0 || y_previous < 0 && y_vals[i] > 0){
            // add last point to current arrays
            root = linear_root(x_previous, y_previous, x_vals[i], y_vals[i]);
            current_x_vals.push(root);
            current_y_vals.push(0);

            // format arrays & update data name number
            if(y_previous > 0){
                current_x_vals.unshift('x_green' + green_number.toString() );
                current_y_vals.unshift('y_green' + green_number.toString() );
                current_color = 'red';
                green_number++;
            }
            else {
                current_x_vals.unshift('x_red' + red_number.toString() );
                current_y_vals.unshift('y_red' + red_number.toString() );
                current_color = 'green';
                red_number++;
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
        else if(x_vals[i] == x_max){
            // add last point to current arrays
            current_x_vals.push(x_vals[i]);
            current_y_vals.push(y_vals[i]);

            // format arrays
            if(current_color === 'red'){
                current_x_vals.unshift('x_red' + red_number.toString() );
                current_y_vals.unshift('y_red' + red_number.toString() );
            }
            else {
                current_x_vals.unshift('x_green' + green_number.toString() );
                current_y_vals.unshift('y_green' + green_number.toString() );
            }

            // add finished arrays to their respective array of columns
            array_of_x_val_arrays.push(current_x_vals);
            array_of_y_val_arrays.push(current_y_vals);

            // ends loop
            i++;
        }
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
    const all_lines = ['y_red1', 'y_red2', 'y_red3', 'y_red4', 'y_green1', 'y_green2', 'y_green3', 'y_green4'];
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


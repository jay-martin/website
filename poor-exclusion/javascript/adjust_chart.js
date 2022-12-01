/******************************************************************************************
 * This file controls adjustments to made to the chart:
 * Adjusting axes
 * ****************************************************************************************/

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
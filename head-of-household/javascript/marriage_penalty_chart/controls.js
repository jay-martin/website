/*
box_height = '0px'
$(document).ready(function(){
	partial_box_height = $('#marriage_penalty_individual').height() + 40;
	box_height = $('#marriage_penalties_center_explanation_box').height();
	//partial_box_height = box_height * .5;
	$('#marriage_penalties_center_explanation_box').css('height', box_height);
});
*/

/************************* Switch chart ***************************************/
function switch_marriage_penalty_chart_type(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		// Adjust income sliders
		marriage_penalty_person1_income.max = '100000';
		marriage_penalty_person2_income.max = '100000';

		// Outputs
		marriage_penalty_outputs();

		// axis
		marriagePenaltyChart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000];
		marriagePenaltyChart.internal.config.axis_y_max = 30000;
		marriagePenaltyChart.axis.labels({y: 'Tax Liability'});

		// legend
		marriagePenaltyChart.legend.show(['person1', 'person2', 'person2_dashed', 'married']);
		marriagePenaltyChart.legend.hide(['values']);

		// curves
		marriagePenaltyChart.hide(['values', 'values_point']);
		marriagePenaltyChart.show(['person1', 'person2', 'person2_dashed', 'married', 'combined_tax', 'penalty', 'married_tax', 'bonus', 'point1', 'point2', 'point_married']);
		marriage_penalty_intuitive_modify_income();
		marriage_penalty_intuitive_adjust_person1();
		marriage_penalty_intuitive_adjust_person2();

	}
	else if(marriage_penalty_chart_type.value === 'values'){
		// Adjust income sliders
		marriage_penalty_person1_income.max = '200000';
		marriage_penalty_person2_income.max = '200000';

		// Outputs
		marriage_penalty_outputs();

		// y & x grids
		marriagePenaltyChart.ygrids([ {value: 0,} ]);
		marriagePenaltyChart.xgrids([ {value: marriage_penalty_person1_income.value, text: 'Your Income'} ]);

		// axis
		marriagePenaltyChart.internal.config.axis_y_max = undefined;
		marriagePenaltyChart.internal.config.axis_y_tick_values = [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
		marriagePenaltyChart.internal.config.axis_y_padding = 10;
		marriagePenaltyChart.axis.labels({y: 'Marriage Penalty/Bonus'});

		// legend
		marriagePenaltyChart.legend.hide(['person1', 'person2', 'person2_dashed', 'married']);
		marriagePenaltyChart.legend.show(['values']);

		// curves
		marriagePenaltyChart.hide(['person1', 'person2', 'person2_dashed', 'married', 'combined_tax', 'penalty', 'married_tax', 'bonus', 'point1', 'point2', 'point_married']);
		marriagePenaltyChart.show(['values', 'values_point']);
		marriage_penalties_values_modify_income();
		marriage_penalties_values_adjust_chart();
	}
}
/* 
function switch_marriage_penalty_chart_type(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		// set height
		$('#marriage_penalties_center_explanation_box').css('transition', 'height 0s');
		$('#marriage_penalties_center_explanation_box').css('height', partial_box_height);

		// Clear text
		document.getElementById('marriage_penalty_individual').innerHTML = '';	

		// Adjust income sliders
		marriage_penalty_person1_income.max = '100000';
		marriage_penalty_person2_income.max = '100000';

		// Resize center explanation box
		setTimeout(function(){
			$('#marriage_penalties_center_explanation_box').css('transition', 'height 1s ease');
			$('#marriage_penalties_center_explanation_box').css('height', box_height);
		});

		// Outputs
		setTimeout(function(){
			document.getElementById('marriage_penalty_married').style.display = 'block';
			document.getElementById('marriage_penalty_bonus').style.display = 'block';
			marriage_penalty_intuitive_outputs();

			// reset height to auto so that it automatically resizes with window resizes
			$('#marriage_penalties_center_explanation_box').css('transition', 'height 0s');
			$('#marriage_penalties_center_explanation_box').css('height', 'auto');
		}, 1000);

		setTimeout(function(){
			// hide values curves
			marriagePenaltyChart.hide(['values', 'values_point']);
		}, 1000);

		setTimeout(function(){
			// axis
			marriagePenaltyChart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000];
			marriagePenaltyChart.internal.config.axis_y_max = 30000;
			marriagePenaltyChart.axis.labels({y: 'Tax Liability'});
			// legend
			marriagePenaltyChart.legend.show(['person1', 'person2', 'person2_dashed', 'married']);
			marriagePenaltyChart.legend.hide(['values']);
			// curves
			marriagePenaltyChart.show(['person1', 'person2', 'person2_dashed', 'married', 'combined_tax', 'penalty', 'married_tax', 'bonus', 'point1', 'point2', 'point_married']);
			marriage_penalty_intuitive_modify_income();
		}, 1400);

		setTimeout(function(){
			marriage_penalty_intuitive_adjust_person1();
			marriage_penalty_intuitive_adjust_person2();
		}, 1800);

	}
	else if(marriage_penalty_chart_type.value === 'values'){
		// set height
		$('#marriage_penalties_center_explanation_box').css('transition', 'height 0s');
		$('#marriage_penalties_center_explanation_box').css('height', box_height);

		// Clear text
		document.getElementById('marriage_penalty_individual').innerHTML = '';		
		document.getElementById('marriage_penalty_married').style.display = 'none';
		document.getElementById('marriage_penalty_bonus').style.display = 'none';

		// Adjust income sliders
		marriage_penalty_person1_income.max = '200000';
		marriage_penalty_person2_income.max = '200000';

		// Resize center explanation box
		setTimeout(function(){
			$('#marriage_penalties_center_explanation_box').css('transition', 'height 1s ease');
			$('#marriage_penalties_center_explanation_box').css('height', partial_box_height);
		});

		// Outputs
		setTimeout(function(){
			marriage_penalty_values_outputs();
			document.getElementById('marriage_penalty_married').style.display = 'none';
			document.getElementById('marriage_penalty_bonus').style.display = 'none';

			// reset height to auto so that it automatically resizes with window resizes
			$('#marriage_penalties_center_explanation_box').css('transition', 'height 0s');
			$('#marriage_penalties_center_explanation_box').css('height', 'auto');
		}, 1000);

		setTimeout(function(){
			// y & x grids
			marriagePenaltyChart.ygrids([ {value: 0,} ]);
			marriagePenaltyChart.xgrids([ {value: marriage_penalty_person1_income.value, text: 'Your Income'} ]);

			// hide intuitive curves
			marriagePenaltyChart.hide(['person1', 'person2', 'person2_dashed', 'married', 'combined_tax', 'penalty', 'married_tax', 'bonus', 'point1', 'point2', 'point_married']);
		}, 1000);

		setTimeout(function(){
			// axis
			marriagePenaltyChart.internal.config.axis_y_max = undefined;
			marriagePenaltyChart.internal.config.axis_y_tick_values = [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
			marriagePenaltyChart.internal.config.axis_y_padding = 10;
			marriagePenaltyChart.axis.labels({y: 'Marriage Penalty/Bonus'});

			// legend
			marriagePenaltyChart.legend.hide(['person1', 'person2', 'person2_dashed', 'married']);
			marriagePenaltyChart.legend.show(['values']);

			// curves
			marriagePenaltyChart.show(['values', 'values_point']);
			marriage_penalties_values_modify_income();
			marriage_penalties_values_adjust_chart();
		}, 1400);
	}
}
*/

/************************* Filing status adjustments **************************/
function marriage_penalty_adjust_person1_filing_status(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_adjust_person1();
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_adjust_chart();
		marriage_penalties_values_modify_income();
	}
}

function marriage_penalty_adjust_person2_filing_status(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_adjust_person2();
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_adjust_chart();
		marriage_penalties_values_modify_income();
	}
}

/************************* Income adjustments *********************************/
function marriage_penalty_modify_person1_income(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_modify_income();
	}
}

function marriage_penalty_modify_person2_income(){
	if(marriage_penalty_chart_type.value === 'intuitive'){
		marriage_penalty_intuitive_modify_income();
	}
	else if(marriage_penalty_chart_type.value === 'values'){
		marriage_penalties_values_adjust_chart();
		marriage_penalties_values_modify_income();
	}
}
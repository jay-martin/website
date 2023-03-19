function complexity_hide_points_and_x_grid(){
	let is_checked = complexity_hide_income_switch.checked;
	let income     = complexity_income.value;

	if(is_checked){
		complexity_chart.xgrids([]);
		complexity_chart.hide(['point1S', 'point1H', 'point1M', 'point2S', 'point2H', 'point2M', 'point3S', 'point3H', 'point3M', 'point4S', 'point4H', 'point4M',]);
	}
	else {
		complexity_chart.xgrids([ {value: income , text: 'Your Income'} ]);
		complexity_chart.show(['point1S', 'point1H', 'point1M', 'point2S', 'point2H', 'point2M', 'point3S', 'point3H', 'point3M', 'point4S', 'point4H', 'point4M',]);
	}
}

function exclusion_hide_points_and_x_grid(){
	let is_checked = exclusion_hide_income_switch.checked;
	let income     = exclusion_income.value;

	if(is_checked){
		exclusion_chart.hide(['difference_line']);
	}
	else {
		exclusion_chart.show(['difference_line']);
	}
}
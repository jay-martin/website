function reformed_eitc_marriage_penalty_modify_income(chart_name){
	let chart = eval(chart_name + '_chart');

	// Incomes
    let p1_income       = eval(chart_name + '_person1_income').value;
    let p2_income       = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    // EITC values
    let p1_eitc       = reformed_eitc_value(p1_income, 'single');
    let p2_eitc       = reformed_eitc_value(p2_income, 'single');
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc  = reformed_eitc_value(combined_income, 'married');

    /* Move xgrids */
    if(p1_income == 0){
        chart.xgrids([{value: p1_income, text:'Your income'},{value: combined_income, text:"Combined income / Person 2 income"}]);
    }
    else if(p2_income == 0){
        chart.xgrids([{value: combined_income, text:"Combined income / Person 1 income"}]);
    }
    else{
        chart.xgrids([{value: p1_income, text:'Your income'},{value: p2_income, text:"Your partner's income"},{value: combined_income, text:"Combined income"}]);
    }

    // Move points
    chart.load({columns: [ ['x_point1', p1_income] , ['point1', p1_eitc], ['x_point2', p2_income], ['point2', p2_eitc], ['x_point_married', combined_income], ['point_married', married_eitc], ] });

    // Move stacked eitc value curves
    penalty = combined_eitc - married_eitc;
    if(penalty == 0){ //exact values sometimes does not equal zero because income threshold values are rounded to the nearest whole number (I've put a $20 buffer but the actual discrepancy is a small fraction of a dollar)
        chart.hide(['combined_eitc', 'bonus_eitc', 'married_eitc', 'penalty_eitc']);
        chart.ygrids([{value: 0}, {value: married_eitc, text: "Combined Individual EITC's/Married EITC"}]);
    }
    else if(penalty > 0){
        chart.ygrids([{value: 0}, {value: combined_eitc, text: "Combined individual EITC's"}, {value: married_eitc, text: "Your married EITC", y_position: 'below'}]);
        chart.show(['married_eitc',  'penalty_eitc']);
        chart.hide(['combined_eitc', 'bonus_eitc']);
        chart.load({
            columns: [
                ['x_horizontal',  0,           120000],
                ['married_eitc',  married_eitc, married_eitc],
                ['penalty_eitc',  penalty,     penalty],
            ]
        });
    }
    else{
        chart.ygrids([{value: 0}, {value: married_eitc, text: "Your married EITC"}, {value: combined_eitc, text: "Combined individual EITC's", y_position: 'below'}]);
        chart.hide(['married_eitc',  'penalty_eitc']);
        chart.show(['combined_eitc', 'bonus_eitc']);
        chart.load({
            columns: [
                ['x_horizontal',  0, 120000],
                ['combined_eitc', combined_eitc, combined_eitc],
                ['bonus_eitc',    penalty * -1,  penalty * -1],
            ]
        });
    }

    eitc_marriage_penalty_outputs(chart_name);
}

function reformed_eitc_value(income, filing_status){
	if(filing_status === 'married'){
		if(income < 20000){
			return .3 * income;
		}
		else if(income <= 50000){
			return 6000;
		}
		else if(income < 75000){
			return 6000 - .24 * (income - 50000);
		}
		else{
			return 0;
		}
	}
	else{
		if(income < 10000){
			return .3 * income;
		}
		else if(income <= 25000){
			return 3000;
		}
		else if(income < 37500){
			return 3000 - .24 * (income - 25000);
		}
		else{
			return 0;
		}
	}
} 



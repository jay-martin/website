function eitc_reform_adjust_married(){
	if(eitc_reform_type.value === 'default'){
		eitcReform.load({
    		columns: [
    			['x3',      0, 20000, 30000, 60000],
	            ['married', 0, 6000,  6000,  0],
			]
    	});
    	eitcReform.axis.max({x: 60000});
	}
	else if(eitc_reform_type.value === 'slope'){
		eitcReform.load({
    		columns: [
    			['x3',      0, 10000, 30000, 60000],
	            ['married', 0, 6000,  6000,  0],
			]
    	})
    	eitcReform.axis.max({x: 60000});
	}
	else if(eitc_reform_type.value === 'value'){
		eitcReform.load({
    		columns: [
    			['x3',      0, 26667, 30000, 70000],
	            ['married', 0, 8000,  8000,  0],
			]
    	});
    	eitcReform.axis.max({x: 70000});
	}
	else if(eitc_reform_type.value === 'both'){
		eitcReform.load({
    		columns: [
    			['x3',      0, 10000, 30000, 70000],
	            ['married', 0, 8000,  8000,  0],
			]
    	});
    	eitcReform.axis.max({x: 70000});
	}
}

function eitc_reform_modify_income(){
	p1Income = eitc_reform_person1_income.value;
	p2Income = eitc_reform_person2_income.value;
	combinedIncome = parseInt(p1Income) + parseInt(p2Income);

	// EITC Values
	p1EITC = reformed_eitc_values_single(p1Income);
	p2EITC = reformed_eitc_values_single(p2Income);
	combinedEITC = p1EITC + p2EITC;
	marriedEITC = reformed_eitc_values_married(combinedIncome);

	// Move x-grids
	eitcReform.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);

    // Move points
    eitcReform.load({columns: [ ['x_point1', p1Income] , ['point1', p1EITC], ['x_point2', p2Income], ['point2', p2EITC], ['x_point_married', combinedIncome], ['point_married', marriedEITC] ] });

    // Move y-grids & bonus region
    bonus = marriedEITC - combinedEITC;
    if(bonus > 0){
    	eitcReform.show(['combined', 'bonus']);
    	eitcReform.ygrids([{value: 0}, {value: marriedEITC, text: "Married EITC"}, {value: combinedEITC, text: "Combined Individual EITC's"}]);
    	eitcReform.load({
    		columns: [
    			['x_horizontal', 0,            80000],
    			['combined',     combinedEITC, combinedEITC],
    			['bonus',        bonus,        bonus],
			]
    	})
    }
    else{
    	eitcReform.hide(['combined', 'bonus']);
    	eitcReform.ygrids([{value: 0}, {value: marriedEITC, text: "Combined Individual EITC's/Married EITC"}]);
    }

}

function reformed_eitc_values_single(income){
	if(income < 10000){
		return .3 * income;
	}
	else if(income >= 10000 && income < 15000){
		return 3000;
	}
	else if(income >= 15000 && income < 30000){
		return 3000 - .2 * (income - 15000);
	}
	else{
		return 0;
	}
}

function reformed_eitc_values_married(income){
	if(eitc_reform_type.value === 'default'){
		if(income < 20000){
			return .3 * income;
		}
		else if(income >= 20000 && income < 30000){
			return 6000;
		}
		else if(income >= 30000 && income < 60000){
			return 6000 - .2 * (income - 30000);
		}
		else{
			return 0;
		}
	}
	else if(eitc_reform_type.value === 'slope'){
		if(income < 10000){
			return .6 * income;
		}
		else if(income >= 10000 && income < 30000){
			return 6000;
		}
		else if(income >= 30000 && income < 70000){
			return 6000 - .2 * (income - 30000);
		}
		else{
			return 0;
		}
	}
	else if(eitc_reform_type.value === 'value'){
		if(income < 26667){
			return .3 * income;
		}
		else if(income >= 26667 && income < 30000){
			return 8000;
		}
		else if(income >= 30000 && income < 60000){
			return 8000 - .2 * (income - 30000);
		}
		else{
			return 0;
		}
	}
	else if(eitc_reform_type.value === 'both'){
		if(income < 10000){
			return .6 * income;
		}
		else if(income >= 10000 && income < 40000){
			return 8000;
		}
		else if(income >= 30000 && income < 70000){
			return 8000 - .2 * (income - 30000);
		}
		else{
			return 0;
		}
	}

}

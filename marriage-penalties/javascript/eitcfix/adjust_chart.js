function eitc_reform_adjust_married(){
	eitcReform.load({
		columns: [
			['x3',      0, 20000, 30000, 60000],
            ['married', 0, 6000,  6000,  0],
		]
	});
	eitcReform.axis.max({x: 60000});
	/*
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
	*/
}

function eitc_reform_modify_income(){
	p1Income = eitc_reform_person1_income.value;
	p2Income = eitc_reform_person2_income.value;
	combinedIncome = parseInt(p1Income) + parseInt(p2Income);

	// Reformed EITC Values
	p1EITC = reformed_eitc_values_single(p1Income);
	p2EITC = reformed_eitc_values_single(p2Income);
	combinedEITC = p1EITC + p2EITC;
	marriedEITC = reformed_eitc_values_married(combinedIncome);

	// Existing EITC Values
    p1_existing_eitc = existing_eitc_value(p1Income, 'single', 'one');
    p2_existing_eitc = existing_eitc_value(p2Income, 'single', 'one');
    combined_existing_eitc = p1_existing_eitc + p2_existing_eitc;
    married_existing_eitc = existing_eitc_value(combinedIncome, 'married', 'two');

	// Move x-grids
	eitcReform.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);
	existingEITC.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);

    // Move points
    eitcReform.load({columns: [   ['x_point1', p1Income] , ['point1', p1EITC], ['x_point2', p2Income], ['point2', p2EITC], ['x_point_married', combinedIncome], ['point_married', marriedEITC] ] });
    existingEITC.load({columns: [ ['x_point1', p1Income] , ['point1', p1_existing_eitc], ['x_point2', p2Income], ['point2', p2_existing_eitc], ['x_point_married', combinedIncome], ['point_married', married_existing_eitc] ] });

    // Refomred EITC: move y-grids & bonus region
    bonus = marriedEITC - combinedEITC;
    if(bonus > 0){
    	eitcReform.show(['combined', 'bonus']);
    	eitcReform.hide(['married_value', 'penalty']);
    	eitcReform.ygrids([{value: 0}, {value: marriedEITC, text: "Married EITC"}, {value: combinedEITC, text: "Combined Individual EITC's"}]);
    	eitcReform.load({
    		columns: [
    			['x_horizontal', 0,            100000],
    			['combined',     combinedEITC, combinedEITC],
    			['bonus',        bonus,        bonus],
			]
    	});
    }
    else if(bonus == 0){
    	eitcReform.hide(['combined', 'bonus', 'married_value', 'penalty']);
    	eitcReform.ygrids([{value: 0}, {value: marriedEITC, text: "Combined Individual EITC's/Married EITC"}]);
    }
    else{
    	eitcReform.show(['married_value', 'penalty']);
    	eitcReform.hide(['combined', 'bonus']);
    	eitcReform.load({
    		columns: [
    			['x_horizontal',  0,           100000],
    			['married_value', marriedEITC, marriedEITC],
    			['penalty',       bonus * -1,  bonus * -1],
			]
    	})
    	eitcReform.ygrids([{value: 0}, {value: marriedEITC, text: "Married EITC"}, {value: combinedEITC, text: "Combined Individual EITC's"}]);
    }

    // Existing EITC: move y-grids & bonus region
    existing_penalty = combined_existing_eitc - married_existing_eitc;
    if(existing_penalty > 0){
    	existingEITC.show(['married_value', 'penalty']);
    	existingEITC.hide(['combined', 'bonus']);
    	existingEITC.ygrids([ {value: married_existing_eitc, text: 'Married EITC'}, {value: combined_existing_eitc, text: "Combined Individual EITC's"} ]);
    	existingEITC.load({
    		columns: [
    			['x_horizontal',  0,                     100000],
    			['married_value', married_existing_eitc, married_existing_eitc],
    			['penalty',       existing_penalty,      existing_penalty],
			]
    	});
    }
    else{
    	existingEITC.show(['combined', 'bonus']);
    	existingEITC.hide(['married_value', 'penalty']);
    	existingEITC.ygrids([ {value: married_existing_eitc, text: 'Married EITC'}, {value: combined_existing_eitc, text: "Combined Individual EITC's"} ]);
    	existingEITC.load({
    		columns: [
    			['x_horizontal', 0,                      100000],
    			['combined',     combined_existing_eitc, combined_existing_eitc],
    			['bonus',        existing_penalty * -1,  existing_penalty * -1],
			]
    	});
    }

    // Adjust axis if needed
    eitc_reform_adjust_x_axis();
}

function eitc_reform_adjust_x_axis(){
	combinedIncome = parseInt(eitc_reform_person1_income.value) + parseInt(eitc_reform_person2_income.value);
	
	if(combinedIncome > 60000){
		eitcReform.axis.max({x: 100000});
		existingEITC.axis.max({x: 100000});
	}
	else{
		eitcReform.axis.max({x: 60000});
		existingEITC.axis.max({x: 60000});
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
	/* 
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
	*/
}

function existing_eitc_value(income, filingStatus, numChildren){
	benefit = 0
	if(filingStatus==="married"){
		if(numChildren === 'three'){
			if(income < 15410){benefit = .45 * income;}
			else if(income >= 15410 && income <= 26262){benefit = 6935;}
			else if(income >26262 && income <59187){benefit = 12464.78 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'two'){
			if(income < 15290){benefit = .4 * income;}
			else if(income >= 15290 && income <= 26262){benefit = 6164;}
			else if(income >26262 && income <55529){benefit = 11694.4 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'one'){
			if(income < 10979){benefit = .34 * income;}
			else if(income >= 10979 && income <= 26262){benefit = 3733;}
			else if(income >26262 && income <49622){benefit = 7939.6 - income*.1598;}
			else{benefit = 0;}
		}
		else{
			if(income < 7320){benefit = .0765 * income;}
			else if(income >= 7320 && income <= 15290){benefit = 560;}
			else if(income >15290 && income <22610){benefit = 1730 - income*.0765;}
			else{benefit = 0;}
		}
	}
	if(filingStatus==="single" || filingStatus==="hoh"){
		if(numChildren === 'three'){
			if(income < 15410){benefit = .45 * income;}
			else if(income >= 15410 && income <= 20131){benefit = 6935;}
			else if(income >20131 && income <53057){benefit = 11173.8 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'two'){
			if(income < 15290){benefit = .4 * income;}
			else if(income >= 15290 && income <= 20131){benefit = 6164;}
			else if(income >20131 && income <49399){benefit = 10403.4 - income*.2106;}
			else{benefit = 0;}
		}
		else if(numChildren === 'one'){
			if(income < 10979){benefit = .34 * income;}
			else if(income >= 10979 && income <= 20131){benefit = 3733;}
			else if(income >20131 && income <43492){benefit = 6950 - income*.1598;}
			else{benefit = 0;}
		}
		else{
			if(income < 7320){benefit = .0765 * income;}
			else if(income >= 7320 && income <= 9160){benefit = 560;}
			else if(income >9160 && income <16480){benefit = 1260.7 - income*.0765;}
			else{benefit = 0;}
		}
	}
	return benefit;
}

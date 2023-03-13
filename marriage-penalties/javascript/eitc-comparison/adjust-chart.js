function eitc_reform_adjust_existing_person1(){
	let person1_num_children = eitc_fix_person1_numchildren.value;
	let person2_num_children = eitc_fix_person2_numchildren.value;
	let combined_children = sum_children(person1_num_children, person2_num_children);

	single_eitc_builder_2023(existingEITC, 'x1', 'person1', person1_num_children);
	married_eitc_builder_2023(existingEITC, 'x3', 'married', combined_children);

	setTimeout(function () {
		eitc_reform_modify_income();
		eitc_reform_outputs();
	}, 400);
}

function eitc_reform_adjust_existing_person2(){
	let person1_num_children = eitc_fix_person1_numchildren.value;
	let person2_num_children = eitc_fix_person2_numchildren.value;
	let combined_children = sum_children(person1_num_children, person2_num_children);

	single_eitc_builder_2023(existingEITC, 'x2', 'person2', person2_num_children);
	married_eitc_builder_2023(existingEITC, 'x3', 'married', combined_children);

	setTimeout(function () {
		eitc_reform_modify_income();
		eitc_reform_outputs();
	}, 400);
}

function eitc_reform_modify_income(){
	// Variables for income
	let p1Income = eitc_reform_person1_income.value;
	let p2Income = eitc_reform_person2_income.value;
	let combinedIncome = parseInt(p1Income) + parseInt(p2Income);

	// Variables for number of children
	let person1_num_children = eitc_fix_person1_numchildren.value;
	let person2_num_children = eitc_fix_person2_numchildren.value;
	let combined_children    = sum_children(person1_num_children, person2_num_children);

	// Reformed EITC Values
	let p1EITC = eitc_value_2023(p1Income, 'single', person1_num_children);
	let p2EITC = eitc_value_2023(p2Income, 'single', person2_num_children);
	let combinedEITC = p1EITC + p2EITC;
	let marriedEITC = reformed_eitc_values_married(combinedIncome);

	// Existing EITC Values
    let p1_existing_eitc = eitc_value_2023(p1Income, 'single', person1_num_children);
    let p2_existing_eitc = eitc_value_2023(p2Income, 'single', person2_num_children);
    let combined_existing_eitc = p1_existing_eitc + p2_existing_eitc;
    let married_existing_eitc = eitc_value_2023(combinedIncome, 'married', combined_children);

	// Move x-grids
	eitcReform.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);
	existingEITC.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);

    // Move points
    eitcReform.load({columns: [   ['x_point1', p1Income] , ['point1', p1EITC], ['x_point2', p2Income], ['point2', p2EITC], ['x_point_married', combinedIncome], ['point_married', marriedEITC] ] });
    existingEITC.load({columns: [ ['x_point1', p1Income] , ['point1', p1_existing_eitc], ['x_point2', p2Income], ['point2', p2_existing_eitc], ['x_point_married', combinedIncome], ['point_married', married_existing_eitc] ] });

    // Reformed EITC: move y-grids & bonus region
    let bonus = marriedEITC - combinedEITC;
    if(bonus < 10 && bonus > -10){ //exact values sometimes does not equal zero because income threshold values are rounded to the nearest whole number (I've put a $20 buffer but the actual discrepancy is a small fraction of a dollar)
    	eitcReform.hide(['combined', 'bonus', 'married_value', 'penalty']);
    	eitcReform.ygrids([{value: marriedEITC, text: "Combined Individual EITC's/Married EITC"}]);
    }
    else if(bonus > 0){
    	eitcReform.show(['combined', 'bonus']);
    	eitcReform.hide(['married_value', 'penalty']);
    	eitcReform.ygrids([{value: marriedEITC, text: "Married EITC"},{value: combinedEITC, text: "Combined Individual EITC's", y_position: 'below'},]);
    	eitcReform.load({
    		columns: [
    			['x_horizontal', 0,            100000],
    			['combined',     combinedEITC, combinedEITC],
    			['bonus',        bonus,        bonus],
			]
    	});
    }
    else{
    	eitcReform.show(['married_value', 'penalty']);
    	eitcReform.hide(['combined', 'bonus']);
    	eitcReform.ygrids([{value: combinedEITC, text: "Combined Individual EITC's"},{value: marriedEITC, text: "Married EITC", y_position: 'below'}]);
    	eitcReform.load({
    		columns: [
    			['x_horizontal',  0,           100000],
    			['married_value', marriedEITC, marriedEITC],
    			['penalty',       bonus * -1,  bonus * -1],
			]
    	})
    }

    // Existing EITC: move y-grids & bonus region
    existing_penalty = combined_existing_eitc - married_existing_eitc;
    if(existing_penalty > 0){
    	existingEITC.show(['married_value', 'penalty']);
    	existingEITC.hide(['combined', 'bonus']);
    	existingEITC.ygrids([ {value: married_existing_eitc, text: 'Married EITC', y_position: 'below'}, {value: combined_existing_eitc, text: "Combined Individual EITC's"} ]);
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
    	existingEITC.ygrids([ {value: combined_existing_eitc, text: "Combined Individual EITC's", y_position: "below"}, {value: married_existing_eitc, text: 'Married EITC'}, ]);
    	existingEITC.load({
    		columns: [
    			['x_horizontal', 0,                      100000],
    			['combined',     combined_existing_eitc, combined_existing_eitc],
    			['bonus',        existing_penalty * -1,  existing_penalty * -1],
			]
    	});
    }
}

function reformed_eitc_values_married(income){
	if(income < 23500){return .34 * income;}
	else if(income >= 23500 && income <= 43120){return 7990;}
	else if(income >  43120 && income <  93120){return 7990 - .1598 * (income - 43120);}
	else{return 0;}
}

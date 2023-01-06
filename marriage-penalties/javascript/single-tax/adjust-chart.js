function single_tax_modify_income(){
	p1Income = single_tax_person1_income.value;
	p2Income = single_tax_person2_income.value;
	combinedIncome = parseInt(p1Income) + parseInt(p2Income);

	// Tax liabilities
	p1Tax = tax_liability_2023('single', p1Income);
	p2Tax = tax_liability_2023('single', p2Income);
	combinedTax = p1Tax + p2Tax;
	marriedTax = tax_liability_2023('married', combinedIncome);

	// Move grids
	singleTaxChart.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);

    // Move points
    singleTaxChart.load({columns: [ ['x_point1', p1Income] , ['point1', p1Tax], ['x_point2', p2Income], ['point2', p2Tax], ['x_point_married', combinedIncome], ['point_married', marriedTax] ] });

    // Move bonus regions
    bonus = combinedTax - marriedTax;
    if(bonus <= 0){
    	singleTaxChart.hide(['bonus', 'married_tax']);
    	singleTaxChart.ygrids([{value: 0}, {value: marriedTax, text: "Married tax/Combined individual tax"},]);
    }
    else{
    	singleTaxChart.show(['bonus', 'married_tax']);
    	singleTaxChart.load({
		    columns: [
		        ['x_horizontal', 0,         200000],
		        ['married_tax',  marriedTax, marriedTax],
		        ['bonus',        bonus,      bonus],
		    ]
		});
		singleTaxChart.ygrids([{value: 0}, {value: marriedTax, text: "Married tax"}, {value: combinedTax, text: "Combined individual tax"}]);
    }
}
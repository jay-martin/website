function show_marriage_bonus_animation(){
	eitc_values_style = document.querySelector('.eitc_values');
	
	timer = 1000;
	setTimeout(function () {
		
		MPchart.xgrids([]);
		MPchart.ygrids([{value: 0}]);
		MPchart.regions([]);
		eitc_values_style.style.borderRadius = '5px';
		eitc_values_style.style.height = '85px';
		document.getElementById('individual_eitc_values').innerHTML = '';
		document.getElementById('married_eitc_value').innerHTML = '';
		document.getElementById('marriage_penalty_show').innerHTML = '';
    	MPchart.axis.max({y: 7000});
    	MPchart.axis.max({x: 50000});
		MPchart.hide('person1');
		MPchart.hide('person2');
		MPchart.hide('married');

	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line1').innerHTML = 'Some very-low income couples incur marriage bonuses.';
	}, timer);

	timer += 2000;
	setTimeout(function () {
		person1_children.value = 'one';
		modify_person1();
		MPchart.show('person1');
		person1Income = 4000;
		person1Income_formatted = person1Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		myRange_person1.value = person1Income;
		rangeValue_person1.innerText = person1Income_formatted;
		MPchart.xgrids([{value: person1Income, text: "Person 1 Income"}]);
		document.getElementById('explanation_line1').innerHTML = 'Some very-low income couples incur marriage bonuses. Consider, for instance, a person with one child who makes $' + person1Income_formatted + '.';
	}, timer);

	timer += 3000;
	setTimeout(function () {
		person2_children.value = 'one';
		modify_person2();
		MPchart.show('person2');
		person2Income = 5000;
		person2Income_formatted = person2Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		myRange_person2.value = person2Income;
		rangeValue_person2.innerText = person2Income_formatted;
		MPchart.xgrids([{value: person1Income, text: "Person 1 Income"}, {value: person2Income, text: "Person 2 Income"}]);
		document.getElementById('explanation_line1').innerHTML = 'Some very-low income couples incur marriage bonuses. Consider, for instance, a person with one child who makes $' + person1Income_formatted + '. And another person who also has one child and who makes $' + person2Income_formatted + '.';
	}, timer);

	timer += 2000;
	setTimeout(function () {
		person1EITC = EITC_benefit('single', myRange_person1.value, person1_children.value);
		person1EITC_formatted = person1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		MPchart.ygrids([{value: 0}, {value: person1EITC, text: "Person 1 EITC"}]);

		document.getElementById('explanation_line1').style.color = '#7a7a7a';
		document.getElementById('explanation_line2').innerHTML = 'Person 1 has an EITC of <b>$' + person1EITC_formatted + '</b>';
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		person2EITC = EITC_benefit('single', myRange_person2.value, person2_children.value);
		person2EITC_formatted = person2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		MPchart.ygrids([{value: 0}, {value: person1EITC, text: "Person 1 EITC"}, {value: person2EITC, text: "Person 2 EITC"}]);

		document.getElementById('explanation_line1').style.color = '#7a7a7a';
		document.getElementById('explanation_line2').innerHTML = 'Person 1 has an EITC of <b>$' + person1EITC_formatted + '</b> and person 2 has an EITC of <b>$' + person2EITC_formatted + '</b>';
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		combinedEITC = person1EITC + person2EITC;
		combinedEITC_formatted = combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		MPchart.ygrids([{value: 0}, {value: combinedEITC, text: "Combined Individual EITC Benefit"}]);

		document.getElementById('explanation_line2').innerHTML = 'Person 1 has an EITC of <b>$' + person1EITC_formatted + '</b> and person 2 has an EITC of <b>$' + person2EITC_formatted + '</b>, for a combined EITC of <b>$' + combinedEITC_formatted + '</b>.';
	}, timer);

	timer += 2000;
	setTimeout(function () {
		modify_married();
		MPchart.show('married');
		MPchart.focus('married');

		document.getElementById('explanation_line2').style.color = '#7a7a7a';
		document.getElementById('explanation_line3').innerHTML = "If they get married, they'd be eligible for the married two-children EITC";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		combinedIncome = combined_income_marriage_penalty();
		MPchart.xgrids([{value: combinedIncome, text: "Combined Income"}]);
		document.getElementById('explanation_line3').innerHTML = "If they get married, they'd be eligible for the married one-child EITC, and with a combined income of $13,000";
	}, timer);

	timer += 2000;
	setTimeout(function () {
		marriedEITC = EITC_benefit('married', combinedIncome, 'two');
		marriedEITC_formatted = marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		MPchart.ygrids([{value: 0}, {value: combinedEITC, text: "Combined Individual EITC Benefit"}, {value: marriedEITC, text: "Married EITC"}]);

		document.getElementById('explanation_line3').innerHTML = "If they get married, they'd be eligible for the married one-child EITC, and with a combined income of $13,000, their married EITC would be worth <b>$" + marriedEITC_formatted + "</b>.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		MPchart.xgrids([]);
		MPchart.regions.add([{axis: 'y', start: combinedEITC, end: marriedEITC, class: 'regionY'}]);
		marriageBonus = marriedEITC-combinedEITC;
		marriedBonus_formatted = marriageBonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		document.getElementById('explanation_line3').style.color = '#7a7a7a';
		document.getElementById('explanation_line4').innerHTML = "That's a marriage bonus of <b>$" + marriedBonus_formatted + "</b>.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		MPchart.axis.max({x: 10000});
		MPchart.axis.max({y: 4000});
		MPchart.ygrids([{value: 0}]);
		MPchart.regions([]);

		document.getElementById('explanation_line4').style.color = '#7a7a7a';
		document.getElementById('explanation_line5').innerHTML = "The marriage bonuses occurs because the slope of the two-child EITC curve";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus('married');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('married');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus('married');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('married');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus('married');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('married');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus('married');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('married');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['person1', 'person2']);

		document.getElementById('explanation_line5').innerHTML = "The marriage bonuses occurs because the slope of the two-child EITC curve</br>is <b>larger</b> than the slope of the one-child EITC curve.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['person1', 'person2']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.xgrids([{value: person1Income, text: 'Person 1 Income', position: 'start'}, {value: person2Income, text: 'Person 2 Income', position: 'start'}]);
		MPchart.ygrids([{value: 0},{value: person1EITC, text: 'Person 1 EITC'}, {value: person2EITC, text: 'Person 2 EITC'}]);

		document.getElementById('explanation_line5').style.color = '#7a7a7a';
		document.getElementById('explanation_line6').innerHTML = "Notice that this this couple's ";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		MPchart.xgrids([{value: combinedIncome, text: 'Combined Income', position: 'start'}]);
		MPchart.ygrids([{value: 0}, {value: combinedEITC, text: 'Combined Individual EITCs'},]);

		document.getElementById('explanation_line5').style.color = '#7a7a7a';
		document.getElementById('explanation_line6').innerHTML = "The sum of Person 1 and Person 2's EITCs, is equal to the EITC at their combined income.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);
	
}
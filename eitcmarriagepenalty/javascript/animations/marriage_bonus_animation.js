function show_marriage_bonus_animation(){
	eitc_values_style = document.querySelector('.explanation_values');
	
	timer = 1000;
	setTimeout(function () {
		
		MPchart.xgrids([]);
		MPchart.ygrids([{value: 0}]);
		MPchart.regions([]);
		document.getElementById('individual_eitc_values').innerHTML = '';
		document.getElementById('married_eitc_value').innerHTML = '';
		document.getElementById('marriage_penalty_show').innerHTML = '';
    	MPchart.axis.max({y: 4000});
    	MPchart.axis.max({x: 50000});
		MPchart.hide('person1');
		MPchart.hide('person2');
		MPchart.hide('married');
		MPchart.hide('married_eitc');
		MPchart.hide('penalty');
		MPchart.hide('combined_eitc');
		MPchart.hide('bonus');

	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line1').innerHTML = 'Some very-low income couples incur marriage bonuses.';
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		person1_children.value = 'one';
		person2_children.value = 'one';
		modify_person1();
		modify_person2();
		MPchart.show(['person1', 'person2']);
		document.getElementById('explanation_line1').innerHTML = 'Some very-low income couples incur marriage bonuses. Consider, for instance, two people who each have one child.';
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		person1Income = 7000;
		person1Income_formatted = person1Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		myRange_person1.value = person1Income;
		rangeValue_person1.innerText = person1Income_formatted;
		MPchart.xgrids([{value: person1Income, text: "Person 1 Income"}]);
		document.getElementById('explanation_line1').innerHTML = 'Some very-low income couples incur marriage bonuses. Consider, for instance, two people who each have one child.</br> Say the first person has an income of $' + person1Income_formatted + '.';
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 3000;
	setTimeout(function () {
		person2Income = 3000;
		person2Income_formatted = person2Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		myRange_person2.value = person2Income;
		rangeValue_person2.innerText = person2Income_formatted;
		MPchart.xgrids([{value: person1Income, text: "Person 1 Income"}, {value: person2Income, text: "Person 2 Income"}]);
		document.getElementById('explanation_line1').innerHTML = 'Some very-low income couples incur marriage bonuses. Consider, for instance, two people who each have one child.</br> Say the first person has an income of $' + person1Income_formatted + '.</br>Say the other person has an income of $' + person2Income_formatted + '.';
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
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
		document.getElementById('explanation_line2').innerHTML = 'Person 1 has an EITC of <b>$' + person1EITC_formatted + '</b> and person 2 has an EITC of <b>$' + person2EITC_formatted + '</b>,';
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		combinedEITC = person1EITC + person2EITC;
		combinedEITC_formatted = combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		MPchart.ygrids([{value: 0}, {value: combinedEITC, text: "Combined Individual EITC Benefit"}]);

		document.getElementById('explanation_line2').innerHTML = 'Person 1 has an EITC of <b>$' + person1EITC_formatted + '</b> and person 2 has an EITC of <b>$' + person2EITC_formatted + '</b>, for a combined EITC of <b>$' + combinedEITC_formatted + '</b>.';
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line2').style.color = '#7a7a7a';
		document.getElementById('explanation_line3').innerHTML = "But notice that, with one child each,";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line2').style.color = '#7a7a7a';
		document.getElementById('explanation_line3').innerHTML = "But notice that, with one child each, if they get married,";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		MPchart.axis.max({y: 7000});
		MPchart.axis.max({x: 60000});
		modify_married();
		MPchart.show('married');
		MPchart.focus('married');

		document.getElementById('explanation_line3').innerHTML = "But notice that, with one child each, if they get married,</br> they'd be eligible for the married <b>two-child</b> EITC,";
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
		MPchart.focus('person2');
		document.getElementById('explanation_line3').innerHTML = "But notice that, with one child each, if they get married,</br> they'd be eligible for the married <b>two-child</b> EITC, which is <em><b>larger</b></em> than the <b>one-child</b> EITC.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('person2');
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus('married');
		combinedIncome = combined_income_marriage_penalty();
		MPchart.xgrids([{value: combinedIncome, text: "Combined Income"}]);
		document.getElementById('explanation_line3').style.color = '#7a7a7a';
		document.getElementById('explanation_line4').innerHTML = "So with a combined income of $13,000,";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		marriedEITC = EITC_benefit('married', combinedIncome, 'two');
		marriedEITC_formatted = marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		MPchart.ygrids([{value: 0}, {value: combinedEITC, text: "Combined Individual EITC Benefit"}, {value: marriedEITC, text: "Married EITC"}]);

		document.getElementById('explanation_line4').innerHTML = "So with a combined income of $13,000, their married EITC would be worth <b>$" + marriedEITC_formatted + "</b>.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		MPchart.xgrids([]);
		MPchart.regions.add([{axis: 'y', start: combinedEITC, end: marriedEITC, class: 'regionY'}]);
		marriageBonus = marriedEITC-combinedEITC;
		marriedBonus_formatted = marriageBonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		document.getElementById('explanation_line4').style.color = '#7a7a7a';
		document.getElementById('explanation_line5').innerHTML = "That's <b>$" + marriedBonus_formatted + " <em>more</em></b> than their combined single EITC's.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		MPchart.internal.config.axis_x_tick_values = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000];
		MPchart.axis.max({x: 12000});
		MPchart.axis.max({y: 5000});
		MPchart.ygrids([{value: 0}]);
		MPchart.regions([]);

		document.getElementById('explanation_line5').style.color = '#7a7a7a';
		document.getElementById('explanation_line6').innerHTML = "The marriage bonuses occurs because the slope of the two-child EITC curve,";
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
		document.getElementById('explanation_line6').innerHTML = "The marriage bonus occurs because the slope of the two-child EITC curve,</br>is <b><em>larger</em></b> than the slope of the one-child EITC curve.";
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

		document.getElementById('explanation_line6').style.color = '#7a7a7a';
		document.getElementById('explanation_line7').innerHTML = "Since both of them have 1 child,";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 3000;
	setTimeout(function () {
		MPchart.xgrids([{value: combinedIncome, text: 'Combined Income', position: 'start'}]);
		MPchart.ygrids([{value: 0}, {value: combinedEITC, text: 'Combined Individual EITCs'},]);

		document.getElementById('explanation_line7').innerHTML = "Since both of them have 1 child, combining their incomes simply pushes them up the one-child EITC curve.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		document.getElementById('explanation_line7').style.color = '#7a7a7a';
		document.getElementById('explanation_line8').innerHTML = "However,";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		MPchart.focus('married');
		document.getElementById('explanation_line8').innerHTML = "However, if they get married";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		MPchart.ygrids([{value: 0}, {value: marriedEITC+50, text: 'Married Individual EITCs'},]);
		document.getElementById('explanation_line8').innerHTML = "However, if they get married, they level up to the two-child curve,";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line8').innerHTML = "However, if they get married, they level up to the two-child curve, producing a larger benefit.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		MPchart.axis.max({x: 20000});
		MPchart.axis.max({y: 7000});
		MPchart.xgrids([]);
		MPchart.ygrids([]);
		MPchart.focus(['person1', 'person2', 'married']);
		document.getElementById('explanation_line8').style.color = '#7a7a7a';
		document.getElementById('explanation_line9').innerHTML = "This is the simplest way in which marriage bonuses occur.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line9').innerHTML = "This is the simplest way in which marriage bonuses occur.</br>When two people with children marry, they jump up an EITC curve because the number of children in their tax unit increases.";
		eitc_values_style.scrollTop = eitc_values_style.scrollHeight;
	}, timer);

	timer += 1000;
	setTimeout(function () {
		person1_children.value = 'two';
		modify_person1();
		modify_married();
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
		MPchart.focus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['married']);
	}, timer);

	timer += 1000;
	setTimeout(function () {
		person1_children.value = 'one';
		person2_children.value = 'two';
		modify_person1();
		modify_person2();
		modify_married();
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
		MPchart.focus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['married']);
	}, timer);

	timer += 1000;
	setTimeout(function () {
		person1_children.value = 'two';
		modify_person1();
		modify_married();
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
		MPchart.focus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['married']);
	}, timer);

	timer += 1000;
	setTimeout(function () {
		person1_children.value = 'one';
		person2_children.value = 'one';
		modify_person1();
		modify_person2();
		modify_married();
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
		MPchart.focus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.focus(['married']);
	}, timer);

	timer += 500;
	setTimeout(function () {
		MPchart.defocus(['married']);
	}, timer);
	
}
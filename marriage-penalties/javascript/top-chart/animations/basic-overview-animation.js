function animation1(){
	explanation_values_style = document.querySelector('.center_explanation_box');

	initialize_animation();
	
	timer = 1000;
	setTimeout(function () {
		top_chart.xgrids([]);
		top_chart.ygrids([{value: 0}]);
		top_chart.regions([]);
		document.getElementById('individual_values').innerHTML = '';
		document.getElementById('married_value').innerHTML = '';
		document.getElementById('marriage_penalty_output').innerHTML = '';
    	top_chart.axis.max({y: 7000});
		top_chart.hide('person1');
		top_chart.hide('person2');
		top_chart.hide('married');
		top_chart.hide('married_eitc');
		top_chart.hide('penalty');
		top_chart.hide('combined_eitc');
		top_chart.hide('bonus');
	}, timer);

	timer += 2000;
	setTimeout(function () {
		person1_children.value = 'one';
		document.getElementById('explanation_line1').innerHTML = 'Say you have one child.';
	}, timer);

	timer += 2000;
	setTimeout(function () {
		modify_person1();
		top_chart.show('person1')
		document.getElementById('explanation_line1').innerHTML = 'Say you have one child. Then you are eligible for the following EITC:';
	}, timer);

	timer+= 2000;
	setTimeout(function () {
		person1_income.value = 30000;
		top_chart.xgrids([{value: person1_income.value, text: 'Your income'}]);
		person1Income = person1_income.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		document.getElementById('explanation_line1').style.color = '#7a7a7a';
		document.getElementById('explanation_line2').innerHTML = 'Say you have an income of <b>$' + person1Income + "</b>.";
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		person1EITC = EITC_benefit('single', person1_income.value, person1_children.value);
		person1EITC_formatted = person1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		top_chart.ygrids.add({value: person1EITC, text: "Value of your EITC"});
		document.getElementById('explanation_line2').innerHTML = 'Say you have an income of <b>$' + person1Income + "</b>. Then your EITC is worth <b>$" + person1EITC_formatted + "</b>.";
	}, timer);

	timer += 2000;
	setTimeout(function () {
		top_chart.xgrids.remove([{value: person1_income.value, text: 'Your income'}]);
	}, timer);

	timer+= 1000;
	setTimeout(function () {
		top_chart.xgrids.remove([{value: person1_income.value, text: 'Your income'}]);
		person2_children.value = 'one';
		modify_person2();

		document.getElementById('explanation_line2').style.color = '#7a7a7a';
		document.getElementById('explanation_line3').innerHTML = 'Say your partner also has one child.';
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer+= 2000;
	setTimeout(function () {
		top_chart.hide('person1');
		top_chart.show('person2');
		document.getElementById('explanation_line3').innerHTML = 'Say your partner also has one child. Then they are eligible for the same one-child EITC curve as you.';
	}, timer);

	timer+= 3000;
	setTimeout(function () {
		top_chart.hide('person1');
		person2_income.value = 18000;
		person2Income = person2_income.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		top_chart.xgrids([{value: person2_income.value, text: "Your partner's income"}]);

		document.getElementById('explanation_line3').style.color = '#7a7a7a';
		document.getElementById('explanation_line4').innerHTML = 'Say your partner has an income of <b>$' + person2Income + '</b>.';
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		person2EITC = EITC_benefit('single', person2_income.value, person2_children.value);
		person2EITC_formatted = person2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		top_chart.ygrids.add({value: person2EITC, text: "Value of your partner's EITC"});
		document.getElementById('explanation_line4').innerHTML = 'Say your partner has an income of <b>$' + person2Income + '</b>. Then their EITC is worth <b>$' + person2EITC_formatted + "</b>.";
	}, timer);

	timer += 2000;
	setTimeout(function () {
		top_chart.xgrids.remove([{value: person2_income.value, text: "Your partner's income"}]);
	}, timer);

	timer+= 2000;
	setTimeout(function () {
		combinedEITC = person1EITC + person2EITC;
		top_chart.ygrids([{value: 0}, {value: combinedEITC, text: ''}, {value: combinedEITC, text: "Sum of you and your partner's individual EITC's"}]);

		document.getElementById('explanation_line4').style.color = '#7a7a7a';
		document.getElementById('explanation_line5').innerHTML = "Between the two of you, you receive a total of <b>$" + combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in EITC benefits.';
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line5').style.color = '#7a7a7a';
		document.getElementById('explanation_line6').innerHTML = "If you marry each other,"
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		modify_married();
		top_chart.show('married');
		top_chart.focus('married');

		document.getElementById('explanation_line5').style.color = '#7a7a7a';
		document.getElementById('explanation_line6').innerHTML = "If you marry each other, then with two children you will be eligible for the following, larger EITC:"
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2500;
	setTimeout(function () {
		top_chart.xgrids([{value: person1_income.value, text: 'Your income'}]);

		document.getElementById('explanation_line6').style.color = '#7a7a7a';
		document.getElementById('explanation_line7').innerHTML = "However, with your income of $" + person1Income;
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		top_chart.xgrids([{value: person1_income.value, text: 'Your income'}, {value: person2_income.value, text: "Your partner's income"}]);
		document.getElementById('explanation_line7').innerHTML = "However, with your income of $" + person1Income + " and your partner's income of $" + person2Income;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		combinedIncome = parseInt(person1_income.value, 10) + parseInt(person2_income.value, 10);
		combinedIncome_formatted = combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		top_chart.xgrids([{value: combinedIncome, text: ''}, {value: combinedIncome, text: ""}, {value: combinedIncome, text: "Combined income"}]);
		document.getElementById('explanation_line7').innerHTML = "However, with your income of $" + person1Income + " and your partner's income of $" + person2Income + ", you have a combined income of <b>$" + combinedIncome_formatted + "</b>.";
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		marriedEITC = EITC_benefit('married', combinedIncome, 'two');
		marriedEITC_formatted = marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		top_chart.ygrids.add({value: marriedEITC, text: "Your married EITC"});

		document.getElementById('explanation_line7').style.color = '#7a7a7a';
		document.getElementById('explanation_line8').innerHTML = "That's an EITC of only <b>$" + marriedEITC_formatted + "</b>.";
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		top_chart.xgrids.remove([{value: combinedIncome, text: "Combined income"}]);
	}, timer);

	timer += 1000;
	setTimeout(function () {
		marriagePenalty = combinedEITC - marriedEITC;
		marriagePenalty_formatted = marriagePenalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		top_chart.regions.add([{axis: 'y', start: marriedEITC, end: combinedEITC, class: 'penalty'}]);
		document.getElementById('explanation_line8').innerHTML = "That's an EITC of only <b>$" + marriedEITC_formatted + "</b>. You lose <b>$" + marriagePenalty_formatted + "</b> in EITC benefits because you got married.";
		explanation_values_style.scrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line8').innerHTML = "That's an EITC of only <b>$" + marriedEITC_formatted + "</b>. You lose <b>$" + marriagePenalty_formatted + "</b> in EITC benefits because you got married. <em>That</em> is a marriage penalty.";
		explanation_values_stylescrollTop = explanation_values_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		/* Enable buttons */
		enable_animation_buttons();
	}, timer);
	
}
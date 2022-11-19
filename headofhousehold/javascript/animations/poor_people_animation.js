function show_poor_people_animation(){
	explanation_style = document.querySelector('.explanation_values');

	initialize_animation();

	timer += 0;
	setTimeout(function () {
		HOHchart.hide('after_ctc');
		document.getElementById('item_or_stand').innerHTML = '';
		document.getElementById('HOH_savings').innerHTML = '';
		HOHchart.load({
            columns: [
                ['x',            0, 12950, 19400, 23225, 34050, 54725, 75300, 102025, 108450, 183000, 189450, 228900, 235350, 552850, 559300, 600000],
            	['HOH_Savings',  0, 0,     645,   645,   861.5, 861.5, 2919,  2919,   3047.5, 3047.5, 3563.5, 3563.5, 3757,   3757,   3886,   3886],
            ]
        });
	}, timer);

	timer += 1000;
	setTimeout(function () {
		document.getElementById('explanation_line1').innerHTML = "Let's look at the effects of HOH at lower income levels.";
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
		HOHchart.axis.max({x: 40000});
	}, timer);

	timer += 1000;
	setTimeout(function () {
		HOHchart.axis.max({y: 1000});
	}, timer);

	timer += 1000;
	setTimeout(function () {
		HOHchart.xgrids([{value: 12950, text:'Single Standard Deduction'},]);
		document.getElementById('explanation_line1').style.color = '#7a7a7a';
		document.getElementById('explanation_line2').innerHTML = "For families making less than the single standard deduction ($12,950),";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line2').innerHTML = "For families making less than the single standard deduction ($12,950), HOH provides <b>zero</b> benefit.";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line2').style.color = '#7a7a7a';
		document.getElementById('explanation_line3').innerHTML = "<em>HOH simply does not provide benefits to poor people.</em>";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line3').style.color = '#7a7a7a';
		document.getElementById('explanation_line4').innerHTML = "Our baseline chart also exagerrates HOH benefits to people with incomes just above the single standard deduction.";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		document.getElementById('explanation_line4').innerHTML = "Our baseline chart also exagerrates HOH benefits to people with incomes just above the single standard deduction. This is because it looks at the effects of HOH in isolation from other policies.";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		document.getElementById('explanation_line4').style.color = '#7a7a7a';
		document.getElementById('explanation_line5').innerHTML = "But if we consider HOH in conjunction with the child tax credit,";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		tax_credit_switch.checked = true;
		modifyGraph_HOH();
		HOHchart.focus('after_ctc');
		document.getElementById('explanation_line5').innerHTML = "But if we consider HOH in conjunction with the child tax credit, the income level at which HOH provides no benefit increases (see 'How do tax credits affect HOH?').";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		HOHchart.xgrids([{value: 18950, text:'No Benefit Income'},]);
		document.getElementById('explanation_line5').style.color = '#7a7a7a';
		document.getElementById('explanation_line6').innerHTML = "Now, single parents with <em>one child</em> have to make at least <b>$18,950</b> to receive any benefit,";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		num_children.value = 'two';
		modifyGraph_HOH();
		HOHchart.xgrids([{value: 24662, text:'No Benefit Income'},]);
		document.getElementById('explanation_line6').innerHTML = "Now, single parents with <em>one child</em> have to make at least <b>$18,950</b> to receive any benefit,</br>single parents with <em>two children</em> have to make at least <b>$24,662</b> to receive any benefit,";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		num_children.value = 'three';
		modifyGraph_HOH();
		HOHchart.xgrids([{value: 29662, text:'No Benefit Income'},]);
		document.getElementById('explanation_line6').innerHTML = "Now, single parents with <em>one child</em> have to make at least <b>$18,950</b> to receive any benefit,</br>single parents with <em>two children</em> have to make at least <b>$24,662</b> to receive any benefit,</br>single parents with <em>three children</em> have to make at least <b>$29,662</b> to receive any benefit,";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		document.getElementById('explanation_line6').style.color = '#7a7a7a';
		document.getElementById('explanation_line7').innerHTML = "Furthermore,";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.xgrids([{value: 40000, text:'Example Income'},]);
		HOHchart.axis.max({x: 60000});
		document.getElementById('explanation_line7').innerHTML = "Furthermore, even for working class people with incomes high enough to receive a benefit.";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
		HOHchart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
		HOHchart.axis.max({x: 600000});
		HOHchart.axis.max({y: 4000});
		document.getElementById('explanation_line7').innerHTML = "Furthermore, even for working class people with incomes high enough to receive a benefit, their benefits are substantially smaller at their income than at higher incomes.";
		explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.ygrids([{value: 650, text:'Benefit of Working Class Person', position: 'middle'},]);
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.ygrids([{value: 650, text:'Benefit of Working Class Person', position: 'middle'}, {value: 3757, text:'Benefit of Wealthy Person', position: 'middle'},]);
	}, timer);

	timer += 2000;
	setTimeout(function () {
		/* Enable buttons */
		enable_animation_buttons();
	}, timer);

}
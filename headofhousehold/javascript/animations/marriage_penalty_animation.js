function show_mp_explanation_animation(){
	explanation_style = document.querySelector('.explanation_values');

	initialize_animation();

	timer += 0;
	setTimeout(function () {
		/*set up chart*/
		HOHchart.xgrids([]);
    	HOHchart.axis.max({y: 100});
		HOHchart.hide('HOH_Savings');
		HOHchart.load({
            columns: [
                ['x',             0, 12950, 12951, 23225, 23226, 54725, 54726, 102025, 102026, 183000, 183001, 228900, 228901, 552850, 552851, 600000],
                ['HOH_Savings',   0, 0,     10,    10,    12,    12,    22,    22,     24,     24,     32,     32,     35,     35,     37,     37],
                ['x1', 0, 600000],
                ['person1', 0, 0],
                ['x2', 0, 600000],
                ['person2', 0, 0],
            ]
        });
        HOHchart.regions([{axis: 'x', start: 0, end: 600000, class: 'person_1'}]);
	}, timer);

	timer += 1000;
	setTimeout(function () {
		document.getElementById('explanation_line1').innerHTML = "Let's think about the way single people are taxed in the United States.";
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line1').innerHTML = "Let's think about the way single people are taxed in the United States. The US uses a progressive tax system.";
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line1').innerHTML = "Let's think about the way single people are taxed in the United States. The US uses a progressive tax system. That means that higher income is taxed at a higher rate.";
        HOHchart.show('HOH_Savings');
        HOHchart.xgrids([{value: 12950,},{value: 23225,},{value: 54725,},{value: 102025,},{value: 183000,},{value: 23225,},{value: 228900,},{value: 552850,}]);
	}, timer);

	timer += 2000;
	setTimeout(function () {
        HOHchart.xgrids([]);
        HOHchart.regions.remove({classes: ['person_1']});
        HOHchart.axis.max({x: 100000});
        HOHchart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000];
	}, timer);

	timer += 2000;
	setTimeout(function () {
        HOHchart.regions([{axis: 'x', start: 0, end: 50000}]);

        document.getElementById('explanation_line1').style.color = '#7a7a7a';
        document.getElementById('explanation_line2').innerHTML = 'So say you make $50,000.';
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
        document.getElementById('explanation_line2').innerHTML = "So say you make $50,000. You'd owe about 8.5% of that in taxes before tax credits.";
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.load({
            columns: [
                ['x1',            0, 50000],
                ['person1',       8.5, 8.5],
            ]
        });
        HOHchart.focus('person1');
	}, timer);

	timer += 2000;
	setTimeout(function () {
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.regions.add({axis: 'x', start: 50000, end: 100000});
		document.getElementById('explanation_line2').style.color = '#7a7a7a';
        document.getElementById('explanation_line3').innerHTML = "Say your partner also makes $50,000.";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.load({
            columns: [
                ['x2',            50000, 100000],
                ['person2',       8.5,   8.5]
            ]
        });
        HOHchart.focus(['person1', 'person2']);
        document.getElementById('explanation_line3').innerHTML = "Say your partner also makes $50,000. So they'd also owe about 8.5% in taxes.";
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line3').style.color = '#7a7a7a';
        document.getElementById('explanation_line4').innerHTML = "That means together you and your partner made $100,000,";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.ygrids([{value: 8.5, text: "You and Your Partner's Effective Tax Rate"}])
        document.getElementById('explanation_line4').innerHTML = "That means together you and your partner made $100,000, and 8.5% of that $100,000 was owed in tax.";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line4').style.color = '#7a7a7a';
        document.getElementById('explanation_line5').innerHTML = "But imagine what would happen if married people were taxed at the same rates as single people.";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
        document.getElementById('explanation_line5').innerHTML = "But imagine what would happen if married people were taxed at the same rates as single people. If you got married, you and your partner would have a combined income of $100,000.";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.focus('HOH_Savings');
        document.getElementById('explanation_line5').innerHTML = "But imagine what would happen if married people were taxed at the same rates as single people. If you got married, you and your partner would have a combined income of $100,000. But you'd face the single tax brackets on <em>all $100,000</em> of income.";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 4000;
	setTimeout(function () {
			HOHchart.load({
            columns: [
                ['x',             0, 100000,],
                ['HOH_Savings',   15, 15,],
            ]
        });
		HOHchart.ygrids([{value: 8.5, text: "You and Your Partner's Single Effective Tax Rate"}, {value: 15, text: "You and Your Partner's Married Effective Tax Rate"}])
        document.getElementById('explanation_line5').innerHTML = "But imagine what would happen if married people were taxed at the same rates as single people. If you got married, you and your partner would have a combined income of $100,000. But you'd face the single tax brackets on <em>all $100,000</em> of income. That's about 15% of your income owed in tax.";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		HOHchart.ygrids([{value: 8.5, text: ""}, {value: 15, text: ""}])
		document.getElementById('explanation_line5').style.color = '#7a7a7a';
        document.getElementById('explanation_line6').innerHTML = "That's an additional 6.5% of income that's owed as tax as a result of you getting married!";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);

	timer += 2000;
	setTimeout(function () {
		document.getElementById('explanation_line6').style.color = '#7a7a7a';
        document.getElementById('explanation_line7').innerHTML = "Fortunately for you, married joint filers don't use the same tax brackets as single filers.";
        explanation_style.scrollTop = explanation_style.scrollHeight;
	}, timer);
}

function show_basic_overview_animation(){
	explanation_style = document.querySelector('.explanation_values');

	timer = 1000;
	setTimeout(function () {
		HOHchart.xgrids([]);
		HOHchart.ygrids([{value: 0}]);
		explanation_style.style.borderRadius = '5px';
		explanation_style.style.height = '85px';
		document.getElementById('item_or_stand').innerHTML = '';
		document.getElementById('HOH_savings').innerHTML = '';
    	HOHchart.axis.max({y: 4000});
		HOHchart.hide('HOH_Savings');
	}, timer);

	timer += 2000;
	setTimeout(function () {
		
	}, timer);
}
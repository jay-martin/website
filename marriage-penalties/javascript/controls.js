// Controls whether the EITC or HOH income modification funcion is triggered
function modify_income(){
	if(benefit_selector.value === 'eitc'){
		eitc_outputs();
		eitc_modify_income();
	}
	else if(benefit_selector.value === 'hoh'){
		hoh_outputs();
		hoh_modify_income();
	}
	else{
		both_modify_income();
	}
}

// Switches the chart from the EITC chart to the HOH chart
function switch_chart(){
	if(benefit_selector.value === 'hoh'){
		MPchart.unload({ ids: ['married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married'] });
		MPchart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'block';
		document.getElementById('eitc_user_inputs').style.display = 'none';

		setTimeout(function () {
			MPchart.axis.max({y: 6000});
			MPchart.axis.labels({ y: 'Tax Liability'});
		}, 500);

		setTimeout(function () {
			hoh_outputs();
			hoh_modify_person1();
			hoh_modify_person2();
			hoh_modify_married();
			MPchart.data.names({
				person1: 'Your tax liability',
				person2: "Your partner's tax liability",
				married: "Married tax liability",
			});
		}, 1000);
		setTimeout(function () {
			hoh_modify_income();
			hoh_outputs();
		}, 1500);
	}
	else if(benefit_selector.value === 'eitc'){
		/* In case person 2 is currently being displayed using the dashed line */
		MPchart.show('person2');
		MPchart.legend.show('person2');
        MPchart.legend.hide('person2_dashed');

		MPchart.unload({ ids: ['hoh_married', 'hoh_penalty', 'hoh_combined', 'hoh_bonus', 'point1', 'point2', 'point_married', 'person2_dashed'] });
		MPchart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'none';
		document.getElementById('eitc_user_inputs').style.display = 'block';

		setTimeout(function () {
			MPchart.axis.max({y: 4000});
			MPchart.axis.labels({ y: 'EITC Value'});
		}, 500);

		setTimeout(function () {
			modify_person1();
			modify_person2();
			modify_married();
			MPchart.data.names({
				person1: 'Your EITC',
				person2: "Your Partner's EITC",
				married: "EITC if you get married",
			});
		}, 1000);
		setTimeout(function () {
			eitc_modify_income();
			eitc_outputs();
		}, 1500);
	}
	else{
		MPchart.unload({ ids: ['married_eitc', 'penalty', 'point1', 'point2', 'point_married'] });
		MPchart.ygrids([]);
		//document.getElementById('hoh_user_inputs').style.display = 'block';
		//document.getElementById('eitc_user_inputs').style.display = 'none';

		setTimeout(function () {
			MPchart.axis.max({y: 6000});
			MPchart.axis.min({y: -6000});
			MPchart.axis.labels({ y: 'Tax Liability'});
		}, 500);

		setTimeout(function () {
			//both_outputs();
			both_modify_person1();
			both_modify_person2();
			both_modify_married();
			MPchart.data.names({
				person1: 'Your tax liability',
				person2: "Your partner's tax liability",
				married: "Married tax liability",
			});
		}, 1000);
		setTimeout(function () {
			both_modify_income();
			//hoh_outputs();
		}, 1500);
	}
}
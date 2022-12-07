function switch_chart(){
	if(benefit_selector.value === 'hoh'){
		MPchart.unload({ ids: ['married_eitc', 'penalty', 'point1', 'point2', 'point_married'] });
		MPchart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'block';
		document.getElementById('eitc_user_inputs').style.display = 'none';

		setTimeout(function () {
			MPchart.axis.max({y: 6000});
			MPchart.axis.labels({ y: 'Tax Liability'});
		}, 500);

		setTimeout(function () {
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
		}, 1500);
	}
	else{
		MPchart.show('person2'); //In case person2 is shown as the dashed line person2_dashed
		MPchart.unload({ ids: ['hoh_married', 'hoh_penalty', 'point1', 'point2', 'point_married', 'person2_dashed'] });
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
			modify_income_outputs();
		}, 1500);
	}
}

function modify_income(){
	if(benefit_selector.value === 'eitc'){
		modify_income_outputs();
	}
	else{
		hoh_modify_income();
	}
}
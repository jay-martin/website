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
		both_outputs();
		both_modify_income();
	}
}

// Controls whether the number of children selector for person 1 modifies the EITC chart or the Both chart
function modify_person1(){
	if(benefit_selector.value === 'eitc'){
		modify_person1_eitc();
	}
	else if(benefit_selector.value === 'both'){
		both_modify_person1();
	}
} 

// Controls whether the number of children selector for person 2 modifies the EITC chart or the Both chart
function modify_person2(){
	if(benefit_selector.value === 'eitc'){
		modify_person2_eitc();
	}
	else if(benefit_selector.value === 'both'){
		both_modify_person2();
	}
} 

// Controls how to number of children selectors modifies the married chart
function modify_married(){
	if(benefit_selector.value === 'eitc'){
		modify_married_eitc();
	}
	else if(benefit_selector.value === 'both'){
		both_modify_married();
	}
}

// Control whether the filing status selctor modifies the HOH chart of the Both chart
function modify_person2_filing_status(){
	if(benefit_selector.value === 'hoh'){
		hoh_modify_person2();
	}
	else if(benefit_selector.value === 'both'){
		both_modify_person2();
	}
} 

// Switches the chart from the EITC chart to the HOH chart
function switch_chart(){
	if(benefit_selector.value === 'hoh'){
		person1_income.max = 100000;
		person2_income.max = 100000;
		MPchart.unload({ ids: ['married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married', 'both_white', 'both_penalty', 'both_white_positive', 'both_bonus', 'both_white_negative', 'both_bonus_negative', 'filler'] });
		MPchart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'block';
		document.getElementById('eitc_user_inputs').style.display = 'none';

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
		}, 500);

		setTimeout(function () {
			MPchart.axis.max({y: 6000});
			MPchart.axis.min({y: 0})
			MPchart.axis.labels({ y: 'Tax Liability'});
		}, 1000);

		setTimeout(function () {
			hoh_modify_income();
			hoh_outputs();
		}, 1500);
	}
	else if(benefit_selector.value === 'eitc'){
		person1_income.max = 60000;
		person2_income.max = 60000;
		/* In case person 2 is currently being displayed using the dashed line */
		MPchart.show('person2');
		MPchart.legend.show('person2');
        MPchart.legend.hide('person2_dashed');

		MPchart.unload({ ids: ['hoh_married', 'hoh_penalty', 'hoh_combined', 'hoh_bonus', 'point1', 'point2', 'point_married', 'person2_dashed', 'both_white', 'both_penalty', 'both_white_positive', 'both_bonus', 'both_white_negative', 'both_bonus_negative', 'filler'] });
		MPchart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'none';
		document.getElementById('eitc_user_inputs').style.display = 'block';

		setTimeout(function () {
			modify_person1();
			modify_person2();
			modify_married();
			MPchart.data.names({
				person1: 'Your EITC',
				person2: "Your Partner's EITC",
				married: "EITC if you get married",
			});
		}, 500);

		setTimeout(function () {
			MPchart.axis.max({y: 5000});
			MPchart.axis.min({y: 0})
			MPchart.axis.labels({ y: 'EITC Value'});
		}, 1000);

		setTimeout(function () {
			eitc_modify_income();
			eitc_outputs();
		}, 1500);
	}
	else{
		person1_income.max = 100000;
		person2_income.max = 100000;
		MPchart.unload({ ids: ['married_eitc', 'penalty', 'point1', 'point2', 'point_married', 'hoh_married', 'hoh_penalty', 'hoh_combined', 'hoh_bonus', 'person2_dashed'] });
		MPchart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'block';
		document.getElementById('eitc_user_inputs').style.display = 'block';

		setTimeout(function () {
			MPchart.internal.config.axis_y_tick_values = [-8000, -6000, -4000, -2000, 0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000];
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
			both_outputs();
		}, 1500);
	}
}
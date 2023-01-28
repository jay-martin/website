/**************** Number of Children *************************************************************************/
function top_chart_adjust_person1_children(){
	if(top_chart_benefit_selector.value === 'eitc'){
		eitc_marriage_penalty_adjust_person1_num_children('top_chart');
	}
	else if(top_chart_benefit_selector.value === 'hoh'){
		// no adjustment to chart
	}
}

function top_chart_adjust_person2_children(){
	if(top_chart_benefit_selector.value === 'eitc'){
		eitc_marriage_penalty_adjust_person2_num_children('top_chart');
	}
	else if(top_chart_benefit_selector.value === 'hoh'){
		// no adjustment to chart
	}
}

/**************** Filing Status *************************************************************************/
function top_chart_adjust_person1_filing_status(){
	if(top_chart_benefit_selector.value === 'eitc'){
		// no adjustment to chart
	}
	else if(top_chart_benefit_selector.value === 'hoh'){
		tax_adjust_person1_filing_status('top_chart');
	}
}

function top_chart_adjust_person2_filing_status(){
	if(top_chart_benefit_selector.value === 'eitc'){
		// no adjustment to chart
	}
	else if(top_chart_benefit_selector.value === 'hoh'){
		tax_adjust_person2_filing_status('top_chart');
	}
}

/**************** Income ************************************************************************************/
function top_chart_adjust_person1_income(){
	if(top_chart_benefit_selector.value === 'eitc'){
		eitc_marriage_penalty_modify_person1_income('top_chart');;
	}
	else if(top_chart_benefit_selector.value === 'hoh'){
		tax_modify_person1_income('top_chart');
	}
}

function top_chart_adjust_person2_income(){
	if(top_chart_benefit_selector.value === 'eitc'){
		eitc_marriage_penalty_modify_person2_income('top_chart');;
	}
	else if(top_chart_benefit_selector.value === 'hoh'){
		tax_modify_person2_income('top_chart');
	}
}

/**************** Switch Chart Type ******************************************************************************/
function top_chart_switch_chart_type(){
	if(top_chart_benefit_selector.value === 'eitc'){
		switch_eitc_marriage_penalty_chart_type('top_chart');
	}
	else if(top_chart_benefit_selector.value === 'hoh'){
		switch_tax_chart_type('top_chart');
		tax_intuitive_adjust_married('top_chart');
	}
}

/**************** Change Benefit Chart ******************************************************************************/
function top_chart_change_benefit(){
	if(top_chart_benefit_selector.value === 'eitc' && top_chart_chart_type.value === 'values'){
		top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
		top_chart_chart.axis.max({x: 70000});
		eitc_marriage_penalty_values_adjust_chart('top_chart');
		eitc_marriage_penalty_values_modify_income('top_chart');

		// outputs
		eitc_marriage_penalty_outputs('top_chart');
	}
	else if(top_chart_benefit_selector.value === 'hoh' && top_chart_chart_type.value === 'values'){
		top_chart_chart.internal.config.axis_x_tick_values = hoh_fix_tick;
		top_chart_chart.axis.max({x: 200000});
		tax_values_adjust_chart('top_chart');
		tax_values_modify_income('top_chart');

		// outputs
		tax_outputs('top_chart');
	}
	else if(top_chart_benefit_selector.value === 'eitc'){
		// income sliders
		top_chart_person1_income.max = 60000;
		top_chart_person2_income.max = 60000;

		// outputs
		eitc_marriage_penalty_outputs('top_chart');

		// axis
		top_chart_chart.internal.config.axis_y_max = undefined;
		top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
		top_chart_chart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
		top_chart_chart.axis.labels({ y: 'EITC Value'});
		top_chart_chart.axis.max({x: 60000});

		// curves
		top_chart_chart.hide( ['married_tax', 'tax_bonus', 'combined_tax', 'tax_penalty',] );
		top_chart_chart.show( ['married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc',] );
		top_chart_adjust_person1_children();
		top_chart_adjust_person2_children();
		top_chart_adjust_person1_income();
		top_chart_adjust_person2_income();

	}
	else if(top_chart_benefit_selector.value === 'hoh'){
		// income sliders
		top_chart_person1_income.max = 100000;
		top_chart_person2_income.max = 100000;

		// outputs
		tax_outputs('top_chart');

		// axis
		top_chart_chart.internal.config.axis_y_max = 30000;
		top_chart_chart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000];
		top_chart_chart.internal.config.axis_x_tick_values = hoh_fix_tick;
		top_chart_chart.axis.labels({ y: 'Tax Liability'});
		top_chart_chart.axis.max({x: 200000});

		// curves
		top_chart_chart.hide( ['married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc',] );
		top_chart_chart.show( ['married_tax', 'tax_bonus', 'combined_tax', 'tax_penalty',] );
		tax_intuitive_adjust_married('top_chart');
		top_chart_adjust_person1_filing_status();
		top_chart_adjust_person2_filing_status();
		top_chart_adjust_person1_income();
		top_chart_adjust_person2_income();
	}
}

/**************** Old ******************************************************************************/
function switch_chart(){
	if(benefit_selector.value === 'hoh'){
		person1_income.max = 100000;
		person2_income.max = 100000;
		top_chart_chart.unload({ ids: ['married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married', 'both_white', 'both_penalty', 'both_white_positive', 'both_bonus', 'both_white_negative', 'both_bonus_negative', 'filler'] });
		top_chart_chart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'block';
		document.getElementById('eitc_user_inputs').style.display = 'none';

		setTimeout(function () {
			hoh_outputs();
			hoh_modify_person1();
			hoh_modify_person2();
			hoh_modify_married();
			top_chart_chart.data.names({
				person1: 'Your tax liability',
				person2: "Your partner's tax liability",
				person2_dashed: "Your partner's tax liability",
				married: "Married tax liability",
			});
		}, 500);

		setTimeout(function () {
			top_chart_chart.axis.max({y: 6000});
			top_chart_chart.axis.min({y: 0})
			top_chart_chart.axis.labels({ y: 'Tax Liability'});
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
		top_chart_chart.show('person2');
		top_chart_chart.legend.show('person2');
        top_chart_chart.legend.hide('person2_dashed');

		top_chart_chart.unload({ ids: ['hoh_married', 'hoh_penalty', 'hoh_combined', 'hoh_bonus', 'point1', 'point2', 'point_married', 'person2_dashed', 'both_white', 'both_penalty', 'both_white_positive', 'both_bonus', 'both_white_negative', 'both_bonus_negative', 'filler'] });
		top_chart_chart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'none';
		document.getElementById('eitc_user_inputs').style.display = 'block';

		setTimeout(function () {
			modify_person1();
			modify_person2();
			modify_married();
			top_chart_chart.data.names({
				person1: 'Your EITC',
				person2: "Your Partner's EITC",
				person2_dashed: "Your Partner's EITC",
				married: "EITC if you get married",
			});
		}, 500);

		setTimeout(function () {
			top_chart_chart.axis.max({y: 5000});
			top_chart_chart.axis.min({y: 0})
			top_chart_chart.axis.labels({ y: 'EITC Value'});
		}, 1000);

		setTimeout(function () {
			eitc_modify_income();
			eitc_outputs();
		}, 1500);
	}
	else{
		person1_income.max = 100000;
		person2_income.max = 100000;
		top_chart_chart.unload({ ids: ['married_eitc', 'penalty', 'point1', 'point2', 'point_married', 'hoh_married', 'hoh_penalty', 'hoh_combined', 'hoh_bonus', 'person2_dashed'] });
		top_chart_chart.ygrids([]);
		document.getElementById('hoh_user_inputs').style.display = 'block';
		document.getElementById('eitc_user_inputs').style.display = 'block';

		setTimeout(function () {
			top_chart_chart.internal.config.axis_y_tick_values = [-8000, -6000, -4000, -2000, 0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000];
			top_chart_chart.axis.max({y: 6000});
			top_chart_chart.axis.min({y: -6000});
			top_chart_chart.axis.labels({ y: 'Tax Liability'});
		}, 500);

		setTimeout(function () {
			//both_outputs();
			both_modify_person1();
			both_modify_person2();
			both_modify_married();
			top_chart_chart.data.names({
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


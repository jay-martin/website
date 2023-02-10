var top_chart_is_active = {
	'ctc'  : true,
	'eitc' : true,
	'hoh'  : false,
}

function adjust_top_chart(){
	let chart_select = subchart_select.value;

    let top_num_old   = num_old(top_chart_num_old_children.value);
    let top_num_young = num_young(top_chart_num_young_children.value);
    let num_children  = top_num_old+top_num_young;
    let filing_status = top_chart_filing_status.value;
    let fsa1_or_2     = top_chart_fsa1_or_2.value;

    if(chart_select === 'all'){
        top_chart_income.max = 600000;
        top_chart_chart.show(['eitc', 'ctc', 'hoh', 'fsa_eitc', 'fsa_ca']);
        top_chart_chart.legend.show(['eitc', 'ctc', 'hoh', 'fsa_eitc', 'fsa_ca']);
        top_chart_is_active['ctc'] = true;
        top_chart_is_active['eitc'] = true;
        if(filing_status === 'hoh'){
        	top_chart_is_active['hoh'] = true;
        }
        else{
        	top_chart_is_active['hoh'] = false;
        }
    }
    else if(chart_select === 'eitc'){
        top_chart_income.max = 60000;
        top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000];
        top_chart_is_active['ctc'] = false;
        top_chart_is_active['eitc'] = true;
        top_chart_is_active['hoh'] = false;
        top_chart_chart.show(['eitc', 'fsa_eitc']);
        top_chart_chart.legend.show(['eitc', 'fsa_eitc']);
        top_chart_chart.hide(['ctc', 'hoh', 'fsa_ca']);
        top_chart_chart.legend.hide(['ctc', 'hoh', 'fsa_ca']);
    }
    else if(chart_select === 'ca'){
        top_chart_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
        top_chart_income.max = 600000;
        top_chart_is_active['ctc'] = true;
        top_chart_is_active['eitc'] = false;
        top_chart_is_active['hoh'] = false;
        top_chart_chart.show(['ctc', 'hoh', 'fsa_ca']);
        top_chart_chart.legend.show(['ctc', 'hoh', 'fsa_ca']);
        top_chart_chart.hide(['eitc', 'fsa_eitc']);
        top_chart_chart.legend.hide(['eitc', 'fsa_eitc']);
    }
    else if(chart_select === 'hoh'){
        top_chart_income.max = 600000;
        top_chart_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
    }

    top_chart_adjust_all(filing_status, top_num_young, top_num_old, fsa1_or_2);
    top_chart_modify_income();
}

/* Moves the income slider */
function top_chart_modify_income(){
	let income        = top_chart_income.value;
	let filing_status = top_chart_filing_status.value;
	let top_num_old   = num_old(top_chart_num_old_children.value);
	let top_num_young = num_young(top_chart_num_young_children.value);

    top_chart_chart.xgrids([{value: income, text:'Your income'}]);

    let current_benefit = 0;
    let fsa_benefit     = 0;
    if(top_chart_is_active['eitc']){
    	current_benefit += existingEITC(income, filing_status, top_num_young+top_num_old);
    	fsa_benefit     += fsa_eitc_calculate(income, filing_status, top_num_young+top_num_old);
    }

    if(top_chart_is_active['ctc']){
    	current_benefit += ctc_value(income, filing_status, top_num_young, top_num_old);
    	if(top_chart_fsa1_or_2.value === 'one'){
    		fsa_benefit += fsa1_child_benefit_value(income, filing_status, top_num_young, top_num_old);
    	}
    	else {
    		fsa_benefit += fsa2_child_benefit_value(income, filing_status, top_num_young, top_num_old);
    	}
    }

    if(top_chart_is_active['hoh']){
    	current_benefit += tax_liability_2022('single', income) - tax_liability_2022('hoh', income);
    }

    let difference = fsa_benefit - current_benefit;

    top_chart_chart.load({ columns: [
    		['x_point',          income],
    		['current_point',    current_benefit],
    		['fsa_point',        fsa_benefit],
    		['difference_point', difference],
		]
	});

}

/* Zooms graph on lower incomes */
function top_chart_zoom(){
    if(zoom_switch_all_phasein.checked){
        top_chart_income.max = "60000";
        top_chart_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
        top_chart_chart.axis.max({x: 60000});
    }
    else{
        top_chart_income.max = "600000";
        top_chart_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
        top_chart_chart.internal.config.axis_x_max = undefined;
        adjust_top_chart(); // needed to kick in the above changes
    }
}

/* Hides or shows benefit curves based on user input*/
function top_chart_only_show_difference_curve(){
    if(top_chart_only_difference_switch.checked === true){
        top_chart_chart.hide(['fsa_ca', 'fsa_eitc', 'fsa_point', 'ctc', 'eitc', 'hoh', 'current_point']);
    }
    else{
        if(top_chart_filing_status.value === 'hoh'){
            top_chart_chart.show(['fsa_ca', 'fsa_eitc', 'fsa_point', 'ctc', 'eitc', 'hoh', 'current_point']);
        }
        else{
            top_chart_chart.show(['fsa_ca', 'fsa_eitc', 'fsa_point', 'ctc', 'eitc', 'current_point',]);
        }
    }
}

/* Hides or shows difference curve based on user input*/
function top_chart_hide_difference_curve(){
    if(top_chart_hide_difference_switch.checked === true){
        top_chart_chart.hide(['difference', 'difference_point']);
    }
    else{
        top_chart_chart.show(['difference', 'difference_point']);
    }
}

/* enables and disabled the HOH tax savings option based on user selection of filing status, and changes the chart when the user switches to a non-HOH filing status while looking at the HOH tax savings chart */
function disable_hoh(){
    if(filing_status_all.value === 'hoh'){
        all_hoh_option.hidden = false;
        id_container.hidden = false;
    }
    else{
        all_hoh_option.hidden = true;
        id_container.hidden = true;
        if(subchart_select.value === 'hoh'){
            subchart_select.value = 'all';
            all_modify_chart();
            modify_benefit_outputs_all();
        }
    }
}
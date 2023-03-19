function benefit_comparison_adjust_chart(){
	let filing_status = benefit_comparison_filing_status.value;
	let num_children  = benefit_comparison_num_children.value;

	benefit_comparison_adjust_current_benefits(filing_status, num_children);
	benefit_comparison_adjust_reformed_benefits(filing_status, num_children);
	benefit_comparison_adjust_summed_reformed_benefits(filing_status, num_children);
}

/******************************************************* Individual Benefits Charts ************************************************************/
function benefit_comparison_adjust_current_benefits(filing_status, num_children){
	eitc_builder_2023(benefits_comparison_current_benefits, 'x_eitc', 'eitc', filing_status, num_children);
	snap_builder_2023(benefits_comparison_current_benefits, 'x_snap', 'snap', filing_status, num_children);
	ctc_builder_2023(benefits_comparison_current_benefits, 'x_ctc', 'ctc', filing_status, num_children);
	fit_y_axis_to_reformed_snap(benefits_comparison_current_benefits, filing_status, num_children);
}

function benefit_comparison_adjust_reformed_benefits(filing_status, num_children){
	build_reformed_eitc(benefits_comparison_reformed_benefits, 'x_eitc', 'eitc', filing_status, num_children);
	build_reformed_snap(benefits_comparison_reformed_benefits, 'x_snap', 'snap', filing_status, num_children);
	build_reformed_ctc(benefits_comparison_reformed_benefits, 'x_ctc', 'ctc', num_children);
	build_reformed_snap_eitc_xgrid(benefits_comparison_reformed_benefits, filing_status, num_children);
	fit_y_axis_to_reformed_snap(benefits_comparison_reformed_benefits, filing_status, num_children);
}

/******************************************************* Summed Benefits Charts **************************************************************/
function benefit_comparison_adjust_summed_reformed_benefits(filing_status, num_children){
	build_summed_reformed_benefits(benefits_comparison_summed_reformed_benefits, filing_status, num_children, true, true, true);
	build_summed_benefits_chart_2023(benefits_comparison_summed_current_benefits, 'x_total', 'total_benefit', filing_status, num_children, {'ctc': true, 'eitc': true, 'snap': true})
	summed_benefit_adjust_y_axis(benefits_comparison_summed_reformed_benefits, filing_status, num_children);
	summed_benefit_adjust_y_axis(benefits_comparison_summed_current_benefits, filing_status, num_children);
}

function summed_benefit_adjust_y_axis(chart_name, filing_status, num_children){
	const snap_base_benefit = 3000;
	const ctc_base_benefit = 3000;

	// household size and number of children
	let int_num_children = integer_num_children(num_children);
	let int_household_size = integer_household_size(filing_status, num_children);

	// eitc adjustment factor
	let eitc_adjustment = 2000;
	if(filing_status == 'married'){
		eitc_adjustment = 4000;
	}

	// calculate highest point
	let max_point = snap_base_benefit * int_household_size + ctc_base_benefit * int_num_children + eitc_adjustment;

	// adjust y axis
	chart_name.axis.max({y: max_point});
}


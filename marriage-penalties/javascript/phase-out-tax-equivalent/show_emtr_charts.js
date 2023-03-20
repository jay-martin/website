function show_phase_out_equivalent_charts(){
	if(phase_out_tax_equivalent_show_emtr_switch.checked){
		$('#eitc_plus_tax_emtr_container').css('display', 'inline-block');
		$('#eitc_emtr_container').css('display', 'inline-block');
	}
	else{
		$('#eitc_plus_tax_emtr_container').css('display', 'none');
		$('#eitc_emtr_container').css('display', 'none');
	}
}

function phase_out_equivalence_screenshot_mode(){
	$('#phase_out_tax_equivalent_title').css('text-decoration', 'underline');
}
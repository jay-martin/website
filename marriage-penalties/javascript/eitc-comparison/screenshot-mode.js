function eitc_comparison_additional_screenshot_mode(){
	if(eitc_comparison_screenshot_mode_switch.checked){
		$('#eitc_fix_outputs_button').css('display','none');
	}
	else{
		$('#eitc_fix_outputs_button').css('display','inline-block');
	}
	eitc_comparison_description_generator();
}

function eitc_comparison_description_generator(){
    let person1_income  = eitc_reform_person1_income.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let person2_income  = eitc_reform_person2_income.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let combined_income = parseInt(eitc_reform_person1_income.value) + parseInt(eitc_reform_person2_income.value);

    let marriage_penalty       = eitc_value_2023(eitc_reform_person1_income.value, 'single', 'one') + eitc_value_2023(eitc_reform_person2_income.value, 'single', 'one') - eitc_value_2023(combined_income, 'married', 'two');
    let reformed_bonus         = reformed_eitc_values_married(combined_income) - eitc_value_2023(eitc_reform_person1_income.value, 'single', 'one') - eitc_value_2023(eitc_reform_person2_income.value, 'single', 'one');
    let penalty_or_bonus_text  = 'marriage penalty';
    if(marriage_penalty < 0){
        marriage_penalty = marriage_penalty * -1;
        penalty_or_bonus_text = 'marriage bonus';
    }

    let output_string = '';
    if(reformed_bonus == 0){
    	output_string = 'Two single filers with incomes of $' + person1_income + ' and $' + person2_income + ', respectively, incur a <b><em>' + penalty_or_bonus_text + '</em></b> of $' + marriage_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' under current law, but face <em><b>no marriage penalty</em></b> under a "doubled" married EITC';
    }
    else if(penalty_or_bonus_text == 'marriage penalty'){
    	output_string = 'Two single filers with incomes of $' + person1_income + ' and $' + person2_income + ', respectively, incur a <b><em>' + penalty_or_bonus_text + '</em></b> of $' + marriage_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' under current law, but incur a <b><em>marriage bonus</em></b> of $' + reformed_bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' under a "doubled" married EITC';
    }
    else if(penalty_or_bonus_text == 'marriage bonus'){
    	output_string = 'Two single filers with incomes of $' + person1_income + ' and $' + person2_income + ', respectively, incur a ' + penalty_or_bonus_text + ' of $' + marriage_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' under current law and incur a marriage bonus of $' + reformed_bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' under the reform';
    }
    document.getElementById('eitc_comparison_title_description').innerHTML = output_string;
}
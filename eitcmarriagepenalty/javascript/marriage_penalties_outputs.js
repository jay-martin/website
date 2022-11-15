/*Default values */
document.getElementById('individual_eitc_values').innerHTML = "Your EITC is worth <b>$2,156</b> and your partner's EITC is worth <b>$496</b>, for a combined EITC of <b>$2,652</b>.";
document.getElementById('married_eitc_value').innerHTML = "With a combined income of $40,000, if you married your EITC would be worth <b>$1,548</b>.";
document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>penalty</em> of <b>$1,104</b>.';

function modify_income_marriage_penalty(){
    /*formatting*/
    combined_children = numChildren();
    numberChildren = 'none';
    if(combined_children === 1){numberChildren='one';}
    else if(combined_children === 2){numberChildren='two';}
    else if (combined_children >2){numberChildren='three';}

    /*Calculate benefits and assing to variables*/
    combinedIncome = combined_income_marriage_penalty();
    person1EITC = EITC_benefit('single', myRange_person1.value, person1_children.value);
    person2EITC = EITC_benefit('single', myRange_person2.value, person2_children.value);
    combinedEITC = person1EITC + person2EITC;
    marriedEITC = EITC_benefit('married', combinedIncome, numberChildren);
    
    /* Print updated data to screen*/
    document.getElementById('individual_eitc_values').innerHTML = 'Your EITC is worth <b>$' + person1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + person2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined EITC of <b>$" + combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('married_eitc_value').innerHTML = "With a combined income of $" + combinedIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"</b>.";

    /* Move xgrids */
    MPchart.xgrids([{value: myRange_person1.value, text:'Your income'},{value: myRange_person2.value, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: marriedEITC, text: "Your married EITC"}, {value: combinedEITC, text: "Combined individual EITC's"}]);

    /* Print marriage penalty to screen */
    penalty = marriedEITC - combinedEITC;
    if(penalty > 0){
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>bonus</em> of <b>$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else{
    	penalty = penalty * -1;
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>penalty</em> of <b>$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }

    /* Adjust chart x-axis max in case combined income exceeds current x-axis max */
    if(combinedIncome > 60000 && combinedIncome <80000){
        MPchart.axis.max({x: 80000});
    }
    else if(combinedIncome >= 80000 && combinedIncome <100000){
        MPchart.axis.max({x: 100000});
    }
    else if(combinedIncome >= 100000){
        MPchart.axis.max({x: 120000});
    }
    else{
        MPchart.axis.max({x: 60000});
    }

    /*adjust chart y-axis max in case combined EITC goes above current y-axis max*/
    if(combinedEITC > 4000){
    	MPchart.axis.max({y: 4500});
    }
    else{
    	MPchart.axis.max({y: 4000});
    }

}

function show_basic_overview(){
	if(basic_overview_explanation.hidden){
		basic_overview_explanation.hidden = false;
		basic_overview_animation.hidden = false;
	}
	else{
		basic_overview_explanation.hidden = true;
		basic_overview_animation.hidden = true;
	}
}

function show_marriage_bonus_explanation(){
	if(marriage_bonus_explanation.hidden){
		marriage_bonus_explanation.hidden = false;
		marriage_bonus_animation.hidden = false;
	}
	else{
		marriage_bonus_explanation.hidden = true;
		marriage_bonus_animation.hidden = true;
	}
}
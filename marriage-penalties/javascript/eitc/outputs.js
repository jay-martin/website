/*Default values */
document.getElementById('individual_eitc_values').innerHTML = "Your EITC is worth <b>$2,156</b> and your partner's EITC is worth <b>$496</b>, for a combined EITC of <b>$2,652</b>.";
document.getElementById('married_eitc_value').innerHTML = "With a combined income of $40,000, if you married your EITC would be worth <b>$1,548</b>.";
document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>penalty</em> of <b>$1,104</b>.';

function eitc_outputs(){
    combined_children = num_children();
    numberChildren = 'none';
    if(combined_children === 1){numberChildren='one';}
    else if(combined_children === 2){numberChildren='two';}
    else if (combined_children >2){numberChildren='three';}

    /*Calculate benefits and assing to variables*/
    combinedIncome = combined_income_marriage_penalty();
    person1EITC = EITC_benefit('single', person1_income.value, person1_children.value);
    person2EITC = EITC_benefit('single', person2_income.value, person2_children.value);
    combinedEITC = person1EITC + person2EITC;
    marriedEITC = EITC_benefit('married', combinedIncome, numberChildren);
    
    /* Print updated data to screen*/
    document.getElementById('individual_eitc_values').innerHTML = 'Your EITC is worth <b>$' + person1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + person2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined EITC of <b>$" + combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('married_eitc_value').innerHTML = "With a combined income of $" + combinedIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"</b>.";

    /* Print marriage penalty to screen */
    penalty = combinedEITC - marriedEITC;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>bonus</em> of <b>$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else{
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>penalty</em> of <b>$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
}

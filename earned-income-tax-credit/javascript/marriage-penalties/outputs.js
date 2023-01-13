/*Default values */
document.getElementById('mp_individual_values').innerHTML = "Your EITC is worth <b>$2,156</b> and your partner's EITC is worth <b>$496</b>,</br> for a combined EITC of <b>$2,652</b>.";
document.getElementById('mp_married_value').innerHTML = "With a combined income of $40,000, if you married your EITC would be worth <b>$1,548</b>.";
document.getElementById('mp_marriage_penalty').innerHTML = 'You face a <b><p class="inline red">marriage penalty</p></b> of <b><p class="inline red">$1,104</p></b>';

function mp_outputs(){
    p1Income = mp_person1_income.value;
    p2Income = mp_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    p1Children = mp_person1_children.value;
    p2Children = mp_person2_children.value;
    numChildren = sum_children(p1Children, p2Children);

    /* EITC values*/
    p1EITC = eitc_value_2023(p1Income, 'single', p1Children);
    p2EITC = eitc_value_2023(p2Income, 'single', p2Children);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = eitc_value_2023(combinedIncome, 'married', numChildren);
    
    /* Print updated data to screen*/
    document.getElementById('mp_individual_values').innerHTML = 'Your EITC is worth <b>$' + p1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>,</br> for a combined EITC of <b>$" + combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('mp_married_value').innerHTML = "With a combined income of $" + combinedIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"</b>.";

    /* Print marriage penalty to screen */
    penalty = combinedEITC - marriedEITC;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('mp_marriage_penalty').innerHTML = 'You face a marriage <b><p class="inline green">marriage bonus</p></b> of <b><p class="inline green">$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else{
        document.getElementById('mp_marriage_penalty').innerHTML = 'You face a <b><p class="inline red">marriage penalty</p></b> of <b><p class="inline red">$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
}

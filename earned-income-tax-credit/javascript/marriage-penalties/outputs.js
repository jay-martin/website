/*Default values */
document.getElementById('mp_individual_values').innerHTML = "Your EITC is worth <b>$2,156</b> and your partner's EITC is worth <b>$496</b>,</br> for a combined EITC of <b>$2,652</b>.";
document.getElementById('mp_married_value').innerHTML = "With a combined income of $40,000, if you married your EITC would be worth <b>$1,548</b>.";
document.getElementById('mp_marriage_penalty').innerHTML = 'You face a <b><p class="inline red">marriage penalty</p></b> of <b><p class="inline red">$1,104</p></b>';

function marriage_penalty_intuitive_outputs(){
    let p1_income = mp_person1_income.value;
    let p2_income = mp_person2_income.value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    let p1_children = mp_person1_children.value;
    let p2_children = mp_person2_children.value;
    let num_children = sum_children(p1_children, p2_children);

    let p1_eitc = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc = eitc_value_2023(combined_income, 'married', num_children);
    
    document.getElementById('mp_individual_values').innerHTML = 'Your EITC is worth <b>$' + p1_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>,</br> for a combined EITC of <b>$" + combined_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('mp_married_value').innerHTML = "With a combined income of $" + combined_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + married_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"</b>.";

    let penalty = combined_eitc - married_eitc;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('mp_marriage_penalty').innerHTML = 'You face a marriage <b><p class="inline green">marriage bonus</p></b> of <b><p class="inline green">$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else{
        document.getElementById('mp_marriage_penalty').innerHTML = 'You face a <b><p class="inline red">marriage penalty</p></b> of <b><p class="inline red">$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
}

function marriage_penalty_values_outputs(){
    let p1_income = mp_person1_income.value;
    let p2_income = mp_person2_income.value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    let p1_children = mp_person1_children.value;
    let p2_children = mp_person2_children.value;
    let num_children = sum_children(p1_children, p2_children);

    let p1_eitc = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc = eitc_value_2023(combined_income, 'married', num_children);

    let penalty = combined_eitc - married_eitc;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('mp_individual_values').innerHTML = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, if your income was <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> you would face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else{
        document.getElementById('mp_individual_values').innerHTML = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, if your income was <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> you would face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
}

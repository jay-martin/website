/*Default values */
document.getElementById('values_output').innerHTML = "With your partner's income fixed at <b>$10,000</b>, if your income was <b>$30,000</b> you would face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,104</p></b>";

function values_outputs(){
    p1Income = values_person1_income.value;
    p2Income = values_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    p1Children = values_person1_children.value;
    p2Children = values_person2_children.value;
    numChildren = sum_children(p1Children, p2Children);

    // EITC values
    p1EITC = eitc_value_2023(p1Income, 'single', p1Children);
    p2EITC = eitc_value_2023(p2Income, 'single', p2Children);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = eitc_value_2023(combinedIncome, 'married', numChildren);

    penalty = combinedEITC - marriedEITC;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('values_output').innerHTML = "With your partner's income fixed at <b>$" + p2Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, if your income was <b>$" + p1Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> you would face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else{
        document.getElementById('values_output').innerHTML = "With your partner's income fixed at <b>$" + p2Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, if your income was <b>$" + p1Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> you would face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
}

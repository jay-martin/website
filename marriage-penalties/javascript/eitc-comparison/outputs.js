/*Default values */
document.getElementById('eitc_reform_individual').innerHTML = "Your EITC is worth <b>$3,995</b> and your partner's EITC is worth <b>$3,995</b>, for a combined EITC benefit <b>$7,990</b>.";
document.getElementById('eitc_reform_married').innerHTML =    "With a combined income of $35,000, if you married your EITC would be worth <b>$7,990</b>.";
document.getElementById('eitc_reform_penalty').innerHTML =    "Thus, if you married your family's EITC benefit would <b>stay the same</b>.";

document.getElementById('existing_individual').innerHTML = "Your EITC is worth <b>$3,995</b> and your partner's EITC is worth <b>$3,995</b>, for a combined EITC benefit <b>$7,990</b>.";
document.getElementById('existing_married').innerHTML =    "With a combined income of $35,000, if you married your EITC would be worth <b>$5,155</b>.";
document.getElementById('existing_penalty').innerHTML =    "Thus, if you married your family's EITC benefit would <b><p class='inline red'>decrease by $2,835</p></b>.";

eitc_fix_outputs_isClicked = false;

function show_eitc_fix_values(){
    if(eitc_fix_outputs_isClicked){
        document.getElementById('eitc_fix_outputs').style.display = 'none';
        document.getElementById('existing_outputs').style.display = 'none';
        document.getElementById('eitc_fix_outputs_button').value = 'Show Values'
        eitc_fix_outputs_isClicked = false;
    }
    else{
        document.getElementById('eitc_fix_outputs').style.display = 'block';
        document.getElementById('existing_outputs').style.display = 'block';
        document.getElementById('eitc_fix_outputs_button').value = 'Hide Values'
        eitc_fix_outputs_isClicked = true;
    }
}

function eitc_reform_outputs(){
    // Variables for income
    p1Income = eitc_reform_person1_income.value;
    p2Income = eitc_reform_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // Variables for number of children
    person1_num_children = eitc_fix_person1_numchildren.value;
    person2_num_children = eitc_fix_person2_numchildren.value;
    combined_children    = sum_children(person1_num_children, person2_num_children);

    // Reformed EITC Values
    p1EITC = eitc_value_2023(p1Income, 'single', person1_num_children);
    p2EITC = eitc_value_2023(p2Income, 'single', person2_num_children);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = reformed_eitc_values_married(combinedIncome);

    // Reformed EITC Outputs
    bonus = marriedEITC - combinedEITC;
    document.getElementById('eitc_reform_individual').innerHTML = "Your EITC is worth <b>$" + p1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined EITC benefit <b>$" + combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('eitc_reform_married').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";

    if(bonus.toFixed(0) > 0){
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <b><p class='inline green'>increase by $" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }
    else if(bonus.toFixed(0) == 0){
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <b>stay the same</b>.";
    }
    else{
        bonus = bonus * -1;
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <b><p class='inline red'>decrease by $" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }

    // Existing EITC Values
    p1_existing_eitc = eitc_value_2023(p1Income, 'single', person1_num_children);
    p2_existing_eitc = eitc_value_2023(p2Income, 'single', person2_num_children);
    combined_existing_eitc = p1_existing_eitc + p2_existing_eitc;
    married_existing_eitc = eitc_value_2023(combinedIncome, 'married', combined_children);

    // Existing EITC Outputs
    existing_penalty = combined_existing_eitc - married_existing_eitc;
    document.getElementById('existing_individual').innerHTML = "Your EITC is worth <b>$" + p1_existing_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2_existing_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined EITC benefit <b>$" + combined_existing_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('existing_married').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + married_existing_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    if(existing_penalty.toFixed(0) > 0){
        document.getElementById('existing_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <b><p class='inline red'>decrease by $" + existing_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }
    else if(existing_penalty.toFixed(0) == 0){
        document.getElementById('existing_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <b>stay the same</b>.";
    }
    else{
        existing_penalty = existing_penalty * -1;
        document.getElementById('existing_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <b><p class='inline green'>increase by $" + existing_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }

}
/*Default values */
document.getElementById('eitc_reform_individual').innerHTML = "Your EITC is worth <b>$3,000</b> and your partner's EITC is worth <b>$3,000</b>, for a combined EITC benefit <b>$6,000</b>.";
document.getElementById('eitc_reform_married').innerHTML =    "With a combined income of $35,000, if you married your EITC would be worth <b>$6,000</b>.";
document.getElementById('eitc_reform_penalty').innerHTML =    "Thus, if you married your family's EITC benefit would not change.";

document.getElementById('existing_individual').innerHTML = "Your EITC is worth <b>$3,400</b> and your partner's EITC is worth <b>$3,733</b>, for a combined EITC benefit <b>$7,133</b>.";
document.getElementById('existing_married').innerHTML =    "With a combined income of $35,000, if you married your EITC would be worth <b>$6,164</b>.";
document.getElementById('existing_penalty').innerHTML =    "Thus, if you married your family's EITC benefit would <em>decrease</em> by <b>$969</b>.";

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
    combined_children    = 'one'
    if(person1_num_children === 'one' && person2_num_children === 'one'){combined_children = 'two';}
    else if(person1_num_children === 'none' && person2_num_children === 'none'){combined_children = 'none';}

    // Reformed EITC Values
    p1EITC = reformed_eitc_values_single(p1Income);
    p2EITC = reformed_eitc_values_single(p2Income);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = reformed_eitc_values_married(combinedIncome);

    // Reformed EITC Outputs
    bonus = marriedEITC - combinedEITC;
    document.getElementById('eitc_reform_individual').innerHTML = "Your EITC is worth <b>$" + p1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined EITC benefit <b>$" + combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('eitc_reform_married').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";

    if(bonus > 0){
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <em>increase</em> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else if(bonus == 0){
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would not change.";
    }
    else{
        bonus = bonus * -1;
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <em>decrease</em> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }

    // Existing EITC Values
    p1_existing_eitc = existing_eitc_value(p1Income, 'single', person1_num_children);
    p2_existing_eitc = existing_eitc_value(p2Income, 'single', person2_num_children);
    combined_existing_eitc = p1_existing_eitc + p2_existing_eitc;
    married_existing_eitc = existing_eitc_value(combinedIncome, 'married', combined_children);

    // Existing EITC Outputs
    existing_penalty = combined_existing_eitc - married_existing_eitc;
    document.getElementById('existing_individual').innerHTML = "Your EITC is worth <b>$" + p1_existing_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2_existing_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined EITC benefit <b>$" + combined_existing_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('existing_married').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + married_existing_eitc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    if(existing_penalty > 0){
        document.getElementById('existing_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <em>decrease</em> by <b>$" + existing_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else if(existing_penalty == 0){
        document.getElementById('existing_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would not change.";
    }
    else{
        existing_penalty = existing_penalty * -1;
        document.getElementById('existing_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <em>increase</em> by <b>$" + existing_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }

}
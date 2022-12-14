/*Default values */
document.getElementById('eitc_reform_individual').innerHTML = "Your EITC is worth <b>$3,000</b> and your partner's EITC is worth <b>$3,000</b>, for a combined EITC benefit <b>$6,000</b>.";
document.getElementById('eitc_reform_married').innerHTML =    "With a combined income of $30,000, if you married your EITC would be worth <b>$6,000</b>.";
document.getElementById('eitc_reform_penalty').innerHTML =    "Thus, if you married your family's EITC benefit would not change.";

function eitc_reform_outputs(){
    p1Income = eitc_reform_person1_income.value;
    p2Income = eitc_reform_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // EITC Values
    p1EITC = reformed_eitc_values_single(p1Income);
    p2EITC = reformed_eitc_values_single(p2Income);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = reformed_eitc_values_married(combinedIncome);

    // Outputs
    bonus = marriedEITC - combinedEITC;
    document.getElementById('eitc_reform_individual').innerHTML = "Your EITC is worth <b>$" + p1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + p2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined EITC benefit <b>$" + combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('eitc_reform_married').innerHTML =        "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";

    if(bonus > 0){
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <em>increase</em> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else if(bonus == 0){
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would not change.";
    }
    else{
        document.getElementById('eitc_reform_penalty').innerHTML =  "Thus, if you married your family's EITC benefit would <em>decrease</em> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }

}
/****************************** Intuitive Chart *********************************/
/*Default values */
document.getElementById('marriage_penalty_individual').innerHTML = "You owe <b>$6,790</b> in taxes and your partner owes <b>$2,918</b>, for a combined tax liability of <b>$9,708</b>.";
document.getElementById('marriage_penalty_married').innerHTML =    "With a combined income of $120,000, if you married you would owe <b>$10,921</b> in taxes.";
document.getElementById('marriage_penalty_bonus').innerHTML =      "Thus, if you married your family's taxes would <b><p class='inline red'>increase by $1,213</p></b>.";

function marriage_penalty_intuitive_outputs(){
    p1Income = marriage_penalty_person1_income.value;
    p2Income = marriage_penalty_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // Tax liabilities
    if(marriage_penalty_person1_filing_status.value === 'single'){
        p1Tax = tax_liability_2023('single', p1Income);
    }
    else{
        p1Tax = tax_liability_2023('hoh', p1Income);
    }
    if(marriage_penalty_person2_filing_status.value === 'single'){ 
        p2Tax = tax_liability_2023('single', p2Income); 
    }
    else{ 
        p2Tax = tax_liability_2023('hoh', p2Income); 
    }
    combinedTax = p1Tax + p2Tax;
    marriedTax = tax_liability_2023('married', combinedIncome);

    // Outputs
    document.getElementById('marriage_penalty_individual').innerHTML = "You owe <b>$" + p1Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes and your partner owes <b>$" + p2Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined tax liability of <b>$" + combinedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('marriage_penalty_married').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would owe <b>$" + marriedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes.";

    penalty = marriedTax - combinedTax;
    if(penalty.toFixed(0) > 0){
        document.getElementById('marriage_penalty_bonus').innerHTML = "Thus, if you married your family's taxes would <b><p class='inline red'>increase by $" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }
    else if(penalty.toFixed(0) == 0){
        document.getElementById('marriage_penalty_bonus').innerHTML = "Thus, if you married your family's taxes would <b>not change</b>.";
    }
    else{
        penalty = penalty * -1;
        document.getElementById('marriage_penalty_bonus').innerHTML = "Thus, if you married your family's taxes would <b><p class='inline green'>decrease by $" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }

}

/****************************** Values Chart *********************************/
function marriage_penalty_values_outputs(){
    p1_income = marriage_penalty_person1_income.value;
    p2_income = marriage_penalty_person2_income.value;
    combined_income = parseInt(p1_income) + parseInt(p2_income);

    p1_filing_status = marriage_penalty_person1_filing_status.value;
    p2_filing_status = marriage_penalty_person2_filing_status.value;

    // Tax liability values
    p1_tax = tax_liability_2023(p1_filing_status, p1_income);
    p2_tax = tax_liability_2023(p2_filing_status, p2_income);
    combined_tax = p1_tax + p2_tax;
    married_tax = tax_liability_2023('married', combined_income);

    penalty = married_tax - combined_tax;
    if(penalty < 0){
        penalty = penalty * -1;
        document.getElementById('marriage_penalty_individual').innerHTML = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, if your income was <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> you would face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else{
        document.getElementById('marriage_penalty_individual').innerHTML = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, if your income was <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> you would face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
}

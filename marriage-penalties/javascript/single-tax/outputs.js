/*Default values */
document.getElementById('single_tax_individual_values').innerHTML = "You owe <b>$9,861</b> in taxes and your partner owes <b>$2,918</b>, for a combined tax liability of <b>$12,779</b>.";
document.getElementById('single_tax_married_value').innerHTML =    "With a combined income of $120,000, if you married you would owe <b>$10,921</b> in taxes.";
document.getElementById('single_tax_bonus').innerHTML =      "Thus, if you married your family's taxes would <b><p class='inline green'>decrease by $1,858</p></b>.";

function single_tax_outputs(){
    p1Income = single_tax_person1_income.value;
    p2Income = single_tax_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // Tax liabilities
    p1Tax = tax_liability_2023('single', p1Income);
    p2Tax = tax_liability_2023('single', p2Income);
    combinedTax = p1Tax + p2Tax;
    marriedTax = tax_liability_2023('married', combinedIncome);

    // Outputs
    bonus = combinedTax - marriedTax;
    document.getElementById('single_tax_individual_values').innerHTML = "You owe <b>$" + p1Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes and your partner owes <b>$" + p2Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined tax liability of <b>$" + combinedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('single_tax_married_value').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would owe <b>$" + marriedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes.";
    if(bonus.toFixed(0) == 0){
        document.getElementById('single_tax_bonus').innerHTML = "Thus, if you married your family's taxes would <b>remain the same</b>."
    }
    else{
        document.getElementById('single_tax_bonus').innerHTML =  "Thus, if you married your family's taxes would <b><p class='inline green'>decrease by $" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }
}
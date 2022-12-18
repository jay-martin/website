/*Default values */
document.getElementById('hoh_fix_individual').innerHTML = "You owe <b>$9,861</b> in taxes and your partner owes <b>$2,918</b>, for a combined tax liability of <b>$12,779</b>.";
document.getElementById('hoh_fix_married').innerHTML =    "With a combined income of $120,000, if you married you would owe <b>$10,921</b> in taxes.";
document.getElementById('hoh_fix_bonus').innerHTML =      "Thus, if you married your family's taxes would <em>decrease</em> by <b>$1,858</b>.";

function hoh_fix_outputs(){
    p1Income = hoh_fix_person1_income.value;
    p2Income = hoh_fix_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // Tax liabilities
    p1Tax = tax_liability_2023('single', p1Income);
    p2Tax = tax_liability_2023('single', p2Income);
    combinedTax = p1Tax + p2Tax;
    marriedTax = tax_liability_2023('married', combinedIncome);

    // Outputs
    bonus = combinedTax - marriedTax;
    document.getElementById('hoh_fix_individual').innerHTML = "You owe <b>$" + p1Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes and your partner owes <b>$" + p2Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined tax liability of <b>$" + combinedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('hoh_fix_married').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would owe <b>$" + marriedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes.";
    document.getElementById('hoh_fix_bonus').innerHTML =      "Thus, if you married your family's taxes would <em>decrease</em> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";

}
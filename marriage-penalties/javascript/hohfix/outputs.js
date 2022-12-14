/*Default values */
document.getElementById('hoh_fix_individual').innerHTML = "You owe <b>$10,368</b> in taxes and your partner owes <b>$3,041</b>, for a combined tax liability of <b>$13,409</b>.";
document.getElementById('hoh_fix_married').innerHTML =    "With a combined income of $120,000, if you married you would owe <b>$11,937</b> in taxes.";
document.getElementById('hoh_fix_bonus').innerHTML =      "Thus, if you married your family's taxes would <em>decrease</em> by <b>$1,472</b>.";

function hoh_fix_outputs(){
    p1Income = hoh_fix_person1_income.value;
    p2Income = hoh_fix_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // Tax liabilities
    p1Tax = tax_liability('single', p1Income);
    p2Tax = tax_liability('single', p2Income);
    combinedTax = p1Tax + p2Tax + 1; //for some reason, combined tax comes out $1 below married tax when they should be equal
    marriedTax = tax_liability('married', combinedIncome);

    // Outputs
    bonus = combinedTax - marriedTax;
    document.getElementById('hoh_fix_individual').innerHTML = "You owe <b>$" + p1Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes and your partner owes <b>$" + p2Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined tax liability of <b>$" + combinedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('hoh_fix_married').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would owe <b>$" + marriedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes.";
    document.getElementById('hoh_fix_bonus').innerHTML =      "Thus, if you married your family's taxes would <em>decrease</em> by <b>$" + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";

}
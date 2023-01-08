/*Default values */
document.getElementById('hoh_tax_individual').innerHTML = "You owe <b>$6,800</b> in taxes and your partner owes <b>$2,918</b>, for a combined tax liability of <b>$9,718</b>.";
document.getElementById('hoh_tax_married').innerHTML =    "With a combined income of $120,000, if you married you would owe <b>$10,921</b> in taxes.";
document.getElementById('hoh_tax_penalty').innerHTML =      "Thus, if you married your family's taxes would <b><p class='inline red'>increase by $1,203</p></b>.";

function hoh_tax_outputs(){
    p1Income = hoh_tax_person1_income.value;
    p2Income = hoh_tax_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    // Tax liabilities
    if(hoh_tax_person1_filing_status.value === 'single'){
        p1Tax = tax_liability_2023('single', p1Income);
    }
    else{
        p1Tax = tax_liability_2023('hoh', p1Income);
    }
    if(hoh_tax_person2_filing_status.value === 'single'){ 
        p2Tax = tax_liability_2023('single', p2Income); 
    }
    else{ 
        p2Tax = tax_liability_2023('hoh', p2Income); 
    }
    combinedTax = p1Tax + p2Tax;
    marriedTax = tax_liability_2023('married', combinedIncome);

    // Outputs
    document.getElementById('hoh_tax_individual').innerHTML = "You owe <b>$" + p1Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes and your partner owes <b>$" + p2Tax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined tax liability of <b>$" + combinedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('hoh_tax_married').innerHTML =    "With a combined income of $" + combinedIncome.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married you would owe <b>$" + marriedTax.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> in taxes.";

    penalty = marriedTax - combinedTax;
    if(penalty.toFixed(0) > 0){
        document.getElementById('hoh_tax_penalty').innerHTML = "Thus, if you married your family's taxes would <b><p class='inline red'>increase by $" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }
    else if(penalty.toFixed(0) == 0){
        document.getElementById('hoh_tax_penalty').innerHTML = "Thus, if you married your family's taxes would <b>not change</b>.";
    }
    else{
        penalty = penalty * -1;
        document.getElementById('hoh_tax_penalty').innerHTML = "Thus, if you married your family's taxes would <b><p class='inline green'>decrease by $" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>.";
    }

}
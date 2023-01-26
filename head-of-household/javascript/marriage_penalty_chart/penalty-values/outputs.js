/*Default values */
document.getElementById('values_output').innerHTML = "With your partner's income fixed at <b>$40,000</b>, if your income was <b>$80,000</b> you would face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,213</p></b>";

function values_outputs(){
    p1_income = values_person1_income.value;
    p2_income = values_person2_income.value;
    combined_income = parseInt(p1_income) + parseInt(p2_income);

    p1_filing_status = values_person1_filing_status.value;
    p2_filing_status = values_person2_filing_status.value;

    // Tax liability values
    p1_tax = tax_liability_2023(p1_filing_status, p1_income);
    p2_tax = tax_liability_2023(p2_filing_status, p2_income);
    combined_tax = p1_tax + p2_tax;
    married_tax = tax_liability_2023('married', combined_income);

    penalty = married_tax - combined_tax;
    if(penalty < 0){
        penalty = penalty * -1;
        document.getElementById('values_output').innerHTML = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, if your income was <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> you would face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else{
        document.getElementById('values_output').innerHTML = "With your partner's income fixed at <b>$" + p2_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, if your income was <b>$" + p1_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> you would face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$" + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
}

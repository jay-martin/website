/*Default values */
document.getElementById('fsa_CA_benefit').innerHTML = 'Under the Family Security Act, your child benefit is <b>$3,000</b>.';
document.getElementById('CTC_benefit').innerHTML = 'Under existing law (2022), your child tax credit is <b>$2,000</b>.';
document.getElementById('CA_benefit_difference').innerHTML = "Your child benefit <b><p class='inline green'>increases</p></b> by <b><p class='inline green'>$1,000</p></b>.";

/* Outputs benefit values */
function new_benefits_CA(){
    numYoung = num_young(child_benefit_young_children.value);
    numOld = num_old(child_benefit_old_children.value);

    benefits = child_benefit_difference(child_benefit_income.value, child_benefit_filing_status.value, numYoung, numOld, fsa1_or_2_CA.value);

    document.getElementById('fsa_CA_benefit').innerHTML = 'Under the Family Security Act, your child benefit is <b>$' + benefits[0].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
    document.getElementById('CTC_benefit').innerHTML = 'Under existing law (2022), your child tax credit is <b>$' + benefits[1].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
    document.getElementById('CA_benefit_difference').innerHTML = "Your child benefit <b><p class='inline green'>increases</p></b> by <b><p class='inline green'>$" + benefits[2].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</p></b>.';
}
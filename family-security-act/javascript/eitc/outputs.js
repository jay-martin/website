/*Default values */
document.getElementById('fsaEITC').innerHTML = 'Under the Family Security Act, your EITC is <b>$3,000</b>';
document.getElementById('currEITC').innerHTML = 'Under existing law (2022), your EITC is <b>$3,733</b>';
document.getElementById('diffEITC').innerHTML = "Under the Family Security Act, your EITC would <b><p class='inline red'>decrease</p></b> by <b><p class='inline red'>$733</b>";

/* Prints the benefit amounts and the difference between them */
function output_eitc(){
    numChildren = num_children_eitc(numchildren_eitc.value);
    fsa = fsa_eitc_calculate(eitc_income.value, filingstatus_eitc.value, numChildren);
    current = existingEITC(eitc_income.value, filingstatus_eitc.value, numChildren);
    difference = fsa-current;

    document.getElementById('fsaEITC').innerHTML = 'Under the Family Security Act, your EITC is <b>$' + fsa.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',' + '</b>');
    document.getElementById('currEITC').innerHTML = 'Under existing law (2022), your EITC is <b>$' + current.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>';
    if(difference < 0){
        document.getElementById('diffEITC').innerHTML = "Under the Family Security Act, your EITC would <b><p class='inline red'>decrease</p></b> by <b><p class='inline red'>$" + (difference.toFixed()*-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
    else{
        document.getElementById('diffEITC').innerHTML = "Under the Family Security Act, your EITC would <b><p class='inline green'>increase</p></b> by <b><p class='inline green'>$" + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>";
    }
}
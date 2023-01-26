/*Default values */
document.getElementById('benefit_max_difference').innerHTML = "Your benefit is <b>$3,025</b> less than the max.";

function regressive_outputs(){
    income = income_regressive.value;

    // HOH Benefit
    difference = 4177 - hoh_tax_difference_2023(income, '0');

    // Outputs
    document.getElementById('benefit_max_difference').innerHTML = "Your benefit is <b>$" + difference.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> less than the max.";
}
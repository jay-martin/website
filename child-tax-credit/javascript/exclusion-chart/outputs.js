// Default values
document.getElementById('exclusion_output').innerHTML = "You are excluded from <b>$2,125</b> worth of benefits, on account of you not having enough money.";

function exclusion_outputs(){
    let income = exclusion_income.value;
    let filing_status = exclusion_filing_status.value;
    let num_children = exclusion_num_children.value;
    let max_benefit = ctc_max_benefit(num_children);

    let difference = max_benefit - ctc_value_2023(income, filing_status, num_children);

    // Outputs
    document.getElementById('exclusion_output').innerHTML = "You are excluded from <b>$" + difference.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> worth of benefits, on account of you not having enough money.";
}
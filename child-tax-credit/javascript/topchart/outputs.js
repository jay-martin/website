/******************************************************************************************
 * This file contains the functions that outputs to the screen EITC values
 * ****************************************************************************************/

/* Outputs EITC Values */
function top_chart_outputs(){
    income = user_income.value;
    filingStatus = filing_status.value;
    numChildren = num_children.value;

    ctc_string   = ctc_value_2023(income, filingStatus, numChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('ctc_output').innerHTML = 'Your child tax credit is worth <b>$' + ctc_string + '</b>';
}
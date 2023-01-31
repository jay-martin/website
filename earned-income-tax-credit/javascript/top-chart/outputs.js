/******************************************************************************************
 * This file contains the functions that outputs to the screen EITC values
 * ****************************************************************************************/

/* Outputs for the top chart */
function top_chart_outputs(){
    income       = user_income.value;
    filingStatus = filing_status.value;
    numChildren  = top_num_children.value;

    eitcValue = eitc_value_2023(income, filingStatus, numChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById('eitc-value').innerHTML = 'Your EITC is worth <b>$' + eitcValue + '</b>';
}
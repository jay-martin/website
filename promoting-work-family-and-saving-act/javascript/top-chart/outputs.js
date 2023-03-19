function top_chart_outputs(){
    income       = top_chart_income.value;
    filingStatus = top_chart_filing_status.value;
    numChildren  = top_chart_num_children.value;

    ctc_string   = ctc_value_2023(income, filingStatus, numChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('ctc_output').innerHTML = 'Your child tax credit is worth <b>$' + ctc_string + '</b>';
}
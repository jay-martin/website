/* Outputs CDCC Values to the top chart */
function top_chart_outputs(){
    income = user_income.value;
    filingStatus = filing_status.value;
    numChildren = num_children.value;

    credit_amount = cdcc_amount_2023(income, filingStatus, numChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('credit_amount').innerHTML = 'Your credit is worth up to: <b>$' + credit_amount + '</b>';
}

/* Outputs CDCC Values to the complexity chart */
function complexity_chart_outputs(){
    income = complexity_income.value;
    filingStatus = complexity_filing_status.value;
    numChildren = complexity_num_children.value;

    credit_amount = cdcc_amount_2023(income, filingStatus, numChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    credit_rate = (cdcc_rate(income) * 100).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    document.getElementById('complexity_credit_amount').innerHTML = 'Your credit is worth up to: <b>$' + credit_amount + '</b>';
    document.getElementById('complexity_credit_rate').innerHTML = 'The credit rate at your income is: <b>' + credit_rate + '%</b>';
}
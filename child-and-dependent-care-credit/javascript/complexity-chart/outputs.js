/* Outputs CDCC Values to the complexity chart */
function complexity_chart_outputs(){
    income = user_income.value;
    numChildren = num_children.value;

    credit_amount = cdcc_amount_2023(income, 'single', numChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('complexity_credit_amount').innerHTML = 'Your credit is worth up to: <b>$' + credit_amount + '</b>';
}
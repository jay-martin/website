function modify_income(){
    income = user_income.value;
    filingStatus = filing_status.value;
    numChildren = num_children.value;

    topChart.xgrids([{value: income, text:'Your income'}]);
    topChart.load({
        columns: [
            ['x_point', income],
            ['point_credit_amount', cdcc_amount_2023(income, filingStatus, numChildren)],
        ]
    });
}


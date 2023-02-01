function top_modify_income(){
    income        = top_income.value;
    filing_status = top_filing_status.value;
    num_children  = top_num_children.value;

    top_chart.xgrids([{value: income, text:'Your income'}]);
    top_chart.load({
        columns: [
            ['x_point', income],
            ['point_credit_amount', cdcc_amount_2023(income, filing_status, num_children)],
            ['point_credit_rate', cdcc_rate(income)],
        ]
    });
}
/******************************************************************************************
 * This file controls adjustments to the Top Chart
 * ****************************************************************************************/
/* Moves the income slider of the top chart */
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

/* Moves the income slider of the complexity chart */
function complexity_modify_income(){
    income = complexity_income.value;
    filingStatus = complexity_filing_status.value;
    numChildren = complexity_num_children.value;

    complexityChart.xgrids([{value: income, text:'Your income'}]);
    complexityChart.load({
        columns: [
            ['x_point', income],
            ['point_credit_amount', cdcc_amount_2023(income, filingStatus, numChildren)],
            ['point_credit_rate', cdcc_rate(income)],
        ]
    });
}


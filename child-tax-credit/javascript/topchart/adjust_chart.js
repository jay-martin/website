/******************************************************************************************
 * This file controls adjustments to the Top Chart
 * ****************************************************************************************/

/* Moves the income slider */
function modify_income(){
    income = user_income.value;
    filingStatus = filing_status.value;
    numChildren = num_children.value;

    topChart.xgrids([{value: income, text:'Your income'}]);
    topChart.load({
        columns: [
            ['x_point', income],
            ['point',   ctc_value_2023(income, filingStatus, numChildren)],
        ]
    });
}

/* Adjusts the curve according to filing status and number of children */
function adjust_curve(){
    numChildren = num_children.value;
    filingStatus = filing_status.value;

    if(filingStatus === 'single'){
        single_ctc_builder_2023(topChart, 'x', 'ctc', numChildren);
    }
    else if(filingStatus === 'hoh'){
        hoh_ctc_builder_2023(topChart, 'x', 'ctc', numChildren);
    }
    else if(filingStatus === 'married'){
        married_ctc_builder_2023(topChart, 'x', 'ctc', numChildren);
    }
}
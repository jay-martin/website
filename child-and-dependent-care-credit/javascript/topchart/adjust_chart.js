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
            ['point_credit_amount', cdcc_amount_2023(income, filingStatus, numChildren)],
        ]
    });
}

/* Adjusts chart according to user inputs */
function build_cdcc(){
    filingStatus = filing_status.value;
    numChildren = num_children.value;

    if(filingStatus === 'single' && numChildren === 'one'){
        topChart.axis.max({y: 1000});
        topChart.load({
            columns: [
                ['x_credit_amount', 0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     915,   900,   900,   870,   870,   840,   840,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],
            ]
        });
    }
    else if(filingStatus === 'single' && numChildren === 'two'){
        topChart.axis.max({y: 2000});
        topChart.load({
            columns: [
                ['x_credit_amount', 0, 13850, 24850, 29183, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     1100,  1620,  1620,  1560,  1560,  1500,  1500,  1440,  1440,  1380,  1380,  1320,  1320,  1260,  1260,  1200,  1200],
            ]
        });
    }
    else if(filingStatus === 'hoh' && numChildren === 'one'){
        topChart.axis.max({y: 1000});
        topChart.load({
            columns: [
                ['x_credit_amount', 0, 20800, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     820,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],
            ]
        });
    }
    else if(filingStatus === 'hoh' && numChildren === 'two'){
        topChart.axis.max({y: 2000});
        topChart.load({
            columns: [
                ['x_credit_amount', 0, 20800, 35200, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     1440,  1440,  1380,  1380,  1320,  1320,  1260,  1260,  1200,  1200],
            ]
        });
    }
    else if(filingStatus === 'married' && numChildren === 'one'){
        topChart.axis.max({y: 1000});
        topChart.load({
            columns: [
                ['x_credit_amount', 0, 27700, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     730,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],
            ]
        });
    }
    else if(filingStatus === 'married' && numChildren === 'two'){
        topChart.axis.max({y: 2000});
        topChart.load({
            columns: [
                ['x_credit_amount', 0, 27700, 40900, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     1320,  1320,  1260,  1260,  1200,  1200],
            ]
        });
    }
}


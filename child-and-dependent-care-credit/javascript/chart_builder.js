/* Builds the CDCC credit value chart according to user inputs */
function build_cdcc_amount_chart(chart_name, filing_status_name, num_children_name){
    filingStatus = document.getElementById(filing_status_name).value;
    numChildren = document.getElementById(num_children_name).value;

    if(filingStatus === 'single' && numChildren === 'one'){
        chart_name.load({
            columns: [
                ['x_credit_amount', 0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     915,   900,   900,   870,   870,   840,   840,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],
            ]
        });
    }
    else if(filingStatus === 'single' && numChildren === 'two'){
        chart_name.load({
            columns: [
                ['x_credit_amount', 0, 13850, 24850, 29183, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     1100,  1620,  1620,  1560,  1560,  1500,  1500,  1440,  1440,  1380,  1380,  1320,  1320,  1260,  1260,  1200,  1200],
            ]
        });
    }
    else if(filingStatus === 'hoh' && numChildren === 'one'){
        chart_name.load({
            columns: [
                ['x_credit_amount', 0, 20800, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     820,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],
            ]
        });
    }
    else if(filingStatus === 'hoh' && numChildren === 'two'){
        chart_name.load({
            columns: [
                ['x_credit_amount', 0, 20800, 35200, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     1440,  1440,  1380,  1380,  1320,  1320,  1260,  1260,  1200,  1200],
            ]
        });
    }
    else if(filingStatus === 'married' && numChildren === 'one'){
        chart_name.load({
            columns: [
                ['x_credit_amount', 0, 27700, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     730,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],
            ]
        });
    }
    else if(filingStatus === 'married' && numChildren === 'two'){
        chart_name.load({
            columns: [
                ['x_credit_amount', 0, 27700, 40900, 41000, 41001, 43000, 43001, 60000],
                ['credit_amount',   0, 0,     1320,  1320,  1260,  1260,  1200,  1200],
            ]
        });
    }
}

/* Adjusts the y-axis for the top chart */
function top_chart_adjust_y_axis(){
    numChildren = num_children.value;
    if(numChildren === 'one'){
        topChart.axis.max({y: 1000});
    }
    else if(numChildren === 'two'){
        topChart.axis.max({y: 2000});
    }
}

/* Adjusts the y-axes for the complexity chart */
function complexity_chart_adjust_y_axis(){
    numChildren = complexity_num_children.value;
    if(numChildren === 'one'){
        complexityChart.axis.max({y2: 1200});
    }
    else if(numChildren === 'two'){
        complexityChart.axis.max({y2: 2400});
    }
}


// Moves the income slider
function exclusion_modify_income(){
    let income = exclusion_income.value;
    let filing_status = exclusion_filing_status.value;
    let num_children = exclusion_num_children.value;
    let max_benefit = ctc_max_benefit(num_children);

    let exclusion = ctc_value_2023(income, filing_status, num_children);
    exclusion_chart.load({
        columns: [
            ['x_line',          income,    income],
            ['difference_line', exclusion, max_benefit],
        ]
    });
}

// adjust curve
function exclusion_adjust_chart(){
    let income = exclusion_income.value;
    let filing_status = exclusion_filing_status.value;
    let num_children = exclusion_num_children.value;
    let max_benefit = ctc_max_benefit(num_children);

    // build ctc curve
    if(filing_status === 'single'){
        single_ctc_builder_2023(exclusion_chart, 'x', 'ctc',     num_children);
    }
    else if(filing_status === 'hoh'){
        hoh_ctc_builder_2023(exclusion_chart, 'x', 'ctc',     num_children);
    }
    else if(filing_status === 'married'){
        married_ctc_builder_2023(exclusion_chart, 'x', 'ctc',     num_children);
    }

    // build max_benefit curve
    let x_vals = ctc_x_and_y_values(filing_status, num_children)[0];
    let y_vals = ctc_x_and_y_values(filing_status, num_children)[1];
    let max_benefit_values = [];
    for(y of y_vals){
        max_benefit_values.push(max_benefit - y);
    }

    // format arrays
    x_vals.unshift('x');
    max_benefit_values.unshift('max_benefit');

    // load to chart
    exclusion_chart.load({ columns: [x_vals, max_benefit_values]});
}

function ctc_max_benefit(num_children){
    if(num_children === 'one'){
        return 2000;
    }
    else if(num_children === 'two'){
        return 4000;
    }
    else if(num_children === 'three'){
        return 6000;
    }
}

function ctc_x_and_y_values(filing_status, num_children){
    if(filing_status === 'single'){
        if(num_children === 'three'){
            return [ [0, 2500, 13850, 24850,  30581, 200000, 320000], [0, 0, 1702.5, 4452.5, 6000, 6000, 0] ];
        }
        else if(num_children === 'two'){
            return [ [0, 2500, 13850, 23040, 200000, 280000], [0, 0, 1702.5, 4000, 4000, 0] ];
        }
        else if(num_children === 'one'){
            return [ [0, 2500, 13167, 13850, 17850, 200000, 240000], [0, 0, 1600,  1600,  2000,  2000, 0] ];
        }
    }
    else if(filing_status === 'hoh'){
        if(num_children === 'three'){
            return [ [0, 2500, 20800, 33820, 200000, 320000], [0, 0, 2745,  6000,  6000, 0] ];
        }
        else if(num_children === 'two'){
            return [ [0, 2500, 20800, 23833, 28800, 200000, 280000], [0, 0, 2745,  3503.25, 4000,  4000, 0] ];
        }
        else if(num_children === 'one'){
            return [ [0, 2500, 13167, 20800, 24800, 200000, 240000], [0, 0, 1600,  1600,  2000,  2000, 0] ];
        }
    }
    else if(filing_status === 'married'){
        if(num_children === 'three'){
            return [ [0, 2500, 27700, 34500, 39700, 400000, 520000], [0, 0, 3780,  5480, 6000, 6000, 0] ];
        }
        else if(num_children === 'two'){
            return [ [0, 2500, 23833, 27700, 35700, 400000, 480000], [0, 0, 3200,  3200, 4000, 4000, 0] ];
        }
        else if(num_children === 'one'){
            return [ [0, 2500, 13167, 27700, 31700, 400000, 440000], [0, 0, 1600,  1600, 2000, 2000, 0 ] ];
        }
    }
}



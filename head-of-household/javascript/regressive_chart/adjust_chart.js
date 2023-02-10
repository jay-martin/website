// Zooms graph on lower incomes
function zoom_regressive(){
    if(zoom_switch_regressive.checked){
        regressive_income.max = "100000";
        regressive_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
        regressive_chart.axis.max({x: 100000});
    }
    else{
        regressive_income.max = "600000";
        regressive_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
        regressive_chart.axis.max({x: 620000});
    }
}

// Moves the income slider 
function modify_income_regressive(){
    let income = regressive_income.value;
    let item_deduct = '0';

    let savings = hoh_tax_difference_2023(income, item_deduct);
    regressive_chart.load({
        columns: [
            ['x_line',          income,  income],
            ['difference_line', savings, 4177],
        ]
    });
}
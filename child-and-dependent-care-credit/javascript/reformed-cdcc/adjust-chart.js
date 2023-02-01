/* Builds the CDCC credit value chart according to user inputs */
function adjust_tax_credit_chart(){
    // Inputs
    credit_rate  = tax_credit_credit_rate.value / 100;
    income_share = tax_credit_income_share.value / 100;
    one_child_credit_max = tax_credit_credit_maximum.value;
    two_child_credit_max = 2 * tax_credit_credit_maximum.value;

    // Required income
    one_child_income = one_child_credit_max / (credit_rate * income_share);
    two_child_income = two_child_credit_max / (credit_rate * income_share);

    // Adjust axes
    tax_credit_adjust_x_axis(two_child_income);
    tax_credit_adjust_y_axis(two_child_credit_max);

    reformedCDCC.load({
        columns: [
            ['x_credit_amount',         0, one_child_income,     two_child_income,     two_child_income+15000],
            ['one_child_credit_amount', 0, one_child_credit_max, one_child_credit_max, one_child_credit_max],
            ['two_child_credit_amount', 0, one_child_credit_max, two_child_credit_max, two_child_credit_max],

            ['x_one_child_vertical_line', one_child_income-1, one_child_income],
            ['one_child_vertical_line',   0,                  one_child_credit_max],

            ['x_one_child_point', one_child_income],
            ['one_child_point',   one_child_credit_max],

            ['x_two_child_vertical_line', two_child_income-1, two_child_income],
            ['two_child_vertical_line',   0,                  two_child_credit_max],

            ['x_two_child_point', two_child_income],
            ['two_child_point',   two_child_credit_max],
        ]
    });
}

/* Adjusts x-axis ticks */
function tax_credit_adjust_x_axis(two_child_income){
    if(two_child_income < 10000){
        reformedCDCC.internal.config.axis_x_tick_values = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000];
    }
    else if(two_child_income < 25000){
        reformedCDCC.internal.config.axis_x_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];
    }
    else if(two_child_income < 100000){
        reformedCDCC.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000];
    }
    else if(two_child_income < 260000){
        reformedCDCC.internal.config.axis_x_tick_values = [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000];
    }
    else if(two_child_income < 585000){
        reformedCDCC.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000];
    }
    else if(two_child_income < 985000){
        reformedCDCC.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];
    }
    else if(two_child_income < 2500000){
        reformedCDCC.internal.config.axis_x_tick_values = [0, 250000, 500000, 750000, 1000000, 1250000, 1500000, 1750000, 2000000, 2250000, 2500000];
    }
    else{
        factor = two_child_income / 5;
        reformedCDCC.internal.config.axis_x_tick_values = [0, factor, factor*2, factor*3, factor*4, factor*5];
    }
}

/* Adjusts y-axis ticks */
function tax_credit_adjust_y_axis(two_child_credit_max){
    if(two_child_credit_max < 1000){
        reformedCDCC.internal.config.axis_y_tick_values = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    }
    else if(two_child_credit_max < 2500){
        reformedCDCC.internal.config.axis_y_tick_values = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250];
    }
    else if(two_child_credit_max < 5000){
        reformedCDCC.internal.config.axis_y_tick_values = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
    }
    else{
        reformedCDCC.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    }
}







/******************************************************************************************
 * This file controls adjustments to the Top Chart
 * ****************************************************************************************/
/* Moves the income slider */
function modify_income(){
    income = user_income.value;

    topChart.xgrids([{value: income, text:'Your income'}]);
    topChart.load({
        columns: [
            ['x_point', income],

            ['point0',   eitc_value_2023(income, 'single',  'none')],
            ['point0M',  eitc_value_2023(income, 'married', 'none')],
            ['point1',   eitc_value_2023(income, 'single',  'one')],
            ['point1M',  eitc_value_2023(income, 'married', 'one')],
            ['point2',   eitc_value_2023(income, 'single',  'two')],
            ['point2M',  eitc_value_2023(income, 'married', 'two')],
            ['point3',   eitc_value_2023(income, 'single',  'three')],
            ['point3M',  eitc_value_2023(income, 'married', 'three')],
        ]
    });
}
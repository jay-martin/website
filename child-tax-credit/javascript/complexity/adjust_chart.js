/******************************************************************************************
 * This file controls adjustments to the Complexity Chart
 * ****************************************************************************************/
/* Moves the income slider */
function complexity_chart_modify_income(){
    let income = complexity_income.value;

    complexity_chart.xgrids([{value: income, text:'Your income'}]);
    complexity_chart.load({
        columns: [
            ['x_point', income],

            ['point1S', ctc_value_2023(income, 'single',  'one')],
            ['point1H', ctc_value_2023(income, 'hoh',     'one')],
            ['point1M', ctc_value_2023(income, 'married', 'one')],
            ['point2S', ctc_value_2023(income, 'single',  'two')],
            ['point2H', ctc_value_2023(income, 'hoh',     'two')],
            ['point2M', ctc_value_2023(income, 'married', 'two')],
            ['point3S', ctc_value_2023(income, 'single',  'three')],
            ['point3H', ctc_value_2023(income, 'hoh',     'three')],
            ['point3M', ctc_value_2023(income, 'married', 'three')],
            ['point4S', ctc_value_2023(income, 'single',  'four')],
            ['point4H', ctc_value_2023(income, 'hoh',     'four')],
            ['point4M', ctc_value_2023(income, 'married', 'four')],
        ]
    });
}
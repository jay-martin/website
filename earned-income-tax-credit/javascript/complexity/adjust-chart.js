// Moves the income slider
function complexity_chart_modify_income(){
    income = complexity_income.value;

    complexity_chart.xgrids([{value: income, text:'Your income'}]);
    complexity_chart.load({
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

// Hides the points and x-grids
function complexity_hide_points_and_x_grid(){
    let is_checked = complexity_hide_income_switch.checked;
    let income     = complexity_income.value;

    if(is_checked){
        complexity_chart.xgrids([]);
        complexity_chart.hide(['point0', 'point0M', 'point1', 'point1M', 'point2', 'point2M', 'point3', 'point3M',]);
    }
    else {
        complexity_chart.xgrids([ {value: income , text: 'Your Income'} ]);
        complexity_chart.show(['point0', 'point0M', 'point1', 'point1M', 'point2', 'point2M', 'point3', 'point3M',]);
    }
}
function complexity_chart_modify_income(){
    let income = complexity_income.value;

    complexity_chart.xgrids([ {value: income, text: 'Your Income'} ]);
    complexity_chart.load({ 
        columns: [
            ['x_point',           income],
            ['single_one_point',  cdcc_amount_2023(income, 'single',   'one')],
            ['single_two_point',  cdcc_amount_2023(income, 'single',   'two')],
            ['hoh_one_point',     cdcc_amount_2023(income, 'hoh',      'one')],
            ['hoh_two_point',     cdcc_amount_2023(income, 'hoh',      'two')],
            ['married_one_point', cdcc_amount_2023(income, 'married',  'one')],
            ['married_two_point', cdcc_amount_2023(income, 'married',  'two')],
        ] 
    });
}

function complexity_screenshot_mode(){
    let is_checked = complexity_screenshot_mode_switch.checked;
    let income     = complexity_income.value;

    if(is_checked){
        $('#complexity_inputs').css('display', 'none');
        $('#complexity_outputs').css('display', 'none');
        $('#complexity_container').css('border', 'none');
        $('#complexity_logo').css('display', 'grid');
        complexity_chart.xgrids([]);
        complexity_chart.hide(['single_one_point', 'single_two_point', 'hoh_one_point', 'hoh_two_point', 'married_one_point', 'married_two_point',]);
    }
    else {
        $('#complexity_inputs').css('display', 'block');
        $('#complexity_outputs').css('display', 'block');
        $('#complexity_container').css('border', 'solid');
        $('#complexity_logo').css('display', 'none');
        complexity_chart.xgrids([ {value: income, text: 'Your Income'} ]);
        complexity_chart.show(['single_one_point', 'single_two_point', 'hoh_one_point', 'hoh_two_point', 'married_one_point', 'married_two_point',]);
    }
}
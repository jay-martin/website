function complexity_chart_outputs(){
    let income = complexity_income.value;

    let one_child_single    = ctc_value_2023(income, 'single',  'one').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let one_child_hoh       = ctc_value_2023(income, 'hoh',     'one').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let one_child_married   = ctc_value_2023(income, 'married', 'one').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let two_child_single    = ctc_value_2023(income, 'single',  'two').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let two_child_hoh       = ctc_value_2023(income, 'hoh',     'two').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let two_child_married   = ctc_value_2023(income, 'married', 'two').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let three_child_single  = ctc_value_2023(income, 'single',  'three').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let three_child_hoh     = ctc_value_2023(income, 'hoh',     'three').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let three_child_married = ctc_value_2023(income, 'married', 'three').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let four_child_single   = ctc_value_2023(income, 'single',  'four').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let four_child_hoh      = ctc_value_2023(income, 'hoh',     'four').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let four_child_married  = ctc_value_2023(income, 'married', 'four').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById('one_child_single_output').innerHTML    = '<b>$' + one_child_single    + '</b>';
    document.getElementById('one_child_hoh_output').innerHTML       = '<b>$' + one_child_hoh       + '</b>';
    document.getElementById('one_child_married_output').innerHTML   = '<b>$' + one_child_married   + '</b>';
    document.getElementById('two_child_single_output').innerHTML    = '<b>$' + two_child_single    + '</b>';
    document.getElementById('two_child_hoh_output').innerHTML       = '<b>$' + two_child_hoh       + '</b>';
    document.getElementById('two_child_married_output').innerHTML   = '<b>$' + two_child_married   + '</b>';
    document.getElementById('three_child_single_output').innerHTML  = '<b>$' + three_child_single  + '</b>';
    document.getElementById('three_child_hoh_output').innerHTML     = '<b>$' + three_child_hoh     + '</b>';
    document.getElementById('three_child_married_output').innerHTML = '<b>$' + three_child_married + '</b>';
    document.getElementById('four_child_single_output').innerHTML   = '<b>$' + four_child_single   + '</b>';
    document.getElementById('four_child_hoh_output').innerHTML      = '<b>$' + four_child_hoh      + '</b>';
    document.getElementById('four_child_married_output').innerHTML  = '<b>$' + four_child_married  + '</b>';
}
function complexity_chart_outputs(){
    let income = complexity_income.value;

    let zero_single   = eitc_value_2023(income, 'single',  'none').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let zero_married  = eitc_value_2023(income, 'married', 'none').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let one_single    = eitc_value_2023(income, 'single',  'one').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let one_married   = eitc_value_2023(income, 'married', 'one').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let two_single    = eitc_value_2023(income, 'single',  'two').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let two_married   = eitc_value_2023(income, 'married', 'two').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let three_single  = eitc_value_2023(income, 'single',  'three').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let three_married = eitc_value_2023(income, 'married', 'three').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById('zero_child_single_output').innerHTML   = '<b>$' + zero_single   + '</b>';
    document.getElementById('zero_child_married_output').innerHTML  = '<b>$' + zero_married  + '</b>';
    document.getElementById('one_child_single_output').innerHTML    = '<b>$' + one_single    + '</b>';
    document.getElementById('one_child_married_output').innerHTML   = '<b>$' + one_married   + '</b>';
    document.getElementById('two_child_single_output').innerHTML    = '<b>$' + two_single    + '</b>';
    document.getElementById('two_child_married_output').innerHTML   = '<b>$' + two_married   + '</b>';
    document.getElementById('three_child_single_output').innerHTML  = '<b>$' + three_single  + '</b>';
    document.getElementById('three_child_married_output').innerHTML = '<b>$' + three_married + '</b>';
}
function complexity_chart_outputs(){
    let income = complexity_income.value;

    let single_one  = cdcc_amount_2023(income, 'single',  'one').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let single_two  = cdcc_amount_2023(income, 'single',  'two').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let hoh_one     = cdcc_amount_2023(income, 'hoh',     'one').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let hoh_two     = cdcc_amount_2023(income, 'hoh',     'two').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let married_one = cdcc_amount_2023(income, 'married', 'one').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let married_two = cdcc_amount_2023(income, 'married', 'two').toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById('one_child_single').innerHTML  = '<b>$' + single_one  + '</b>';
    document.getElementById('two_child_single').innerHTML  = '<b>$' + single_two  + '</b>';
    document.getElementById('one_child_hoh').innerHTML     = '<b>$' + hoh_one     + '</b>';
    document.getElementById('two_child_hoh').innerHTML     = '<b>$' + hoh_two     + '</b>';
    document.getElementById('one_child_married').innerHTML = '<b>$' + married_one + '</b>';
    document.getElementById('two_child_married').innerHTML = '<b>$' + married_two + '</b>';
}
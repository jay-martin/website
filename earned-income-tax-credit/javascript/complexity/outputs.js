/******************************************************************************************
 * This file contains the functions that outputs to the screen EITC values
 * ****************************************************************************************/

/* Outputs EITC Values */
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

    document.getElementById('childless_li').innerHTML = 'Childless Single: <b>$' + zero_single + '</b>';
    document.getElementById('childless_married_li').innerHTML = 'Childless Married: <b>$' + zero_married + '</b>';
    document.getElementById('one_child_li').innerHTML = 'One Child Single/HOH: <b>$' + one_single + '</b>';
    document.getElementById('one_child_married_li').innerHTML = 'One Child Married: <b>$' + one_married + '</b>';
    document.getElementById('two_child_li').innerHTML = 'Two Child Single/HOH: <b>$' + two_single + '</b>';
    document.getElementById('two_child_married_li').innerHTML = 'Two Child Married: <b>$' + two_married + '</b>';
    document.getElementById('three_child_li').innerHTML = 'Three Child Single/HOH: <b>$' + three_single + '</b>';
    document.getElementById('three_child_married_li').innerHTML = 'Three Child Married: <b>$' + three_married + '</b>';
}
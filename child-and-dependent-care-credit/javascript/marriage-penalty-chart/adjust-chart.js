const single_tax_liability_x  = [0, 13850, 24850, 58575, 109225, 195950, 245100, 591975];
const hoh_tax_liability_x     = [0, 20800, 36500, 80650, 116150, 202900, 252050, 598900];
const married_tax_liability_x = [0, 27700, 49700, 117150, 218450, 391900, 490200, 721450];

const single_one_cdcc_x       = [0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000];
const hoh_one_cdcc_x          = [0, 20800, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000];
const married_one_cdcc_x      = [0, 27700, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000];

const single_two_cdcc_x       = [0, 13850, 24850, 29183, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000];
const hoh_two_cdcc_x          = [0, 20800, 35200, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000];
const married_two_cdcc_x      = [0, 27700, 40900, 41000, 41001, 43000, 43001, 60000];

function build_tax_after_cdcc_chart(chart_name){
    let chart = eval(chart_name + '_chart');

    // person 1 inputs
    let person1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let person1_num_children  = eval(chart_name + '_person1_num_children').value;
    
    // person 2 inputs
    let person2_income         = eval(chart_name + '_person2_income').value;
    let person2_filing_status  = eval(chart_name + '_person2_filing_status').value;
    let person2_num_children   = eval(chart_name + '_person2_num_children').value;

    // person 2 fixed values
    let person2_tax_liability = tax_liability_2023(person2_filing_status, person2_income);
    let person2_cdcc_value    = cdcc_amount_2023(person2_income, person2_filing_status, person2_num_children);
    let person2_tax_after_cdcc = 0;
    if( person2_tax_liability - person2_tax_after_cdcc > 0){
        person2_tax_after_cdcc = person2_tax_liability - person2_cdcc_value;
    }

    // select appropriate values
    let person1_cdcc_x       = eval(person1_filing_status + '_' + person1_num_children + '_cdcc_x');
    let tax_liability_x_vals = eval(person1_filing_status + '_tax_liability_x');
    let x_vals               = format_marriage_penalty_x_values(person1_cdcc_x.concat(tax_liability_x_vals));

    let y_vals = [];
    for(income of x_vals){
        person1_tax_at_income  = tax_liability_2023(person1_filing_status, income);
        person1_cdcc_at_income = cdcc_amount_2023(income, person1_filing_status, person1_num_children);

        if(person2_tax_after_cdcc + person1_tax_at_income - person1_cdcc_at_income > 0){
            y_vals.push(person2_tax_after_cdcc + person1_tax_at_income - person1_cdcc_at_income);
        }
        else {
            y_vals.push(0);
        }
    }

    // format arrays
    x_vals.unshift('x_p1');
    y_vals.unshift('person1');

    chart.load({
        columns: [
            x_vals,
            y_vals,
        ]
    })
}


function cdcc_marriage_penalty_modify_income(){
    // person 1 inputs
    let person1_income        = mp_person1_income.value;
    let person1_filing_status = mp_person1_filing_status.value;
    let person1_num_children  = mp_person1_num_children.value;

    // person 2 inputs
    let person2_income        = mp_person2_income.value;
    let person2_filing_status = mp_person2_filing_status.value;
    let person2_num_children  = mp_person2_num_children.value;

    // Combined Income & Children
    let combined_income = parseInt(person1_income) + parseInt(person2_income);
    let combined_children = 'two'; // FIX: Current input options they always fall into the 2+ children category

    // Tax liabilities
    let person1_tax_liability = tax_liability_2023(person1_filing_status, person1_income);
    let person2_tax_liability = tax_liability_2023(person2_filing_status, person2_income);
    let married_tax_liability = tax_liability_2023('married', combined_income);

    // CDCC credit values
    let person1_cdcc = cdcc_amount_2023(person1_income, person1_filing_status, person1_num_children);
    let person2_cdcc = cdcc_amount_2023(person2_income, person2_filing_status, person2_num_children);
    let married_cdcc = cdcc_amount_2023(combined_income, 'married', combined_children);

    // After credit tax liabilities
    let person1_after_credit_tax = person1_tax_liability - person1_cdcc;
    let person2_after_credit_tax = person2_tax_liability - person2_cdcc;
    let combined_minimum_tax = person1_after_credit_tax + person2_after_credit_tax;
    let married_after_credit_tax = married_tax_liability - married_cdcc;

    // Difference in tax liability
    let tax_difference = married_after_credit_tax - combined_minimum_tax;

    // grids
    mp_chart.xgrids([ {value: person1_income, text:'Your Income'}, {value: person2_income, text: "Your Partner's Income"}, {value: combined_income, text:'Combined Income'},]);
    mp_chart.ygrids([ {value: combined_minimum_tax, text:'Combined Individual Tax', position: 'start'}, {value: married_after_credit_tax, text:'Married Tax', position: 'start'}, {value: person2_after_credit_tax, text: "Your Partner's Minimum Tax Liability", position: 'start'}]);

    // points
    mp_chart.load({
        columns: [
            ['x_point',       person1_income],
            ['point_person1', combined_minimum_tax],

            ['x_point_person2', person2_income],
            ['point_person2',   person2_after_credit_tax],

            ['x_point_married', combined_income],
            ['point_married',   married_after_credit_tax],
        ]
    });

    // penalty/bonus
    if(tax_difference.toFixed(0) >= 0){
        mp_chart.hide(['married_tax',  'bonus']);
        mp_chart.show(['combined_tax', 'penalty']);
        mp_chart.load({
            columns: [
                ['combined_tax', combined_minimum_tax, combined_minimum_tax],
                ['penalty',      tax_difference,       tax_difference],
            ]
        });
    }
    else {
        mp_chart.show(['married_tax',  'bonus']);
        mp_chart.hide(['combined_tax', 'penalty']);

        bonus = tax_difference * -1;
        mp_chart.load({
            columns: [
                ['married_tax', married_after_credit_tax, married_after_credit_tax],
                ['bonus',       bonus,                    bonus],
            ]
        });
    }

    // adjust axes
    cdcc_marriage_penalty_adjust_y_axis(married_after_credit_tax);
    cdcc_marriage_penalty_adjust_x_axis(combined_income);
}


function cdcc_marriage_penalty_adjust_y_axis(married_tax){
    if(married_tax < 3000){
        mp_chart.axis.max({y: 3000});
    }
    else if(married_tax < 5000){
        mp_chart.axis.max({y: 5000});
    }
    else if(married_tax < 7000){
        mp_chart.axis.max({y: 7000});
    }
    else if(married_tax < 9000){
        mp_chart.axis.max({y: 9000});
    }
    else if(married_tax < 12000){
        mp_chart.axis.max({y: 12000});
    }
}

function cdcc_marriage_penalty_adjust_x_axis(combined_income){
    if(combined_income < 55000){
        mp_chart.axis.max({x : 60000});
    }
    else if(combined_income < 75000){
        mp_chart.axis.max({x : 80000});
    }
    else if(combined_income < 95000){
        mp_chart.axis.max({x : 100000});
    }
    else if(combined_income <= 120000){
        mp_chart.axis.max({x : 120000});
    }
}

function cdcc_mp_hide_outputs(){
    if(mp_hide_outputs_switch.checked){
        document.getElementById('mp_outputs_container').style.display = 'none';
    }
    else {
        document.getElementById('mp_outputs_container').style.display = 'block';
    }
}

function cdcc_mp_hide_inputs(){
    if(mp_hide_inputs_switch.checked){
        document.getElementById('mp_inputs_container').style.display = 'none';
    }
    else {
        document.getElementById('mp_inputs_container').style.display = 'block';
    }
}



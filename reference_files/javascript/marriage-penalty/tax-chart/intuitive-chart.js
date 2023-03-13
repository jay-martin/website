/****************** Person 1 ************************************************************************/
function tax_intuitive_adjust_person1(chart_name){
    let chart = eval(chart_name + '_chart');
    let person1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let person2_filing_status = eval(chart_name + '_person2_filing_status').value;

    if(person1_filing_status === 'single' && person2_filing_status === 'single'){
        single_tax_liability_builder_2023(chart, 'x1', 'person1');

        setTimeout(function () {
            chart.hide('person2');
            chart.show('person2_dashed');
            chart.legend.hide('person2');
            chart.legend.show('person2_dashed');
        }, 400);
    }
    else if(person1_filing_status === 'hoh' && person2_filing_status === 'single'){
        chart.hide('person2_dashed');
        chart.show('person2');
        chart.legend.hide('person2_dashed');
        chart.legend.show('person2');

        hoh_tax_liability_builder_2023(chart, 'x1', 'person1');
    }
    else if(person1_filing_status === 'single' && person2_filing_status === 'hoh'){
        chart.hide('person2_dashed');
        chart.show('person2');
        chart.legend.hide('person2_dashed');
        chart.legend.show('person2');

        single_tax_liability_builder_2023(chart, 'x1', 'person1');
    }
    else{
        hoh_tax_liability_builder_2023(chart, 'x1', 'person1');

        setTimeout(function () {
            chart.hide('person2');
            chart.show('person2_dashed');
            chart.legend.hide('person2');
            chart.legend.show('person2_dashed');
        }, 400);
    }
}

/****************** Person 2 ************************************************************************/
function tax_intuitive_adjust_person2(chart_name){
    let chart = eval(chart_name + '_chart');
    let person1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let person2_filing_status = eval(chart_name + '_person2_filing_status').value;

    if(person2_filing_status === 'single' && person1_filing_status === 'hoh'){
        chart.show('person2');
        chart.hide('person2_dashed');
        chart.legend.hide('person2_dashed');
        chart.legend.show('person2');
        single_tax_liability_builder_2023(chart, 'x2', 'person2');
        single_tax_liability_builder_2023(chart, 'x2', 'person2_dashed');
    }
    else if(person2_filing_status === 'hoh' && person1_filing_status === 'hoh'){
        hoh_tax_liability_builder_2023(chart, 'x2', 'person2');
        hoh_tax_liability_builder_2023(chart, 'x2', 'person2_dashed');

        setTimeout(function () {
            chart.hide('person2');
            chart.show('person2_dashed');
            chart.legend.hide('person2');
            chart.legend.show('person2_dashed');
        }, 400);
    }
    else if(person2_filing_status === 'single' && person1_filing_status === 'single'){
        single_tax_liability_builder_2023(chart, 'x2', 'person2');
        single_tax_liability_builder_2023(chart, 'x2', 'person2_dashed');

        setTimeout(function () {
            chart.hide('person2');
            chart.show('person2_dashed');
            chart.legend.hide('person2');
            chart.legend.show('person2_dashed');
        }, 400);
    }
    else if(person2_filing_status === 'hoh' && person1_filing_status === 'single'){
        chart.show('person2');
        chart.hide('person2_dashed');
        chart.legend.hide('person2_dashed');
        chart.legend.show('person2');
        hoh_tax_liability_builder_2023(chart, 'x2', 'person2');
        hoh_tax_liability_builder_2023(chart, 'x2', 'person2_dashed');
    }
}

/****************** Married ************************************************************************/
function tax_intuitive_adjust_married(chart_name){
    let chart = eval(chart_name + '_chart');
    married_tax_liability_builder_2023(chart, 'x3', 'married');
}

/****************** Income ************************************************************************/
function tax_intuitive_modify_income(chart_name){
    let chart = eval(chart_name + '_chart');

    // Filing statuses
    let p1_filing_status = eval(chart_name + '_person1_filing_status').value;
    let p2_filing_status = eval(chart_name + '_person2_filing_status').value;

    // Incomes
    let p1_income = eval(chart_name + '_person1_income').value;
    let p2_income = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);
    
    // Tax liability values
    let p1_tax = tax_liability_2023(p1_filing_status, p1_income);
    let p2_tax = tax_liability_2023(p2_filing_status, p2_income);
    let combined_tax = p1_tax + p2_tax;
    let married_tax = tax_liability_2023('married', combined_income);

    /* Move xgrids */
    if(p1_income == 0){
        chart.xgrids([{value: p1_income, text:'Your income'},{value: combined_income, text:"Combined income / Person 2 income"}]);
    }
    else if(p2_income == 0){
        chart.xgrids([{value: combined_income, text:"Combined income / Person 1 income"}]);
    }
    else{
        chart.xgrids([{value: p1_income, text:'Your income'},{value: p2_income, text:"Your partner's income"},{value: combined_income, text:"Combined income"}]);
    }

    /* Move points */
    chart.load({columns: [ ['x_point1', p1_income] , ['point1', p1_tax], ['x_point2', p2_income], ['point2', p2_tax], ['x_point_married', combined_income], ['point_married', married_tax] ] });

    /* Move stacked eitc value curves */
    penalty = married_tax - p1_tax - p2_tax;
    if(penalty.toFixed(0) == 0){ 
        chart.hide(['combined_tax', 'tax_penalty', 'married_tax', 'tax_bonus']);
        chart.ygrids([{value: 0}, {value: married_tax, text: "Combined individual tax/Married tax"}]);
    }
    else if(penalty > 0){
        chart.ygrids([{value: 0}, {value: married_tax, text: "Married tax"}, {value: combined_tax, text: "Combined individual tax", y_position: 'below'}]);
        chart.show(['combined_tax',  'tax_penalty']);
        chart.hide(['married_tax',   'tax_bonus']);
        chart.load({
            columns: [
                ['x_horizontal', 0,           200000],
                ['combined_tax', combined_tax, combined_tax],
                ['tax_penalty',  penalty,     penalty],
            ]
        });
    }
    else{
        chart.ygrids([{value: 0}, {value: combined_tax, text: "Combined individual tax"}, {value: married_tax, text: "Married tax", y_position: 'below'},]);
        chart.hide(['combined_tax', 'tax_penalty']);
        chart.show(['married_tax',  'tax_bonus']);
        chart.load({
            columns: [
                ['x_horizontal', 0,            200000],
                ['married_tax',  married_tax,   married_tax],
                ['tax_bonus',    penalty * -1, penalty * -1],
            ]
        });
    }
}

/****************** Axes ************************************************************************/
function tax_adjust_axes(chart_name){
    let chart = eval(chart_name + '_chart');
    let p1_income = eval(chart_name + '_person1_income').value;
    let p2_income = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    if(combined_income < 60000){
        chart.axis.max({ x: 60000, y: 6000 });
    }
    else if(combined_income < 80000){
        chart.axis.max({ x: 80000, y: 10000});
    }
    else if(combined_income < 100000){
        chart.axis.max({ x: 100000, y: 14000});
    }
    else if(combined_income < 120000) {
        chart.axis.max({ x: 120000, y: 16000});
    }
    else if(combined_income < 140000) {
        chart.axis.max({ x: 140000, y: 18000});
    }
    else if(combined_income >= 140000 && window.innerWidth < 800){
         chart.axis.max({ x: 200000, y: 35000});
    }
    else if(combined_income < 160000) {
        chart.axis.max({ x: 160000, y: 22000});
    }
    else if(combined_income < 180000) {
        chart.axis.max({ x: 180000, y: 28000});
    }
    else{
        chart.axis.max({ x: 200000, y: 35000});
    }
}

function tax_x_ticks(income, chart_name){
    let chart = eval(chart_name + '_chart');

    if(income >= 140000 && window.innerWidth < 800){
        chart.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000];
    }
    else if(income >= 80000 && window.innerWidth < 800){
        chart.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
    }
    else if(income >= 120000){
        chart.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
    }
    else{
        chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
    }
}

function tax_y_ticks(income, chart_name){
    let chart = eval(chart_name + '_chart');

    if(income >= 140000 && window.innerWidth < 800){
        chart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
    }
    else if(income >= 160000){
        chart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
    }
    else if(income >= 100000){
        chart.internal.config.axis_y_tick_values = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000];
    }
    else{
        chart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
    }
}

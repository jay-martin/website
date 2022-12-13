function hoh_modify_person1(){
    MPchart.load({
        columns: [
            ['x1',      0, 19400, 34050, 75300, 108450, 189450],
            ['person1', 0, 0,     1465,  6415,  13708,  33148],
        ]
    });
}

function hoh_modify_person2(){
    if(person2_filing_status.value === 'single'){
        MPchart.show('person2');
        MPchart.hide('person2_dashed');
        MPchart.legend.hide('person2_dashed');
        MPchart.legend.show('person2');
        MPchart.load({
            columns: [
                ['x2',      0, 12950, 23225,  54725,  102025,  183000],
                ['person2', 0, 0,     1027.5, 4807.5, 15213.5, 37755.5],
            ]
        });
    }
    else{
        MPchart.load({
            columns: [
                ['x2',      0, 19400, 34050, 75300, 108450, 189450],
                ['person2', 0, 0,     1465,  6415,  13708,  33148],
                ['person2_dashed', 0, 0,     1465,  6415,  13708,  33148],
            ]
        });

        setTimeout(function () {
            MPchart.hide('person2');
            MPchart.show('person2_dashed');
            MPchart.legend.hide('person2');
            MPchart.legend.show('person2_dashed');
        }, 400);
    }
}

function hoh_modify_married(){
    MPchart.load({
        columns: [
            ['x3',      0, 25900, 46400, 109450, 204050],
            ['married', 0, 0,     2050,  9616,   30428],
        ]
    });
}

function hoh_modify_income(){
    // Incomes
    p1Income = person1_income.value;
    p2Income = person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);
    
    // Tax liabilities
    p1Tax = tax_liability('hoh', p1Income);
    if(person2_filing_status.value === 'single'){ 
        p2Tax = tax_liability('single', p2Income); 
    }
    else{ 
        p2Tax = tax_liability('hoh', p2Income); 
    }
    combinedTax = p1Tax + p2Tax;
    marriedTax = tax_liability('married', combinedIncome);

    /* Move xgrids */
    MPchart.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: marriedTax, text: "Your married tax"}, {value: combinedTax, text: "Combined individual tax"}]);

    /* Move points */
    MPchart.load({columns: [ ['x_point1', p1Income] , ['point1', p1Tax], ['x_point2', p2Income], ['point2', p2Tax], ['x_point_married', combinedIncome], ['point_married', marriedTax] ] });

    /* Move stacked eitc value curves */
    penalty = marriedTax - p1Tax - p2Tax;
    if(penalty > 0){
        MPchart.show(['hoh_combined',  'hoh_penalty']);
        MPchart.hide(['hoh_married',   'hoh_bonus']);
        MPchart.load({
            columns: [
                ['x_horizontal', 0,           200000],
                ['hoh_combined',  combinedTax, combinedTax],
                ['hoh_penalty',  penalty,     penalty],
            ]
        });
    }
    else{
        MPchart.hide(['hoh_combined',  'hoh_penalty']);
        MPchart.show(['hoh_married', 'hoh_bonus']);
        MPchart.load({
            columns: [
                ['x_horizontal', 0,            200000],
                ['hoh_married', marriedTax,   marriedTax],
                ['hoh_bonus',    penalty * -1, penalty * -1],
            ]
        });
    }
    //Adjust x-axis if combined income goes over axis max
    x_ticks(combinedIncome);
    hoh_y_ticks(combinedIncome);
    hoh_both_adjust_axes();
}

function hoh_both_adjust_axes(){
    combinedIncome = parseInt(person1_income.value) + parseInt(person2_income.value);

    if(combinedIncome < 60000){
        MPchart.axis.max({ x: 60000 });
    }
    else if(combinedIncome < 80000){
        MPchart.axis.max({ x: 80000, y: 10000});
    }
    else if(combinedIncome < 100000){
        MPchart.axis.max({ x: 100000, y: 14000});
    }
    else if(combinedIncome < 120000) {
        MPchart.axis.max({ x: 120000, y: 16000});
    }
    else if(combinedIncome < 140000) {
        MPchart.axis.max({ x: 140000, y: 18000});
    }
    else if(combinedIncome >= 140000 && window.innerWidth < 800){
         MPchart.axis.max({ x: 200000, y: 35000});
    }
    else if(combinedIncome < 160000) {
        MPchart.axis.max({ x: 160000, y: 22000});
    }
    else if(combinedIncome < 180000) {
        MPchart.axis.max({ x: 180000, y: 28000});
    }
    else{
        MPchart.axis.max({ x: 200000, y: 35000});
    }
}

function x_ticks(income){
    if(income >= 140000 && window.innerWidth < 800){
        MPchart.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000];
    }
    else if(income >= 80000 && window.innerWidth < 800){
        MPchart.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
    }
    else if(income >= 120000){
        MPchart.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
    }
    else{
        MPchart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
    }
}

function hoh_y_ticks(income){
    if(income >= 140000 && window.innerWidth < 800){
        MPchart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
    }
    else if(income >= 160000){
        MPchart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
    }
    else if(income >= 100000){
        MPchart.internal.config.axis_y_tick_values = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000];
    }
    else{
        MPchart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
    }
}

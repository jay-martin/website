function marriage_penalty_intuitive_adjust_person1(){
    if(marriage_penalty_person1_filing_status.value === 'single' && marriage_penalty_person2_filing_status.value === 'single'){
        single_tax_liability_builder_2023(marriagePenaltyChart, 'x1', 'person1');

        setTimeout(function () {
            marriagePenaltyChart.hide('person2');
            marriagePenaltyChart.show('person2_dashed');
            marriagePenaltyChart.legend.hide('person2');
            marriagePenaltyChart.legend.show('person2_dashed');
        }, 400);
    }
    else if(marriage_penalty_person1_filing_status.value === 'hoh' && marriage_penalty_person2_filing_status.value === 'single'){
        marriagePenaltyChart.hide('person2_dashed');
        marriagePenaltyChart.show('person2');
        marriagePenaltyChart.legend.hide('person2_dashed');
        marriagePenaltyChart.legend.show('person2');

        hoh_tax_liability_builder_2023(marriagePenaltyChart, 'x1', 'person1');
    }
    else if(marriage_penalty_person1_filing_status.value === 'single' && marriage_penalty_person2_filing_status.value === 'hoh'){
        marriagePenaltyChart.hide('person2_dashed');
        marriagePenaltyChart.show('person2');
        marriagePenaltyChart.legend.hide('person2_dashed');
        marriagePenaltyChart.legend.show('person2');

        single_tax_liability_builder_2023(marriagePenaltyChart, 'x1', 'person1');
    }
    else{
        hoh_tax_liability_builder_2023(marriagePenaltyChart, 'x1', 'person1');

        setTimeout(function () {
            marriagePenaltyChart.hide('person2');
            marriagePenaltyChart.show('person2_dashed');
            marriagePenaltyChart.legend.hide('person2');
            marriagePenaltyChart.legend.show('person2_dashed');
        }, 400);
    }
}

function marriage_penalty_intuitive_adjust_person2(){
    if(marriage_penalty_person2_filing_status.value === 'single' && marriage_penalty_person1_filing_status.value === 'hoh'){
        marriagePenaltyChart.show('person2');
        marriagePenaltyChart.hide('person2_dashed');
        marriagePenaltyChart.legend.hide('person2_dashed');
        marriagePenaltyChart.legend.show('person2');
        single_tax_liability_builder_2023(marriagePenaltyChart, 'x2', 'person2');
        single_tax_liability_builder_2023(marriagePenaltyChart, 'x2', 'person2_dashed');
    }
    else if(marriage_penalty_person2_filing_status.value === 'hoh' && marriage_penalty_person1_filing_status.value === 'hoh'){
        hoh_tax_liability_builder_2023(marriagePenaltyChart, 'x2', 'person2');
        hoh_tax_liability_builder_2023(marriagePenaltyChart, 'x2', 'person2_dashed');

        setTimeout(function () {
            marriagePenaltyChart.hide('person2');
            marriagePenaltyChart.show('person2_dashed');
            marriagePenaltyChart.legend.hide('person2');
            marriagePenaltyChart.legend.show('person2_dashed');
        }, 400);
    }
    else if(marriage_penalty_person2_filing_status.value === 'single' && marriage_penalty_person1_filing_status.value === 'single'){
        single_tax_liability_builder_2023(marriagePenaltyChart, 'x2', 'person2');
        single_tax_liability_builder_2023(marriagePenaltyChart, 'x2', 'person2_dashed');

        setTimeout(function () {
            marriagePenaltyChart.hide('person2');
            marriagePenaltyChart.show('person2_dashed');
            marriagePenaltyChart.legend.hide('person2');
            marriagePenaltyChart.legend.show('person2_dashed');
        }, 400);
    }
    else if(marriage_penalty_person2_filing_status.value === 'hoh' && marriage_penalty_person1_filing_status.value === 'single'){
        marriagePenaltyChart.show('person2');
        marriagePenaltyChart.hide('person2_dashed');
        marriagePenaltyChart.legend.hide('person2_dashed');
        marriagePenaltyChart.legend.show('person2');
        hoh_tax_liability_builder_2023(marriagePenaltyChart, 'x2', 'person2');
        hoh_tax_liability_builder_2023(marriagePenaltyChart, 'x2', 'person2_dashed');
    }
}

function marriage_penalty_intuitive_adjust_married(){
    married_tax_liability_builder_2023(marriagePenaltyChart, 'x3', 'married');
}

function marriage_penalty_intuitive_modify_income(){
    // Incomes
    p1Income = marriage_penalty_person1_income.value;
    p2Income = marriage_penalty_person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);
    
    // Tax liabilities
    if(marriage_penalty_person1_filing_status.value === 'single'){
        p1Tax = tax_liability_2023('single', p1Income);
    }
    else{
        p1Tax = tax_liability_2023('hoh', p1Income);
    }
    if(marriage_penalty_person2_filing_status.value === 'single'){ 
        p2Tax = tax_liability_2023('single', p2Income); 
    }
    else{ 
        p2Tax = tax_liability_2023('hoh', p2Income); 
    }
    combinedTax = p1Tax + p2Tax;
    marriedTax = tax_liability_2023('married', combinedIncome);

    /* Move grids */
    marriagePenaltyChart.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);
    marriagePenaltyChart.ygrids([{value: 0}, {value: marriedTax, text: "Married tax"}, {value: combinedTax, text: "Combined individual tax"}]);

    /* Move points */
    marriagePenaltyChart.load({columns: [ ['x_point1', p1Income] , ['point1', p1Tax], ['x_point2', p2Income], ['point2', p2Tax], ['x_point_married', combinedIncome], ['point_married', marriedTax] ] });

    /* Move stacked eitc value curves */
    penalty = marriedTax - p1Tax - p2Tax;
    if(penalty > 0){
        marriagePenaltyChart.show(['combined_tax',  'penalty']);
        marriagePenaltyChart.hide(['married_tax',   'bonus']);
        marriagePenaltyChart.load({
            columns: [
                ['x_horizontal', 0,           200000],
                ['combined_tax', combinedTax, combinedTax],
                ['penalty',  penalty,     penalty],
            ]
        });
    }
    else{
        marriagePenaltyChart.hide(['combined_tax',  'penalty']);
        marriagePenaltyChart.show(['married_tax', 'bonus']);
        marriagePenaltyChart.load({
            columns: [
                ['x_horizontal', 0,            200000],
                ['married_tax', marriedTax,   marriedTax],
                ['bonus',    penalty * -1, penalty * -1],
            ]
        });
    }
    //Adjust x-axis if combined income goes over axis max
    //x_ticks(combinedIncome);
    //hoh_y_ticks(combinedIncome);
    //hoh_both_adjust_axes();
}

function hoh_both_adjust_axes(){
    combinedIncome = parseInt(marriage_penalty_person1_income.value) + parseInt(marriage_penalty_person2_income.value);

    if(combinedIncome < 60000){
        marriagePenaltyChart.axis.max({ x: 60000, y: 6000 });
    }
    else if(combinedIncome < 80000){
        marriagePenaltyChart.axis.max({ x: 80000, y: 10000});
    }
    else if(combinedIncome < 100000){
        marriagePenaltyChart.axis.max({ x: 100000, y: 14000});
    }
    else if(combinedIncome < 120000) {
        marriagePenaltyChart.axis.max({ x: 120000, y: 16000});
    }
    else if(combinedIncome < 140000) {
        marriagePenaltyChart.axis.max({ x: 140000, y: 18000});
    }
    else if(combinedIncome >= 140000 && window.innerWidth < 800){
         marriagePenaltyChart.axis.max({ x: 200000, y: 35000});
    }
    else if(combinedIncome < 160000) {
        marriagePenaltyChart.axis.max({ x: 160000, y: 22000});
    }
    else if(combinedIncome < 180000) {
        marriagePenaltyChart.axis.max({ x: 180000, y: 28000});
    }
    else{
        marriagePenaltyChart.axis.max({ x: 200000, y: 35000});
    }
}

function x_ticks(income){
    if(income >= 140000 && window.innerWidth < 800){
        marriagePenaltyChart.internal.config.axis_x_tick_values = [0, 50000, 100000, 150000, 200000];
    }
    else if(income >= 80000 && window.innerWidth < 800){
        marriagePenaltyChart.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
    }
    else if(income >= 120000){
        marriagePenaltyChart.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
    }
    else{
        marriagePenaltyChart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000];
    }
}

function hoh_y_ticks(income){
    if(income >= 140000 && window.innerWidth < 800){
        marriagePenaltyChart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
    }
    else if(income >= 160000){
        marriagePenaltyChart.internal.config.axis_y_tick_values = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
    }
    else if(income >= 100000){
        marriagePenaltyChart.internal.config.axis_y_tick_values = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000];
    }
    else{
        marriagePenaltyChart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
    }
}

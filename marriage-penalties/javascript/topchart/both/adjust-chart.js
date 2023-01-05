function both_modify_person1(){
    if(person1_children.value === "none"){
        MPchart.load({
            columns: [
                ['x1',      0, 7320, 9160, 16480, 19400, 34050, 75300, 108450, 189450],
                ['person1', 0, -560, -560, 0,     0,     1465,  6415,  13708,  33148]
            ]
        });
    }
    else if(person1_children.value === "one"){
        MPchart.load({
            columns: [
                ['x1',      0, 10979, 19400, 20131,   34050,  43492,   75300, 108450, 189450],
                ['person1', 0, -3733, -3733, -3659.9, -43.81, 2598.04, 6415,  13708,  33148]
            ]
        });
    }
    else if(person1_children.value === "two"){
        MPchart.load({
            columns: [
                ['x1',      0, 15410, 19400, 20131,   34050,   49399,   75300, 108450, 189450],
                ['person1', 0, -6164, -6164, -6090.9, -1767.5, 3306.88, 6415,  13708,  33148]
            ]
        });
    }
    else if (person1_children.value === "three"){
        MPchart.load({
            columns: [
                ['x1',      0, 15410, 19400, 20131,   34050,    53057,   75300, 108450, 189450],
                ['person1', 0, -6935, -6935, -6861.9, -2537.87, 3745.84, 6415,  13708,  33148]
            ]
        });
    }
}

function both_modify_person2(){
    if(person2_filing_status.value === 'single'){
        if(person2_children.value === "none"){
            MPchart.load({
                columns: [
                    ['x2',      0, 7320, 9160, 12950, 16480, 23225,  54725,  102025,  183000],
                    ['person2', 0, -560, -560, 0,     353,   1027.5, 4807.5, 15213.5, 37755.5]
                ]
            });
        }
        else if(person2_children.value === "one"){
            MPchart.load({
                columns: [
                    ['x2',      0, 10979, 12950,   20131,   23225,     43492,   54725,  102025,  183000],
                    ['person2', 0, -3733, -3014.9, -3014.9, -2211.145, 3459.54, 4807.5, 15213.5, 37755.5]
                ]
            });
        }
        else if(person2_children.value === "two"){
            MPchart.load({
                columns: [
                    ['x2',      0, 12950, 15410, 20131,   23225,     49399,   54725,  102025,  183000],
                    ['person2', 0, -5180, -5918, -5445.9, -4484.745, 4168.38, 4807.5, 15213.5, 37755.5]
                ]
            });
        }
        else if (person2_children.value === "three"){
            MPchart.load({
                columns: [
                    ['x2',      0, 12950,   15410, 20131,   23225,     53057,   54725,  102025,  183000],
                    ['person2', 0, -5827.5, -6689, -6216.9, -5255.115, 4607.34, 4807.5, 15213.5, 37755.5]
                ]
            });
        }
    }
    else {
        if(person2_children.value === "none"){
            MPchart.load({
                columns: [
                    ['x2',      0, 7320, 9160, 16480, 19400, 34050, 75300, 108450, 189450],
                    ['person2', 0, -560, -560, 0,     0,     1465,  6415,  13708,  33148]
                ]
            });
        }
        else if(person2_children.value === "one"){
            MPchart.load({
                columns: [
                    ['x2',      0, 10979, 19400, 20131,   34050,  43492,   75300, 108450, 189450],
                    ['person2', 0, -3733, -3733, -3659.9, -43.81, 2598.04, 6415,  13708,  33148]
                ]
            });
        }
        else if(person2_children.value === "two"){
            MPchart.load({
                columns: [
                    ['x2',      0, 15410, 19400, 20131,   34050,   49399,   75300, 108450, 189450],
                    ['person2', 0, -6164, -6164, -6090.9, -1767.5, 3306.88, 6415,  13708,  33148]
                ]
            });
        }
        else if (person2_children.value === "three"){
            MPchart.load({
                columns: [
                    ['x2',      0, 15410, 19400, 20131,   34050,    53057,   75300, 108450, 189450],
                    ['person2', 0, -6935, -6935, -6861.9, -2537.87, 3745.84, 6415,  13708,  33148]
                ]
            });
        }
    }
}

function both_modify_married(){
    numChildren = num_children();
    if(numChildren===0){
        MPchart.load({
            columns: [
                ['x3',      0, 7320, 15290, 22610, 25900, 46400, 109450, 204050],
                ['married', 0, -560, -560,  0,     0,     2050,  9616,   30428]
            ]
        });
    }
    else if(numChildren===1){
        MPchart.load({
            columns: [
                ['x3',      0, 10979, 25900, 26262,   46400,   49622,   109450, 204050],
                ['married', 0, -3733, -3733, -3696.8, 1525.12, 2436.64, 9616,   30428]
            ]
        });
    }
    else if(numChildren===2){
        MPchart.load({
            columns: [
                ['x3',      0, 15410, 25900, 26262,   46400,  55529,   109450, 204050],
                ['married', 0, -6164, -6164, -6127.8, 127.43, 3145.48, 9616,   30428]
            ]
        });
    }
    else{
        MPchart.load({
            columns: [
                ['x3',      0, 15410, 25900, 26262,   46400,   59187,   109450, 204050],
                ['married', 0, -6935, -6935, -6898.8, -642.94, 3584.44, 9616,   30428]
            ]
        });
    }    
}

function both_modify_income(){
    p1Income = person1_income.value;
    p2Income = person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    combinedChildren = num_children();
    numChildren = 'none';
    if(combinedChildren === 1){numChildren='one';}
    else if(combinedChildren === 2){numChildren='two';}
    else if (combinedChildren > 2){numChildren='three';}

    p1EITC = eitc_value_2023('single', p1Income, person1_children.value);
    p2EITC = eitc_value_2023('single', p2Income, person2_children.value);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = eitc_value_2023('married', combinedIncome, numChildren);

    p1Tax  = tax_liability_2023('hoh', p1Income) - p1EITC;
    p2Tax  = tax_liability_2023(person2_filing_status.value, p2Income) - p2EITC;
    combinedTax = p1Tax + p2Tax;
    marriedTax  = tax_liability_2023('married', combinedIncome) - marriedEITC;

    /* Move xgrids */
    MPchart.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: marriedTax, text: "Married tax liability"}, {value: combinedTax, text: "Combined individual tax liability"}]);

    /* Move points */
    MPchart.load({columns: [ ['x_point1', p1Income] , ['point1', p1Tax], ['x_point2', p2Income], ['point2', p2Tax], ['x_point_married', combinedIncome], ['point_married', marriedTax] ] });

    /* Move stacked eitc value curves */
    penalty = marriedTax - combinedTax;
    if(penalty > 0){
        MPchart.show(['both_white', 'both_penalty']);
        MPchart.hide(['both_white_positive', 'both_bonus', 'both_white_negative', 'both_bonus_negative',]);
        if(marriedTax < 0 ){
            MPchart.hide('filler');
            MPchart.load({
                columns: [
                    ['x_horizontal',  0,             200000],
                    ['both_white',    marriedTax,   marriedTax],
                    ['both_penalty',  penalty * -1, penalty * -1],
                ]
            });
        }
        else if(marriedTax > 0 && combinedTax < 0){
            MPchart.show('filler');
            MPchart.load({
                columns: [
                    ['x_horizontal', 0,             200000],
                    ['both_white',    marriedTax,   marriedTax],
                    ['filler',        marriedTax,   marriedTax],
                    ['both_penalty',  combinedTax,  combinedTax],
                ]
            });
        }
        else if(marriedTax > 0 && combinedTax >= 0){
            MPchart.hide('filler');
            MPchart.load({
                columns: [
                    ['x_horizontal',  0,             200000],
                    ['both_white',    combinedTax,  combinedTax],
                    ['both_penalty',  penalty,      penalty],
                ]
            });
        }
    }
    else{
        MPchart.hide(['both_white', 'both_penalty', 'filler']);
        if(marriedTax > 0){
            MPchart.hide(['both_white_negative', 'both_bonus_negative']);
            MPchart.show(['both_white_positive', 'both_bonus']);
            MPchart.load({
                columns: [
                    ['x_horizontal',        0,            200000],
                    ['both_white_positive', marriedTax,   marriedTax],
                    ['both_bonus',          penalty * -1, penalty * -1],
                ]
            });
        }
        else{
            MPchart.hide(['both_white_positive', 'both_bonus']);
            MPchart.show(['both_white_negative', 'both_bonus_negative']);
            MPchart.load({
                columns: [
                    ['x_horizontal',        0,            200000],
                    ['both_white_negative', combinedTax,  combinedTax],
                    ['both_bonus_negative', penalty,      penalty],
                ]
            });
        }
    }

    // Adjust axes
    x_ticks(combinedIncome); //located in ../hoh/adjust_chart.js (used for both hoh and both chart)
    both_y_ticks(combinedIncome); 
    both_y_min(combinedTax);
    hoh_both_adjust_axes(); //located in ../hoh/adjust_chart.js (used for both hoh and both chart)
}

function both_y_ticks(income){
    if(income >= 140000){
        MPchart.internal.config.axis_y_tick_values = [-6000, 0, 5000, 10000, 15000, 20000, 25000, 30000, 35000];
    }
    else{
        MPchart.internal.config.axis_y_tick_values = [-14000, -12000, -10000, -8000, -6000, -4000, -2000, 0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000];
    }
}

function both_y_min(combinedTax){
    person1Children = person1_children.value ;
    person2Children = person2_children.value;

    if(combinedTax < -10000){
        MPchart.axis.min({y: -14000});
    }
    else if(combinedTax < -8000){
        MPchart.axis.min({y: -10000});
    }
    else if(person1Children === 'two' || person1Children === 'three' || person2Children === 'two' || person2_children === 'three'){
        MPchart.axis.min({y: -8000});
    }
    else{
        MPchart.axis.min({y: -6000});
    }
}



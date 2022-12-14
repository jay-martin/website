function modify_person1_eitc(){
    if(person1_children.value === "none"){
        MPchart.load({
            columns: [
                ['x1',      0, 7320, 9160, 16480],
                ['person1', 0, 560,  560,  0]
            ]
        });
    }
    else if(person1_children.value === "one"){
        MPchart.load({
            columns: [
                ['x1',      0, 10979, 20131, 43493],
                ['person1', 0, 3733,  3733,  0]
            ]
        });
    }
    else if(person1_children.value === "two"){
        MPchart.load({
            columns: [
                ['x1',      0, 15290, 20131, 49399],
                ['person1', 0, 6164,  6164,  0]
            ]
        });
    }
    else if (person1_children.value === "three"){
        MPchart.load({
            columns: [
                ['x1',      0, 15410, 20131, 53057],
                ['person1', 0, 6935,  6935,  0]
            ]
        });
    }
}

function modify_person2_eitc(){
    if(person2_children.value === "none"){
        MPchart.load({
            columns: [
                ['x2',      0, 7320, 9160, 16480],
                ['person2', 0, 560,  560,  0]
            ]
        });
    }
    else if(person2_children.value === "one"){
        MPchart.load({
            columns: [
                ['x2',      0, 10979, 20131, 43493],
                ['person2', 0, 3733,  3733,  0]
            ]
        });
    }
    else if(person2_children.value === "two"){
        MPchart.load({
            columns: [
                ['x2',      0, 15290, 20131, 49399],
                ['person2', 0, 6164,  6164,  0]
            ]
        });
    }
    else if (person2_children.value === "three"){
        MPchart.load({
            columns: [
                ['x2',      0, 15410, 20131, 53057],
                ['person2', 0, 6935,  6935,  0]
            ]
        });
    }
}

function modify_married_eitc(){
    numChildren = num_children();
    if(numChildren===0){
        MPchart.load({
            columns: [
                ['x3',      0, 7320, 15290, 22610, 60000],
                ['married', 0, 560,  560,   0,     0]
            ]
        });
    }
    else if(numChildren===1){
        MPchart.load({
            columns: [
                ['x3',      0, 10979, 26262, 49622, 60000],
                ['married', 0, 3733,  3733,  0,     0]
            ]
        });
    }
    else if(numChildren===2){
        MPchart.axis.max({y: 7000});
        MPchart.load({
            columns: [
                ['x3',      0, 15290, 26262, 55529, 60000],
                ['married', 0, 6164,  6164,  0,     0]
            ]
        });
    }
    else{
        MPchart.axis.max({y: 8000});
        MPchart.load({
            columns: [
                ['x3',      0, 15410, 26262, 59187, 60000],
                ['married', 0, 6935,  6935,  0,     0]
            ]
        });
    }    
}

function eitc_modify_income(){
    p1Income = person1_income.value;
    p2Income = person2_income.value;
    combinedIncome = parseInt(p1Income) + parseInt(p2Income);

    combinedChildren = num_children();
    numChildren = 'none';
    if(combinedChildren === 1){numChildren='one';}
    else if(combinedChildren === 2){numChildren='two';}
    else if (combinedChildren > 2){numChildren='three';}

    p1EITC = EITC_benefit('single', p1Income, person1_children.value);
    p2EITC = EITC_benefit('single', p2Income, person2_children.value);
    combinedEITC = p1EITC + p2EITC;
    marriedEITC = EITC_benefit('married', combinedIncome, numChildren);

    /* Move xgrids */
    MPchart.xgrids([{value: p1Income, text:'Your income'},{value: p2Income, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: marriedEITC, text: "Your married EITC"}, {value: combinedEITC, text: "Combined individual EITC's"}]);

    /* Move points */
    MPchart.load({columns: [ ['x_point1', p1Income] , ['point1', p1EITC], ['x_point2', p2Income], ['point2', p2EITC], ['x_point_married', combinedIncome], ['point_married', marriedEITC] ] });

    /* Move stacked eitc value curves */
    penalty = combinedEITC - marriedEITC;
    if(penalty > 0){
        MPchart.show(['married_eitc', 'penalty']);
        MPchart.hide(['combined_eitc', 'bonus']);
        MPchart.load({
            columns: [
                ['x_horizontal',  0,           120000],
                ['married_eitc',  marriedEITC, marriedEITC],
                ['penalty',       penalty,     penalty],
            ]
        });
    }
    else{
        MPchart.hide(['married_eitc', 'penalty']);
        MPchart.show(['combined_eitc', 'bonus']);
        MPchart.load({
            columns: [
                ['x_horizontal',  0, 120000],
                ['combined_eitc', combinedEITC, combinedEITC],
                ['bonus',         penalty * -1, penalty * -1],
            ]
        });
    }

    /* Adjust chart x-axis max in case combined income exceeds current x-axis max */
    if(combinedIncome > 60000 && combinedIncome <80000){
        MPchart.axis.max({x: 80000});
    }
    else if(combinedIncome >= 80000 && combinedIncome <100000){
        MPchart.axis.max({x: 100000});
    }
    else if(combinedIncome >= 100000){
        MPchart.axis.max({x: 120000});
    }
    else{
        MPchart.axis.max({x: 60000});
    }
    /* Adjust chart y-axis max in case combined income exceeds current y-axis max */
    adjust_y_axis();
}

function adjust_y_axis(){
    person1Children = person1_children.value;
    person2Children = person2_children.value;
    
    /* adjust y-axis labels */
    if(person1Children === 'none' && person2Children === 'none'){
        MPchart.internal.config.axis_y_tick_values = [0, 200, 400, 600, 800, 1000];
    }
    else{
        MPchart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000];
    }

    /* Baseline axis max: $1,000*/
    if(person1Children === 'none' && person2Children === 'none'){
        if(combinedEITC > 950){
        MPchart.axis.max({y: 1200});
        }
        else{
            MPchart.axis.max({y: 1000});
        }
    }
    /* Baseline axis max: $4,000*/
    else if((person1Children === 'one' && person2Children === 'none') || (person1Children === 'none' && person2Children === 'one')){
        if(combinedEITC > 3900){
        MPchart.axis.max({y: 4500});
        }
        else{
            MPchart.axis.max({y: 4000});
        }
    }
    /* Baseline axis max: $4,000 */
    else if((person1Children === 'two' && person2Children === 'none') || (person1Children === 'none' && person2Children === 'two')){
        if(combinedEITC > 6500){
            MPchart.axis.max({y: 7200});
        }
        else{
            MPchart.axis.max({y: 7000});
        }
    }
    /* Basline axis max: $8,000*/
    else{
        if(combinedEITC > 7700 && combinedEITC <=8700){
            MPchart.axis.max({y: 9000});
        }
        else if(combinedEITC > 8700 && combinedEITC <= 9700){
            MPchart.axis.max({y: 10000});
        }
        else if(combinedEITC > 9700 && combinedEITC <= 10600){
            MPchart.axis.max({y: 11000});
        }
        else if(combinedEITC > 10600 && combinedEITC <= 11600){
            MPchart.axis.max({y: 12000});
        }
        else if(combinedEITC > 11600 && combinedEITC <= 12600){
            MPchart.axis.max({y: 13000});
        }
        else if(combinedEITC > 12600){
            MPchart.axis.max({y: 15000});
        }
        else{
            MPchart.axis.max({y: 8000});
        }
    }
}
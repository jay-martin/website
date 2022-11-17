function modify_person1(){
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

function modify_person2(){
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

function modify_married(){
    num_children = numChildren();
    if(num_children===0){
        MPchart.load({
            columns: [
                ['x3',      0, 7320, 15290, 22610, 60000],
                ['married', 0, 560,  560,   0,     0]
            ]
        });
    }
    else if(num_children===1){
        MPchart.load({
            columns: [
                ['x3',      0, 10979, 26262, 49622, 60000],
                ['married', 0, 3733,  3733,  0,     0]
            ]
        });
    }
    else if(num_children===2){
        MPchart.load({
            columns: [
                ['x3',      0, 15290, 26262, 55529, 60000],
                ['married', 0, 6164,  6164,  0,     0]
            ]
        });
    }
    else{
        MPchart.load({
            columns: [
                ['x3',      0, 15410, 26262, 59187, 60000],
                ['married', 0, 6935,  6935,  0,     0]
            ]
        });
    }    
}

function modify_income_chart(marriedEITC, combinedEITC, penalty, combinedIncome){
    /* Move xgrids */
    MPchart.xgrids([{value: myRange_person1.value, text:'Your income'},{value: myRange_person2.value, text:"Your partner's income"},{value: combinedIncome, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: marriedEITC, text: "Your married EITC"}, {value: combinedEITC, text: "Combined individual EITC's"}]);

    /* Move stacked eitc value curves */
    /* Adjust color of eitc value curves */
    if(penalty > 0){
        MPchart.show(['married_eitc', 'penalty']);
        MPchart.hide(['combined_eitc', 'bonus']);
        MPchart.load({
            columns: [
                ['x4',            0,           100000],
                ['married_eitc',  marriedEITC, marriedEITC],
                ['x5',            0,           100000],
                ['penalty',       penalty,     penalty],
            ]
        });
        MPchart.data.colors({
            'married_eitc': '#FFFFFF',
            'penalty': '#eb3734',
        })
    }
    else{
        MPchart.hide(['married_eitc', 'penalty']);
        MPchart.show(['combined_eitc', 'bonus']);
        MPchart.load({
            columns: [
                ['x6',            0, 100000],
                ['combined_eitc', combinedEITC, combinedEITC],
                ['x7',            0, 100000],
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

    /*adjust chart y-axis max in case combined EITC goes above current y-axis max*/
    if(combinedEITC > 4000){
        MPchart.axis.max({y: 4500});
    }
    else{
        MPchart.axis.max({y: 4000});
    }
}
/*Default values */
document.getElementById('person1_eitc_value').innerHTML = 'Your EITC is worth $2,156';
document.getElementById('person2_eitc_value').innerHTML = "Your partner's EITC is worth $496";
document.getElementById('married_eitc_value').innerHTML = "With a combined income of $40,000, if you married your EITC would be worth $1,548";
document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage penalty of $1,104';

/*DEFAULT GRAPH: One person with 1 child, other childless */
var MPchart = c3.generate({
    bindto: '#MPchart',
    data: {
        xs: {
            'person1' : 'x1',
            'person2' : 'x2',
            'married' : 'x3',
            'penalty' : 'x4',
        },
        columns: [
            ['x1',       0,             10979,        20131,        43493],
            ['person1',  0,             3733,         3733,         0],
            ['x2',       0, 7320, 9160,        16480],
            ['person2',  0, 560,  560,         0],
            ['x3',       0,             10979,               26262,        49622],
            ['married',  0,             3733,                3733,         0],
        ],
        names: {
            person1: 'Person 1 EITC',
            person2: 'Person 2 EITC',
            married: 'EITC if they married',
            penalty: 'Marriage Penalty'
        }
    },
    color: {
        pattern: ['#6ab6fc', '#36D903', '#000000', '#eb3734']
    },
    legend: {
        position: 'bottom'
    },
    tooltip: {
        show: false
    },
    point: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income ($)', position: 'outer-center'},
            tick: {values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]},
            max: 60000,
        },
        y: {
            label: {text: 'Benefit/Marriage Penalty ($)', position: 'outer-middle'},
            tick: {values: [-4000, -3000, -2000, -1000, 0, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]}
        }
    },
    grid: {
        x: {
            lines: [{value: 30000, text: 'Your income'}, {value: 10000, text: "Your partner's income"}, {value: 40000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 0}]
        }
    }
});

function modify_income_marriage_penalty(){
    /*formatting*/
    combined_children = numChildren();
    numberChildren = 'none';
    if(combined_children === 1){numberChildren='one';}
    else if(combined_children === 2){numberChildren='two';}
    else if (combined_children >2){numberChildren='three';}
    
    /* Print updated data to screen*/
    combined = combined_income_marriage_penalty();
    document.getElementById('person1_eitc_value').innerHTML = 'Your EITC is worth $' + EITC_benefit('single', myRange_person1.value, person1_children.value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('person2_eitc_value').innerHTML = "Your partner's EITC is worth $" + EITC_benefit('single', myRange_person2.value, person2_children.value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('married_eitc_value').innerHTML = "With a combined income of $" + combined.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth $" + EITC_benefit('married', combined_income_marriage_penalty(), numberChildren).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    /* Move xgrids */
    MPchart.xgrids([{value: myRange_person1.value, text:'Your income'},{value: myRange_person2.value, text:"Your partner's income"},{value: combined, text:"Combined income"}]);
    if(combined > 60000 && combined <80000){
        MPchart.axis.max({x: 80000});
    }
    else if(combined >= 80000 && combined <100000){
        MPchart.axis.max({x: 100000});
    }
    else if(combined >= 100000){
        MPchart.axis.max({x: 120000});
    }
    else{
        MPchart.axis.max({x: 60000});
    }

    /* Print marriage penalty to screen */
    penalty = value_marriage_penalty(combined);
    if(penalty < 0){
        penalty = penalty * -1;
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage bonus of $' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else{
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage penalty of $' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

function modifyPerson1(){
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

function modifyPerson2(){
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

function modifyMarried(){
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

function modifyPenalty(){
    
}
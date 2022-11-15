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
            person1: 'Your EITC',
            person2: "Your partner's EITC",
            married: 'EITC if you get married',
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
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
            },
            max: 60000,
        },
        y: {
            label: {text: 'Benefit / Marriage Penalty', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [-4000, -3000, -2000, -1000, 0, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]
            }
        }
    },
    grid: {
        x: {
            lines: [{value: 30000, text: 'Your income'}, {value: 10000, text: "Your partner's income"}, {value: 40000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 0}, {value: 2652, text: "Combined individual EITC's"}, {value: 1548, text: "Your married EITC"}]
        }
    },
    regions: [{axis: 'y', start: 1548, end: 2652, class: 'regionY'}]
});

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
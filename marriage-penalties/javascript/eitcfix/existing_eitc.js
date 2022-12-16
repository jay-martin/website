//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    existing_eitc_tick = [0, 20000, 40000, 60000, 80000, 100000];
}
else{
    existing_eitc_tick = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
}

var existingEITC = c3.generate({
    bindto: '#exisiting_eitc_chart',
    data: {
        xs: {
            'person1' : 'x1',
            'person2' : 'x2',
            'person2_dashed' : 'x2',
            'married' : 'x3',

            'combined'      : 'x_horizontal',
            'bonus'         : 'x_horizontal',
            'married_value' : 'x_horizontal',
            'penalty'       : 'x_horizontal',

            'point1' : 'x_point1',
            'point2' : 'x_point2',
            'point_married' : 'x_point_married',
        },
        columns: [
            ['x3',      0, 15290, 26262, 55529,],
            ['married', 0, 6164,  6164,  0,],
            ['x1',      0, 10979, 20131, 43492,],
            ['person1', 0, 3733,  3733,  0,],
            ['x2',      0, 10979, 20131, 43492,],
            ['person2', 0, 3733,  3733,  0,],

            ['x_point1', 20000],
            ['point1',   3733],
            ['x_point2', 25000],
            ['point2',   2955],
            ['x_point_married', 45000],
            ['point_married',   2217],

            ['x_horizontal',  0,    100000],
            ['married_value', 2217, 2217],
            ['penalty',       4471, 4471],

        ],
        types: {
           'combined'      : 'area',
           'bonus'         : 'area',
           'married_value' : 'area',
           'penalty'       : 'area',
        },
        regions: {
            person2: [ {'style':'dashed'}, ],
        },
        groups: [ ['combined', 'bonus'], ['married_value', 'penalty'] ], 
        order: false,
        names: {
            person1: "Single One-Child EITC",
            person2: "Single One-Child EITC",
            married: "Married Two-Child EITC",
        },
        colors: {
            person1        : '#6ab6fc',
            point1         :  '#6ab6fc',
            person2        : '#770087',
            person2_dashed : '#770087',
            point2         : '#770087',
            married        : '#000000',
            point_married  : '#000000',

            combined      : '#FFFFFF',
            bonus         : '#36D903',  
            married_value : '#FFFFFF',
            penalty       : '#eb3734',
        },
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['point1', 'point2', 'point_married', 'combined', 'bonus', 'married_value', 'penalty'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: existing_eitc_tick
            },
            padding: {left: 0, right: 30},
            max: 90000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 2000, 4000, 6000, 8000, 10000, 12000],
                //[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000]
            },
            padding: {bottom: 0, top: 0},
            max: 12000,
        }
    },
    grid: {
        x: {
            lines: [{value: 20000, text: 'Your income'}, {value: 25000, text: "Your partner's income"}, {value: 45000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 2217, text: "Married EITC"}, {value: 6688, text: "Combined Individual EITC's"} ]
        }
    },
});
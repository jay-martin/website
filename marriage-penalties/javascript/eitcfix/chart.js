/*DEFAULT GRAPH: One person with 1 child, other childless */
var eitcReform = c3.generate({
    bindto: '#reformed_eitc_chart',
    data: {
        xs: {
            'person1' : 'x1',
            'person2' : 'x2',
            'person2_dashed' : 'x2',
            'married' : 'x3',

            'combined'    : 'x_horizontal',
            'bonus'       : 'x_horizontal',

            'point1' : 'x_point1',
            'point2' : 'x_point2',
            'point_married' : 'x_point_married',
        },
        columns: [
            ['x3',      0, 20000, 30000, 60000],
            ['married', 0, 6000,  6000,  0],
            ['x1',      0, 10000, 15000, 30000],
            ['person1', 0, 3000,  3000,  0],
            ['x2',      0, 10000, 15000, 30000],
            ['person2', 0, 3000,  3000,  0],

            ['x_point1', 10000],
            ['point1',   3000],
            ['x_point2', 15000],
            ['point2',   3000],
            ['x_point_married', 25000],
            ['point_married',   6000],

        ],
        types: {
           'combined' : 'area',
           'bonus'    : 'area',
        },
        regions: {
            person2: [ {'style':'dashed'}, ],
        },
        groups: [ ['combined', 'bonus'] ], 
        order: false,
        names: {
            person1: "Individual EITC (You)",
            person2: "Individual EITC (Your Partner)",
            married: "Married EITC",
        },
        colors: {
            person1: '#6ab6fc',
            point1:  '#6ab6fc',
            person2: '#770087',
            person2_dashed: '#770087',
            point2: '#770087',
            married: '#000000',
            point_married: '#000000',

            combined : '#FFFFFF',
            bonus    : '#36D903',      
        },
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 70,
        right: 22,
    },
    legend: {
        position: 'bottom',
        hide: ['point1', 'point2', 'point_married', 'combined', 'bonus'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000]
            },
            padding: {left: 0, right: 30},
            max: 60000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
            },
            padding: {bottom: 0, top: 0},
            max: 10000,
        }
    },
    grid: {
        x: {
            lines: [{value: 10000, text: 'Your income'}, {value: 15000, text: "Your partner's income"}, {value: 25000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 0}, {value: 6000, text: "Combined Individual EITC's/Married EITC"}, ]
        }
    },
});
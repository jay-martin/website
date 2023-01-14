/******************************************************************************************
 * This file contains the function creating the "Problems Overview" c3.js chart 
 * And the functions controlling the animation of that chart
 * ****************************************************************************************/
var problemsOverviewChart = c3.generate({
    bindto: '#problems_overview_chart',
    size: {
        height: 280,
    },
    data: {
        xs: {
            'person1' : 'x1',
            'person2' : 'x2',
            'married' : 'x3',

            'married_eitc'  : 'x_horizontal',
            'penalty'       : 'x_horizontal',

            'combined_eitc' : 'x_horizontal',
            'bonus'         : 'x_horizontal',

            'hoh_combined'  : 'x_horizontal',
            'hoh_penalty'   : 'x_horizontal',

            'point1' : 'x_point1',
            'point2' : 'x_point2',
            'point_married' : 'x_point_married'
        },
        columns: [
            ['x3',       0, 10979, 26262, 49622],
            ['married',  0, 3733,  3733,  0],
            ['x1',       0, 10979, 20131, 43493],
            ['person1',  0, 3733,  3733,  0],
            ['x2',       0, 7320, 9160, 16480],
            ['person2',  0, 560,  560,  0],

            ['x_horizontal',  0,    60000],
            ['married_eitc',  1548, 1548],
            ['penalty',       1104, 1104],

            ['combined_eitc',],
            ['bonus',],

            ['x_point1', 30000],
            ['point1',   2156],
            ['x_point2', 10000],
            ['point2',   496],
            ['x_point_married', 40000],
            ['point_married',   1548],
        ],
        types: {
            'married_eitc'  : 'area',
            'penalty'       : 'area',
            'combined_eitc' : 'area',
            'bonus'         : 'area',
            'hoh_combined'  : 'area',
            'hoh_penalty'   : 'area',
        },
        groups: [['married_eitc', 'penalty'], ['combined_eitc', 'bonus'], ['hoh_combined', 'hoh_penalty']],
        order: false,
        names: {
            person1: 'Your EITC',
            person2: "Your partner's EITC",
            married: 'EITC if you get married',
        },
        colors: {
            person1: '#6ab6fc',
            point1:  '#6ab6fc',

            person2: purple_shade,
            point2:  purple_shade,

            married:       white_or_black,
            point_married: white_or_black,

            married_eitc:  '#eb3734',
            combined_eitc: '#eb3734',
            penalty:       '#eb3734',
            bonus:          green_shade,

            hoh_combined: '#eb3734',
            hoh_penalty:  '#eb3734',
        },
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 22,
    },
    legend: {
        position: 'bottom',
        hide: ['married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married', 'hoh_combined', 'hoh_penalty'],
    },
    tooltip: {
        show: false
    },
    transition: {
        duration: 400,
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
            },
            padding: {left: 0, right: 0},
            max: 60000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000]
            },
            padding: {bottom: 0, top: 0},
            max: 4000,
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 30000, text: 'Your income'}, {value: 10000, text: "Your partner's income"}, {value: 40000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 0}, {value: 1548, text: "Your married EITC"}, {value: 2652, text: "Combined individual EITC's"},]
        }
    },
});

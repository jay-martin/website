var marriage_penalty_chart = c3.generate({
    bindto: '#marriage_penalties_chart',
    data: {
        xs: {
            'person1'        : 'x1',
            'person2'        : 'x2',
            'person2_dashed' : 'x2',
            'married'        : 'x3',

            'point1'         : 'x_point1',
            'point2'         : 'x_point2',
            'point_married'  : 'x_point_married',

            'married_eitc'   : 'x_horizontal',
            'penalty_eitc'   : 'x_horizontal',
            'combined_eitc'  : 'x_horizontal',
            'bonus_eitc'     : 'x_horizontal',

            'values_point'   : 'x_values_point',
        },
        columns: [
            ['x3',       0, 11750, 28120, 53120],
            ['married',  0, 3995,  3995,  0],
            ['x1',       0, 11750, 21560, 46560],
            ['person1',  0, 3995,  3995,  0],
            ['x2',       0, 7840, 9800, 17640],
            ['person2',  0, 600,  600,  0],
            ['person2_dashed', 0, 600,  600,  0],

            ['x_horizontal',  0,    60000],
            ['married_eitc',  2097, 2097],
            ['penalty_eitc',       1134, 1134],

            ['combined_eitc',],
            ['bonus_eitc',],

            ['x_point1', 30000],
            ['point1',   2646],
            ['x_point2', 10000],
            ['point2',   585],
            ['x_point_married', 40000],
            ['point_married',   2097],
        ],
        types: {
            'married_eitc'  : 'area',
            'penalty_eitc'  : 'area',
            'combined_eitc' : 'area',
            'bonus_eitc'    : 'area',
        },
        regions: {
            person2_dashed: [ {'style':'dashed'}, ],
        },
        groups: [['married_eitc', 'penalty_eitc'], ['combined_eitc', 'bonus_eitc'], ], 
        order: false,
        names: {
            person1        : 'Your EITC',
            person2        : "Your Partner's EITC",
            person2_dashed : "Your Partner's EITC",
            married        : 'EITC if you get married',
            values         : 'Marriage Penalty/Bonus',

            y_red1         : 'Marriage Penalty',
            y_green1       : 'Marriage Bonus',
        },
        colors: {
            person1        : '#6ab6fc',
            point1         : '#6ab6fc',
            person2        : purple_shade,
            person2_dashed : purple_shade,
            point2         : purple_shade,
            married        : white_or_black,
            point_married  : white_or_black,

            married_eitc   : '#eb3734',
            penalty_eitc   : '#eb3734',
            combined_eitc  : '#36D903',
            bonus_eitc     : '#36D903',
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
        hide: ['values_point', 'married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc', 'point1', 'point2', 'point_married', 'hoh_married', 'hoh_penalty', 'hoh_combined', 'hoh_bonus', 'person2_dashed', 'y_green2', 'y_green3', 'y_green4', 'y_red2', 'y_red3', 'y_red4' ],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
            },
            padding: {left: 0, right: 30},
            max: 60000,
            height: 45,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000]
            },
            padding: {bottom: 0, top: 0},
            max: 5000,
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
            lines: [{value: 0}, {value: 2097, text: "Your married EITC"}, {value: 3231, text: "Combined individual EITC's"}, ]
        }
    },
});
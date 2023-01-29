let eitc_marriage_penalty_xy_pairs = {
    'person1'        : 'x1',
    'person2'        : 'x2',
    'person2_dashed' : 'x2',
    'married'        : 'x3',

    'married_eitc'   : 'x_horizontal',
    'penalty_eitc'   : 'x_horizontal',
    
    'combined_eitc'  : 'x_horizontal',
    'bonus_eitc'     : 'x_horizontal',

    'point1'         : 'x_point1',
    'point2'         : 'x_point2',
    'point_married'  : 'x_point_married',

    'values_point'   : 'x_values_point',
    'y_green1'       : 'x_green1',
    'y_red1'         : 'x_red1',
};

var eitc_marriage_penalty_chart = c3.generate({
    bindto: '#eitc_marriage_penalty_chart',
    data: {
        xs: eitc_marriage_penalty_xy_pairs,
        columns: [
            ['x_green1', 0, 1750, 10030.29411764706],
            ['y_green1', 2815.3, 2815.3, 0],
            ['x_red1', 10030.29411764706, 11750, 18120, 21560, 43120, 46560, 70000],
            ['y_red1', 0, -584.6999999999998, -584.6999999999998, -1134.4119999999998, -1134.412, -584.7, -584.7],

            ['x_values_point',  30000],
            ['values_point',    -1134],
        ],
        types: {
            'married_eitc'  : 'area',
            'penalty_eitc'  : 'area',
            'combined_eitc' : 'area',
            'bonus_eitc'    : 'area',

            'y_red1'        : 'area',
            'y_green1'      : 'area',
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

            values_point   : '#eb3734',
            y_red1         : '#eb3734',
            y_green1       : '#36D903',
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
        hide: ['values_point', 'married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc', 'point1', 'point2', 'point_married', 'y_green2', 'y_green3', 'y_green4', 'y_red2', 'y_red3', 'y_red4' ],
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
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000]
            },
            padding: {bottom: 10, top: 10},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 30000, text: 'Your income'}]
        },
        y: {
            lines: [{value: 0}, ]
        }
    },
});
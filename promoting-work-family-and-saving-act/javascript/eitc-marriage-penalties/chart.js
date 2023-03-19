var eitc_marriage_penalty_chart = c3.generate({
    bindto: '#eitc_marriage_penalty_chart',
    data: {
        xs: {
            'person1'        : 'x_person1',
            'person2'        : 'x_person2',
            'person2_dashed' : 'x_person2_dashed',
            'married'        : 'x_married',

            'point1'         : 'x_point1',
            'point2'         : 'x_point2',
            'point_married'  : 'x_point_married',

            'married_eitc'   : 'x_horizontal',
            'penalty_eitc'   : 'x_horizontal',
            'combined_eitc'  : 'x_horizontal',
            'bonus_eitc'     : 'x_horizontal',
        },
        columns: [
            ['x_married', 0, 20000, 50000, 75000],
            ['married',   0, 6330,  6330,  0],

            // person2 goes first to hide it underneath person1
            // person2_dashed goes after person1 so it sits on top of person1
            ['x_person2', 10000, 25000, 37500],
            ['person2',   3165,  3165,  0],
            ['x_person1', 0, 10000, 25000, 37500],
            ['person1',   0, 3165,  3165,  0],
            ['x_person2_dashed', 0, 10000, 25000, 37500],
            ['person2_dashed',   0, 3165,  3165,  0],

            ['x_horizontal',  0,    80000],
            ['married_eitc',  ],
            ['penalty_eitc',  ],
            ['combined_eitc', 4747.5, 4747.5],
            ['bonus_eitc',    1582.5, 1582.5],

            ['x_point1', 20000],
            ['point1',   3165],
            ['x_point2', 5000],
            ['point2',   1582.5],
            ['x_point_married', 25000],
            ['point_married',   6330],
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
            person2_dashed : "Your Partner's EITC",
            married        : 'EITC if you get married',
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
        hide: ['person2', 'married_eitc', 'penalty_eitc', 'combined_eitc', 'bonus_eitc', 'point1', 'point2', 'point_married',],
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
            max: 80000,
            height: 45,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000]
            },
            padding: {bottom: 0, top: 0},
            max: 8000,
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000, text: 'Your income'}, {value: 5000, text: "Your partner's income"}, {value: 25000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 0}, {value: 6330, text: "Your married EITC"}, {value: 4747.5, text: "Combined individual EITC's"}, ]
        }
    },
});
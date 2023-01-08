if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    white_or_black = '#dbdbdb';
    purple_shade = '#cb3ede';
    green_shade = '#03c900';
}
else{
    white_or_black = 'black';
    purple_shade = '#770087';
    green_shade = '#0c6300';
}

var MPchart = c3.generate({
    bindto: '#MPchart',
    data: {
        xs: {
            'person1' : 'x1',
            'person2' : 'x2',
            'person2_dashed' : 'x2',
            'married' : 'x3',

            'point1' : 'x_point1',
            'point2' : 'x_point2',
            'point_married' : 'x_point_married',

            'married_eitc'  : 'x_horizontal',
            'penalty'       : 'x_horizontal',
            'combined_eitc' : 'x_horizontal',
            'bonus'         : 'x_horizontal',

            'hoh_married'   : 'x_horizontal',
            'hoh_penalty'   : 'x_horizontal',
            'hoh_combined'  : 'x_horizontal',
            'hoh_bonus'     : 'x_horizontal',

            'both_white'          : 'x_horizontal',
            'both_penalty'        : 'x_horizontal',
            'both_white_positive' : 'x_horizontal',
            'both_bonus'          : 'x_horizontal',
            'both_white_negative' : 'x_horizontal',
            'both_bonus_negative' : 'x_horizontal',
            'filler'              : 'x_horizontal',
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
            ['penalty',       1134, 1134],

            ['combined_eitc',],
            ['bonus',],

            ['x_point1', 30000],
            ['point1',   2646],
            ['x_point2', 10000],
            ['point2',   585],
            ['x_point_married', 40000],
            ['point_married',   2097],
        ],
        types: {
            'married_eitc'  : 'area',
            'penalty'       : 'area',
            'combined_eitc' : 'area',
            'bonus'         : 'area',

            'hoh_married'   : 'area',
            'hoh_penalty'   : 'area',
            'hoh_combined'  : 'area',
            'hoh_bonus'     : 'area',

            'both_white'          : 'area',
            'both_penalty'        : 'area',
            'both_white_positive' : 'area',
            'both_bonus'          : 'area',
            'both_white_negative' : 'area',
            'both_bonus_negative' : 'area',
            'filler'              : 'area',
        },
        regions: {
            person2_dashed: [ {'style':'dashed'}, ],
        },
        groups: [['married_eitc', 'penalty'], ['combined_eitc', 'bonus'], ['hoh_combined', 'hoh_penalty'], ['hoh_married', 'hoh_bonus'], ['both_white', 'both_penalty'], ['both_white_positive', 'both_bonus'], ['both_white_negative', 'both_bonus_negative'] ], 
        order: false,
        names: {
            person1: 'Your EITC',
            person2: "Your Partner's EITC",
            person2_dashed: "Your Partner's EITC",
            married: 'EITC if you get married',
        },
        colors: {
            person1: '#6ab6fc',
            point1:  '#6ab6fc',
            person2: purple_shade,
            person2_dashed: purple_shade,
            point2: purple_shade,
            married: white_or_black,
            point_married: white_or_black,

            married_eitc: '#eb3734',
            penalty: '#eb3734',
            combined_eitc: '#eb3734',
            bonus: '#36D903',

            hoh_married: '#eb3734',
            hoh_penalty: '#eb3734',
            hoh_combined: '#eb3734',
            hoh_bonus: '#36D903',

            both_white   :       '#eb3734',
            both_penalty :       '#eb3734',
            both_white_positive: '#eb3734',
            both_bonus   :       '#36D903',
            both_white_negative: '#eb3734',
            both_bonus_negative: '#36D903',
            filler       :       '#eb3734',
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
        hide: ['married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married', 'hoh_married', 'hoh_penalty', 'hoh_combined', 'hoh_bonus', 'person2_dashed', 'both_white', 'both_penalty', 'both_white_positive', 'both_bonus', 'both_white_negative', 'both_bonus_negative', 'filler'],
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
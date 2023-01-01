var eitcExplainer = c3.generate({
    bindto: '#eitc_explainer_chart',
    data: {
        xs: {
            'person1'         : 'x1',
            'married_plateau' : 'x_plateau',
            'married_phasein' : 'x_phasein',
            'married_phaseout': 'x_phaseout',

            'combined'    : 'x_horizontal',
            'bonus'       : 'x_horizontal',

            'point1' : 'x_point1',
            'point2' : 'x_point2',
            'point_married' : 'x_point_married',
        },
        columns: [
            ['x_plateau',        10000, 15000],
            ['married_plateau',  3000,  3000],
            ['x_phasein',        0,     10000],
            ['married_phasein',  0,     3000],
            ['x_phaseout',       15000],
            ['married_phaseout', 3000],

            ['x1',      0, 10000, 15000, 30000],
            ['person1', 0, 3000,  3000,  0],
        ],
        types: {
           'combined' : 'area',
           'bonus'    : 'area',
        },
        regions: {
            //married: [ {'style':'dashed'}, ],
        },
        groups: [ ['combined', 'bonus'] ], 
        order: false,
        names: {
            person1         : "Individual EITC",
            married_plateau : "Married EITC",
        },
        colors: {
            person1: '#6ab6fc',
            point1:  '#6ab6fc',
            point2: '#770087',
            married_plateau : color_mode_color,
            married_phasein : color_mode_color,
            married_phaseout: color_mode_color,
            point_married   : color_mode_color,

            combined : '#FFFFFF',
            bonus    : '#36D903',      
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
        hide: ['point1', 'point2', 'point_married', 'combined', 'bonus', 'married_phasein', 'married_phaseout',],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000]
            },
            padding: {left: 0, right: 30},
            max: 35000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
            },
            padding: {bottom: 0, top: 0},
            max: 4000,
        }
    },
});
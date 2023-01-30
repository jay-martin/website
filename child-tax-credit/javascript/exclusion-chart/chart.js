var exclusion_chart = c3.generate({
    bindto: '#exclusion_chart',
    data: {
        xs: {
            'ctc'             : 'x',
            'max_benefit'     : 'x',
            'difference_line' : 'x_line',

            'point_top'    : 'x_point',
            'point_bottom' : 'x_point',
        },
        columns: [
            ['x',           0,    2500, 23833, 27700, 35700, 400000, 480000],
            ['ctc',         0,    0,    3200,  3200,  4000,  4000,   0],
            ['max_benefit', 4000, 4000,  800,  800,   0,     0,      4000],

            ['x_line',          15000, 15000],
            ['difference_line', 1875,  4000],
        ],
        types: {
            ctc:          'area',
            max_benefit : 'area'
        },
        groups: [ ['max_benefit', 'ctc'] ], 
        order: false,
        names: {
            // outline: 'Child Tax Credit',
            ctc : 'Child Tax Credit',
            max_benefit: 'Max Benefit',
        },
        colors: {
            ctc     : white_or_black,
            // outline : white_or_black,

            max_benefit :     'red',
            point_top   :     'red',
            difference_line : 'red',
        },
    },
    transition: {
        duration: 200,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['point_bottom', 'point_top', 'difference_line'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 80000, 90000, 100000]
            },
            padding: {left: 0, right: 0},
            max: 50000,
        },
        y: {
            label: {text: 'Credit Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000]
            },
            // max: 2500,
            padding: {top: 20},
        }
    },
});

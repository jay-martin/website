var tax_equivalent_chart = c3.generate({
    bindto: '#tax_equivalent_chart',
    data: {
        xs: {
            'benefit'    : 'x1',
            'tax'        : 'x2',
            'dashed_top' : 'x3',
        },
        axes: {
            'benefit'    : 'y',
            'dashed_top' : 'y',
            'tax'        : 'y2',
        },
        columns: [
            ['x1',      0, 11750,              80000],
            ['benefit', 0, 4000,               4000],
            ['x2',      0,        21560, 46560, 80000],
            ['tax',     0, 0,     4000,  4000],
            ['x3',         11750, 21560],
            ['dashed_top', 4000,  4000],

        ],
        types: {
            'benefit'    : 'area',
            'tax'        : 'area',
            'dashed_top' : 'line',
        },
        regions: {
            dashed_top : [ {'style':'dashed'}, ],
        },
        order: false,
        names: {
            benefit: "EITC Without Phase-Out",
            tax: "Tax",
        },
        colors: {
            benefit     : '#6ab6fc',
            dashed_top  : '#6ab6fc',
            tax         : '#eb3734',
        },
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 65,
    },
    legend: {
        position: 'bottom',
        hide: ['dashed_top'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000],
            },
            padding: {left: 0, right: 30},
            max: 60000,
            height: 45,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000],
            },
            padding: {bottom: 0, top: 0},
            max: 4000,
        },
        y2: {
            show: true,
            inverted: true,
            label: {text: 'Tax', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000],
            },
            padding: {bottom: 0, top: 1.5},
        },
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: []
        },
        y: {
            lines: []
        }
    },
});
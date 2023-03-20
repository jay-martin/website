var eitc_without_phase_out = c3.generate({
    bindto: '#eitc_without_phase_out',
    data: {
        xs: {
            'benefit'    : 'x1',
        },
        axes: {
            'benefit'    : 'y',
        },
        columns: [
            ['x1',      0, 11750,              80000],
            ['benefit', 0, 4000,               4000],
        ],
        types: {
            'benefit'    : 'area',
        },
        regions: {
            dashed_top : [ {'style':'dashed'}, ],
        },
        order: false,
        names: {
            benefit: "EITC Without Phase-Out",
        },
        colors: {
            benefit     : '#6ab6fc',
        },
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 65,
    },
    legend: {
        show: false,
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
            show: false,
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
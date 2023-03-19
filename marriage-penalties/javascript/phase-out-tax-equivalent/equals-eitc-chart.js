var equals_eitc_chart = c3.generate({
    bindto: '#equals_eitc_chart',
    data: {
        xs: {
            'eitc'  : 'x',
        },
        columns: [
            ['x',    0, 11750, 21560, 46560,],
            ['eitc', 0, 4000,  4000,  0,],
        ],
        names: {
            eitc: 'Net Benefit',
        },
        colors: {
            eitc  : '#6ab6fc',
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: [],
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
            padding: {left: 0, right: 0},
            max: 60000,
            height: 45,
        },
        y: {
            label: {text: 'Net Benefit', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000],
            },
            max: 4000,
            padding: {top: 0, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [],
            min: 0,
        },
    }
});
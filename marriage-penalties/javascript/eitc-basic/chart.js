var valuesChart = c3.generate({
    bindto: '#values_chart',
    data: {
        xs: {
            'penalty' : 'x',
            'point'   : 'x_point',
        },
        columns: [
            ['x',       0,    1750, 11750, 18120, 21560, 43120, 46560, 70000],
            ['penalty', 2815, 2815, -585,  -585,  -1134, -1134, -585,  -585],

            ['x_point', 30000],
            ['point',   -1134],
        ],
        types: {
            'penalty': 'area',
        },
        order: false,
        names: {
            penalty: 'Marriage Penalty',
        },
        colors: {
            penalty : '#eb3734',
            point   : '#eb3734',
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
        hide: ['point',],
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
            max: 70000,
        },
        y: {
            label: {text: 'Marriage Penalty/Bonus', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000],
            },
            padding: {bottom: 10, top: 10},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 30000, text: 'Your income'},]
        },
        y: {
            lines: [{value: 0,},]
        }
    },
});
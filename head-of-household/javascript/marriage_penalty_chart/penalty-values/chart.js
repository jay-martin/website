var valuesChart = c3.generate({
    bindto: '#values_chart',
    data: {
        xs: {
            'penalty' : 'x',
            'point'   : 'x_point',
        },
        columns: [
            ['x',       0,    9700, 20800, 36500, 77150, 80650, 116150, 178450, 202900, 252050, 300000],
            ['penalty', 1688, 718, -614,   -928,  -928, -1278, -1278,  -32,     -32,    3900,   9174.5],

            ['x_point', 80000],
            ['point',   -1213],
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
                values: [0, 50000, 100000, 150000, 200000, 250000, 300000]
            },
            padding: {left: 0, right: 30},
            max: 300000,
        },
        y: {
            label: {text: 'Marriage Penalty/Bonus', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
            },
            padding: {bottom: 10, top: 10},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 80000, text: 'Your income'},]
        },
        y: {
            lines: [{value: 0,},]
        }
    },
});